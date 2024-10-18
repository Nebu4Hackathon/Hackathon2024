from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

from model.activityModel import metadata

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

# Récupérer l'URL de connexion à MySQL depuis le fichier .env
DATABASE_URL = os.getenv('DATABASE_URL')

# Créer un moteur MySQL avec pool de connexions et options de recyclage pour Laragon MySQL
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,  # Vérifie la connexion avant de l'utiliser pour éviter les connexions défectueuses
    pool_recycle=3600,   # Recycle les connexions après 1 heure pour éviter les déconnexions inactives
)

# Session Local : Configuration de la session de base de données
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Créer toutes les tables en utilisant le metadata
def init_db():
    """
    Initialise la base de données.

    Cette fonction crée toutes les tables définies dans le modèle (activityModel)
    en utilisant le metadata et le moteur de base de données.
    """
    # Créer toutes les tables qui n'existent pas encore
    metadata.create_all(bind=engine)


# Dépendance pour obtenir une session de base de données
def get_db():
    """
    Génère une session de base de données.

    Cette fonction est utilisée comme dépendance pour fournir une session de base de données
    à partir de `SessionLocal`. La session est fermée automatiquement après utilisation.

    :yield: Session de base de données SQLAlchemy.
    """
    # Ouvrir une session de base de données
    db = SessionLocal()
    try:
        # La session est fournie tant que la fonction est appelée
        yield db
    finally:
        # Fermer la session après utilisation
        db.close()