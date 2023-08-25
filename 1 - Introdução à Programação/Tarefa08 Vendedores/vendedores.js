class Vendedor{
    constructor(nome, matricula){
        this.nome = nome;
        this.matricula = matricula;
    }
}

const nome = document.getElementById("vendedor");
const matricula = document.getElementById("matricula");
const buscaMatricula = document.getElementById("buscaMatricula");

const campos = [nome, matricula];

const feedback = document.getElementById("feedback");

function Cadastrar(){

    let vendedores = JSON.parse(localStorage.getItem("vendedores")) || [];

    try {
        for (let i = 0; i < campos.length; i++) {
            if (campos[i].value == "") {
                throw "Preencha todos os campos";
            }
        }

        let vendedor = new Vendedor(nome.value, matricula.value);
        
        vendedores.push(vendedor);

        //Save the values on the browser:
        localStorage.setItem("vendedores", JSON.stringify(vendedores));

        console.log(vendedor);

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

function VerVendedores(){
    TelaVisualizar();


    let vendedores = JSON.parse(localStorage.getItem("vendedores")) || [];

    try {
        let tabela = document.getElementById("tabelabody");
        tabela.innerHTML = "";
        let id = 0;
        for (const vendedor of vendedores) {
            
            if (buscaMatricula.value != "" && vendedor.matricula != buscaMatricula.value) continue;
            tabela.innerHTML += `
            <tr id="${id}">
                <td>${vendedor.nome}</td>
                <td>${vendedor.matricula}</td>
                <td><button onclick="Editar(${id})">Editar</button></td>
            </tr>
            `;

            id++;
        }


    } catch(error){
        console.log("Erro ao visualizar");
        console.log(error);
        feedback.innerHTML = error;
    }
}



function Retornar(){}

function TelaVisualizar(){
    feedback.innerHTML = "";
    nome.parentElement.hidden = true;
    matricula.parentElement.hidden = true;
    document.getElementById("cadastrar").parentElement.hidden = true;
    document.getElementById("voltarCadastrar").hidden = false;
    document.getElementById("registros").hidden = false;
    document.getElementById("buscaDiv").hidden = false;
}

function TelaCadastro(){
    feedback.innerHTML = "";
    nome.parentElement.hidden = false;
    matricula.parentElement.hidden = false;
    document.getElementById("cadastrar").parentElement.hidden = false;
    document.getElementById("voltarCadastrar").hidden = true;
    document.getElementById("registros").hidden = true;
    document.getElementById("buscaDiv").hidden = true;
}

function VoltarAoCadastro(){
    TelaCadastro();
}