# activityInsert.py
from sqlalchemy.orm import Session
from model.activityModel import activity_table


# Insert activities data into MySQL
def insert_activities(db: Session, raw_data: list):
    for row in raw_data:
        # Split "Code_postal_et_commune" into "Code_postal" and "commune"
        code_postal_et_commune = row.get('Code_postal_et_commune', '')

        # Split on '#' character; use default values if splitting fails
        if code_postal_et_commune:
            parts = code_postal_et_commune.split('#', 1)  # Limit splits to 1 for two parts
            code_postal = parts[0]  # First part
            commune = parts[1] if len(parts) > 1 else None  # Second part or None if not present
        else:
            code_postal, commune = None, None  # Default values if the field is empty

        record = {
            'Nom_du_POI': row.get('Nom_du_POI'),
            'Categories_de_POI': row.get('Categories_de_POI'),
            'Latitude': float(row.get('Latitude')) if row.get('Latitude') else None,
            'Longitude': float(row.get('Longitude')) if row.get('Longitude') else None,
            'Adresse_postale': row.get('Adresse_postale'),
            'Code_Postal': code_postal,  # Use the new column for postal code
            'Commune': commune,  # Use the new column for commune
            'Createur_de_la_donnee': row.get('Createur_de_la_donnee'),
            'SIT_diffuseur': row.get('SIT_diffuseur'),
            'Date_de_mise_a_jour': row.get('Date_de_mise_a_jour'),
            'Contacts_du_POI': row.get('Contacts_du_POI'),
            'Classements_du_POI': row.get('Classements_du_POI'),
            'Description': row.get('Description'),
            'URI_ID_du_POI': row.get('URI_ID_du_POI')
        }
        db.execute(activity_table.insert().values(record))
    db.commit()
