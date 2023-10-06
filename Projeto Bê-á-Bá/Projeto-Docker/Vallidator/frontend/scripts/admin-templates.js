class Template { 
    constructor(data){
        const {id, nome, id_criador, data_criacao, extensao, status, campos} = data;
        this.id = id;
        this.nome = nome;
        this.id_criador = id_criador; //-> Join usuario = nome_criador
        this.data_criacao = data_criacao;
        this.extensao = extensao;
        this.status = status;
        this.campos = campos; //Array de campos
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/templates/listar');
    const templates = await response.json();
    console.log(typeof(templates));

    for (const template of templates) {
        console.log(template);
    }

    popularTemplates(templates);
    updateFooter();
});

const campoTemplates = document.getElementById("cb-templates");

function popularTemplates(templates){
    campoTemplates.innerHTML = "";

    for (const template of templates){
        campoTemplates.innerHTML += `
            <div class="card-body d-flex justify-content-between align-items-center">
                <div class="card-text">
                    <h5 class="card-title"># ${template.id} ${template.nome} - ${template.extensao}</h5>
                    <p class="card-text">Criado por ${template.nome_criador} - ID: ${template.id_criador}.<br>Criado em ${new Date(template.data_criacao).toLocaleDateString("pt-BR")}.</p>
                </div>
                <div class="card-options d-flex justify-content-between gap-4">
                    <div class="form-check form-switch form-control-lg d-flex align-items-center">
                        <label class="form-check-label" style="line-height: 20px" for="statusSwitch${template.id}">Status: </label>
                        <input ${(template.status === true) ? 'checked' : ''} class="form-check-input mx-4 mt-0" type="checkbox" role="switch" id="statusSwitch${template.id}" ${template.status == 1 ? 'checked' : ''}>
                        <div class="statusText" style="width: 60px">
                            <label class="form-check-label">${template.status == 1 ? 'Ativo' : 'Inativo'}</label>
                        </div>
                    </div>
                    <div class="d-flex gap-4 card-buttons"> 
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
            </div>
        `
    }
}

function updateFooter(){
    const footer = document.querySelector('.card-footer');
    const texto = footer.querySelector('div');

    texto.innerHTML = `Visualizando ${campoTemplates.childElementCount} Templates de ${campoTemplates.childElementCount} `;
}