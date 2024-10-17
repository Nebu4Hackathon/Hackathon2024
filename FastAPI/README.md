Gestion d'Activités - FastAPI

Ce projet est une API basée sur FastAPI qui gère des données d'activités extraites de plusieurs points de terminaison CSV, les insère dans une base de données MySQL et offre une interface pour récupérer ces données via des routes HTTP. Un planificateur en arrière-plan est également configuré pour automatiser la collecte et l'insertion des données.
Prérequis

Avant de démarrer, assurez-vous d'avoir les outils suivants installés sur votre machine :

    Python 3.7+
    MySQL
    pip pour installer les dépendances
    FastAPI et Uvicorn pour exécuter l'API
    SQLAlchemy pour l'interaction avec la base de données
    APScheduler pour planifier des tâches
    dotenv pour gérer les variables d'environnement

Installation

    Clonez ce dépôt :

    bash

git clone https://github.com/votre-utilisateur/gestion-activites.git

Accédez au répertoire du projet :

bash

cd gestion-activites

Créez un environnement virtuel et activez-le :

bash

python -m venv env
source env/bin/activate  # Sur Windows: env\Scripts\activate

Installez les dépendances nécessaires :

bash

pip install -r requirements.txt

Configurez votre fichier .env pour contenir l'URL de connexion à votre base de données MySQL. Créez un fichier .env à la racine du projet et ajoutez-y les lignes suivantes :

bash

    DATABASE_URL=mysql+pymysql://utilisateur:motdepasse@localhost/nom_de_la_base_de_donnees

Démarrage du projet

    Assurez-vous que MySQL est en cours d'exécution et que la base de données spécifiée dans le fichier .env est créée.

    Initialisez la base de données en exécutant le script init_db :

    bash

    uvicorn main:app --reload

    Ce script créera automatiquement les tables définies dans le modèle de données.

    L'API est maintenant disponible à l'adresse http://127.0.0.1:8000.

Fonctionnalités
1. Planificateur de Tâches

Le planificateur en arrière-plan récupère et insère des données depuis plusieurs points de terminaison CSV le 17 de chaque mois à 23h34. Cette tâche est définie dans le fichier main.py et utilise APScheduler.
2. Récupération des Activités

Vous pouvez récupérer toutes les activités via la route suivante :

bash

GET /activities

Cette route retourne une liste d'activités sous forme de JSON.
3. Insertion Automatique des Données

Les données provenant de différents points de terminaison CSV (spécifiés dans utils/apiEndpoints_utils.py) sont filtrées et insérées en masse dans la base de données.
Structure du Projet

bash

.
├── apiRoute/
│   └── activityApiRoute.py       # Logique pour traiter les données CSV et les insérer dans la DB
├── crud/
│   └── activityInsert.py         # Fonctions CRUD pour interagir avec la DB
├── db/
│   └── database.py               # Configuration de la base de données et de la session
├── model/
│   └── activityModel.py          # Définition du modèle de données pour les activités
├── utils/
│   └── apiEndpoints_utils.py     # Points de terminaison et fonctions utilitaires
├── .env                          # Variables d'environnement (non incluses dans le repo)
├── main.py                       # Fichier principal pour démarrer l'application FastAPI
└── requirements.txt              # Liste des dépendances

Dépendances

    FastAPI : Framework web rapide pour construire des APIs.
    Uvicorn : Serveur ASGI pour exécuter FastAPI.
    SQLAlchemy : ORM pour interagir avec la base de données MySQL.
    APScheduler : Librairie pour planifier des tâches en arrière-plan.
    requests : Pour effectuer des requêtes HTTP et récupérer des fichiers CSV.
    dotenv : Pour gérer les variables d'environnement.

Comment Contribuer

    Forkez ce projet.
    Créez une branche pour vos fonctionnalités (git checkout -b ma-fonctionnalite).
    Commitez vos changements (git commit -am 'Ajout d'une fonctionnalité').
    Poussez votre branche (git push origin ma-fonctionnalite).
    Ouvrez une Pull Request.