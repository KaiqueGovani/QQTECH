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

function downloadEmptyCSV() { // ! Função Placeholder
    // Create a data URI for an empty CSV content
    const csvContent = "data:text/csv;charset=utf-8,";
    // Create a Blob containing the CSV content
    const blob = new Blob([csvContent], {
        type: "text/csv"
    });
    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "empty.csv"; // File name
    document.body.appendChild(a);

    // Trigger the click event on the <a> element
    a.click();

    // Clean up: remove the <a> element and revoke the URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

//Função para Atualizar os inputs de campos
function atualizarInputs(n) { // !
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
                <option value="5">Booleano</option>
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
} // ? Alterar para um arquivo separado ?

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

async function enviarTemplate(){
    try{
        let form = document.querySelector("form");
        if (!form.checkValidity()) {
            // Se o formulário não for válido, mostre um alerta ou algum feedback ao usuário.
            return false;
        }

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
            //Fecha o modal de template
            const templateModal = document.getElementById("templateModal");
            const templateModalBS = bootstrap.Modal.getInstance(templateModal);
            templateModalBS.hide();

            showFeedbackModal("Template Criado!", "Enviado para Verificação.", "Aguardando verificação de um Administrador.", "../icons/clock.png");
            console.log("Resposta do servidor:", data.mensagem);
        })
    }
    catch(error){
        console.error('Error:', error);
    }
    finally {
        await popularTemplates();
    }
}

function resetarForm(){
    const select = document.getElementById("inputNCampos");
    const nomeTemplate = document.getElementById("inputNomeTemplate");

    select.value = 1;
    atualizarInputs(1);

    nomeTemplate.value = "";

    const radios = document.getElementsByName("btnradio");
    for (let radio of radios) {
        radio.checked = false;
    }

}

async function enviarArquivo(id_template){
    try {
        const formUploadFile = document.getElementById("formUploadFile"); // ! resetar form
        const fileInput = document.getElementById("templateFile");
        const file = fileInput.files[0];
        console.log("Enviando arquivo...");
        console.log("File:", file);

        if (!file) { // Se não houver arquivo selecionado
            throw new Error("Nenhum arquivo selecionado");
        }

        // Cria um FormData e adiciona o arquivo
        const formData = new FormData();
        formData.append("uploadedFile", file);
        formData.append("id_template", id_template);

        formData.forEach((value, key) => {
            console.log(key + ' = ' + value);
        });

        // Utilizando o fetch com promises para fazer o POST
        const response = await fetch('/arquivos/validar', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || "Erro ao enviar o arquivo!");
        }

        showFeedbackModal("Validação Completa!", "Arquivo dentro dos padrões!", "Enviando para o repositório.", "../icons/badge-check.png");
        
        console.log("Resposta do servidor:", data.mensagem);

    } catch (error) {
        showFeedbackModal("Falha na Validação!", "Arquivo fora dos padrões!", error.message, "../icons/ban.png");
        console.log('Erro ao enviar arquivo:', error);
    }
}

function uploadArquivoModal(id_template){
    const uploadModal = new bootstrap.Modal(document.getElementById("uploadModal"));
    const uploadButton = document.getElementById("uploadButton");

    uploadButton.onclick = () => enviarArquivo(id_template);


    uploadModal.show();
}