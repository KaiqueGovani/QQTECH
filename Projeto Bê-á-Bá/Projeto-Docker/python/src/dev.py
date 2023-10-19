from bucket_util import *


filedir = ""  # ! posteriormente será ./uploads/
filename = "csv_correto.csv"
id_template = 2

# Função para verificar se o nome das colunas do arquivo é igual ao nome dos campos do template e também se são a mesma quantidade
def verificar_nome_colunas(df, campos) -> str:
    """Verifica se o nome das colunas do dataframe é igual ao nome dos campos do template e também se são a mesma quantidade

    Raise Exception se for diferente

    Args:
        df (dataframe): DataFrame do Arquivo
        campos (campo): Array dos objetos de campos do template

    """

    try:
        # Verificar primeiro se o número de colunas é igual ao número de campos
        if len(campos) != len(df.columns.values):
            raise Exception(
                "Número de colunas do arquivo é diferente do número de campos do template"
            )

        # Verificar se o nome das colunas é igual ao nome dos campos
        for i in range(len(campos)):
            if (
                campos[i]["nome_campo"] != df.columns.values[i]
            ):  # Se o nome dos campos for diferente do esperado
                raise Exception(
                    f"Nome da coluna {df.columns.values[i]} é diferente do nome do campo {campos[i]['nome_campo']}"
                )

        print("verificarNomeColunas OK")  # ! Remover
        return "OK"

    except Exception as e:
        print("Erro ao verificar nome das colunas", e)  # ! Remover
        raise Exception("Erro ao verificar nome das colunas", e)


# Funçao para verificar se o arquivo tem uma extensão válida
def verificar_extensão(filename, extensao):
    """Verifica se o arquivo tem a extensão esperada"""
    try:
        if filename == "":
            raise Exception("Arquivo sem nome.")

        if not arquivo_permitido(filename):
            raise Exception(
                f"Extensão não permitida: {filename.rsplit('.', 1)[1].lower()}"
            )

        if not filename.endswith(extensao):
            raise Exception(
                f"Extensão não incompatível: {filename.rsplit('.', 1)[1].lower()}"
            )
            
        print("verificarExtensão OK")  # ! Remover

    except Exception as error:
        raise Exception("Erro ao verificar extensão do arquivo:", error)





def verificar_arquivo(filepath, id_template):
    # Obter informações do template e desempacotar
    info = obter_info_template(id_template)
    template_id, id_criador, extensao, campos = (
        info["template_id"],
        info["id_criador"],
        info["extensao"],
        info["campos"],
    )
    campos.sort(
        key=lambda x: x["ordem"]
    )  # Garantir que os campos estão ordenados pela ordem
    
    df = converterParaDataFrame(filepath)
    
    verificar_extensão(filepath, extensao)
    verificar_nome_colunas(df, campos)
    
verificar_arquivo(filedir + filename, id_template)
