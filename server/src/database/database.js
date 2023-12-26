const { Pool } = require('pg');
const pool = new Pool({
  user: 'nathan',
  host: 'localhost',
  database: 'escola',
  password: '090410',
  port: 5432,
});

module.exports = {
    pool,
}
