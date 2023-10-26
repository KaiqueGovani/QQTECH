document.addEventListener('DOMContentLoaded', function () {
    popularTabelas();
});

async function popularTabelas() {
    await popularTemplates();
    await popularUploads();
}

async function popularTemplates() {
    try {
        const response = await fetch('/templates/recentes')
        const data = await response.json();

        console.log(data);

        const tabela = document.getElementById("table-content-templates");
        tabela.innerHTML = ""; //Limpa a tabela

        for (let template of data) {
            tabela.innerHTML +=
                `
                <tr>
                    <th scope="row">${template.id}</td>
                    <td>${template.nome}</td>
                    <td>${template.extensao.toUpperCase()}</td>
                    <td>${template.id_criador}</td>
                    <td>${new Date(template.data_criacao).toLocaleDateString()}</td>
                    <th>${template.status ? 
                        `<div class="text-white rounded-5 text-center p-1"
                            style="background-color: var(--Terciaria);">Ativo
                        </div>` 
                        : (template.status === null ? `<div class="rounded-5 text-center p-1" style="background-color: #FFFAAA;">
                        Revisão</div>`
                        : 
                        `<div class="rounded-5 text-center p-1" style="background-color: var(--Baby-Green);">
                        Inativo</div>`)
                        }
                    </th>
                </tr>
                `;
        }
    } catch (error) {
        console.error("Erro ao buscar templates recentes:", error);
    }
}

async function popularUploads() {
    try {
        const response = await fetch('/arquivos/recentes')
        const data = await response.json();

        console.log(data);

        const tabela = document.getElementById("table-content-files");
        tabela.innerHTML = ""; //Limpa a tabela

        for (let arquivo of data) {
            tabela.innerHTML +=
                `
                <tr>
                    <th scope="row">${arquivo.id}</td>
                    <td>${removeTimestampFromFilename(arquivo.nome)}</td>
                    <td>${arquivo.id_template}</td>
                    <td>${arquivo.id_usuario}</td>
                    <td>${new Date(arquivo.data).toLocaleDateString()}</td>
                    <td>${arquivo.tamanho_bytes}</td>
                </tr>
                `;
        }
    } catch (error) {
        console.error("Erro ao buscar uploads recentes:", error);
    }
}

function removeTimestampFromFilename(filename) {
    // Extrai a extensão do arquivo
    let extensao = filename.split('.').pop();

    // Remove a extensão do arquivo
    let semExtensao = filename.split('.').slice(0, -1).join('.');
    
    // Encontra a penúltima ocorrência de '_'
    let ultimoIndice = semExtensao.lastIndexOf('_');
    let penultimoIndice = semExtensao.lastIndexOf('_', ultimoIndice - 1);
    
    // Retorna a string até a penúltima '_'
    return semExtensao.substring(0, penultimoIndice) + '.' + extensao;
}

