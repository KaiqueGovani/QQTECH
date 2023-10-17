from flask import Flask
from bucket_util import * # importa todas as funções do bucket_util.py
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Ola, World!'

@app.route('/validar', methods=['POST'])
def validar():
    return 'Validado!', 200

@app.route('/<name>')
def hello_name(name):
    return f'Hello, {name}!'

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
