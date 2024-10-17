from enum import Enum
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db  # Adjust the import based on your project structure
from crud.mortaliteInsert import insert_mortalite  # Adjust the import based on your project structure
from httpx import AsyncClient

router = APIRouter()


class SexFilter(str, Enum):
    male = "males"
    female = "females"


class AgeGroup(str, Enum):
    less_than_one = "< 1"
    one_to_twenty_four = "1-24"
    twenty_five_to_thirty_four = "25-34"
    thirty_five_to_fourty_four = "35-44"
    forty_five_to_fifty_four = "45-54"
    fifty_five_to_sixty_four = "55-64"
    sixty_five_to_seventy_four = "65-74"
    seventy_five_to_eighty_four = "75-84"
    eighty_five_to_ninety_four = "85-94"
    ninety_five_plus = "95p"
