class Usuario {
    constructor(nome, sobrenome, telefone, email, senha, permissao) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.permissao = permissao;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    //Fazer a requisição de todos os usuários
    const response = await fetch('/usuarios/listar')
    const usuarios = await response.json();

    for (const usuario of usuarios) {
        console.log(usuario);
    }

    renderizarUsuarios(usuarios);
});

function renderizarUsuarios(usuarios) {
    // Limpar o campo de usuários
    const campoUsuarios = document.getElementById("cb-usuarios");
    campoUsuarios.innerHTML = "";

    // Renderizar os usuários
    for (const usuario of usuarios) {
        campoUsuarios.innerHTML += `
            <div class="card-body d-flex justify-content-between align-items-center">
                <div class="card-text">
                    <h5 class="card-title"># ${usuario.id} ${usuario.nome} ${usuario.sobrenome}</h5>
                    <p class="card-text">✉️ ${usuario.email} <br> 📱 ${usuario.telefone}</p>
                </div>
                <div class="card-options d-flex gap-2 align-items-center">
                    <div class="form-check form-control-lg mb-0 px-2">
                        <label class="form-check-label" for="flexCheckDefault">
                            Fazer Upload:
                        </label>
                        <input ${(usuario.permissao.includes('upload')) ? 'checked' : ''} style="width: 1.3em; height:1.3em;" class="form-check-input m-0" type="checkbox" value="" id="">
                    </div>
                    <div class="form-check form-control-lg mb-0 px-2">
                        <label class="form-check-label" for="flexCheckDefault">
                            Criar Templates:
                        </label>
                        <input ${(usuario.permissao.includes('criar')) ? 'checked' : ''} style="width: 1.3em; height:1.3em;" class="form-check-input m-0" type="checkbox" value="" id="">
                    </div>
                    <div class="form-check form-control-lg mb-0 px-2 pe-4">
                        <label class="form-check-label" for="flexCheckDefault">
                            Administrador:
                        </label>
                        <input ${(usuario.permissao.includes('admin')) ? 'checked' : ''} style="width: 1.3em; height:1.3em;" class="form-check-input m-0" type="checkbox" value="" id="">
                    </div>
                    <button class="btn btn-outline-secondary d-flex coluna-responsiva"
                        data-bs-toggle="modal" data-bs-target="#uploadModal">
                        <span>Editar</span>
                        <i style="font-size: 20px;" class="fa-solid fa-square-pen"></i>
                    </button>
                </div>
            </div>
        `
    }
}