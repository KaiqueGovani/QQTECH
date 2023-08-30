// Pega o nome do arquivo atual
const file_name = window.location.pathname.split('/').pop().split('.')[0];

// Adiciona o evento de click no botão de baixar excel
ExcelBtn.addEventListener('click', async () =>{
    const data = localStorage.getItem(file_name);
    if (data) {
        try {
            console.log("Tentando converter");
            await JSONparaExcel(data);
        } catch (error) {
            console.log(error);
        }
    }
});

// Função que converte o JSON para Excel
async function JSONparaExcel(data) {
    console.log("Enviando para o servidor: " + data);

    // Envia o JSON para o servidor
    const response = await fetch('/download_excel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ json_data: data , nome: file_name})
    });
    
    if (response.ok) { // Se a resposta for OK, baixa o arquivo
        console.log('Arquivo Excel gerado com sucesso');
        // Lidar com a resposta de sucesso (ex.: disparar um download)
        const blob = await response.blob(); // Converte a resposta em um blob // Blob é um objeto que representa um arquivo
        const blobUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = file_name + '.xlsx';
        downloadLink.textContent = 'Download Excel File';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        // Depois de baixar, remove o link
        downloadLink.remove();
    } else { // Se não, mostra o erro no console
        console.error('Erro ao gerar o arquivo Excel');
    }
}    