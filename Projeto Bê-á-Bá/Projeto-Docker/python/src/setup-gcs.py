from time import gmtime, strftime
import os

def run_storage_setup():
    # Importa o cliente do storage da biblioteca do google cloud
    from google.cloud import storage

    # Instancia um cliente do storage com as credenciais do GCP
    storage_client = storage.Client.from_service_account_json("../config/credentials.json")

    # Checa se o cliente foi instanciado corretamente
    if not storage_client:
        print("Erro ao instanciar o cliente do storage.")
        return
    
    # Checa se o arquivo bucket-name.txt já existe
    if os.path.isfile("../bucket-name.txt"):
        print("Bucket já existe em bucket-name.txt.")
        return
    
    # Nome para seu bucket do GCS
    bucket_name = "vallidator-" + strftime("%Y%m%d%H%M%S", gmtime()) # 
    
    # Checa se o bucket com esse nome já existe
    if storage_client.lookup_bucket(bucket_name):
        print(f"Bucket {bucket_name} already exists.")
        return

    # Cria o bucket
    bucket = storage_client.create_bucket(bucket_name, location="us-central1")

    print(f"Bucket {bucket.name} created.")

    # Cria um arquivo para salvar o nome do bucket
    with open("/bucket-name.txt", "w") as f:
        f.write(bucket_name)
    
    print(f"Bucket name saved to bucket-name.txt.")

if __name__ == "__main__":
    run_storage_setup()
