from sqlalchemy import insert, select
from sqlalchemy.orm import Session

from model.activityModel import activity_table


def insert_activity(db: Session, activity_data: dict):
    """
    Insère une activité dans la base de données.

    Cette fonction prend un dictionnaire contenant les données d'une activité et les insère dans la table des activités.
    Après l'insertion, la transaction est validée (commit).

    :param db: Session de base de données SQLAlchemy.
    :param activity_data: Dictionnaire contenant les données de l'activité à insérer.
    """
    # Créer une requête d'insertion pour insérer les données dans la table des activités
    query = insert(activity_table).values(activity_data)

    # Exécuter la requête d'insertion dans la base de données
    db.execute(query)

    # Valider la transaction pour enregistrer l'insertion
    db.commit()


# Récupérer toutes les activités
def get_all_activities(db: Session):
    """
    Récupère toutes les activités depuis la base de données.

    Cette fonction effectue une sélection de toutes les entrées de la table des activités
    et retourne l'ensemble des résultats sous forme de liste.

    :param db: Session de base de données SQLAlchemy.
    :return: Liste de toutes les activités présentes dans la table.
    """
    # Créer une requête de sélection pour récupérer toutes les activités
    query = select([activity_table])

    # Exécuter la requête de sélection dans la base de données
    result = db.execute(query)

    # Récupérer et retourner tous les résultats sous forme de liste
    return result.fetchall()
