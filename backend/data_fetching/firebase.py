import os
import firebase_admin
from firebase_admin import credentials, firestore, storage
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Firebase with your service account credentials
cred = credentials.Certificate('../python_key.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': os.getenv('REACT_APP_FIREBASE_STORAGE_BUCKET')
})

db = firestore.client()
bucket = storage.bucket() 