function IniciarLoop(){
    var valor = document.getElementById("tipo_vinho").value;
    document.getElementById("loop_btn").style.display = "none";
    document.getElementById("campo").style.display = "block";
}

function CalcularPorcentagem(){
    const valor = document.getElementById("tipo_vinho").value;
    const p = document.getElementById("porcentagem");
    var tipo_vinho;
    var porcentagem;

    //console.log(valor);

    if (valor == "T"){
        tipo_vinho = "Tinto";
        porcentagem = 40;
    }
    if (valor == "B"){
        tipo_vinho = "Branco";
        porcentagem = 35;
    }
    if (valor == "R"){
        tipo_vinho = "Rose";
        porcentagem = 25;
    }
    if (valor == "F")
    {
        document.getElementById("loop_btn").style.display = "inline-block";
        document.getElementById("campo").style.display = "none";
        p.innerHTML = "";
        return;
    }
    p.innerHTML = `A porcentagem de vinho ${tipo_vinho} é ${porcentagem}%`;
    
}


function CalcularPorcentagemSwitch(){
    const valor = document.getElementById("tipo_vinho").value;
    const p = document.getElementById("porcentagem");
    var tipo_vinho;
    var porcentagem;

    console.log(valor);

    switch(valor){
        case "T":
            tipo_vinho = "Tinto";
            porcentagem = 40;
            break;
        
        case "B":
            tipo_vinho = "Branco";
            porcentagem = 35;
            break;

        case "R":
            tipo_vinho = "Rose";
            porcentagem = 25;
            break;

        default:    
            break;
    }

    p.innerHTML = `A porcentagem de vinho ${tipo_vinho} é ${porcentagem}%`;
    
}
