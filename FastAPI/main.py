from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from utils.zip_utils import fetch_zip_file, extract_csv_from_zip
from utils.db_utils import insert_data_in_batches
from db.database import get_db
from models.associationModel import associations_table

router = APIRouter()

# Define the API URL (can be any URL)
API_URL = 'https://media.interieur.gouv.fr/rna/rna_import_20241001.zip'


@router.get("/fetch-and-save-associations")
async def fetch_and_save_associations(db: Session = Depends(get_db)):
    # Step 1: Fetch the ZIP file
    zip_file = await fetch_zip_file(API_URL)

    # Step 2: Extract CSV data from the ZIP file
    data = await extract_csv_from_zip(zip_file)

    # Step 3: Insert the data into the database (reusing the general utility)
    insert_data_in_batches(db, associations_table, data)

    return {"message": "Associations data retrieved and saved successfully"}
