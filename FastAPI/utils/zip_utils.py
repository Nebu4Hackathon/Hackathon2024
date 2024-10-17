import zipfile
import io
import pandas as pd
from httpx import AsyncClient


# General function to fetch a ZIP file from any URL
async def fetch_zip_file(url: str):
    async with AsyncClient() as client:
        response = await client.get(url)
        zip_file = zipfile.ZipFile(io.BytesIO(response.content))
        return zip_file


# General function to extract CSV data from a ZIP file
async def extract_csv_from_zip(zip_file: zipfile.ZipFile):
    data = []
    total_files = len(zip_file.namelist())
    processed_files = 0

    for file_name in zip_file.namelist():
        if file_name.endswith('.csv'):
            processed_files += 1
            print(f"Processing file {processed_files}/{total_files}: {file_name}")

            with zip_file.open(file_name) as csv_file:
                # Read CSV file with pandas and handle NaN values
                df = pd.read_csv(csv_file, sep=';', engine='python')

                # Fill NaN values with appropriate defaults
                df.fillna('', inplace=True)  # You can customize this as needed

                # Process each row and display progress
                for index, row in df.iterrows():
                    # Here you can process the row as needed
                    data.append(row.to_dict())

                    # Optionally, display progress every 100 rows
                    if index % 100 == 0:
                        print(f"Processed {index + 1} rows from {file_name}")

    print(f"Completed processing of {processed_files} files.")
    return data
