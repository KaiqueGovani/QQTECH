class Vendedor {
    constructor(id, nome, matricula) {
        this.id = id;
        this.nome = nome;
        this.matricula = matricula;
    }
}

const nome = document.getElementById("vendedor");
const matricula = document.getElementById("matricula");
const buscaMatricula = document.getElementById("buscaMatricula");

const campos = [nome, matricula];

const feedback = document.getElementById("feedback");



function Cadastrar() {

    let vendedores = JSON.parse(localStorage.getItem("vendedores")) || [];
    let id_vendedor = localStorage.getItem("id_vendedor") || 0;

    try {
        for (let i = 0; i < campos.length; i++) {
            if (campos[i].value == "") {
                throw "Preencha todos os campos";
            }
        }

        let vendedor = new Vendedor(id_vendedor, nome.value, matricula.value);

        vendedores.push(vendedor);

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

    id_vendedor++;
    localStorage.setItem("id_vendedor", id_vendedor);
}

function VerVendedores(op = -1) {
    //op = -1 -> Ver todos os vendedores
    //op = id -> Editar o vendedor com o id = op

    TelaVisualizar();


    let vendedores = JSON.parse(localStorage.getItem("vendedores")) || [];

    try {
        let tabela = document.getElementById("tabelabody");
        tabela.innerHTML = "";
        for (const vendedor of vendedores) {

            if (vendedor.id == op && op > -1) {
                tabela.innerHTML += `
                <tr id="${vendedor.id}">
                    <td><input type="text" class="form-control" name="vendedor" id="vendedor_input${vendedor.id}" placeholder="${vendedor.nome}"  value="${vendedor.nome}"></td>
                    <td><input type="number" class="form-control" name="matricula" id="matricula_input${vendedor.id}" placeholder="${vendedor.matricula}" minlength="4" maxlength="6" value="${vendedor.matricula}"></td>
                    <td><div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <button type="button" onclick="ConfirmarAlterar(${vendedor.id})"class="btn btn-outline-success"><i class="bi bi-check-circle"></i></button>
                        <button type="button" onclick="DeletarVendedor(${vendedor.id})" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                    </div></td>      
                </tr>
                `;
                continue;
            }


            if (buscaMatricula.value != "" && vendedor.matricula != buscaMatricula.value) continue;
            tabela.innerHTML += `
                <tr id="${vendedor.id}">
                    <td>${vendedor.nome}</td>
                    <td>${vendedor.matricula}</td>
                    <td><div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <button type="button" onclick="VerVendedores(${vendedor.id})"class="btn btn-outline-warning"><i class="bi bi-pen"></i></button>
                        <button type="button" onclick="DeletarVendedor(${vendedor.id})" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
                    </div></td>      
                </tr>
                `;
        
        }

    } catch (error) {
        console.log("Erro ao visualizar");
        console.log(error);
        feedback.innerHTML = error;
    }
}

function DeletarVendedor(id) {
    console.log("Deletando vendedor " + id);
    let vendedores = JSON.parse(localStorage.getItem("vendedores")) || [];
    let retorno = [];

    try {
        for (let i = 0; i < vendedores.length; i++) {
            if (i != id) {
                retorno.push(vendedores[i]);
            }
        }
        localStorage.setItem("vendedores", JSON.stringify(retorno));
        VerVendedores();
    } catch (error) {
        console.log("Erro ao deletar");
        console.log(error);
        feedback.innerHTML = error;
    }
}

function ConfirmarAlterar(id){
    let vendedores = JSON.parse(localStorage.getItem("vendedores")) || [];

    try {
        for (let vendedor of vendedores){
            if (vendedor.id == id){
                vendedor.nome = document.getElementById("vendedor_input" + id).value;
                vendedor.matricula = document.getElementById("matricula_input" + id).value;
            }
        }    
        
        localStorage.setItem("vendedores", JSON.stringify(vendedores));
        VerVendedores();

    } catch (error) {
        console.log("Erro ao alterar");
        console.log(error);
        feedback.innerHTML = error;
    }    
}

function Retornar() { 
    window.location.href = "index.html";
}

function TelaVisualizar() {
    feedback.innerHTML = "";
    nome.parentElement.hidden = true;
    matricula.parentElement.hidden = true;
    document.getElementById("cadastrar").parentElement.hidden = true;
    document.getElementById("voltarCadastrar").hidden = false;
    document.getElementById("registros").hidden = false;
    document.getElementById("buscaDiv").hidden = false;
}

function TelaCadastro() {
    feedback.innerHTML = "";
    nome.parentElement.hidden = false;
    matricula.parentElement.hidden = false;
    document.getElementById("cadastrar").parentElement.hidden = false;
    document.getElementById("voltarCadastrar").hidden = true;
    document.getElementById("registros").hidden = true;
    document.getElementById("buscaDiv").hidden = true;
}

function VoltarAoCadastro() {
    TelaCadastro();
}