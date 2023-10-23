document.addEventListener('DOMContentLoaded', async () => {
    await popularTemplates();
    updateFooter(); // TODO - Implementar
});

async function fetchTemplates(){
    try {
        const response = await fetch('/templates/ativos');
        const templates = await response.json();

        for (let template of templates){
            console.log(new Template(template));
        }

        return templates;
    } catch(error) {
        console.error('Erro ao carregar os templates:', error);
    }
}

const campoTemplates = document.getElementById("cb-templates");

async function popularTemplates(){
    const templates = await fetchTemplates();
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
                            ${template.status == null ? `
                            <div class="form-check form-switch form-control-lg d-flex align-items-center">
                                <div class="form-check-label" style="line-height: 20px">Status: Aguardando Revisão</div>   
                            </div>
                            ` :
                            `
                            <div class="d-flex gap-4 card-buttons"> 
                                <a onclick="downloadEmptyCSV()" href="#" class="btn btn-secondary d-flex coluna-responsiva">
                                <span>Download</span>
                                <i style="font-size: 20px;" class="fa-solid fa-download"></i>
                                </a>
                                <a href="#" class="btn btn-light d-flex coluna-responsiva" onclick="uploadArquivoModal(${template.id});">
                                <span>Utilizar Template</span>
                                <i style="font-size: 20px;" class="fa-solid fa-folder"></i>
                                </a>
                            </div>
                            `}
                            
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







