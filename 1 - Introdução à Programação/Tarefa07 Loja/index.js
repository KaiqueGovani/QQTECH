try {document.getElementById("btnCadastrarClientes").addEventListener("click", () => {
    window.location.href = "cadastrar_clientes.html";
    console.log("Cadastrar");
})} catch (error) {
    console.log("Erro ao Encontrar o botão Cadastrar");
    console.log(error);
}

try {document.getElementById("btnCadastrarProdutos").addEventListener("click", () => {
    window.location.href = "cadastrar_produtos.html";
    console.log("Cadastrar");
})} catch (error) {
    console.log("Erro ao Encontrar o botão Cadastrar");
    console.log(error);
}

try {document.getElementById("btnCadastrarVendedores").addEventListener("click", () => {
    window.location.href = "cadastrar_vendedores.html";
    console.log("Cadastrar");
})} catch (error) {
    console.log("Erro ao Encontrar o botão Cadastrar");
    console.log(error);
}