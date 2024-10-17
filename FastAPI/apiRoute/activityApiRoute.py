# tourismeApiRoute.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import csv
import requests
from io import StringIO

from utils.db_utils import insert_data_in_batches
from db.database import get_db
from models.tourism_model import tourism_table

router = APIRouter()

# Define the CSV URL for the tourism dataset
CSV_URL = 'https://example-url-to-download-the-csv-file.csv'


@router.get("/fetch-and-save-tourism-data")
async def fetch_and_save_tourism_data(db: Session = Depends(get_db)):
    # Step 1: Fetch the CSV file
    response = requests.get(CSV_URL)
    if response.status_code != 200:
        return {"error": "Failed to fetch the CSV file"}

    # Step 2: Parse the CSV data
    csv_content = response.content.decode('utf-8')
    csv_reader = csv.DictReader(StringIO(csv_content))

    data = []
    for row in csv_reader:
        # Append each row of data as a dictionary (matching the column names in the model)
        data.append({
            'Nom_du_POI': row.get('Nom_du_POI'),
            'Categories_de_POI': row.get('Categories_de_POI'),
            'Latitude': float(row.get('Latitude')) if row.get('Latitude') else None,
            'Longitude': float(row.get('Longitude')) if row.get('Longitude') else None,
            'Adresse_postale': row.get('Adresse_postale'),
            'Code_postal_et_commune': row.get('Code_postal_et_commune'),
            'Createur_de_la_donnee': row.get('Createur_de_la_donnee'),
            'SIT_diffuseur': row.get('SIT_diffuseur'),
            'Date_de_mise_a_jour': row.get('Date_de_mise_a_jour'),
            'Contacts_du_POI': row.get('Contacts_du_POI'),
            'Classements_du_POI': row.get('Classements_du_POI'),
            'Description': row.get('Description'),
            'URI_ID_du_POI': row.get('URI_ID_du_POI')
        })

    # Step 3: Insert the data into the database
    insert_data_in_batches(db, tourism_table, data)

    return {"message": "Tourism data retrieved and saved successfully"}
