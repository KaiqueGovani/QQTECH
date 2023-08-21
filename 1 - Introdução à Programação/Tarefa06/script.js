let nome = document.getElementById("nome");
const qtd = document.getElementById("select");
const nota1 = document.getElementById("nota1");
const nota2 = document.getElementById("nota2");
const nota3 = document.getElementById("nota3");
const nota4 = document.getElementById("nota4");
const media = document.getElementById("media");

function AdicionarAluno() {
    if (nome.value == "") return;
    const novoP = document.createElement("p");

    let resultado = `Aluno: ${nome.value} - Média: ${media.innerHTML} - `
    if (parseFloat(media.innerHTML) >= 5) resultado += "Aprovado";
    else resultado += "Reprovado";

    novoP.innerHTML = resultado;
    document.getElementById("calcular").appendChild(novoP);
}

function AlterarNotas(){
    const valor = parseInt(qtd.value);

    nota1.value = 0;
    nota2.value = 0;
    nota3.value = 0;
    nota4.value = 0;
    media.innerHTML = "0.00";

    nota3.disabled = true;
    nota4.disabled = true;

    if (valor > 2) nota3.disabled = false;
    if (valor > 3) nota4.disabled = false;
}

function Calcular(){
    const valor = parseInt(qtd.value);

    const n1 = parseFloat(nota1.value);
    const n2 = parseFloat(nota2.value);
    const n3 = parseFloat(nota3.value);
    const n4 = parseFloat(nota4.value);

    let media_final;
    total = n1 + n2;

    if (valor > 2) total += n3;
    if (valor > 3) total += n4;

    media_final = total/valor;

    media.innerHTML = media_final.toFixed(2)

    AdicionarAluno();
}

function Validar(event)
{
    if (event.target.value > 10) event.target.value = 10;
    if (event.target.value < 0) event.target.value = 0;
}