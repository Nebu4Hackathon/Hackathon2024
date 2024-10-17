from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

from models.associationModel import metadata as association_metadata
from models.festivalModel import metadata as festival_metadata
from models.mortaliteModel import metadata as mortalite_metadata

DATABASE_URL = "mysql+mysqlconnector://root:@localhost:3306/hackathon_2023"

# Création MySql Engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Create tables if they don't exist
def init_db():
    # Create all tables defined in the metadata
    association_metadata.create_all(bind=engine)
    festival_metadata.create_all(bind=engine)
    mortalite_metadata.create_all(bind=engine)


# Dépendance pour la création bdd
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
