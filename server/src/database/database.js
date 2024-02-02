const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'monorail.proxy.rlwy.net',
  database: 'railway',
  password: '-5ffFG54ECC2GG46G251DdB-ge4*16CC',
  port: 10021,
  ssl: true,
});

module.exports = {
    pool,
}
