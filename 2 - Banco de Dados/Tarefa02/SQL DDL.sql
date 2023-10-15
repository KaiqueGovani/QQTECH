DROP TABLE IF EXISTS cliente CASCADE;
DROP TABLE IF EXISTS categoria CASCADE;
DROP TABLE IF EXISTS produto CASCADE;
DROP TABLE IF EXISTS vendedor CASCADE;
DROP TABLE IF EXISTS pedido CASCADE;
DROP TABLE IF EXISTS pedido_produto CASCADE;

CREATE TABLE cliente (
    id serial PRIMARY KEY,
    nome varchar(255) NOT NULL,
    nascimento DATE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    origem VARCHAR(20) NOT NULL,
    score integer
);

CREATE TABLE categoria (
    id serial PRIMARY KEY,
    nome varchar(255) NOT NULL
);

CREATE TABLE produto (
    id serial PRIMARY KEY,
    nome varchar(255) NOT NULL,
    valor FLOAT NOT NULL,
    categoria_id integer REFERENCES categoria (id) NOT NULL
);

CREATE TABLE vendedor (
    id serial PRIMARY KEY,
    matricula integer NOT NULL UNIQUE,
    nome varchar(255) NOT NULL
);

CREATE TABLE pedido (
    id serial PRIMARY KEY,
    cliente_id integer REFERENCES cliente (id) NOT NULL,
    data_de_criacao DATE NOT NULL,
    vendedor_id integer REFERENCES vendedor (id)
);

ALTER TABLE pedido ALTER COLUMN data_de_criacao TYPE Timestamp; 

CREATE TABLE pedido_produto (
    pedido_id integer REFERENCES pedido (id) NOT NULL,
    produto_id integer REFERENCES produto (id) NOT NULL,
    valor_produto DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (pedido_id, produto_id)
);
