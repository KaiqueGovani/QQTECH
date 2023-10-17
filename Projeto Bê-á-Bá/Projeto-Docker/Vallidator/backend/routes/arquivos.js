import { Router } from 'express';
import pool from '../config/database.js';
import { extname, basename } from 'path';
import fetch from 'node-fetch';
import multer, { diskStorage } from 'multer';

const router = Router();

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')  // local onde o arquivo será salvo
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

    res.status(501).json({ mensagem: "arquivo recebido!"});
});

export default router;