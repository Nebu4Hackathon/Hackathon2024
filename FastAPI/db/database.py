from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

from model.activityModel import metadata

# Load environment variables from .env
load_dotenv()

# Get the MySQL connection URL from the .env file
DATABASE_URL = os.getenv('DATABASE_URL')

# Create a MySQL engine with connection pooling and recycle options for Laragon MySQL
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,  # Ensures SQLAlchemy checks the connection before using it
    pool_recycle=3600,  # Recycles connections after 1 hour to prevent idle disconnection
)

# Session Local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Create all tables using the metadata
def init_db():
    metadata.create_all(bind=engine)


# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
