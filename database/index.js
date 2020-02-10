const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'chris',
    password: 'password',
    database: 'tokokasih',
    port: 3306,
    multipleStatements: true
});

module.exports = db;