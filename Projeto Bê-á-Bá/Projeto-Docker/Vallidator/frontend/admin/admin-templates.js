class Template { 
    constructor(data){
        const {id, nome, nome_arquivo, id_criador, data_criacao, extensao, status} = data;
        this.id = id;
        this.nome = nome;
        this.nome_arquivo = nome_arquivo;
        this.id_criador = id_criador;
        this.data_criacao = data_criacao;
        this.extensao = extensao;
        this.status = status;
    }
}

const clientesData = {
    id: 1,
    nome: 'Clientes',
    nome_arquivo: 'Clientes.csv',
    id_criador: 2798,
    data_criacao: '02/07/1971',
    extensao: 'CSV',
    status: 1
};

const todoListData = {
    id: 3,
    nome: 'TodoList',
    nome_arquivo: 'TodoList.xlsx',
    id_criador: 4846,
    data_criacao: '12/08/1994',
    extensao: 'XLSX',
    status: 0
};

const moveisData = {
    id: 4,
    nome: 'Móveis',
    nome_arquivo: 'Moveis.csv',
    id_criador: 9151,
    data_criacao: '06/09/2023',
    extensao: 'CSV',
    status: 1
};

const clientesTemplate = new Template(clientesData);
const todoListTemplate = new Template(todoListData);
const moveisTemplate = new Template(moveisData);

let templates = [clientesTemplate, todoListTemplate, moveisTemplate] 

const campoTemplates = document.getElementById("cb-templates");

function popularTemplates(templates){
    campoTemplates.innerHTML = "";

    for (const template of templates){
        campoTemplates.innerHTML += `
            <div class="card-body d-flex justify-content-between align-items-center">
                <div class="card-text">
                    <h5 class="card-title"># ${template.id} ${template.nome} - ${template.extensao}</h5>
                    <p class="card-text">Criado por Nome-Usuário - ID: ${template.id_criador}.<br>Criado em ${template.data_criacao}.</p>
                </div>
                <div class="card-options d-flex gap-4">
                    <div class="form-check form-switch form-control-lg d-flex align-items-center">
                        <label class="form-check-label" style="line-height: 20px" for="statusSwitch${template.id}">Status: </label>
                        <input class="form-check-input mx-4 mt-0" type="checkbox" role="switch" id="statusSwitch${template.id}" ${template.status == 1 ? 'checked' : ''}>
                        <div style="width: 80px">
                            <label class="form-check-label">${template.status == 1 ? 'Ativo' : 'Inativo'}</label>
                        </div>
                    </div>
                    <a onclick="downloadEmptyCSV()" href="#" class="btn btn-secondary d-flex coluna-responsiva">
                        <span>Download</span>
                        <i style="font-size: 20px;" class="fa-solid fa-download"></i>
                    </a>
                    <a href="#" class="btn btn-light d-flex coluna-responsiva" data-bs-toggle="modal"
                        data-bs-target="#uploadModal">
                        <span>Utilizar Template</span>
                        <i style="font-size: 20px;" class="fa-solid fa-folder"></i>
                    </a>
                    <a href="#" class="btn btn-outline-secondary d-flex coluna-responsiva" data-bs-toggle="modal"
                        data-bs-target="#uploadModal">
                        <span>Editar</span>
                        <i style="font-size: 20px;" class="fa-solid fa-square-pen"></i>
                    </a>
                </div>
            </div>
        `
    }
}

popularTemplates(templates);