# Função para pegar o nome do bucket
def getBucketName():
    with open('./bucket-name.txt', "r") as f:
        return f.read()
