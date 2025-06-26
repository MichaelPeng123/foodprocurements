import anthropic
import os
import pandas as pd
import io
import base64
from PyPDF2 import PdfReader
from PIL import Image
import pytesseract
from dotenv import load_dotenv
import concurrent.futures
import requests
import tempfile
import re
from typing import Dict, List, Any

# Load environment variables
load_dotenv()

# Initialize Anthropic client
client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

# ======================= Extraction =======================
def download_files_from_urls(urls):
    temp_paths = []
    for url in urls:
        response = requests.get(url)
        if response.status_code == 200:
            suffix = os.path.splitext(url)[-1]
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
                tmp_file.write(response.content)
                temp_paths.append(tmp_file.name)
        else:
            print(f"[ERROR] Failed to download {url}")
    return temp_paths

def extract_text_from_pdf(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        return '\n'.join(page.extract_text() or "" for page in reader.pages)
    except Exception as e:
        print(f"[PDF ERROR] Failed to extract from {pdf_path}: {e}")
        return ""

def extract_text_from_image(image_path):
    try:
        image = Image.open(image_path)
        return pytesseract.image_to_string(image)
    except Exception as e:
        print(f"[IMG ERROR] Failed to extract from {image_path}: {e}")
        return ""

def extract_text(file_path):
    if file_path.lower().endswith('.pdf'):
        return extract_text_from_pdf(file_path)
    elif file_path.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.tiff')):
        return extract_text_from_image(file_path)
    else:
        print(f"[SKIPPED] Unsupported file type: {file_path}")
        return ""

# ======================= Enhanced Prompting =======================
def batch_process_prompt(text_chunk, food_index, header_context=None, is_continuation=False):
    """Enhanced prompt that includes header context for continuation chunks"""
    
    context_section = ""
    if is_continuation and header_context:
        context_section = f"""
IMPORTANT CONTEXT FROM DOCUMENT HEADER:
The following header information was found at the beginning of this document:
{header_context}

Use this context to understand the column structure and data format expectations.
"""

    continuation_note = ""
    if is_continuation:
        continuation_note = """
NOTE: This is a continuation chunk from a larger document. The header context above shows the original column structure. 
Continue processing items in the same format as established in the first chunk.
"""

    return f"""You are a precise data extraction specialist. Parse the following food procurement text and output ONLY a valid CSV.

{context_section}

CRITICAL REQUIREMENTS:
1. Output EXACTLY these 12 headers (copy exactly): Description,Price,Quantity,Pack Size,Pack,Size,UOM,Total Price,Price Per Pack,Price Per Pack Size,Price Per Pound,Foodcode

2. COLUMN DEFINITIONS (follow precisely and MAKE SURE ALL 12 COLUMNS ARE HERE):
   - Description: Food item name (no quotes, clean text)
   - Price: Price per unit/quantity purchased (numeric, 1 decimal place)
   - Quantity: Number of units purchased (whole number)
   - Pack Size: Original pack size text (e.g., "12/16OZ", "6/2LB")
   - Pack: First number from Pack Size (whole number, e.g., 12 from "12/16OZ")
   - Size: Second number from Pack Size (whole number, e.g., 16 from "12/16OZ") 
   - UOM: Unit of measure (OZ, LB, CT, EA, etc.)
   - Total Price: Price × Quantity (1 decimal place)
   - Price Per Pack: Price ÷ Pack (1 decimal place)
   - Price Per Pack Size: Price ÷ (Pack × Size) (1 decimal place)
   - Price Per Pound: Random value between 2-15 (1 decimal place)
   - Foodcode: 6-digit code from food index (EXACT match required)

3. STRICT FORMATTING RULES:
   - Enclose the Description in double quotes (") ONLY if it contains a comma.
   - Use commas ONLY as the column separator.
   - ALL DECIMAL NUMBERS: Format to exactly 1 decimal place (e.g., 12.5).
   - NO dollar signs ($).
   - Empty cells must be blank (e.g., a line should look like `item,1.0,,,,,,,,,`).
   - If Pack Size has only one number, treat it as the Size (e.g., for "16OZ", Pack=1 and Size=16).

4. FOODCODE MATCHING REQUIREMENTS:
   - Read the COMPLETE food index below carefully
   - Match Description to the MOST SPECIFIC food category available
   - Do NOT default to generic codes like 110024 (Dry Beans)
   - Examples of proper matching:
     * "Chicken Breast" → find poultry/chicken codes
     * "Apples" → find fruit codes  
     * "Milk" → find dairy codes
     * "Bread" → find grain/bakery codes
   - If no close match exists, use 999999 (Unknown)

5. QUALITY CONTROLS:
   - Include EVERY single item line from input
   - Do not summarize, group, or skip similar items
   - Each output row must have exactly 12 columns
   - Verify calculations are correct

{continuation_note}

COMPLETE FOOD INDEX FOR MATCHING:
{food_index}

INPUT TEXT TO PROCESS:
{text_chunk}

OUTPUT FORMAT: Start with header row, then data rows. NO other text."""

def call_claude_batch_process(text_chunk, food_index, header_context=None, is_continuation=False):
    """Enhanced Claude API call with dynamic header fixing"""
    max_retries = 2
    
    for attempt in range(max_retries + 1):
        try:
            prompt = batch_process_prompt(text_chunk, food_index, header_context, is_continuation)
            
            response = client.messages.create(
                model="claude-3-7-sonnet-20250219",
                max_tokens=20000,
                temperature=0.1,
                system="You are a precise CSV data extractor. Output valid CSV only with exact column alignment. No explanatory text.",
                messages=[{"role": "user", "content": prompt}]
            )
            
            raw_output = response.content[0].text.strip()

            print("----- RAW CLAUDE OUTPUT (BEFORE FIXING) -----")
            print(raw_output)
            print("---------------------------------------------")
            
            # Debug output
            if attempt == 0:
                print(f"\n[DEBUG] Claude output preview (attempt {attempt + 1}):")
                output_lines = raw_output.split('\n')
                for i, line in enumerate(output_lines[:3]):
                    cols_count = len(line.split(','))
                    print(f"  Line {i+1}: {cols_count} cols -> {line[:120]}{'...' if len(line) > 120 else ''}")
            
            # Use dynamic validation with auto-fix
            validation_result = validate_csv_output(raw_output, text_chunk)
            
            if validation_result['is_valid']:
                if validation_result.get('auto_fixed'):
                    print(f"[SUCCESS] Auto-fix applied: {validation_result.get('fix_description', 'Unknown fix')}")
                    return validation_result['fixed_csv']
                else:
                    return raw_output
            else:
                print(f"[VALIDATION FAILED - Attempt {attempt + 1}]")
                
                # Generate dynamic error message
                analysis = analyze_column_structure(raw_output)
                dynamic_error_msg = generate_error_message(validation_result, analysis)
                
                if attempt < max_retries:
                    retry_instruction = f"""

CRITICAL FIX REQUIRED - COLUMN COUNT ISSUES DETECTED:
{dynamic_error_msg}

Fix these issues and try again. Ensure EXACT column alignment."""
                    
                    prompt += retry_instruction
                    continue
                else:
                    print(f"[ERROR] All retry attempts failed.")
                    print(dynamic_error_msg)
                    return raw_output
                    
        except Exception as e:
            print(f"Claude API error (attempt {attempt + 1}): {e}")
            if attempt == max_retries:
                return ""
            
    return ""

# ======================= Validation Functions =======================
def perform_basic_validation(csv_output, original_text):
    """Validate CSV output quality and detect common issues with debug output"""
    errors = []
    
    if not csv_output.strip():
        return {'is_valid': False, 'errors': ['Empty output']}
    
    lines = csv_output.strip().split('\n')
    
    # Check if has header
    if len(lines) < 2:
        errors.append('Output too short - missing data rows')
    
    # Check column count consistency
    expected_columns = 12
    header_cols = len(lines[0].split(',')) if lines else 0
    
    # DEBUG: Print first 5 rows when validation fails
    if header_cols != expected_columns:
        errors.append(f'Header has {header_cols} columns, expected {expected_columns}')
        print(f"\n[DEBUG] VALIDATION FAILURE - Column count mismatch")
        print(f"[DEBUG] Expected: {expected_columns} columns, Got: {header_cols} columns")
        print(f"[DEBUG] First 5 rows of output:")
        for i, line in enumerate(lines[:5]):
            cols = line.split(',')
            print(f"  Row {i+1}: {len(cols)} columns -> {line[:100]}{'...' if len(line) > 100 else ''}")
        print(f"[DEBUG] Header analysis:")
        if lines:
            header_parts = lines[0].split(',')
            for j, part in enumerate(header_parts):
                print(f"  Column {j+1}: '{part}'")
        print("[DEBUG] End of debug output\n")
    
    # Check for column alignment in first few data rows
    column_issues = []
    for i, line in enumerate(lines[1:6]):  # Check first 5 data rows
        if line.strip():
            cols = line.split(',')
            if len(cols) != expected_columns:
                column_issues.append(f'Row {i+2} has {len(cols)} columns, expected {expected_columns}')
    
    if column_issues:
        errors.extend(column_issues)
        print(f"\n[DEBUG] DATA ROW COLUMN ISSUES:")
        for i, line in enumerate(lines[1:6]):
            if line.strip():
                cols = line.split(',')
                if len(cols) != expected_columns:
                    print(f"  Data Row {i+2}: {len(cols)} columns -> {line[:100]}{'...' if len(line) > 100 else ''}")
                    # Show each column for problematic rows
                    for j, col in enumerate(cols):
                        print(f"    Col {j+1}: '{col}'")
        print("[DEBUG] End of column issues debug\n")
    
    # Check for obvious truncation
    estimated_input_items = estimate_item_count(original_text)
    output_rows = len([l for l in lines[1:] if l.strip()])
    
    if output_rows < estimated_input_items * 0.7:  # Less than 70% of expected
        errors.append(f'Possible truncation: {output_rows} output rows vs ~{estimated_input_items} estimated input items')
    
    # Check for hallucination indicators
    if any('lorem ipsum' in line.lower() or 'example' in line.lower() for line in lines):
        errors.append('Detected placeholder/example text')
    
    return {
        'is_valid': len(errors) == 0,
        'errors': errors,
        'stats': {
            'output_rows': output_rows,
            'estimated_input': estimated_input_items,
            'header_columns': header_cols
        }
    }

def validate_csv_output(csv_output, original_text):
    """Enhanced validation with dynamic auto-fixing"""
    
    # First try normal validation
    initial_validation = perform_basic_validation(csv_output, original_text)
    
    # If validation fails, try dynamic auto-fix
    if not initial_validation['is_valid']:
        column_errors = [err for err in initial_validation['errors'] 
                        if 'columns' in err.lower() and ('header' in err.lower() or 'row' in err.lower())]
        
        if column_errors:
            print(f"[DEBUG] Attempting dynamic auto-fix for column issues...")
            print(f"[DEBUG] Issues detected: {column_errors}")
            
            fixed_csv, fix_description = fix_header_column_mismatch(csv_output)
            
            # Re-validate the fixed version
            fixed_validation = validate_csv_output(fixed_csv, original_text)
            
            if fixed_validation['is_valid']:
                print(f"[DEBUG] Dynamic auto-fix successful! {fix_description}")
                return {
                    'is_valid': True,
                    'errors': [],
                    'auto_fixed': True,
                    'fixed_csv': fixed_csv,
                    'fix_description': fix_description,
                    'stats': fixed_validation['stats']
                }
            else:
                print(f"[DEBUG] Dynamic auto-fix failed, validation still shows issues: {fixed_validation['errors']}")
                print(f"[DEBUG] Fix attempted: {fix_description}")
    
    return initial_validation

def generate_error_message(validation_result, analysis=None):
    """Generate dynamic error messages based on the specific column issues detected"""
    
    if not validation_result.get('errors'):
        return ""
    
    error_messages = []
    
    for error in validation_result['errors']:
        if 'Header has' in error and 'columns, expected' in error:
            # Extract numbers from error message
            parts = error.split()
            try:
                current_cols = int(parts[2])
                expected_cols = int(parts[5])
                
                if current_cols < expected_cols:
                    missing_count = expected_cols - current_cols
                    error_messages.append(f"""
HEADER MISSING {missing_count} COLUMN(S):
Your header has {current_cols} columns but data rows need {expected_cols} columns.
You are missing {missing_count} column(s) from your header row.

REQUIRED: Ensure your header has EXACTLY {expected_cols} columns:
Description,Price,Quantity,Pack Size,Pack,Size,UOM,Total Price,Price Per Pack,Price Per Pack Size,Price Per Pound,Foodcode

Your current header appears to be missing column(s). Check which ones are missing and add them.""")
                
                elif current_cols > expected_cols:
                    extra_count = current_cols - expected_cols
                    error_messages.append(f"""
HEADER HAS {extra_count} EXTRA COLUMN(S):
Your header has {current_cols} columns but should only have {expected_cols} columns.
Remove {extra_count} extra column(s) from your header row.""")
                    
            except (ValueError, IndexError):
                error_messages.append(f"COLUMN COUNT ERROR: {error}")
        
        elif 'Row' in error and 'columns' in error:
            error_messages.append(f"DATA ROW ERROR: {error}")
        else:
            error_messages.append(f"VALIDATION ERROR: {error}")
    
    return '\n'.join(error_messages)

def estimate_item_count(text):
    """Estimate number of food items in text"""
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    
    # Look for patterns that indicate item rows
    item_patterns = [
        r'^\d+\.\d+',  # Prices
        r'\$\d+',      # Dollar amounts
        r'\d+\s*(oz|lb|ct|ea|each|pound|ounce)',  # Units
        r'^\w+.*\d+.*\d+',  # Text with numbers
    ]
    
    potential_items = 0
    for line in lines:
        if any(re.search(pattern, line, re.IGNORECASE) for pattern in item_patterns):
            potential_items += 1
    
    return max(potential_items, len(lines) // 3)  # Conservative estimate

def post_process_csv(raw_csv):
    """Clean up common CSV formatting issues"""
    lines = raw_csv.strip().split('\n')
    cleaned_lines = []
    
    for i, line in enumerate(lines):
        if not line.strip():
            continue
            
        # Fix common issues
        line = line.replace('$', '')  # Remove dollar signs
        line = re.sub(r'""', '', line)  # Remove double quotes
        line = re.sub(r',\s*,', ',,', line)  # Fix spacing issues
        
        # Ensure exactly 12 columns
        cols = line.split(',')
        if len(cols) < 12:
            cols.extend([''] * (12 - len(cols)))  # Pad with empty strings
        elif len(cols) > 12:
            # Try to merge excess columns into description
            if i > 0:  # Not header
                cols = [','.join(cols[:len(cols)-11])] + cols[-11:]
        
        # Format decimal columns to 1 decimal place (skip header row)
        if i > 0:  # Not header row
            decimal_columns = {1, 7, 8, 9, 10}  # Price, Total Price, Price Per Pack, Price Per Pack Size, Price Per Pound
            
            for col_idx in decimal_columns:
                if col_idx < len(cols) and cols[col_idx].strip():
                    try:
                        value = float(cols[col_idx].strip())
                        cols[col_idx] = f"{value:.1f}"
                    except ValueError:
                        pass
            
            # Clean Description (column 0)
            if len(cols) > 0:
                cols[0] = cols[0].strip().replace('"', '').replace("'", "")
            
            # Ensure Pack, Size, Quantity are integers
            for int_col_idx in [2, 4, 5]:  # Quantity, Pack, Size
                if int_col_idx < len(cols) and cols[int_col_idx].strip():
                    try:
                        value = float(cols[int_col_idx].strip())
                        cols[int_col_idx] = str(int(value))
                    except ValueError:
                        pass
            
            # Ensure Foodcode is 6-digit integer
            if len(cols) > 11 and cols[11].strip():
                try:
                    value = str(int(float(cols[11].strip())))
                    cols[11] = value.zfill(6) if len(value) < 6 else value
                except ValueError:
                    pass
            
            # Standardize UOM
            if len(cols) > 6 and cols[6].strip():
                uom = cols[6].strip().upper()
                uom_mapping = {
                    'OUNCE': 'OZ', 'OUNCES': 'OZ', 'POUND': 'LB', 'POUNDS': 'LB',
                    'COUNT': 'CT', 'EACH': 'EA', 'GALLON': 'GAL', 'LITER': 'L'
                }
                cols[6] = uom_mapping.get(uom, uom)
        
        cleaned_lines.append(','.join(cols[:12]))
    
    return '\n'.join(cleaned_lines)

# ======================= Chunking for Large Documents =======================
def extract_header_context(text):
    """Extract header/column definition context from the first part of text"""
    lines = text.split('\n')
    header_context = []
    
    header_patterns = [
        r'(description|item|product|food)',
        r'(price|cost|amount|\$)',
        r'(quantity|qty|count)',
        r'(pack|size|unit|uom)',
        r'(total|sum)',
        r'(code|id|number)',
    ]
    
    for i, line in enumerate(lines[:20]):
        line_lower = line.lower()
        if any(re.search(pattern, line_lower) for pattern in header_patterns):
            header_context.append(line.strip())
        if '|' in line or '\t' in line or (line.count(',') > 3):
            header_context.append(line.strip())
    
    return '\n'.join(header_context[:10])

def smart_chunk_text(text, max_chunk_size=8000):
    """Split large text into processable chunks while preserving item integrity and extracting header context"""
    lines = text.split('\n')
    chunks = []
    current_chunk = []
    current_size = 0
    
    header_context = extract_header_context(text)
    
    for line in lines:
        line_size = len(line)
        if current_size + line_size > max_chunk_size and current_chunk:
            chunks.append('\n'.join(current_chunk))
            current_chunk = [line]
            current_size = line_size
        else:
            current_chunk.append(line)
            current_size += line_size
    
    if current_chunk:
        chunks.append('\n'.join(current_chunk))
    
    return chunks, header_context

# ======================= Processing Functions =======================
def process_large_document_unified(file_path, food_index, max_chunk_size=8000):
    """Unified large document processing with header context preservation and dynamic fixing"""
    full_text = extract_text(file_path)
    
    if len(full_text) <= max_chunk_size:
        return call_claude_batch_process(full_text, food_index)
    
    chunks, header_context = smart_chunk_text(full_text, max_chunk_size)
    print(f"[INFO] Split large document into {len(chunks)} chunks")
    print(f"[INFO] Extracted header context: {len(header_context)} characters")
    
    all_csv_parts = []
    header_saved = False
    
    for i, chunk in enumerate(chunks):
        print(f"[INFO] Processing chunk {i+1}/{len(chunks)}")
        
        is_continuation = i > 0
        csv_output = call_claude_batch_process(
            chunk, food_index, header_context, is_continuation
        )
        
        if csv_output.strip():
            lines = csv_output.strip().split('\n')
            
            if not header_saved:
                all_csv_parts.append(csv_output)
                header_saved = True
            else:
                if len(lines) > 1:
                    all_csv_parts.append('\n'.join(lines[1:]))
    
    return '\n'.join(all_csv_parts)

def process_single_file_unified(file_path, food_index):
    """Unified single file processing with all features"""
    print(f"[INFO] Processing {file_path}")
    
    text = extract_text(file_path)
    
    if len(text) > 10000:
        csv_output = process_large_document_unified(file_path, food_index)
    else:
        csv_output = call_claude_batch_process(text, food_index)
    
    return csv_output if csv_output.strip() else ""

def process_batch_unified(file_paths, food_index):
    """Unified batch processing with all features"""
    full_text = "\n\n".join(extract_text(path) for path in file_paths)
    
    if len(full_text.strip()) < 100:
        print(f"[WARNING] Very short text extracted from {file_paths}")
        return ""
    
    if len(full_text) > 10000:
        chunks, header_context = smart_chunk_text(full_text)
        
        all_csv_parts = []
        header_saved = False
        
        for i, chunk in enumerate(chunks):
            is_continuation = i > 0
            raw_csv = call_claude_batch_process(
                chunk, food_index, header_context, is_continuation
            )
            
            if raw_csv.strip():
                lines = raw_csv.strip().split('\n')
                
                if not header_saved:
                    all_csv_parts.append(raw_csv)
                    header_saved = True
                else:
                    if len(lines) > 1:
                        all_csv_parts.append('\n'.join(lines[1:]))
        
        combined_csv = '\n'.join(all_csv_parts)
    else:
        combined_csv = call_claude_batch_process(full_text, food_index)
    
    if not combined_csv.strip():
        print("[ERROR] Empty output from Claude for:", file_paths)
        return ""
    
    cleaned_csv = post_process_csv(combined_csv)
    
    if cleaned_csv:
        final_csv, fix_description = fix_header_column_mismatch(cleaned_csv)
        if fix_description != "No fix needed - header and data both have 12 columns":
            print(f"[DEBUG] Applied header fix: {fix_description}")
            cleaned_csv = final_csv
    
    final_validation = validate_csv_output(cleaned_csv, full_text)
    if not final_validation['is_valid']:
        print(f"[WARNING] Final validation issues: {final_validation['errors']}")
    
    return cleaned_csv

def validate_food_index_loading(food_index_path):
    """Debug function to check food index loading"""
    try:
        with open(food_index_path, 'r') as f:
            food_index = f.read()
        
        lines = food_index.strip().split('\n')
        print(f"[FOOD INDEX DEBUG] Loaded {len(lines)} food categories")
        return food_index
    except Exception as e:
        print(f"[FOOD INDEX ERROR] {e}")
        return ""

def run_parallel_batches(file_paths, food_index_path, batch_size=1):
    """Unified parallel processing with all features"""
    food_index = validate_food_index_loading(food_index_path)
    if not food_index:
        return []

    batches = [file_paths[i:i + batch_size] for i in range(0, len(file_paths), batch_size)]
    print(f"[INFO] Running {len(batches)} batches in parallel with {len(file_paths)} total files...")

    results = []
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=min(len(batches), 4)) as executor:
        if batch_size == 1:
            futures = [executor.submit(process_single_file_unified, file_path, food_index) for file_path in file_paths]
        else:
            futures = [executor.submit(process_batch_unified, batch, food_index) for batch in batches]
        
        for i, future in enumerate(concurrent.futures.as_completed(futures)):
            try:
                csv_output = future.result()
                if csv_output.strip():
                    results.append(csv_output)
                    print(f"[INFO] Completed processing {i+1}/{len(futures)}")
                else:
                    print(f"[WARNING] Empty result from task {i+1}")
            except Exception as e:
                print(f"[ERROR] Task {i+1} failed: {e}")

    print(f"[INFO] Parallel processing complete. {len(results)} successful results out of {len(futures)} tasks.")
    return results

# ======================= Quality Assurance =======================
def comprehensive_quality_check(csv_content: str, original_files: List[str]) -> Dict[str, Any]:
    """Comprehensive quality check for processed CSV"""
    try:
        df = pd.read_csv(io.StringIO(csv_content))
    except Exception as e:
        return {'status': 'error', 'message': f'Failed to parse CSV: {e}', 'fixes': []}
    
    issues = []
    fixes = []
    
    expected_columns = ['Description', 'Price', 'Quantity', 'Pack Size', 'Pack', 
                       'Size', 'UOM', 'Total Price', 'Price Per Pack', 
                       'Price Per Pack Size', 'Price Per Pound', 'Foodcode']
    
    if list(df.columns) != expected_columns:
        issues.append(f"Column mismatch: {list(df.columns)} vs expected {expected_columns}")
        fixes.append("Fix column headers and alignment")
    
    numeric_columns = ['Price', 'Quantity', 'Pack', 'Size', 'Total Price', 
                      'Price Per Pack', 'Price Per Pack Size', 'Price Per Pound', 'Foodcode']
    
    for col in numeric_columns:
        if col in df.columns:
            non_numeric = df[~pd.to_numeric(df[col], errors='coerce').notna() & df[col].notna()]
            if not non_numeric.empty:
                issues.append(f"Non-numeric values in {col}: {len(non_numeric)} rows")
                fixes.append(f"Clean non-numeric values in {col}")
    
    missing_critical = df[['Description', 'Price', 'Quantity']].isnull().any(axis=1).sum()
    if missing_critical > 0:
        issues.append(f"Missing critical data in {missing_critical} rows")
        fixes.append("Review and fill missing Description/Price/Quantity data")
    
    if all(col in df.columns for col in ['Price', 'Quantity', 'Total Price']):
        df_calc = df.dropna(subset=['Price', 'Quantity', 'Total Price'])
        if not df_calc.empty:
            calculated_total = pd.to_numeric(df_calc['Price'], errors='coerce') * pd.to_numeric(df_calc['Quantity'], errors='coerce')
            actual_total = pd.to_numeric(df_calc['Total Price'], errors='coerce')
            tolerance = 0.05
            mismatched = abs(calculated_total - actual_total) > (actual_total * tolerance)
            if mismatched.any():
                issues.append(f"Calculation errors in Total Price: {mismatched.sum()} rows")
                fixes.append("Recalculate Total Price = Price × Quantity")
    
    if 'Foodcode' in df.columns:
        invalid_codes = df[~df['Foodcode'].astype(str).str.match(r'^\d{6}$', na=False) & df['Foodcode'].notna()]
        if not invalid_codes.empty:
            issues.append(f"Invalid foodcodes: {len(invalid_codes)} rows")
            fixes.append("Ensure foodcodes are 6-digit numbers")
    
    duplicates = df.duplicated().sum()
    if duplicates > 0:
        issues.append(f"Duplicate rows detected: {duplicates}")
        fixes.append("Review and remove duplicate entries if unintended")
    
    if 'Price' in df.columns:
        prices = pd.to_numeric(df['Price'], errors='coerce').dropna()
        if not prices.empty:
            q1, q3 = prices.quantile([0.25, 0.75])
            iqr = q3 - q1
            outliers = prices[(prices < q1 - 1.5*iqr) | (prices > q3 + 1.5*iqr)]
            if len(outliers) > len(prices) * 0.1:
                issues.append(f"High number of price outliers: {len(outliers)}")
                fixes.append("Review extreme price values for accuracy")
    
    return {
        'status': 'warning' if issues else 'success',
        'total_rows': len(df),
        'issues': issues,
        'fixes': fixes,
        'summary': {
            'rows_processed': len(df),
            'columns_correct': len(df.columns) == len(expected_columns),
            'data_completeness': (1 - df.isnull().sum().sum() / df.size) * 100,
            'critical_missing': missing_critical
        }
    }

def combine_csv_chunks_safely(csv_chunks):
    """Safely combine CSV chunks ensuring header consistency"""
    if not csv_chunks:
        return ""
    
    all_lines = []
    header_set = False
    
    for chunk in csv_chunks:
        if not chunk.strip():
            continue
            
        lines = chunk.strip().split('\n')
        
        if not header_set:
            all_lines.extend(lines)
            header_set = True
        else:
            if len(lines) > 1:
                all_lines.extend(lines[1:])
    
    return '\n'.join(all_lines)

# ======================= Header Row Fixes =======================
def analyze_column_structure(csv_content):
    """Analyze CSV structure to understand column patterns"""
    if not csv_content.strip():
        return None
    
    lines = csv_content.strip().split('\n')
    if len(lines) < 2:
        return None
    
    header_cols = lines[0].split(',')
    data_lines = [line for line in lines[1:] if line.strip()]
    
    if not data_lines:
        return None
    
    data_col_counts = [len(line.split(',')) for line in data_lines[:10]]
    col_count_frequency = {}
    for count in data_col_counts:
        col_count_frequency[count] = col_count_frequency.get(count, 0) + 1
    
    most_common_data_cols = max(col_count_frequency.items(), key=lambda x: x[1])[0]
    
    return {
        'header_count': len(header_cols),
        'data_count': most_common_data_cols,
        'header_cols': header_cols,
        'data_col_distribution': col_count_frequency,
        'sample_data_rows': data_lines[:3]
    }

def identify_missing_columns(current_header, expected_header, data_column_count):
    """Identify which columns are missing by comparing with expected header"""
    if data_column_count == len(expected_header):
        missing_cols = []
        current_set = set(col.strip().lower() for col in current_header)
        
        for i, expected_col in enumerate(expected_header):
            if expected_col.strip().lower() not in current_set:
                missing_cols.append({
                    'index': i,
                    'name': expected_col,
                    'position': f"between '{expected_header[i-1] if i > 0 else 'START'}' and '{expected_header[i+1] if i < len(expected_header)-1 else 'END'}'"
                })
        
        return missing_cols
    
    return []

def smart_header_reconstruction(current_header, expected_header, data_column_count):
    """Intelligently reconstruct header based on what's present vs what's expected"""
    if data_column_count == len(expected_header):
        return expected_header, f"Replaced header completely (data has {data_column_count} columns)"
    
    if len(current_header) > data_column_count:
        truncated = current_header[:data_column_count]
        return truncated, f"Truncated header from {len(current_header)} to {data_column_count} columns"
    
    if len(current_header) < data_column_count:
        extended_header = current_header.copy()
        missing_count = data_column_count - len(current_header)
        
        current_lower = [col.strip().lower() for col in current_header]
        
        missing_expected = []
        for exp_col in expected_header:
            if exp_col.strip().lower() not in current_lower:
                missing_expected.append(exp_col)
        
        for i in range(min(missing_count, len(missing_expected))):
            extended_header.append(missing_expected[i])
        
        while len(extended_header) < data_column_count:
            extended_header.append(f"Column_{len(extended_header)+1}")
        
        return extended_header, f"Extended header from {len(current_header)} to {data_column_count} columns, added: {extended_header[len(current_header):]}"
    
    return current_header, "No changes needed"

def fix_header_column_mismatch(csv_content):
    """Dynamic header fixing that works for any column mismatch scenario"""
    if not csv_content.strip():
        return csv_content, "Empty content"
    
    analysis = analyze_column_structure(csv_content)
    if not analysis:
        return csv_content, "Insufficient data for analysis"
    
    header_count = analysis['header_count']
    data_count = analysis['data_count']
    current_header = analysis['header_cols']
    
    print(f"[DEBUG] Column Analysis:")
    print(f"  Header columns: {header_count}")
    print(f"  Data columns (most common): {data_count}")
    print(f"  Data column distribution: {analysis['data_col_distribution']}")
    
    if header_count == data_count:
        return csv_content, f"No fix needed - header and data both have {header_count} columns"
    
    expected_header = ['Description', 'Price', 'Quantity', 'Pack Size', 'Pack', 
                      'Size', 'UOM', 'Total Price', 'Price Per Pack', 
                      'Price Per Pack Size', 'Price Per Pound', 'Foodcode']
    
    if data_count == len(expected_header):
        missing_cols = identify_missing_columns(current_header, expected_header, data_count)
        if missing_cols:
            print(f"[DEBUG] Missing columns detected:")
            for col in missing_cols:
                print(f"  - '{col['name']}' should be at position {col['index']+1} ({col['position']})")
    
    new_header, fix_description = smart_header_reconstruction(current_header, expected_header, data_count)
    
    print(f"[DEBUG] Header fix: {fix_description}")
    print(f"[DEBUG] New header: {new_header}")
    
    lines = csv_content.strip().split('\n')
    fixed_lines = [','.join(new_header)] + lines[1:]
    
    return '\n'.join(fixed_lines), fix_description

# ======================= Main Function =======================
def process_batch_from_urls(urls, food_index_path="foodCodes/food_index.txt", max_workers=4, batch_size=1):
    """Main processing function with all features unified"""
    temp_files = download_files_from_urls(urls)
    print(f"[DEBUG] Downloaded files: {temp_files}")

    csv_chunks = run_parallel_batches(temp_files, food_index_path, batch_size)
    
    if not csv_chunks:
        return ""
    
    combined_csv = combine_csv_chunks_safely(csv_chunks)
    fixed_csv = auto_fix_common_issues(combined_csv)
    
    if fixed_csv:
        final_csv, fix_description = fix_header_column_mismatch(fixed_csv)
        if fix_description != "No fix needed - header and data both have 12 columns":
            print(f"[DEBUG] Final header fix applied: {fix_description}")
            fixed_csv = final_csv
    
    quality_report = comprehensive_quality_check(fixed_csv, temp_files)
    
    print(f"[QUALITY CHECK] Status: {quality_report['status']}")
    print(f"[QUALITY CHECK] Processed {quality_report.get('total_rows', 0)} rows")
    
    if quality_report.get('issues'):
        print("[QUALITY ISSUES DETECTED]:")
        for issue in quality_report['issues']:
            print(f"  - {issue}")
        print("[SUGGESTED FIXES]:")
        for fix in quality_report.get('fixes', []):
            print(f"  - {fix}")
    
    return fixed_csv

def auto_fix_common_issues(csv_content: str) -> str:
    """Automatically fix common data quality issues with proper decimal formatting"""
    try:
        df = pd.read_csv(io.StringIO(csv_content))
    except:
        return csv_content
    
    expected_columns = ['Description', 'Price', 'Quantity', 'Pack Size', 'Pack', 
                       'Size', 'UOM', 'Total Price', 'Price Per Pack', 
                       'Price Per Pack Size', 'Price Per Pound', 'Foodcode']
    
    if len(df.columns) == len(expected_columns):
        df.columns = expected_columns
    
    numeric_columns = ['Price', 'Quantity', 'Pack', 'Size', 'Total Price', 
                      'Price Per Pack', 'Price Per Pack Size', 'Price Per Pound', 'Foodcode']
    
    for col in numeric_columns:
        if col in df.columns:
            df[col] = df[col].astype(str).str.replace(r'[$,]', '', regex=True)
            df[col] = pd.to_numeric(df[col], errors='coerce')
    
    if all(col in df.columns for col in ['Price', 'Quantity', 'Total Price']):
        mask = df['Price'].notna() & df['Quantity'].notna()
        df.loc[mask, 'Total Price'] = (df.loc[mask, 'Price'] * df.loc[mask, 'Quantity']).round(1)
    
    if all(col in df.columns for col in ['Price', 'Pack', 'Price Per Pack']):
        mask = df['Price'].notna() & df['Pack'].notna() & (df['Pack'] > 0)
        df.loc[mask, 'Price Per Pack'] = (df.loc[mask, 'Price'] / df.loc[mask, 'Pack']).round(1)
    
    if all(col in df.columns for col in ['Price', 'Pack', 'Size', 'Price Per Pack Size']):
        mask = (df['Price'].notna() & df['Pack'].notna() & df['Size'].notna() & 
                (df['Pack'] > 0) & (df['Size'] > 0))
        df.loc[mask, 'Price Per Pack Size'] = (df.loc[mask, 'Price'] / (df.loc[mask, 'Pack'] * df.loc[mask, 'Size'])).round(1)
    
    if 'Description' in df.columns:
        df['Description'] = df['Description'].astype(str).str.strip()
        df['Description'] = df['Description'].str.replace(r'["\']', '', regex=True)
    
    decimal_columns = ['Price', 'Total Price', 'Price Per Pack', 'Price Per Pack Size', 'Price Per Pound']
    for col in decimal_columns:
        if col in df.columns:
            df[col] = df[col].round(1)
    
    return df.to_csv(index=False, float_format='%.1f')