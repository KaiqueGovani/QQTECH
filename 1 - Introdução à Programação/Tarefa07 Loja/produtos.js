function Retornar()
{
    window.location.href = "index.html";
}

const produtoDiv = document.getElementById("produto");
const preco = document.getElementById("preco");
const categoria = document.getElementById("categoria");

const campos = [produto, preco, categoria];

const feedback = document.getElementById("feedback");

let produtos = [];

class Produto {
    constructor(produto, preco, categoria){
        this.produto = produto;
        this.preco = preco;
        this.categoria = categoria;
    }
}

function Cadastrar(){
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    
    try {
        for (let i = 0; i < campos.length; i++) {
            if (campos[i].value == "") {
                throw "Preencha todos os campos";
            }
        }

        //check if the price is a number:
        if (isNaN(preco.value) || preco.value < 0) {
            throw "O preço deve ser um número positivo";
        }

        let produto = new Produto(produtoDiv.value, parseFloat(preco.value), categoria.value);
        
        produtos.push(produto);

        //Save the values on the browser:
        localStorage.setItem("produtos", JSON.stringify(produtos));

        console.log(produto);

        console.log("Cadastrado com sucesso");
        feedback.innerHTML = "Cadastrado com sucesso";

        //Limpar os campos:
        for (let i = 0; i < campos.length; i++) {
            campos[i].value = "";
        }
        
    } catch (error) {
        console.log("Erro ao cadastrar");
        console.log(error);
        feedback.innerHTML = error;
    }
}

function VerProdutos()
{
    TelaVisualizar();

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    try {
        let tabela = document.getElementById("tabelabody");
        tabela.innerHTML = "";
        for (const produto of produtos) {
            tabela.innerHTML += `
            <tr>
                <td>${produto.produto}</td>
                <td>${parseFloat(produto.preco).toFixed(2)} R$</td>
                <td>${produto.categoria}</td>
            </tr>    `
        }
    } catch(error) {
        console.log("Erro ao visualizar");
        console.log(error);
        feedback.innerHTML = error;
    }



}

function TelaVisualizar()
{
    feedback.innerHTML = "";
    produtoDiv.parentElement.hidden = true;
    preco.parentElement.hidden = true;
    categoria.parentElement.hidden = true;
    document.getElementById("cadastrar").parentElement.hidden = true;
    document.getElementById("voltarCadastrar").hidden = false;
    document.getElementById("registros").hidden = false;
} 

function TelaCadastro()
{
    feedback.innerHTML = "";
    produtoDiv.parentElement.hidden = false;
    preco.parentElement.hidden = false;
    categoria.parentElement.hidden = false;
    document.getElementById("cadastrar").parentElement.hidden = false;
    document.getElementById("voltarCadastrar").hidden = true;
    document.getElementById("registros").hidden = true;
}

function VoltarAoCadastro()
{
    TelaCadastro();
}