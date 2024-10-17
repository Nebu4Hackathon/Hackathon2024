import requests
import csv
from io import StringIO
from sqlalchemy.orm import Session
import logging

from crud.activityInsert import insert_activity
from model.activityModel import activity_table
from utils.apiEndpoints_utils import ENDPOINTS, filter_activity_data

# Configure logging
logging.basicConfig(level=logging.INFO)


def fetch_csv_data(url: str) -> list[dict]:
    """Fetches CSV data from a given URL and returns it as a list of dictionaries."""
    response = requests.get(url)
    response.raise_for_status()  # Raise an error for bad status
    csv_data = StringIO(response.text)
    reader = csv.DictReader(csv_data)
    return list(reader)


def process_and_insert_data(db: Session):
    """Fetches data from multiple CSV endpoints and inserts it into the database."""
    for identifier in ENDPOINTS:
        csv_url = f"https://www.data.gouv.fr/fr/datasets/r/{{{identifier}}}"  # Construct the URL

        try:
            # Fetch the CSV data
            activities = fetch_csv_data(csv_url)

            # Process and filter data
            filtered_activities = [filter_activity_data(activity_data) for activity_data in activities]

            # Bulk insert into the database
            db.execute(activity_table.insert(), filtered_activities)  # Bulk insert
            db.commit()  # Commit after bulk insert
            logging.info(f"Inserted {len(filtered_activities)} activities for identifier {identifier}")

        except Exception as e:
            logging.error(f"Error processing data for identifier {identifier}: {e}")
