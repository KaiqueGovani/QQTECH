from flask import Flask, request, jsonify
import os

from bucket_util import *  # importa todas as funções do bucket_util.py

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Ola, World!"


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

        if file.filename == "":  # verifica se o arquivo tem um nome
            return {"mensagem": "Arquivo sem nome."}, 400

        if not arquivo_permitido(file.filename):  # verifica se o arquivo tem uma extensão válida
            return {
                "mensagem": f"Extensão não permitida: {file.filename.rsplit('.', 1)[1].lower()}"
            }, 400


        if file:  # verifica se o arquivo existe
            criar_pasta_uploads()  # cria a pasta de uploads caso não exista

            salvar_uploads(file)
            
            validar_arquivo('uploads/' + file.filename, request.form["id_template"])

            return {"mensagem": "Sucesso!"}, 200

        

        return {"mensagem": "Erro no upload."}, 500
    
    except Exception as error:
        # retorna um json com uma mensagem de erro
        return {"mensagem": f"{error.args[0]}"}, 500
        


@app.route("/<name>")
def hello_name(name):
    return f"Hello, {name}!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
