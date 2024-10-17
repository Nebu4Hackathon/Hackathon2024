# activityApiRoute.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import csv
import requests
from io import StringIO
from db.database import get_db
from crud.activityInsert import insert_activities  # Import the insert function

router = APIRouter()

# Define the CSV URL for the activity dataset
CSV_URL = 'https://www.data.gouv.fr/fr/datasets/r/2b52bb1f-8676-43f2-b883-f673e7015ed9'

@router.get("/fetch-and-save-activity-data")
async def fetch_and_save_activity_data(db: Session = Depends(get_db)):
    # Step 1: Fetch the CSV file
    response = requests.get(CSV_URL)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch the CSV file")

    # Step 2: Parse the CSV data
    csv_content = response.content.decode('utf-8')
    csv_reader = csv.DictReader(StringIO(csv_content))

    # Convert CSV rows to a list directly
    raw_data = [row for row in csv_reader]

    # Step 3: Insert the raw data into the database using the existing function
    insert_activities(db, raw_data)

    return {"message": "Activity data retrieved and saved successfully"}
