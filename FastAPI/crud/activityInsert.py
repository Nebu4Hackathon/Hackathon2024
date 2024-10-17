from sqlalchemy import insert, select
from sqlalchemy.orm import Session

from model.activityModel import activity_table


def insert_activity(db: Session, activity_data: dict):
    query = insert(activity_table).values(activity_data)
    db.execute(query)
    db.commit()


# Fetch all activities
def get_all_activities(db: Session):
    query = select([activity_table])
    result = db.execute(query)
    return result.fetchall()
