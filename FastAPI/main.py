from fastapi import FastAPI, Depends
from fastapi_utils.tasks import repeat_every
from sqlalchemy.orm import Session

from apiRoute.activityApiRoute import process_and_insert_data
from crud.activityInsert import get_all_activities
from db.database import get_db, init_db

# Define FastAPI app
app = FastAPI()


# Initialize the database
@app.on_event("startup")
def startup_event():
    init_db()


# Insert data periodically (adjust the interval as needed)
@app.on_event("startup")
@repeat_every(seconds=3600)  # Run every hour
def fetch_and_insert_data_task():
    db: Session = next(get_db())
    process_and_insert_data(db)


# Fetch all activities
@app.get("/activities")
def get_activities(db: Session = Depends(get_db)):
    activities = get_all_activities(db)
    return activities
