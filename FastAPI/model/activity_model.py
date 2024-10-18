from sqlalchemy import MetaData, Table, Column, Integer, String, Text, Float, DATE

# Créer un objet MetaData pour regrouper toutes les métadonnées des tables de la base de données
metadata = MetaData()

# Définition de la table 'activity' dans la base de données
activity_table = Table(
    'activity',  # Nom de la table
    metadata,    # Métadonnées associées
    Column('id', Integer, primary_key=True, autoincrement=True),  # Clé primaire, auto-incrémentée
    Column('nom_du_poi', String(255), nullable=True),  # Nom du point d'intérêt (POI)
    Column('categories_de_poi', Text, nullable=True),  # Catégories du POI
    Column('latitude', Float, nullable=True),          # Latitude géographique du POI
    Column('longitude', Float, nullable=True),         # Longitude géographique du POI
    Column('adresse_postale', Text, nullable=True),    # Adresse postale complète du POI
    Column('code_postal', String(15), nullable=True),  # Code postal du POI
    Column('commune', String(255), nullable=True),     # Nom de la commune où se situe le POI
    Column('createur_de_la_donnee', String(255), nullable=True),  # Créateur de la donnée sur le POI
    Column('sit_diffuseur', String(255), nullable=True),  # Site diffuseur de la donnée
    Column('date_de_mise_a_jour', DATE, nullable=True),   # Date de dernière mise à jour de la donnée
    Column('contacts_du_poi', Text, nullable=True),       # Informations de contact du POI
    Column('classements_du_poi', Text, nullable=True),    # Classements attribués au POI (ex : monuments historiques)
    Column('description', Text, nullable=True),           # Description détaillée du POI
    Column('uri_id_du_poi', String(255), nullable=True),  # URI ou identifiant unique du POI
    Column('type', String(255), nullable=True)            # Type du POI (par exemple : musée, parc, etc.)
)
