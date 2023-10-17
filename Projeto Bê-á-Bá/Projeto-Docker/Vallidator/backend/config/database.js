// Em /config/database.js
import pg from 'pg';

const pool = new pg.Pool({
    user: 'kapouser',
    host: 'postgres',
    database: 'vallidatordb',
    password: 'senhakapo',
    port: 5432,
});

export default pool;
