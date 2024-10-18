from fastapi import FastAPI, Depends
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session

from apiRoute.activity_api_route import process_and_insert_data
from crud.activity_insert import get_all_activities
from db.database import get_db, init_db

# Définition de l'application FastAPI
app = FastAPI()

# Création d'un planificateur de tâches en arrière-plan
scheduler = BackgroundScheduler()


# Initialisation de la base de données au démarrage de l'application
@app.on_event("startup")
def startup_event():
    """
    Événement qui se déclenche au démarrage de l'application FastAPI.
    Initialise la base de données et planifie une tâche récurrente pour
    récupérer et insérer des données.
    """
    init_db()  # Crée les tables dans la base de données si elles n'existent pas
    # Planifier une tâche pour exécuter chaque 17 du mois à 23h34
    scheduler.add_job(fetch_and_insert_data_task, 'cron', day=18, hour=00, minute=30)
    scheduler.start()  # Démarre le planificateur


# Arrêt du planificateur lors de la fermeture de l'application
@app.on_event("shutdown")
def shutdown_event():
    """
    Événement qui se déclenche à la fermeture de l'application FastAPI.
    Arrête le planificateur de tâches.
    """
    scheduler.shutdown()  # Arrête proprement le planificateur de tâches


# Définition de la tâche périodique
def fetch_and_insert_data_task():
    """
    Tâche périodique qui récupère et insère des données dans la base de données.
    Cette tâche est exécutée automatiquement par le planificateur.
    """
    db: Session = next(get_db())  # Crée une session de base de données
    process_and_insert_data(db)   # Exécute le traitement et l'insertion des données


# Route HTTP GET pour récupérer toutes les activités
@app.get("/activities")
def get_activities(db: Session = Depends(get_db)):
    """
    Route API pour obtenir toutes les activités enregistrées dans la base de données.

    :param db: Dépendance qui injecte la session de base de données.
    :return: Liste de toutes les activités sous forme de dictionnaire.
    """
    activities = get_all_activities(db)  # Récupère toutes les activités depuis la base
    return activities  # Renvoie les activités sous forme de réponse JSON