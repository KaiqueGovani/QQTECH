class Produto {
    constructor(id, nome, preco, categoria){
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
    }
}

const nome = document.getElementById("produto");
const preco = document.getElementById("preco");
const categoria = document.getElementById("categoria");
const buscaCategoria = document.getElementById("buscaCategoria");

const campos = [nome, preco, categoria];

const feedback = document.getElementById("feedback");

Ver();

function Cadastrar(){

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let id_produto = localStorage.getItem("id_produto") || 0;

    try {
        for (const campo of campos) {
            if (campo.value == "") {
                throw "Preencha todos os campos";
            }
        }

        let produto = new Produto(id_produto, nome.value, preco.value, categoria.value);
        produtos.push(produto);

        localStorage.setItem("produtos", JSON.stringify(produtos));

        id_produto++;
        localStorage.setItem("id_produto", id_produto);

        //Limpar os campos:
        for (const campo of campos) {
            campo.value = "";
        }

        Ver();

        console.log(produto);
        console.log("Cadastrado com sucesso");
        updateFeedback("Cadastrado com sucesso");
    } catch (error) {
        console.log("Erro ao cadastrar");
        console.log(error);
        updateFeedback(error);
    }
}

function Ver(op = -1){
    //op = -1 -> Ver todos os produtos
    //op = id -> Editar produto com id

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    try {
        let tabela = document.getElementById("tabelabody");
        tabela.innerHTML = "";

        for (const produto of produtos){
            if (produto.id == op && op > -1) {
                tabela.innerHTML += `
                <tr id="${produto.id}">
                    <td><input type="text" class="form-control" name="nome" id="nome_input${produto.id}" placeholder="${produto.nome}"  value="${produto.nome}"></td>
                    <td><input type="number" class="form-control" name="preco" id="preco_input${produto.id}" placeholder="${produto.preco}" minlength="14" maxlength="14" value="${produto.preco}"></td>
                    <td>
                        <select class="form-select" id="categoria_input${produto.id}">
                            <option value="${produto.categoria}">${produto.categoria}</option>
                            <option value="Eletrônicos">Eletrônicos</option>
                            <option value="Material de Construcao">Material de Construção</option>
                            <option value="Roupas">Roupas</option>
                            <option value="Alimentos">Alimentos</option>
                            <option value="Móveis">Móveis</option>
                        </select>
                    </td>
                    <td class="text-end"><div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <button type="button" onclick="ConfirmarAlterar(${produto.id})"class="btn btn-outline-success"><i class="fas fa-check-circle"></i></button>
                        <button type="button" onclick="Ver()" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                    </div></td>      
                </tr>
                `;
                continue;
            } 

            if (buscaCategoria.value != "" && produto.categoria != buscaCategoria.value) continue;

            tabela.innerHTML += `
                <tr id="${produto.id}">
                    <td>${produto.nome}</td>
                    <td>${produto.preco} R$</td>
                    <td>${produto.categoria}</td>
                    <td class="text-end"><div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <button type="button" onclick="Ver(${produto.id})"class="btn btn-outline-warning"><i class="fas fa-pen"></i></button>
                        <button type="button" onclick="Deletar(${produto.id})" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
                    </div></td>      
                </tr>
                `;

        }

    } catch(error) {
        console.log("Erro ao visualizar");
        console.log(error);
        updateFeedback(error);
    }

}

function Deletar(id){
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];  

    try {
        for (const produto of produtos){
            if (produto.id == id){
                produtos.splice(produtos.indexOf(produto), 1);
            }
        }
        
        localStorage.setItem("produtos", JSON.stringify(produtos));
        Ver();
    } catch (error) {
        console.log("Erro ao deletar");
        console.log(error);
        updateFeedback(error);
    }
}

function ConfirmarAlterar(id){
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];  

    try {
        for (const produto of produtos){
            if (produto.id == id){
                produto.nome = document.getElementById("nome_input" + id).value;
                produto.preco = document.getElementById("preco_input" + id).value;
                produto.categoria = document.getElementById("categoria_input" + id).value;
            }
        }
        
        localStorage.setItem("produtos", JSON.stringify(produtos));
        Ver();
    } catch (error) {
        console.log("Erro ao alterar");
        console.log(error);
        updateFeedback(error);
    }
}

document.getElementById("buscarPorCategoria").addEventListener("submit", (e) => {
    e.preventDefault();
    Ver();
});


function updateFeedback(message) {
    feedback.innerHTML = message;
    setTimeout(() => {
        feedback.innerHTML = "";
    }, 3000);

}