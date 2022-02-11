require('dotenv').config();
const {Pool} = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
});

module.exports = {
  query: (text, params) => {
    const start = Date.now();
    return pool
      .query(text, params)
      .then((res) => {
        const duration = Date.now() - start;
        console.log('executed query', {text, duration, rows: res.rowCount});
        return res;
      })
      .catch(err => console.log('error', {text, err: err.message}));
  }
};