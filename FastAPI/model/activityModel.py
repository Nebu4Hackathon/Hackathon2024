# activity_model.py
from sqlalchemy import MetaData, Table, Column, Integer, String, Text, Float

metadata = MetaData()

activity_table = Table(
    'activity',
    metadata,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('Nom_du_POI', String(128), nullable=True),
    Column('Categories_de_POI', Text, nullable=True),
    Column('Latitude', Float, nullable=True),
    Column('Longitude', Float, nullable=True),
    Column('Adresse_postale', String(255), nullable=True),
    Column('Code_Postal', String(10), nullable=True),  # New column for postal code
    Column('Commune', String(100), nullable=True),     # New column for commune
    Column('Createur_de_la_donnee', String(98), nullable=True),
    Column('SIT_diffuseur', String(118), nullable=True),
    Column('Date_de_mise_a_jour', String(10), nullable=True),
    Column('Contacts_du_POI', Text, nullable=True),
    Column('Classements_du_POI', Text, nullable=True),
    Column('Description', Text, nullable=True),
    Column('URI_ID_du_POI', String(68), nullable=True),
)
