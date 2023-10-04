class Template { 
    constructor(data){
        const {id, nome, nome_arquivo, id_criador, data_criacao, extensao, status} = data;
        this.id = id;
        this.nome = nome;
        this.nome_arquivo = nome_arquivo;
        this.id_criador = id_criador;
        this.data_criacao = data_criacao;
        this.extensao = extensao;
        this.status = status;
    }
}