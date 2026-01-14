const { Pool} = require("pg");

const pool = new Pool({
    host:"localhost",
    port:5432,
    user:"nicolas",
    password:"QR@k9!!5I9",
    database: "eventdb"
    });

module.exports = { pool };