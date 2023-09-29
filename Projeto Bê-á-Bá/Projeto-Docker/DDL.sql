CREATE TABLE public.Usuario (
    id serial PRIMARY KEY,
    nome varchar,
    sobrenome varchar,
    telefone varchar,
    email varchar UNIQUE NOT NULL,
    senha varchar NOT NULL,
    permissao varchar DEFAULT 'ver' NOT NULL
);

CREATE TABLE public.Tipos (
    id serial PRIMARY KEY,
    tipo varchar UNIQUE NOT NULL
);

CREATE TABLE public.Template (
    id serial PRIMARY KEY,
    nome varchar UNIQUE NOT NULL,
    nome_arquivo varchar NOT NULL,
    id_criador integer REFERENCES public.Usuario(id) NOT NULL,
    data_criacao TIMESTAMP NOT NULL,
    extensao varchar NOT NULL,
    status BOOLEAN
);

CREATE TABLE public.TemplatesCampos (
    id_template integer REFERENCES public.Template(id) NOT NULL,
    id_tipo integer REFERENCES public.Tipos(id) NOT NULL,
    nome_campo varchar NOT NULL,
    anulavel BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE public.Upload (
    id serial PRIMARY KEY,
    id_template integer REFERENCES public.Template(id) NOT NULL,
    id_usuario integer REFERENCES public.Usuario(id) NOT NULL,
    nome varchar NOT NULL,
    data TIMESTAMP NOT NULL,
    path integer NOT NULL
);
