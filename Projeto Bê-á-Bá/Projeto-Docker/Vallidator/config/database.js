// Em /config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'kapouser',
  host: 'postgres',
  database: 'vallidatordb',
  password: 'senhakapo',
  port: 5432,
});

module.exports = pool;
