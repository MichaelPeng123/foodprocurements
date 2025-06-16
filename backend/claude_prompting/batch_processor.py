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

def process_batch_from_urls(urls, food_index_path="foodCodes/food_index.txt"):
    temp_files = download_files_from_urls(urls)
    print("[DEBUG] Downloaded files:", temp_files)

    csv_chunks = run_parallel_batches(temp_files, food_index_path)
    print("[DEBUG] CSV chunks:", csv_chunks)

    combined_csv = "\n".join(csv_chunks)
    print("[DEBUG] Combined CSV:", combined_csv[:50])
    
    return combined_csv

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

# ======================= Batch Processing Claude Prompt + API =======================
def batch_process_prompt(text_chunk, food_index):
    return f"""Parse the following food procurement text and output a CSV with these headers (DO NOT ADD ANY OF YOUR OWN):

    Description,Price,Quantity,Pack Size,Pack,Size,UOM,Total Price,Price Per Pack,Price Per Pack Size,Price Per Pound,Foodcode

    For each of the header, follow these requirements STRICTLY!
    1. Description (The food item name)
    2. Price (for the quantity purchased. This is not the total amount spent. This is the average price per unit or price per unit)
    3. Quantity
    4. Pack Size (May be in the form of Pack/SizeUOM)
    5. Pack (The first part of Pack Size without the middle divider)
    6. Size (The second part of Pack Size without the middle divider)
    7. UOM (This is the Units ex. OZ, LB, CT)
    8. Total Price. This is Equal to Price * Quantity
    9. Price Per Pack. This is equal to Price / Pack
    10. Price Per Pack Size. This is equal to Price / (Pack * Size)
    11. Price Per Pound. This is currently a filler column. Insert a random value between 2 and 15
    12. Foodcode (referenced from the food index text file attatched, map it to the most probable category based on item description)

    Requirements:
    - Use only CSV format with no extra text.
    - No $ signs or dates.
    - If only one value in Pack Size, assume Pack = 1.
    - Leave blank for missing data.
    - Normalize units.
    - Use food index below for choose the Foodcode most appropriate.
    - Output must include each distinct product entry with consistent columns.
    - Do not include any explanatory text
    - Do not skip or group rows. You must parse every row that appears in the input text.
    - The document is not finished until you have reached the final row of the text.
    - Repetition is expected. Do not summarize or omit any lines even if they appear similar.
    - You must return a row in the CSV for every unique item line that appears in the document.
    - Do not stop generating CSV data until you have covered every item from the input.
    - The output must continue until every last item from the input document is parsed.
    - You must NOT, under any circumstances, truncate or stop early.
    - Include a CSV row for every single item found in the text input.
    - Ignore all inferred endpoints or summaries — this is a row-by-row extraction task.
    - Even if items appear repetitive or similar, include them all.
    - If the text is cut off before the last item, continue generating CSV rows based on the prior structure until all visible lines are included.
    - If output is cut off or unfinished, RESTART the CSV output from the top, continuing all rows from the beginning to the end.

    Food Index:
    {food_index}

    Document Text:
    {text_chunk}
    """

def call_claude_batch_process(text_chunk, food_index):
    try:
        prompt = batch_process_prompt(text_chunk, food_index)
        response = client.messages.create(
            model="claude-3-7-sonnet-20250219",
            max_tokens=20000,
            system="You are a precise document parser. Output valid CSV only.",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
    except Exception as e:
        print(f"Claude API error: {e}")
        return ""
    
def batch_process_prompt(text_chunk):
    return f""" When given the following input chunk, 


    Input chunk:
    {text_chunk}
    """

# ======================= Batch Handler =======================
def process_batch(file_paths, food_index):
    combined_text = "\n\n".join(extract_text(path) for path in file_paths)
    raw_csv = call_claude_batch_process(combined_text, food_index)

    if not raw_csv.strip():
        print("[WARNING] Claude output is empty for:", file_paths)
        return ""

    # Heuristic: flag short outputs
    row_count = raw_csv.count('\n')
    if row_count < 10:
        print(f"[WARNING] Very short output ({row_count} rows) for {file_paths}")

    return raw_csv

# ======================= Parallel Execution =======================
def run_parallel_batches(file_paths, food_index_path, batch_size=1):
    try:
        with open(food_index_path, 'r') as f:
            food_index = f.read()
    except Exception as e:
        print(f"[FOOD INDEX ERROR] {e}")
        return []

    batches = [file_paths[i:i + batch_size] for i in range(0, len(file_paths), batch_size)]
    print(f"[INFO] Running {len(batches)} batches in parallel...")

    results = []
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(process_batch, batch, food_index) for batch in batches]
        for future in concurrent.futures.as_completed(futures):
            csv_output = future.result()
            if csv_output.strip():
                results.append(csv_output)

    return results

# ======================= Combine CSVs =======================
# def combine_csv_strings(csv_strings, output_path="food_procurement_combined.xlsx"):
#   dfs = []
#   for csv_string in csv_strings:
#    try:
#        buffer = io.StringIO(csv_string)
#        df = pd.read_csv(buffer)
#        dfs.append(df)
#    except Exception as e:
#        print(f"[CSV ERROR] Failed to parse: {e}")

#   if dfs:
#    combined = pd.concat(dfs, ignore_index=True)
#    combined.to_excel(output_path, index=False)
#    print(f"[DONE] Saved Excel to {output_path}")
#   else:
#    print("[ERROR] No valid data to save.")

# ======================= Main Runner =======================
# def process_procurement_files(file_paths, food_index_path="backend/foodCodes/food_index.txt", output_excel_path="food_procurement_combined.xlsx"):
#   csv_chunks = run_parallel_batches(file_paths, food_index_path)
#    combine_csv_strings(csv_chunks, output_excel_path)