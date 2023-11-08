from bucket_util import *


filedir = "uploads/"  # ! em prod seria uploads/
filename = "relatório-pessoal_2023-11-05_19-17-54.csv"
id_template = 2


upload_blob(pegar_nome_bucket(), filedir + filename, filename)

