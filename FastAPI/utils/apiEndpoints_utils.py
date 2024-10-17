import re

# Liste des identifiants des points de terminaison (endpoints) pour récupérer des données CSV par région ou département
ENDPOINTS = [
    "1ad4899d-fab3-4abd-8df7-025004902932",  # Tour
    "2b52bb1f-8676-43f2-b883-f673e7015ed9",  # Réunion
    "56d437a7-eb0c-4c31-9138-539be94bc490",  # Pays de la Loire
    "83a1f131-9e23-4c3b-b1c6-e58f33fe7b80",  # Provence-Alpes-Côte d'Azur
    "0c463ef6-c00a-48e2-b50a-d17cfe998b84",  # Occitanie
    "cb1ebc9c-73fb-43e8-9386-a7b3cf83a642",  # Normandie
    "734a4e86-d571-48f6-bdc0-596914066606",  # Nouvelle-Aquitaine
    "77114c00-9928-49c1-9a1c-5545c10c7101",  # Mayotte
    "4f95a530-d106-4ecd-aa39-1b9d639ee45c",  # Martinique
    "b31a1eca-f2ff-495a-9b67-7c0bc281ea57",  # Île-de-France
    "838b6af3-74e5-4d51-873d-d359af3f1855",  # Hauts-de-France
    "338bb298-cc1f-4bfd-adfd-a3c13fbfa393",  # Guyane française
    "f73506d6-a336-4743-827b-64a39d891158",  # Guadeloupe
    "59956d74-969b-4c42-8ea4-9348f6a70f7a",  # Grand Est
    "6063e108-f8bd-4541-ba67-a5cadac804fb",  # Centre-Val de Loire
    "2aefffc5-42f5-4e68-ba85-ba19c13fcb4c",  # Corse
    "ab746af8-d21a-42d1-acae-fdfb2e52ecd5",  # Bretagne
    "d92f0184-e9cb-4bc9-81b0-b43fbcf2a0d2",  # Bourgogne-Franche-Comté
    "5b3c2cee-44b7-48bd-b4e8-439a03ff6cd2",  # Auvergne-Rhône-Alpes
]

def extract_type(categories_de_poi: str) -> str:
    """
    Extrait le type principal d'activité à partir de la colonne 'categories_de_poi'.

    Cette fonction recherche les hashtags dans la chaîne de caractères de la colonne
    'categories_de_poi'. Elle ignore le hashtag '#PointOfInterest' s'il est présent.

    :param categories_de_poi: Chaîne de caractères contenant les catégories du POI.
    :return: Le premier type valide trouvé (sans le '#') ou None s'il n'y en a pas.
    """
    # Rechercher tous les hashtags dans la chaîne de caractères
    types = re.findall(r'#\w+', categories_de_poi)

    # Filtrer pour ignorer '#PointOfInterest' et retourner le premier type valide
    valid_types = [type_ for type_ in types if type_.lower() != '#pointofinterest']

    # Retourner le premier type valide (sans le '#'), ou None si aucun type valide n'est trouvé
    if valid_types:
        return valid_types[0][1:]  # Supprimer le '#' et retourner le type

    return None  # Aucun type valide trouvé


def filter_activity_data(activity_data: dict) -> dict:
    """
    Filtre les données d'activité pour n'inclure que les colonnes valides,
    divise le code postal et la commune, et extrait le type.

    Cette fonction prend en entrée les données brutes d'une activité et renvoie
    un dictionnaire avec des clés correspondant aux colonnes valides de la base de données.

    :param activity_data: Dictionnaire contenant les données brutes de l'activité.
    :return: Dictionnaire contenant uniquement les données filtrées et formatées.
    """
    # Définition des colonnes valides qui seront mappées vers les noms des colonnes en base de données
    VALID_COLUMNS = {
        'Nom_du_POI': 'nom_du_poi',
        'Categories_de_POI': 'categories_de_poi',
        'Latitude': 'latitude',
        'Longitude': 'longitude',
        'Adresse_postale': 'adresse_postale',
        'Createur_de_la_donnee': 'createur_de_la_donnee',
        'SIT_diffuseur': 'sit_diffuseur',
        'Date_de_mise_a_jour': 'date_de_mise_a_jour',
        'Contacts_du_POI': 'contacts_du_poi',
        'Classements_du_POI': 'classements_du_poi',
        'Description': 'description',
        'URI_ID_du_POI': 'uri_id_du_poi',
    }

    filtered_data = {}

    # Filtrer et mapper les colonnes valides dans le dictionnaire 'filtered_data'
    for original_key, mapped_key in VALID_COLUMNS.items():
        if original_key in activity_data:
            filtered_data[mapped_key] = activity_data[original_key]

    # Diviser le code postal et la commune si disponibles
    if 'Code_postal_et_commune' in activity_data:
        try:
            # Diviser la chaîne en code postal et commune
            code_postal, commune = activity_data['Code_postal_et_commune'].split('#', 1)
            filtered_data['code_postal'] = code_postal.strip()  # Supprimer les espaces blancs
            filtered_data['commune'] = commune.strip()          # Supprimer les espaces blancs
        except ValueError:
            # Gestion des erreurs si le format est incorrect
            filtered_data['code_postal'] = None
            filtered_data['commune'] = None
    else:
        # Si aucune donnée de code postal/commune n'est présente
        filtered_data['code_postal'] = None
        filtered_data['commune'] = None

    # Extraire le type d'activité à partir des catégories
    if 'Categories_de_POI' in activity_data:
        filtered_data['type'] = extract_type(activity_data['Categories_de_POI'])
    else:
        filtered_data['type'] = None

    return filtered_data
