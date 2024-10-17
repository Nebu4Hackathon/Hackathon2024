# activityApiRoute.py
from fastapi import APIRouter, Depends
from sqlalchemy import inspect
from sqlalchemy.orm import Session
import csv
import requests
from io import StringIO

from utils.db_utils import insert_data_in_batches
from db.database import get_db
from model.activityModel import activity_table

router = APIRouter()

BASE_CSV_URL = 'https://www.data.gouv.fr/fr/datasets/r/'


async def fetch_and_save_data_from_csv(csv_url: str, db: Session):
    # Step 1: Fetch the CSV file
    response = requests.get(csv_url)
    if response.status_code != 200:
        return {"error": f"Failed to fetch the CSV file from {csv_url}"}

    # Step 2: Parse the CSV data
    csv_content = response.content.decode('utf-8')
    csv_reader = csv.DictReader(StringIO(csv_content))

    # Step 3: Get valid column names from the SQLAlchemy model
    valid_columns = {column.name for column in inspect(activity_table).c}

    data = []
    for row in csv_reader:
        # Split "Code_postal_et_commune" into "Code_postal" and "commune"
        code_postal_et_commune = row.get('Code_postal_et_commune', '')

        if code_postal_et_commune:
            parts = code_postal_et_commune.split('#', 1)
            code_postal = parts[0]
            commune = parts[1] if len(parts) > 1 else None
        else:
            code_postal, commune = None, None

        # Create a dictionary that only includes valid columns
        filtered_data = {
            key: row[key]
            for key in valid_columns
            if key in row
        }

        # Manually add the derived fields
        filtered_data['Code_Postal'] = code_postal
        filtered_data['Commune'] = commune

        data.append(filtered_data)

    # Step 4: Insert the data into the database
    insert_data_in_batches(db, activity_table, data)

    return {"message": f"Data from {csv_url} retrieved and saved successfully"}


# Dynamic endpoint using a path parameter for the identifier
@router.get("/fetch-and-save-activity-data/{identifier}")
async def fetch_and_save_activity_data(identifier: str, db: Session = Depends(get_db)):
    csv_url = f"{BASE_CSV_URL}{identifier}"
    return await fetch_and_save_data_from_csv(csv_url, db)
