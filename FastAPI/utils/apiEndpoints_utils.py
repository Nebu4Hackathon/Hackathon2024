import re

ENDPOINTS = [
    "1ad4899d-fab3-4abd-8df7-025004902932", # tour
    "2b52bb1f-8676-43f2-b883-f673e7015ed9",  # réunion
    "56d437a7-eb0c-4c31-9138-539be94bc490",  # pdl
    "83a1f131-9e23-4c3b-b1c6-e58f33fe7b80",  # pac
    "0c463ef6-c00a-48e2-b50a-d17cfe998b84",  # occitanie
    "cb1ebc9c-73fb-43e8-9386-a7b3cf83a642",  # nor
    "734a4e86-d571-48f6-bdc0-596914066606",  # naq
    "77114c00-9928-49c1-9a1c-5545c10c7101",  # myt
    "4f95a530-d106-4ecd-aa39-1b9d639ee45c",  # mtq
    "b31a1eca-f2ff-495a-9b67-7c0bc281ea57",  # idf
    "838b6af3-74e5-4d51-873d-d359af3f1855",  # hdf
    "338bb298-cc1f-4bfd-adfd-a3c13fbfa393",  # guf
    "f73506d6-a336-4743-827b-64a39d891158",  # glp
    "59956d74-969b-4c42-8ea4-9348f6a70f7a",  # gde
    "6063e108-f8bd-4541-ba67-a5cadac804fb",  # cvl
    "2aefffc5-42f5-4e68-ba85-ba19c13fcb4c",  # cor
    "ab746af8-d21a-42d1-acae-fdfb2e52ecd5",  # bre
    "d92f0184-e9cb-4bc9-81b0-b43fbcf2a0d2",  # bfc
    "5b3c2cee-44b7-48bd-b4e8-439a03ff6cd2",  # ara
]


import re

def extract_type(categories_de_poi: str) -> str:
    """
    Extracts the main type of activity from the categories_de_poi column.
    Ignores '#PointOfInterest' if it appears in the categories.
    """
    # Find all hashtags in the categories_de_poi string
    types = re.findall(r'#\w+', categories_de_poi)

    # Filter out 'PointOfInterest' and return the first valid type
    valid_types = [type_ for type_ in types if type_.lower() != '#pointofinterest']

    # Return the first valid type (without '#'), or None if no valid types are found
    if valid_types:
        return valid_types[0][1:]  # Remove the leading '#' and return

    return None  # Default if no valid type is found



def filter_activity_data(activity_data: dict) -> dict:
    """Filters the activity data to only include valid columns, splits postal code/commune, and extracts type."""

    # Define valid columns that map to the lowercase names in the database
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

    # Filter and map valid columns
    for original_key, mapped_key in VALID_COLUMNS.items():
        if original_key in activity_data:
            filtered_data[mapped_key] = activity_data[original_key]

    # Split the postal code and commune if available
    if 'Code_postal_et_commune' in activity_data:
        try:
            code_postal, commune = activity_data['Code_postal_et_commune'].split('#', 1)
            filtered_data['code_postal'] = code_postal.strip()  # Strip whitespace
            filtered_data['commune'] = commune.strip()  # Strip whitespace
        except ValueError:
            filtered_data['code_postal'] = None
            filtered_data['commune'] = None
    else:
        filtered_data['code_postal'] = None
        filtered_data['commune'] = None

    # Extract "type" from Categories_de_POI and add it to filtered_data
    if 'Categories_de_POI' in activity_data:
        filtered_data['type'] = extract_type(activity_data['Categories_de_POI'])
    else:
        filtered_data['type'] = None

    return filtered_data