from sqlalchemy.orm import Session
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)


# General function to insert data into a database table
def insert_data_in_batches(db: Session, table, data: list, batch_size: int = 10000):
    """
    Insert data into a specified database table in batches for efficiency.

    Args:
    - db: SQLAlchemy database session.
    - table: SQLAlchemy table object where data should be inserted.
    - data: List of dictionaries (each representing a row) to be inserted.
    - batch_size: Number of rows to insert at a time (default: 1000).
    """
    total_rows = len(data)
    logging.info(f"Starting to insert {total_rows} rows into the database.")

    for i in range(0, total_rows, batch_size):
        batch = data[i:i + batch_size]
        db.execute(table.insert().values(batch))
        # Log the progress
        logging.info(f"Inserted rows {i + 1} to {min(i + batch_size, total_rows)} out of {total_rows}.")

    db.commit()
    logging.info("Data insertion complete.")
