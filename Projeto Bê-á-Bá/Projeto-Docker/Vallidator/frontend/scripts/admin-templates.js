// ! Alterar tipo para id_tipo
// ! Seguir padrão de objetos conforme templates.js

class Template { //Classe para representar um template
    constructor(data){
        const {id, nome, id_criador, data_criacao, extensao, status, campos, nome_criador} = data;
        this.id = id;
        this.nome = nome;
        this.id_criador = id_criador; //-> Join usuario = nome_criador
        this.data_criacao = data_criacao;
        this.extensao = extensao;
        this.status = status;
        this.campos = campos; //Array de campos
        this.nome_criador = nome_criador;
    }
}

const typeMapping = { //Mapeamento de tipos de campos // Posteriormente conectar ao banco
    1: "Texto",
    2: "Inteiro",
    3: "Real",
    4: "Data",
    5: "Booleano"
};

//Função para Atualizar os inputs de campos
function atualizarInputs(n) {
    //console.log(`Atualizando a área de inputs para ${n} inputs`);
    //Pega a área de inputs de campos
    const areaInputsCampos = document.getElementById("areaInputsCampos");

    //Limpar a area de inputs de campos
    areaInputsCampos.innerHTML = '';

    //Adicionar os campos
    for (let i = 1; i < n + 1; i++) { //
        areaInputsCampos.innerHTML += `
        <div class="col-md-6 mb-3">
            <label for="inputNomeCampo${i}" class="form-label">Nome do Campo # ${i}:<span>*</span></label>
            <input type="text" class="form-control" id="inputNomeCampo${i}">
        </div>
        <div class="col-md-6 mb-3">
            <label for="inputTipoCampo${i}" class="form-label">Tipo do Campo # ${i}:*</label>
            <select type="text" class="form-control form-select" id="inputTipoCampo${i}" required>
                <option value="1">Texto</option>
                <option value="2">Inteiro</option>
                <option value="3">Real</option>
                <option value="4">Date</option>
                <option value="5">Timestamp</option>
                <option value="6">Booleano</option>
            </select>
        </div>
        `
    }
}

//Função de mostrar um Modal de Feedback
function showFeedbackModal(title, response, additionalInfo, iconURL) {
    const feedbackModal = new bootstrap.Modal(document.getElementById("feedbackModal"));
    const feedbackModalLabel = document.getElementById("feedbackModalLabel");
    const feedbackModalResponse = document.getElementById("feedbackModalResponse");
    const feedbackModalP = document.getElementById("feedbackModalP");
    const feedbackModalIcon = document.getElementById("feedbackModalIcon");

    // Seta o título, response e informação adicional
    feedbackModalLabel.innerText = title;
    feedbackModalResponse.innerText = response;
    feedbackModalP.innerText = additionalInfo;

    // Seta o ícone (pode ser um URL ou um elemento de Icone)
    if (iconURL) {
        feedbackModalIcon.innerHTML = `<img src="${iconURL}" alt="Icon">`;
    } else {
        feedbackModalIcon.innerHTML = '';
    }

    // Show the modal
    feedbackModal.show();
}

//showFeedbackModal("Feedback Title", "This is the response.", "Additional information goes here.", "icons/badge-check.png");

//Pega o nome do template que será utilizado
document.getElementById("uploadModal").addEventListener("show.bs.modal", event => {
    const button = event.relatedTarget;
    const templateName = button.closest('.card-body').querySelector('.card-title').textContent;

    // Coloca o nome no modal
    document.getElementById("templateUsado").textContent = "Utilizando o template: " + templateName;
});


document.getElementById("uploadButton").addEventListener("click", function () {
    // Fecha o modal anterior
    const uploadModal = bootstrap.Modal.getInstance(document.getElementById("uploadModal"));
    uploadModal.hide();

    // Pega o elemento de input do arquivo
    const fileInput = document.getElementById("templateFile");

    // Check if a file is selected
    if (fileInput.files.length > 0) {
        // !!! Fazer a lógica de upload aqui !!!
        // Mostra o modal de confirmação do arquivo e upload
        const confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
        confirmationModal.show();
    } else {
        // Mostra o modal de negação quando o arquivo for inválido
        const deniedModal = new bootstrap.Modal(document.getElementById("deniedModal"));
        deniedModal.show();
    }

    // Independente do resultado, limpa o formulário de upload
    document.getElementById('fileUploadForm').reset()
});



document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/templates/listar');
    templates = await response.json();
    console.log(typeof(templates));

    for (let template of templates) {
        template = new Template(template);
        console.log(template);
    }

    popularTemplates(templates);
    updateFooter();
});

const campoTemplates = document.getElementById("cb-templates");

function popularTemplates(templates){
    campoTemplates.innerHTML = "";

    for (let template of templates){
        template = new Template(template);
        campoTemplates.innerHTML += `
            <div class="card-body d-flex justify-content-between align-items-center">
                <div class="card-text">
                    <h5 class="card-title"># ${template.id} ${template.nome} - ${template.extensao}</h5>
                    <p class="card-text">Criado por ${template.nome_criador} - ID: ${template.id_criador}<br>Criado em ${new Date(template.data_criacao).toLocaleDateString("pt-BR")}</p>
                </div>
                ${(template.status === null) ? 
                    `
                    <div class="card-options d-flex justify-content-between gap-4">
                        <div class="form-check form-switch form-control-lg d-flex align-items-center">
                            <div class="form-check-label" style="line-height: 20px">Status: Aguardando Revisão</div>   
                        </div>
                        <div class="d-flex gap-4 card-buttons"> 
                            <a style="width: 300px; justify-content: center; background-color: #fffaaa" class="btn btn-warning d-flex coluna-responsiva" data-bs-toggle="modal"
                            data-bs-target="#templateEditarModal" id="editarTemplateBtn" data-template-id="${template.id}">
                            <span>Verificar Template</span>
                            <i style="font-size: 20px;" class="fa-solid fa-square-pen"></i>
                            </a>
                        </div>
                    </div>
                    ` 

                    : `
                    <div class="card-options d-flex justify-content-between gap-4">
                        <div class="form-check form-switch form-control-lg d-flex align-items-center">
                            <label class="form-check-label" style="line-height: 20px" for="statusSwitch${template.id}">Status: </label>
                            <input ${(template.status === true) ? 'checked' : ''} class="form-check-input mx-4 mt-0" type="checkbox" role="switch" id="statusSwitch${template.id}" ${template.status == 1 ? 'checked' : ''}>
                            <div class="statusText" style="width: 60px">
                                <label class="form-check-label">${template.status === true ? 'Ativo' : 'Inativo'}</label>
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
                            data-bs-target="#templateEditarModal" id="editarTemplateBtn" data-template-id="${template.id}">
                            <span>Editar</span>
                            <i style="font-size: 20px;" class="fa-solid fa-square-pen"></i>
                            </a>
                        </div>
                    </div>
                ` }
            </div>   
        `
    }
    //Adiciona os eventos de click nos botões de editar
    document.querySelectorAll("#editarTemplateBtn")
        .forEach(btn => btn.addEventListener("click", () => {
            verEditarTemplate(btn.dataset.templateId, templates)}));
}

function updateFooter(){
    const footer = document.querySelector('.card-footer');
    const texto = footer.querySelector('div');

    texto.innerHTML = `Visualizando ${campoTemplates.childElementCount} Templates de ${campoTemplates.childElementCount} `;
}

function verEditarTemplate(id, templates){ //Função para ver o template que será editado
    const template = new Template(templates.find(template => template.id == id));
    console.log(template);

    // Pega o modal
    const templateEditForm = document.getElementById("templateEditForm");

    // Altera o modal com os dados do template selecionado
    templateEditForm.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="inputNomeTemplate" class="form-label">Nome do Template:*</label>
                    <input type="text" class="form-control" id="inputNomeTemplate"
                        placeholder="Escreva o nome do template" required value="${template.nome}">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="inputNCampos" class="form-label">Número de Campos no Arquivo:*</label>
                    <select oninput="atualizarInputs(parseInt(value));" type="dropdown"
                        class="form-control form-select" id="inputNCampos"
                        placeholder="Escolha o número de campos" required>
                        ${Array.from({ length: 7 }, (_, index) => `
                            <option value="${index+1}" ${index === template.campos.length-1 ? 'selected' : ''}>${index+1}</option>`)
                        .join('')}
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="btnradio1" class="form-label">Tipo do arquivo:*</label>
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" class="btn-check" name="btnradio" id="btnradiocsv"
                            autocomplete="off" ${(template.extensao == "csv") ? "checked" : ""}>
                        <label class="btn btn-outline-primary" for="btnradiocsv">
                            <img src="../icons/csv-icon.png" alt="">
                        </label>

                        <input type="radio" class="btn-check" name="btnradio" id="btnradioxls"
                            autocomplete="off" ${(template.extensao == "xls") ? "checked" : ""}>
                        <label class="btn btn-outline-primary" for="btnradioxls">
                            <img src="../icons/xls-icon.png" alt="">
                        </label>

                        <input type="radio" class="btn-check" name="btnradio" id="btnradioxlsx"
                            autocomplete="off" ${(template.extensao == "xlsx") ? "checked" : ""}>
                        <label class="btn btn-outline-primary" for="btnradioxlsx">
                            <img src="../icons/xlsx-icon.png" alt="">
                        </label>
                    </div>
                </div>
            </div>
            <div class="row" id="areaInputsCampos">
                ${Array.from({ length: template.campos.length }, (_, index) => `
                
                <div class="col-md-6 mb-3">
                    <label for="inputNomeCampo${index+1}" class="form-label">Nome do Campo # ${index+1}:*</label>
                    <input type="text" class="form-control" id="inputNomeCampo${index+1}" value="${template.campos[index].nome_campo}">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="inputTipoCampo${index+1}" class="form-label">Tipo do Campo # ${index+1}:*</label>
                    <select type="text" class="form-control form-select" id="inputTipoCampo${index+1}" required>
                        ${Array.from({ length: Object.keys(typeMapping).length }, (_, jndex) => `
                            <option value="${jndex+1}" ${(template.campos[index].tipo == jndex+1 ? 'selected' : '')}>${typeMapping[jndex+1]}</option>`)
                        .join('')}
                    </select>
                </div>`)
                .join('')}
            </div>
        </div>
    `   
}