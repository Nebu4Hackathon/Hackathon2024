# app/activityInsert.py
from sqlalchemy.orm import Session
from model.activityModel import activity_table

# Insert activities data into MySQL
def insert_activities(db: Session, data: list):
    for item in data:
        record = {
            'Nom_du_POI': item.get('Nom_du_POI'),
            'Categories_de_POI': item.get('Categories_de_POI'),
            'Latitude': item.get('Latitude'),
            'Longitude': item.get('Longitude'),
            'Adresse_postale': item.get('Adresse_postale'),
            'Code_postal_et_commune': item.get('Code_postal_et_commune'),
            'Createur_de_la_donnee': item.get('Createur_de_la_donnee'),
            'SIT_diffuseur': item.get('SIT_diffuseur'),
            'Date_de_mise_a_jour': item.get('Date_de_mise_a_jour'),
            'Contacts_du_POI': item.get('Contacts_du_POI'),
            'Classements_du_POI': item.get('Classements_du_POI'),
            'Description': item.get('Description'),
            'URI_ID_du_POI': item.get('URI_ID_du_POI')
        }
        db.execute(activity_table.insert().values(record))
    db.commit()
