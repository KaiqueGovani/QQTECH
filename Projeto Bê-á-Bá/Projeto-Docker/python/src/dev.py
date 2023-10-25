from bucket_util import *


filedir = "uploads/"  # ! em prod seria uploads/
filename = "csv_correto_2023-10-24_13-08-49.csv"
id_template = 2


upload_blob(pegar_nome_bucket(), filedir + filename, filename)

