# activity_model.py
from sqlalchemy import MetaData, Table, Column, Integer, String, Text, Float, DATE

metadata = MetaData()

activity_table = Table(
    'activity',
    metadata,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('nom_du_poi', String(255), nullable=True),
    Column('categories_de_poi', Text, nullable=True),
    Column('latitude', Float, nullable=True),
    Column('longitude', Float, nullable=True),
    Column('adresse_postale', Text, nullable=True),
    Column('code_postal', String(15), nullable=True),  # New column for postal code
    Column('commune', String(255), nullable=True),      # New column for commune
    Column('createur_de_la_donnee', String(255), nullable=True),
    Column('sit_diffuseur', String(255), nullable=True),
    Column('date_de_mise_a_jour', DATE, nullable=True),
    Column('contacts_du_poi', Text, nullable=True),
    Column('classements_du_poi', Text, nullable=True),
    Column('description', Text, nullable=True),
    Column('uri_id_du_poi', String(255), nullable=True),
    Column('type', String(255), nullable=True)
)
