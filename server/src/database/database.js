const { Pool } = require('pg');
const pool = new Pool({
  user: 'fl0user',
  host: 'ep-fragrant-rice-69988657.us-east-2.aws.neon.fl0.io',
  database: 'escoladb',
  password: 'HcD0TKSOj7ls',
  port: 5432,
});

module.exports = {
    pool,
}
