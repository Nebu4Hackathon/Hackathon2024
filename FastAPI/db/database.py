#database.py
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

from model.activityModel import metadata as activity_metadata  # Only import activity metadata

# Update the database URL to PostgreSQL
DATABASE_URL = "postgresql://postgres:0000@localhost:5432/tourism"

# Create PostgreSQL engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Create tables if they don't exist
def init_db():
    # Create all tables defined in the activity metadata
    activity_metadata.create_all(bind=engine)


# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
