class Template { //Classe para representar um template
    constructor(data){
        const {id, nome, id_criador, data_criacao, extensao, status, campos, nome_criador} = data;
        this.id = id;
        this.nome = nome;
        this.id_criador = id_criador; //-> Join usuario = nome_criador
        this.data_criacao = data_criacao;
        this.extensao = extensao;
        this.status = status;
        // Ordena os campos por ordem e mapeia para a classe Campo
        this.campos = campos.sort((a, b) => a.ordem - b.ordem).map(campo => new Campo(campo));
        this.nome_criador = nome_criador;
    }
}

class Campo { //Classe para representar um campo
    constructor(data){
        const {ordem, nome_campo, id_tipo, anulavel, id_template} = data;
        this.ordem = ordem;
        this.nome_campo = nome_campo;
        this.nome_tipo = typeMapping[id_tipo];
        this.id_tipo = id_tipo;
        this.anulavel = anulavel;
    }
}

const typeMapping = { // !Mapeamento de tipos de campos // Posteriormente conectar ao banco
    1: "Texto",
    2: "Inteiro",
    3: "Real",
    4: "Data",
    5: "Booleano"
};

//Função para Atualizar os inputs de campos
function atualizarInputs(n) {
    //console.log(`Atualizando a área de inputs para ${n} inputs`);

    const areaInputsCampos = document.getElementById("areaInputsCampos");

    //Limpar a area de inputs de campos
    areaInputsCampos.innerHTML = '';

    //Adicionar os campos
    for (let i = 1; i < n+1; i++) {
        // ! Atualizar os tipos dinamicamente
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
    try {
        const response = await fetch('/templates/ativos');
        let templates = await response.json();

        if (!response.ok) {
            throw new Error(templates.mensagem);
        }

        console.log(typeof(templates));

        for (let template of templates) {
            template = new Template(template);
            console.log(template);
        }

        popularTemplates(templates);
        updateFooter();
    } catch (error) {
        console.error("Erro ao carregar os templates: " + error);
    }
});

const campoTemplates = document.getElementById("cb-templates");

function popularTemplates(templates){
    campoTemplates.innerHTML = "";

    try {
        for (let template of templates){
            template = new Template(template);
            campoTemplates.innerHTML += `
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="card-text">
                        <h5 class="card-title"># ${template.id} ${template.nome} - ${template.extensao}</h5>
                        <p class="card-text">Criado por ${template.nome_criador} - ID: ${template.id_criador}<br>Criado em ${new Date(template.data_criacao).toLocaleDateString("pt-BR")}</p>
                    </div>
                    
                        <div class="card-options d-flex justify-content-between gap-4">
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
                            </div>
                        </div>
                
                </div>   
            `
        }
        //Adiciona os eventos de click nos botões de editar
        document.querySelectorAll("#editarTemplateBtn")
            .forEach(btn => btn.addEventListener("click", () => {
                verEditarTemplate(btn.dataset.templateId, templates)}));

    } catch (error) {
        console.error("Erro ao popular os templates: " + error.message);
    }
}

function updateFooter(){
    console.log("Atualizando o footer");
}

function getFormData() {
    const templateNome = document.getElementById("inputNomeTemplate").value;
    const extensao = getSelectedFileExtension();
    const nCampos = parseInt(document.getElementById("inputNCampos").value, 10);

    const campos = [];
    for (let i = 1; i <= nCampos; i++) {
        const nome_campo = document.getElementById(`inputNomeCampo${i}`).value;
        const id_tipo = document.getElementById(`inputTipoCampo${i}`).value;

        campos.push({
            ordem: i,
            nome_campo: nome_campo,
            id_tipo: id_tipo,
            anulavel: false // TODO: Implementar
        });
    }

    return {
        nome: templateNome,
        extensao: extensao,
        campos: campos
    };
}

function getSelectedFileExtension() {
    const radios = document.getElementsByName("btnradio");
    for (let radio of radios) {
        if (radio.checked) {
            return radio.id;
        }
    }
    return null; // No radio button selected
}

function criarTemplate(){
    // ! Tratar melhor as exeções de erro!
    const formData = getFormData();
    const template = new Template(formData);

    console.log("Criando template:\n", template);

    // Utilizando o fetch com promises para fazer o POST
    fetch('/templates/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(template)
    })
    .then(response => response.json()) // Funciona como um middleware
    .then(data => {
        showFeedbackModal("Template Criado!", "Enviado para Verificação.", "Aguardando verificação de um Administrador.", "../icons/clock.png");
        console.log("Resposta do servidor:", data.mensagem);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}