from flask import Blueprint, request, jsonify
from data_fetching.supabase import supabase

query_filtering_bp = Blueprint('query_filtering', __name__)

@query_filtering_bp.route('/api/filter-query', methods=['POST'])
def filter_query():
    filter_params = request.json
    print("Received filter parameters:")
    print(f"Item Category: {filter_params.get('selectedItemCategory', 'All')}")
    print(f"Year Range: {filter_params.get('yearRange', {})}")
    print(f"School Name: {filter_params.get('schoolName', '')}")

    school_name = filter_params.get('schoolName', '')
    year_range = filter_params.get('yearRange', {})
    year_min = year_range.get('min', 2018)
    year_max = year_range.get('max', 2023)
    selected_item_category = filter_params.get('selectedItemCategory', 'All')

    # Query for filtered items (school)
    query = supabase.table('food_data').select('*')
    if school_name:
        query = query.eq('School_name', school_name)
    if selected_item_category and selected_item_category != 'All':
        query = query.eq('item_category', selected_item_category)
    query = query.gte('Document_year', year_min).lte('Document_year', year_max)
    response = query.execute()
    items = response.data if hasattr(response, 'data') else response.get('data', [])

    # Calculate metrics for the selected school/category
    purchasing_volume = sum(item.get('Price', 0) * item.get('Quantity', 0) or 0 for item in items)
    total_quantity = sum(item.get('Quantity', 0) or 0 for item in items)
    price_weights = [item.get('Price_per_lb', 0) * item.get('Quantity', 0) or 0 for item in items]
    price_per_lb_values = [item.get('Price_per_lb') for item in items if item.get('Price_per_lb') is not None]
    avg_purchase_price = sum(price_weights) / total_quantity if price_per_lb_values else 0

    # Query for other SFAs in the same category and year range (once, for both metrics and printing)
    other_sfa_query = supabase.table('food_data').select('*')
    if school_name:
        other_sfa_query = other_sfa_query.neq('School_name', school_name)
    if selected_item_category and selected_item_category != 'All':
        other_sfa_query = other_sfa_query.eq('item_category', selected_item_category)
    other_sfa_query = other_sfa_query.gte('Document_year', year_min).lte('Document_year', year_max)
    other_sfa_response = other_sfa_query.execute()
    other_sfa_items = other_sfa_response.data if hasattr(other_sfa_response, 'data') else other_sfa_response.get('data', [])
    other_sfa_prices = [item.get('Price_per_lb') for item in other_sfa_items if item.get('Price_per_lb') is not None]
    purchasing_volume_other_sfa = sum(item.get('Price', 0) * item.get('Quantity', 0) or 0 for item in other_sfa_items)
    total_other_sfa_quantity = sum(item.get('Quantity', 0) or 0 for item in other_sfa_items)
    other_sfa_min = min(other_sfa_prices) if other_sfa_prices else None
    other_sfa_max = max(other_sfa_prices) if other_sfa_prices else None
    other_sfa_avg = purchasing_volume_other_sfa / total_other_sfa_quantity if other_sfa_prices else None

    # Calculate potential savings
    potential_savings_avg = None
    potential_savings_best = None
    if other_sfa_avg is not None and total_quantity:
        potential_savings_avg = round((avg_purchase_price - other_sfa_avg) * total_quantity, 2)
    if other_sfa_min is not None and total_quantity:
        potential_savings_best = round((avg_purchase_price - other_sfa_min) * total_quantity, 2)

    # Query for all food items for this school (for budget allocation)
    school_all_query = supabase.table('food_data').select('*').eq('School_name', school_name)
    school_all_response = school_all_query.execute()
    school_all_items = school_all_response.data if hasattr(school_all_response, 'data') else school_all_response.get('data', [])
    total_school_spend = sum(item.get('Price', 0) * item.get('Quantity', 0) or 0 for item in school_all_items)
    budget_allocation = (purchasing_volume / total_school_spend) if total_school_spend else None

    print(f"Total School Spend: {total_school_spend}")

    metrics = {
        'purchasing_volume': purchasing_volume,
        'avg_purchase_price': avg_purchase_price,
        'other_sfa_min': other_sfa_min,
        'other_sfa_max': other_sfa_max,
        'potential_savings_avg': potential_savings_avg,
        'potential_savings_best': potential_savings_best,
        'budget_allocation': budget_allocation,
        'total_school_spend': total_school_spend,
        'total_quantity': total_quantity
    }

    print("Filtered items:")
    for item in items:
        print(item)
    print(f"Purchasing Volume: ${metrics['purchasing_volume']:,.2f}")
    print(f"Average Purchase Price: ${metrics['avg_purchase_price']:.2f}/lb")
    if metrics['other_sfa_min'] is not None and metrics['other_sfa_max'] is not None:
        print(f"Other SFAs Price Range: ${metrics['other_sfa_min']:.2f} - ${metrics['other_sfa_max']:.2f}/lb")
    else:
        print("Other SFAs Price Range: N/A")
    print(f"Potential Savings (Avg. Market Price): {metrics['potential_savings_avg']}")
    print(f"Potential Savings (Best Market Price): {metrics['potential_savings_best']}")
    print(f"Budget Allocation: {metrics['budget_allocation']}")
    print(f"Total School Spend: {metrics['total_school_spend']}")

    print(f"Total Quantity: {total_quantity} lbs")
    print(f"Avg Purchase Price: ${metrics['avg_purchase_price']:.2f}/lb")
    print(f"Total Volume: ${metrics['purchasing_volume']:,.2f}")
    print(f"Total Quantity: {total_quantity} lbs")
    print("Your Purchases:")
    for item in items:
        print(f"  {item.get('Description', '')}, {item.get('Document_year', '')}, {item.get('Quantity', '')} lbs, ${item.get('Price', '')}, ${item.get('Price_per_lb', '')}/lb")

    print("Purchases from Other SFAs:")
    for item in other_sfa_items:
        print(f"  {item.get('Description', '')}, {item.get('Document_year', '')}, {item.get('Quantity', '')} lbs, ${item.get('Price', '')}, ${item.get('Price_per_lb', '')}/lb")

    return jsonify({
        "status": "success",
        "message": "Filter parameters received and query executed",
        "items": items,
        "other_sfa_items": other_sfa_items,
        "metrics": metrics
    }) 