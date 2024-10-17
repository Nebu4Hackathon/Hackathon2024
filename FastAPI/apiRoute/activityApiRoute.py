import requests
import csv
from io import StringIO
from sqlalchemy.orm import Session
import logging

from crud.activityInsert import insert_activity
from model.activityModel import activity_table
from utils.apiEndpoints_utils import ENDPOINTS, filter_activity_data

# Configuration du journal (logging)
logging.basicConfig(level=logging.INFO)


def fetch_csv_data(url: str) -> list[dict]:
    """
    Récupère les données CSV à partir d'une URL donnée et les renvoie sous forme d'une liste de dictionnaires.

    :param url: L'URL du fichier CSV à récupérer.
    :return: Une liste de dictionnaires représentant les lignes du fichier CSV.
    :raises HTTPError: Si une erreur HTTP est rencontrée lors de la requête.
    """
    # Effectuer la requête HTTP pour obtenir les données CSV
    response = requests.get(url)

    # Lever une exception en cas de statut HTTP invalide
    response.raise_for_status()

    # Convertir les données textuelles en objet StringIO pour permettre la lecture CSV
    csv_data = StringIO(response.text)

    # Créer un lecteur CSV et transformer les données en liste de dictionnaires
    reader = csv.DictReader(csv_data)

    # Retourner la liste des données CSV sous forme de dictionnaires
    return list(reader)


def process_and_insert_data(db: Session):
    """
    Récupère les données de plusieurs points de terminaison CSV et les insère dans la base de données.

    Cette fonction parcourt plusieurs points de terminaison définis dans ENDPOINTS, récupère les données,
    les filtre et les insère en masse dans la base de données.

    :param db: Session de base de données SQLAlchemy utilisée pour insérer les données.
    """
    # Parcourir chaque identifiant dans ENDPOINTS pour construire l'URL et traiter les données
    for identifier in ENDPOINTS:
        # Construction de l'URL du CSV à partir de l'identifiant
        csv_url = f"https://www.data.gouv.fr/fr/datasets/r/{{{identifier}}}"

        try:
            # Récupérer les données du CSV
            activities = fetch_csv_data(csv_url)

            # Filtrer et traiter les données à l'aide d'une fonction personnalisée
            filtered_activities = [filter_activity_data(activity_data) for activity_data in activities]

            # Insertion en masse des données filtrées dans la base de données
            db.execute(activity_table.insert(), filtered_activities)

            # Valider la transaction après l'insertion
            db.commit()

            # Journaliser le succès de l'insertion
            logging.info(f"Inséré {len(filtered_activities)} activités pour l'identifiant {identifier}")

        except Exception as e:
            # En cas d'erreur, journaliser l'exception avec le niveau d'erreur
            logging.error(f"Erreur lors du traitement des données pour l'identifiant {identifier}: {e}")
