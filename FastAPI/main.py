# main.py
from fastapi import FastAPI
from apiRoute import activityApiRoute  # Only import the activity API route
from db.database import init_db  # Import the database initialization function

# Instantiate FastAPI app
app = FastAPI()

# Initialize the database
init_db()

# Include the activity router
app.include_router(activityApiRoute.router, prefix="/activities", tags=["activities"])
