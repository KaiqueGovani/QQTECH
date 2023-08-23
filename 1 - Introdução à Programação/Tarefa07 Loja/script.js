
const nome = document.getElementById("nome");
const nascimento = document.getElementById("datePicker");
const cpf = document.getElementById("CPF");
const origem = document.getElementById("origem");
const score = document.getElementById("score");
const feedback = document.getElementById("feedback");

const campos = [nome, nascimento, cpf, origem, score];


class Cliente {
    constructor(nome, nascimento, cpf, origem, score){
        this.nome = nome;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.origem = origem;
        this.score = score;
    }
}

function Cadastrar()
{
    //Get the values from the browser:
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    try {
        for (let i = 0; i < campos.length; i++) {
            if (campos[i].value == "") {
                throw "Preencha todos os campos";
            }
        }

        let cliente = new Cliente(nome.value, nascimento.value, cpf.value, origem.value, score.value);
        
        clientes.push(cliente);


         //Save the values on the browser:
        localStorage.setItem("clientes", JSON.stringify(clientes));

        console.log(cliente);
        console.log("Cadastrado com sucesso");
        feedback.innerHTML = "Cadastrado com sucesso";

        //Limpar os campos:
        for (let i = 0; i < campos.length; i++) {
            campos[i].value = "";
        }
       
    }
    catch (error) {
        console.log("Erro ao cadastrar");
        feedback.innerHTML = error;
        console.log(error);
    }
    

}

function VerClientes()
{
    TelaVisualizar();
    
    //Get the values from the browser:
    let clientes = JSON.parse(localStorage.getItem("clientes"));

    try {
        //Populating the table:
        let tabela = document.getElementById("tabelabody");
        
        //Clearing the table:
        tabela.innerHTML = "";

        for (const cliente of clientes){
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.nascimento.slice(8,10)}/${cliente.nascimento.slice(5,7)}/${cliente.nascimento.slice(0,4)}</td>
                <td>${cliente.cpf}</td>
                <td>${cliente.origem}</td>
                <td>${cliente.score}</td>
            `;
            tabela.appendChild(row);
        }

    } catch (error) {
        console.log("Erro ao mostrar clientes");
        feedback.innerHTML = error;
        console.log(error);
    }
}

function TelaVisualizar()
{
    feedback.innerHTML = "";
    nome.parentElement.hidden = true;
    nascimento.parentElement.hidden = true;
    cpf.parentElement.hidden = true;
    origem.parentElement.hidden = true;
    score.parentElement.hidden = true;
    document.getElementById("cadastrar").parentElement.hidden = true;
    document.getElementById("voltarCadastrar").hidden = false;
    document.getElementById("registros").hidden = false;
} 

function TelaCadastro()
{
    feedback.innerHTML = "";
    nome.parentElement.hidden = false;
    nascimento.parentElement.hidden = false;
    cpf.parentElement.hidden = false;
    origem.parentElement.hidden = false;
    score.parentElement.hidden = false;
    document.getElementById("cadastrar").parentElement.hidden = false;
    document.getElementById("voltarCadastrar").hidden = true;
    document.getElementById("registros").hidden = true;
}

function VoltarAoCadastro()
{
    TelaCadastro();
}

function Retornar()
{
    window.location.href = "index.html";
}