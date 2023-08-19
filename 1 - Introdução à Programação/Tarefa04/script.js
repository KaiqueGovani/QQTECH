const select = document.getElementById("tipo_vinho");
const qtd = document.getElementById("quantidade");
const feedback = document.getElementById("feedback");
const p = document.getElementById("porcentagem");
let total = 0;
let tinto = 0;
let branco = 0;
let rose = 0;

function Adicionar(){
    const valor = select.value;
    const quantidade = qtd.value;
    let tipo_vinho;

    switch(valor){
        case "T":
            tinto += parseInt(quantidade);
            tipo_vinho = "Tinto";
            break;
        
        case "B":
            branco += parseInt(quantidade);
            tipo_vinho = "Branco";
            break;

        case "R":
            rose += parseInt(quantidade);
            tipo_vinho = "Rose";
            break;

        default:
            break;
    }   
    total = tinto + branco + rose;
    feedback.innerHTML = `Adicionado ${quantidade} garrafas de vinho ${tipo_vinho} ao estoque. Total de ${total} garrafas.`;  
    
}

function Finalizar(){
    document.getElementById("loop_btn").style.display = "inline-block";
    document.getElementById("campo").style.display = "none";
    feedback.innerHTML = "";

    const tinto_p = (tinto/total)*100;
    const branco_p = (branco/total)*100;
    const rose_p = (rose/total)*100;

    p.innerHTML = `<br> Porcentagens do Estoque: <br><br>
    Vinho Tinto: ${tinto_p.toFixed(2)}% <br>
    Vinho Branco: ${branco_p.toFixed(2)}% <br>
    Vinho Rose: ${rose_p.toFixed(2)}%`;

    tinto = 0;
    branco = 0;
    rose = 0;
    total = 0;
}


function IniciarLoop(){
    document.getElementById("loop_btn").style.display = "none";
    document.getElementById("campo").style.display = "block";
    p.innerHTML = "";
}

