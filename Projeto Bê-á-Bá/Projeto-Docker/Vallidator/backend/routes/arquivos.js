import { Router } from 'express';
import pool from '../config/database.js';
import { extname, basename } from 'path';
import autenticarToken from '../middlewares/autenticarToken.js';
import fetch from 'node-fetch';
import FormData from 'form-data';
import multer, { diskStorage } from 'multer';
import fs from 'fs';

const router = Router();

const storage = diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        cb(null, dir)  // local onde o arquivo será salvo
    },
    filename: function (req, file, cb) {
        // Criando um carimbo de data/hora no formato 'YYYY-MM-DD_HH-mm-ss' com fusohorário de Brasília
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${(date.getHours() - 3).toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date.getSeconds().toString().padStart(2, '0')}`;

        // Extrai a extensão do arquivo
        const fileExt = extname(file.originalname);
        // Extrai o nome do arquivo sem a extensão
        const fileName = basename(file.originalname, fileExt);

        // Combinando o nome original do arquivo, carimbo de data/hora e extensão
        cb(null, `${fileName}_${formattedDate}${fileExt}`);
    }
})

const upload = multer({ storage: storage });

router.post('/upload', upload.single("uploadedFile"), async (req, res) => {
    console.log("Recebendo arquivo...");
    console.log("File:", req.file);

    const response = await fetch('http://flask:5000/validar')

    console.log("Response:", response);

    res.status(501).json({ mensagem: "arquivo recebido!" });
});

router.post('/validar', autenticarToken, upload.single('uploadedFile'), async (req, res) => {
    console.log("Recebendo arquivo...");

    console.log("Body:", req.body);

    // Verificações adicionais
    if (!req.file) {
        console.error("req.file é undefined!");
        return res.status(400).json({ mensagem: "Arquivo não enviado!" });
    }

    if (!req.body.id_template) {
        console.error("req.body.id_template é undefined!");
        return res.status(400).json({ mensagem: "ID do template não enviado!" });
    }


    try {
        console.log("Enviando arquivo baseado em ", req.body.id_template, "por ", req.id);
        //Recriando form-data
        const form = new FormData();
        form.append('file', fs.createReadStream(req.file.path), req.file.filename);
        form.append('id_template', req.body.id_template);
        form.append('id_criador', req.id);// ! Utilizar o id do usuario logado pelo token

        const response = await fetch('http://flask:5000/validar', {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensagem || "Erro ao reencaminhar o arquivo!");
        }

        res.status(202).json({ mensagem: data.mensagem || "Arquivo enviado com sucesso" });

        // Você pode deletar o arquivo do servidor Node.js após enviar, se desejar
        /* fs.unlink(req.file.path, err => {
            if (err) {
                console.error("Erro ao deletar o arquivo:", err);
            }
        }); */

    } catch (error) {
        console.error(`Erro ao reencaminhar o arquivo. \n${error.message}`);
        res.status(500).json({ mensagem: `Erro ao reencaminhar o arquivo. \n${error.message}` });
    }


})

export default router;