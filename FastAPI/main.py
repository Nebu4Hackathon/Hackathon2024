from fastapi import FastAPI, Depends
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session

from apiRoute.activityApiRoute import process_and_insert_data
from crud.activityInsert import get_all_activities
from db.database import get_db, init_db

# Define FastAPI app
app = FastAPI()

# Create a scheduler
scheduler = BackgroundScheduler()


# Initialize the database
@app.on_event("startup")
def startup_event():
    init_db()
    # Schedule the task to run once a month on the first day at midnight
    scheduler.add_job(fetch_and_insert_data_task, 'cron', day=18, hour=9, minute=14)
    scheduler.start()


@app.on_event("shutdown")
def shutdown_event():
    """Shutdown the scheduler when the FastAPI app is shutting down."""
    scheduler.shutdown()


# Define the periodic task
def fetch_and_insert_data_task():
    db: Session = next(get_db())
    process_and_insert_data(db)


# Fetch all activities
@app.get("/activities")
def get_activities(db: Session = Depends(get_db)):
    activities = get_all_activities(db)
    return activities