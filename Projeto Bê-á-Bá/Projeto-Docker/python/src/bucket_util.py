# Função para pegar o nome do bucket
def pegar_nome_bucker():
    """Pega o nome do bucket"""
    with open("./bucket-name.txt", "r") as f:
        return f.read()


# Funçao para verificar se o arquivo tem uma extensão válida
def arquivo_permitido(filename):
    """Verifica se o arquivo tem uma extensão válida"""
    ext = filename.rsplit(".", 1)[1].lower()  # pega a extensão do arquivo
    if ext in ["csv", "xlsx", "xls"]:
        return True
    else:
        return False


# Função que cria a pasta de uploads caso não exista
def criar_pasta_uploads():
    """Cria a pasta de uploads caso não exista"""
    import os

    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    return


# Função que salva o arquivo na pasta uploads
def salvar_uploads(file):
    """Salva o arquivo na pasta uploads"""
    import os

    criar_pasta_uploads()  # cria a pasta de uploads caso não exista
    file.save(
        os.path.join("uploads", file.filename)
    )  # Salva o arquivo na pasta uploads
    return
