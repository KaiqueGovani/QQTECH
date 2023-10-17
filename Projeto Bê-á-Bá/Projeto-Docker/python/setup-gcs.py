from time import gmtime, strftime

def run_storage_setup():
    # Importa o cliente do storage da biblioteca do google cloud
    from google.cloud import storage

    # Instancia um cliente do storage com as credenciais do GCP
    storage_client = storage.Client.from_service_account_json("credentials.json")

    # Nome para seu bucket do GCS
    bucket_name = "vallidator-" + strftime("%Y%m%d%H%M%S", gmtime()) # 

    # Cria o bucket
    bucket = storage_client.create_bucket(bucket_name, location="us-central1")

    print(f"Bucket {bucket.name} created.")

    # Cria um arquivo para salvar o nome do bucket
    with open("./src/bucket-name.txt", "w") as f:
        f.write(bucket.name)
    
    print(f"Bucket name saved to bucket-name.txt.")

if __name__ == "__main__":
    run_storage_setup()
