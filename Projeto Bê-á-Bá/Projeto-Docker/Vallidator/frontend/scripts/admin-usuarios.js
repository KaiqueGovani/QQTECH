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
    await renderizarUsuarios();
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

    // ! Debug
    // for (const usuario of usuarios) {
    //     console.log(usuario);
    // } 

    // Limpar o campo de usuários
    const campoUsuarios = document.getElementById("cb-usuarios");
    campoUsuarios.innerHTML = "";

    // Renderizar os usuários
    for (const usuario of usuarios) {
        
    //     // Cria o card-body
    //     const cardBody = document.createElement("div");
    //     cardBody.classList.add("card-body", "d-flex", "justify-content-between", "align-items-center");

    //     // Cria o card-text
    //     const cardText = document.createElement("div");
    //     cardText.classList.add("card-text");
    //     cardText.style.maxWidth = "268px";

    //     // Cria o card-title
    //     const cardTitle = document.createElement("h5");
    //     cardTitle.classList.add("card-title");
    //     cardTitle.innerText = `# ${usuario.id} ${usuario.nome} ${usuario.sobrenome}`;

    //     // Cria o p card-text
    //     const cardTextP = document.createElement("p");
    //     cardTextP.classList.add("card-text");
    //     cardTextP.innerHTML = `✉️ ${usuario.email} <br> 📱 ${usuario.telefone}`;

    //     // Adiciona o card-title e o p card-text ao card-text
    //     cardText.appendChild(cardTitle);
    //     cardText.appendChild(cardTextP);

    //     // Cria o card-options
    //     const cardOptions = document.createElement("div");
    //     cardOptions.classList.add("card-options", "d-flex", "gap-1", "align-items-center");

    //     // Cria o form-check upload
    //     const formCheckUpload = document.createElement("div");
    //     formCheckUpload.classList.add("form-check", "form-control-lg", "mb-0", "px-2");

    //     // Cria o label upload
    //     const labelUpload = document.createElement("label");
    //     labelUpload.classList.add("form-check-label");
    //     labelUpload.setAttribute("for", `uploadCheck${usuario.id}`);
    //     labelUpload.innerText = "Fazer Upload:";

    //     // Cria o input upload
    //     const inputUpload = document.createElement("input");
    //     inputUpload.classList.add("form-check-input", "m-0");
    //     inputUpload.setAttribute("type", "checkbox");
    //     inputUpload.setAttribute("id", `uploadCheck${usuario.id}`);
    //     inputUpload.setAttribute("onclick", `gerarPermissao(${usuario.id})`);
    //     if (usuario.permissao.includes('upload')) {
    //         inputUpload.setAttribute("checked", "");
    //     }

    //     // Adiciona o label upload e o input upload ao form-check upload
    //     formCheckUpload.appendChild(labelUpload);
    //     formCheckUpload.appendChild(inputUpload);

    //     // Cria o form-check criar
    //     const formCheckCriar = document.createElement("div");
    //     formCheckCriar.classList.add("form-check", "form-control-lg", "mb-0", "px-2");

    //     // Cria o label criar
    //     const labelCriar = document.createElement("label");
    //     labelCriar.classList.add("form-check-label");
    //     labelCriar.setAttribute("for", `criarCheck${usuario.id}`);
    //     labelCriar.innerText = "Criar Templates:";

    //     // Cria o input criar
    //     const inputCriar = document.createElement("input");
    //     inputCriar.classList.add("form-check-input", "m-0");
    //     inputCriar.setAttribute("type", "checkbox");
    //     inputCriar.setAttribute("id", `criarCheck${usuario.id}`);
    //     inputCriar.setAttribute("onclick", `gerarPermissao(${usuario.id})`);
    //     if (usuario.permissao.includes('criar')) {
    //         inputCriar.setAttribute("checked", "");
    //     }

    //     // Adiciona o label criar e o input criar ao form-check criar
    //     formCheckCriar.appendChild(labelCriar);
    //     formCheckCriar.appendChild(inputCriar);

    //     // Cria o form-check admin
    //     const formCheckAdmin = document.createElement("div");
    //     formCheckAdmin.classList.add("form-check", "form-control-lg", "mb-0", "px-2", "pe-4");

    //     // Cria o label admin
    //     const labelAdmin = document.createElement("label");
    //     labelAdmin.classList.add("form-check-label");
    //     labelAdmin.setAttribute("for", `adminCheck${usuario.id}`);
    //     labelAdmin.innerText = "Administrador:";

    //     // Cria o input admin
    //     const inputAdmin = document.createElement("input");
    //     inputAdmin.classList.add("form-check-input", "m-0");
    //     inputAdmin.setAttribute("type", "checkbox");
    //     inputAdmin.setAttribute("id", `adminCheck${usuario.id}`);
    //     inputAdmin.setAttribute("onclick", `gerarPermissao(${usuario.id})`);
    //     if (usuario.permissao.includes('admin')) {
    //         inputAdmin.setAttribute("checked", "");
    //     }

    //     // Adiciona o label admin e o input admin ao form-check admin
    //     formCheckAdmin.appendChild(labelAdmin);
    //     formCheckAdmin.appendChild(inputAdmin);
        
    //     // Cria o botão editar
    //     const buttonEditar = document.createElement("button");
    //     buttonEditar.classList.add("btn", "btn-outline-secondary");
    //     buttonEditar.setAttribute("data-bs-toggle", "modal");
    //     buttonEditar.setAttribute("data-bs-target", "#uploadModal");
    //     buttonEditar.innerHTML = `
    //         <span>Editar</span>
    //         <i style="font-size: 20px;" class="fa-solid fa-square-pen"></i>
    //     `;
        
    //     // Adiciona o form-check upload, o form-check criar, o form-check admin e o botão editar ao card-options
    //     cardOptions.appendChild(formCheckUpload);
    //     cardOptions.appendChild(formCheckCriar);
    //     cardOptions.appendChild(formCheckAdmin);
    //     cardOptions.appendChild(buttonEditar);

    //     // Adiciona o card-text e o card-options ao card-body
    //     cardBody.appendChild(cardText);
    //     cardBody.appendChild(cardOptions);

    //     // Adiciona o card-body ao campoUsuarios
    //     campoUsuarios.appendChild(cardBody);
    // }


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
                    <div class="form-check form-control-lg mb-0 px-2">
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

async function enviarConvite(){
    const form = document.getElementById("conviteForm");
    if (!form.checkValidity()) {
        //! Se o formulário não for válido, mostre um alerta ou algum feedback ao usuário.
        return false;
    }
    
    const email = form.conviteEmail.value;

    try {
        const response = await fetch(`/usuarios/convidar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        console.log(data.mensagem, "Alterar"); //? Alterar esse tipo de feedback para um toast?

        if (!response.ok) {
            throw new Error(data.mensagem);
        }

        form.reset();
         
        renderizarUsuarios();

    } catch(error) {
        console.error('Erro ao enviar convite: ', error);
    }
}