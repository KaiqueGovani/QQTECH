const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Route for initializing the database with a query
router.get('/setup', (req, res) => {
    const query = `
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
        id_criador integer REFERENCES public.Usuario(id) NOT NULL,
        data_criacao TIMESTAMP NOT NULL,
        extensao varchar NOT NULL,
        status BOOLEAN
    );
    
    CREATE TABLE public.TemplatesCampos (
        id_template integer REFERENCES public.Template(id) ON DELETE CASCADE NOT NULL,
        id_tipo integer REFERENCES public.Tipos(id) NOT NULL,
        ordem integer NOT NULL,
        nome_campo varchar NOT NULL,
        anulavel BOOLEAN DEFAULT FALSE NOT NULL,
        PRIMARY KEY (id_template, ordem)
    );
    
    CREATE TABLE public.Upload (
        id serial PRIMARY KEY,
        id_template integer REFERENCES public.Template(id) NOT NULL,
        id_usuario integer REFERENCES public.Usuario(id) NOT NULL,
        nome varchar NOT NULL,
        data TIMESTAMP NOT NULL,
        path integer NOT NULL
    );    

    INSERT INTO tipos (tipo) 
    VALUES 
        ('Texto'),
        ('Inteiro'),
        ('Decimal'),
        ('Data'),
        ('Hora');
    `;

    pool.query(query, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao inicializar o banco de dados' });
        } else {
            res.status(200).json({ mensagem: 'Banco de dados inicializado com sucesso' });
        }
    });
});

module.exports = router;
