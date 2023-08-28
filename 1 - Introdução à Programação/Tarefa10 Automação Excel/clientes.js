class Cliente {
    constructor(id, nome, nascimento, cpf, origem, score){
        this.id = id;
        this.nome = nome;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.origem = origem;
        this.score = score;
    }
}

const nome = document.getElementById("cliente");
const nascimento = document.getElementById("datePicker");
const cpf = document.getElementById("CPF");
const origem = document.getElementById("origem");
const score = document.getElementById("score");
const feedback = document.getElementById("feedback");

const campos = [nome, nascimento, cpf, origem, score];

VerClientes();

function Cadastrar() {
    
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    let id_cliente = localStorage.getItem("id_cliente") || 0;

    try {
        for (let i = 0; i < campos.length; i++) {
            if (campos[i].value == "") {
                throw "Preencha todos os campos";
            }
        }

        let cliente = new Cliente(id_cliente, nome.value, nascimento.value, cpf.value, origem.value, score.value);
        clientes.push(cliente);

        localStorage.setItem("clientes", JSON.stringify(clientes));

        id_cliente++;
        localStorage.setItem("id_cliente", id_cliente);
        //Limpar os campos:
        for (let i = 0; i < campos.length; i++) {
            campos[i].value = "";
        }

        VerClientes();

        console.log(cliente);
        console.log("Cadastrado com sucesso");
        updateFeedback("Cadastrado com sucesso");

    } catch (error) {
        console.log("Erro ao cadastrar");
        console.log(error);
        updateFeedback(error);
    }
}

function VerClientes(op = -1) {
    //op = -1 -> Ver todos os clientes
    //op = id -> Editar o cliente com o id = op

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    try {
        let tabela = document.getElementById("tabelabody");
        tabela.innerHTML = "";
        for (const cliente of clientes){
            if (cliente.id == op && op > -1) {
                tabela.innerHTML += `
                <tr id="${cliente.id}">
                    <td><input type="text" class="form-control" name="vendedor" id="vendedor_input${cliente.id}" placeholder="${cliente.nome}"  value="${cliente.nome}"></td>
                    <td><input type="date" class="form-control" name="nastimento" id="nascimento_input${cliente.id}" placeholder="${cliente.nascimento}" minlength="4" maxlength="6" value="${cliente.nascimento}"></td>
                    <td><input type="text" class="form-control" oninput="formatCPF(this)" name="cpf" id="cpf_input${cliente.id}" placeholder="${cliente.cpf}" minlength="14" maxlength="14" value="${cliente.cpf}"></td>
                    <td>
                        <select class="form-select" name="origem" id="origem_input${cliente.id}">
                            <option value="${cliente.origem}">${cliente.origem}</option>
                            <option value="Loja">Loja</option>
                            <option value="Site">Site</option>
                        </select>
                    </td>
                    <td><input type="number" class="form-control" name="score" id="score_input${cliente.id}" placeholder="${cliente.score}" minlength="4" maxlength="6" value="${cliente.score}"></td>

                    <td class="text-end"><div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <button type="button" onclick="ConfirmarAlterar(${cliente.id})"class="btn btn-outline-success"><i class="fas fa-check-circle"></i></button>
                        <button type="button" onclick="VerClientes()" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                    </div></td>      
                </tr>
                `;
                continue;
            }

            if (buscaCPF.value != "" && cliente.cpf != buscaCPF.value) continue;
            tabela.innerHTML += `
                <tr id="${cliente.id}">
                    <td>${cliente.nome}</td>
                    <td>${cliente.nascimento.slice(8,10)}/${cliente.nascimento.slice(5,7)}/${cliente.nascimento.slice(0,4)}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.origem}</td>
                    <td>${cliente.score}</td>
                    <td class="text-end"><div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <button type="button" onclick="VerClientes(${cliente.id})"class="btn btn-outline-warning"><i class="fas fa-pen"></i></button>
                        <button type="button" onclick="DeletarCliente(${cliente.id})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                    </div></td>      
                </tr>
                `;

        }

    } catch (error) {
        console.log("Erro ao exibir clientes");
        console.log(error);
        updateFeedback(error);
    }
}

function DeletarCliente(id) {
    console.log("Deletando cliente com id: " + id);
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    let retorno = [];

    try {
        for (const cliente of clientes){
            if (cliente.id != id) {
                retorno.push(cliente);
            }
        }
        localStorage.setItem("clientes", JSON.stringify(retorno));
        VerClientes();
    } catch (error) {
        console.log("Erro ao deletar");
        console.log(error);
        updateFeedback(error);
    }
}

function ConfirmarAlterar(id){
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];  

    try {
        for (const cliente of clientes){
            if (cliente.id == id){
                cliente.nome = document.getElementById("vendedor_input" + id).value;
                cliente.nascimento = document.getElementById("nascimento_input" + id).value;
                cliente.cpf = document.getElementById("cpf_input" + id).value;
                cliente.origem = document.getElementById("origem_input" + id).value;
                cliente.score = document.getElementById("score_input" + id).value;
            }
        }
        
        localStorage.setItem("clientes", JSON.stringify(clientes));
        VerClientes();
    } catch (error) {
        console.log("Erro ao alterar");
        console.log(error);
        updateFeedback(error);
    }
}

function AdicionarVerificador(){
    const cpf_inputs = document.querySelectorAll(".cpf-input");

    cpf_inputs.forEach((cpf_input) => {
        cpf_input.addEventListener('input', () => formatCPF(cpf_input));
    });

}

document.getElementById("buscarPorCPF").addEventListener("submit", (e) => {
    e.preventDefault();
    VerClientes();
});

function updateFeedback(message) {
    feedback.innerHTML = message;
    setTimeout(() => {
        feedback.innerHTML = "";
    }, 3000);

}

function formatCPF(inputElement) {
    let inputValue = inputElement.value.replace(/\D/g, '');

    if (inputValue.length > 11) {
        inputValue = inputValue.slice(0, 11);
    }

    if (inputValue.length <= 11) {
        inputElement.value = inputValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
    }
}