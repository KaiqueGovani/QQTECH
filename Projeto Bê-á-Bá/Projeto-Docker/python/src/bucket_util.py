import json
import pandas as pd
import os
import psycopg2


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

    if not os.path.exists("uploads"):
        os.makedirs("uploads")
    return


# Função que salva o arquivo na pasta uploads
def salvar_uploads(file):
    """Salva o arquivo na pasta uploads"""

    criar_pasta_uploads()  # cria a pasta de uploads caso não exista
    file.save(
        os.path.join("uploads", file.filename)
    )  # Salva o arquivo na pasta uploads
    return


# Função que lê o arquivo de configuração
def ler_config():
    try:
        with open("../config/config.json", "r") as config_file:
            config = json.load(config_file)

        return config

    except FileNotFoundError:
        raise Exception("Arquivo de configuração não encontrado")
    except json.JSONDecodeError:
        raise Exception("Arquivo de configuração inválido")
    except Exception as error:
        raise Exception("Erro ao ler o arquivo de configuração:", error)


# Função que conecta ao banco de dados
def conectar_banco():
    """Conecta ao banco de dados"""

    config = ler_config()

    # Usa a configuração para conectar ao banco de dados
    try:
        connection = psycopg2.connect(
            dbname=config["database"],
            user=config["user"],
            password=config["password"],
            host=config["host"],
        )

        cursor = connection.cursor()
        return connection, cursor

    except psycopg2.Error as error:
        if connection:
            connection.close()

        raise Exception("Erro ao conectar ao banco via psycopg2:", error)


# Função que obtém os tipos de dados do banco
def obter_tipos():
    """Obtém os tipos de dados do banco"""
    conn, cur = conectar_banco()

    cur.execute("SELECT * FROM tipos ORDER BY id")

    resultado = cur.fetchall()

    return resultado


# Função que obtém os tipos de dados do banco em um dicionário
def obter_tipos_map():
    """Obtém os tipos de dados do banco em um dicionário"""
    tipos = obter_tipos()
    tipoMap = {}
    for tipo in tipos:
        tipoMap[tipo[0]] = tipo[1], tipo[2]

    return tipoMap


#
def obter_info_template(id):
    """Obtém as informações do template id em um objeto"""

    try:
        conn, cur = conectar_banco()

        cur.execute(
            f"""
                SELECT 
                        t.id AS template_id,
                        t.nome AS template_nome,
                        t.id_criador,
                        t.extensao,
                        json_agg(json_build_object(
                            'ordem', tc.ordem,
                            'nome_campo', tc.nome_campo,
                            'anulavel', tc.anulavel
                        )) AS campos
                    FROM
                        public.template t
                    JOIN
                        public.templatescampos tc ON t.id = tc.id_template
                    WHERE
                        t.id = {id}
                    GROUP BY
                        t.id, t.nome, t.id_criador, t.extensao
                    """
        )

        resultado = cur.fetchone()

        if resultado:
            resultado = dict(zip([desc[0] for desc in cur.description], resultado))
            return resultado
        else:
            raise Exception(f"Template com id {id} não encontrado")

    except Exception as error:
        raise Exception("Erro ao obter campos do template:", error)


# Função que obtém os tipos de dados do banco em um dicionário
def converterParaDataFrame(file):
    """Converte o arquivo csv, xls ou xlsx para um dataframe"""

    if file.endswith(".csv"):
        return pd.read_csv(file)
    elif file.endswith(".xls"):
        return pd.read_excel(file)
    elif file.endswith(".xlsx"):
        return pd.read_excel(file)
