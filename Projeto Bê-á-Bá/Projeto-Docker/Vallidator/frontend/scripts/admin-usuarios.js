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
    renderizarUsuarios();
});

async function fetchUsuarios() {
    try {
        const response = await fetch('/usuarios/listar');
        const usuarios = await response.json();

        if (!response.ok) {
            throw new Error(usuarios.mensagem);
        }

        return usuarios;
    } catch(error) {
        console.error("Erro ao carregar os usuários: " + error)
    }
}

async function renderizarUsuarios() {
    //Fazer a requisição de todos os usuários
    const usuarios = await fetchUsuarios();

    for (const usuario of usuarios) {
        console.log(usuario);
    }

    // Limpar o campo de usuários
    const campoUsuarios = document.getElementById("cb-usuarios");
    campoUsuarios.innerHTML = "";

    // Renderizar os usuários
    for (const usuario of usuarios) {
        campoUsuarios.innerHTML += `
            <div class="card-body d-flex justify-content-between align-items-center">
                <div class="card-text" style="max-width: 268px">
                    <h5 class="card-title"># ${usuario.id} ${usuario.nome} ${usuario.sobrenome}</h5>
                    <p class="card-text">✉️ ${usuario.email} <br> 📱 ${usuario.telefone}</p>
                </div>
                <div class="card-options d-flex gap-1 align-items-center">
                    <div class="form-check form-control-lg mb-0 px-2">
                        <label class="form-check-label" for="uploadCheck${usuario.id}">
                            Fazer Upload:
                        </label>
                        <input ${(usuario.permissao.includes('upload')) ? 'checked' : ''} 
                            class="form-check-input m-0" type="checkbox" id="uploadCheck${usuario.id}"
                            onclick="gerarPermissao(${usuario.id})">
                    </div>
                    <div class="form-check form-control-lg mb-0 px-2">
                        <label class="form-check-label" for="criarCheck${usuario.id}">
                            Criar Templates:
                        </label>
                        <input ${(usuario.permissao.includes('criar')) ? 'checked' : ''} 
                            class="form-check-input m-0" type="checkbox" id="criarCheck${usuario.id}"
                            onclick="gerarPermissao(${usuario.id})">
                    </div>
                    <div class="form-check form-control-lg mb-0 px-2 pe-4">
                        <label class="form-check-label" for="adminCheck${usuario.id}">
                            Administrador:
                        </label>
                        <input ${(usuario.permissao.includes('admin')) ? 'checked' : ''} 
                            class="form-check-input m-0" type="checkbox" id="adminCheck${usuario.id}"
                            onclick="gerarPermissao(${usuario.id})">
                    </div>
                    <button class="btn btn-outline-secondary"
                        data-bs-toggle="modal" data-bs-target="#uploadModal">
                        <span>Editar</span>
                        <i style="font-size: 20px;" class="fa-solid fa-square-pen"></i>
                    </button>
                </div>
            </div>
        `
    }
}

async function atualizarPermissao(id, permissao) {
    console.log("alterando permissão de", id, "para", permissao);
    try {
        const response = await fetch(`/usuarios/permissao`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, permissao })
        });

        const data = await response.json();
        console.log(data.mensagem); //? Alterar esse tipo de feedback para um toast?

    } catch(error) {
        console.error('Error:', error);
    }
}

async function gerarPermissao(id){
    const uploadCheck = document.getElementById(`uploadCheck${id}`);
    const criarCheck = document.getElementById(`criarCheck${id}`);
    const adminCheck = document.getElementById(`adminCheck${id}`);

    const permissao = [];

    if (adminCheck.checked) {
        permissao.push('admin');
        criarCheck.checked = false;
        uploadCheck.checked = false;

    } else {
        if (uploadCheck.checked) {
            permissao.push('upload');
        }
        if (criarCheck.checked) {
            permissao.push('criar');
        }
    }

    if (permissao.length === 0) {
        permissao.push('ver');
    }

    await atualizarPermissao(id, permissao.join(':'));
}