import os
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables
load_dotenv()

supabase_url = os.getenv('REACT_APP_SUPABASE_URL')
supabase_key = os.getenv('REACT_APP_SUPABASE_KEY')
supabase = create_client(supabase_url, supabase_key) 