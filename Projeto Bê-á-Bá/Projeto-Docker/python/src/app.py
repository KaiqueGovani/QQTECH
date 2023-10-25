from flask import Flask, request, jsonify
import os

from bucket_util import *  # importa todas as funções do bucket_util.py

app = Flask(__name__)


@app.route("/")
def hello_world():
    return 200


@app.route("/validar", methods=["POST"])
def validar():
    try:
        if not request.form["id_template"]:
            return {
                "mensagem": "id_template não enviado."
            }, 400  # retorna um json com uma mensagem de erro

        if "file" not in request.files:  # verifica se o arquivo foi enviado
            return {
                "mensagem": "Arquivo não enviado."
            }, 400  # retorna um json com uma mensagem de erro

        file = request.files["file"]  # pega o arquivo enviado

        app.logger.info(f"Arquivo recebido: {file.filename}")

        if file.filename == "":  # verifica se o arquivo tem um nome
            return {"mensagem": "Arquivo sem nome."}, 400

        if not arquivo_permitido(
            file.filename
        ):  # verifica se o arquivo tem uma extensão válida
            return {
                "mensagem": f"Extensão não permitida: {file.filename.rsplit('.', 1)[1].lower()}"
            }, 400

        if file:  # verifica se o arquivo existe
            criar_pasta_uploads()  # cria a pasta de uploads caso não exista
            filedir = "uploads/"

            salvar_uploads(file)

            try:
                validar_arquivo(filedir + file.filename, request.form["id_template"])

                # ! upload_blob(pegar_nome_bucket(), filedir + file.filename, file.filename) ATIVAR UPLOAD 

            except Exception as error:
                # Apagar o arquivo aqui
                # ! apagar_arquivo(filedir + file.filename)
                raise Exception(error.args[0])

            return {"mensagem": "Sucesso!"}, 200

        return {"mensagem": "Erro no upload."}, 500

    except Exception as error:
        # retorna um json com uma mensagem de erro
        return {"mensagem": f"{error.args[0]}"}, 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
