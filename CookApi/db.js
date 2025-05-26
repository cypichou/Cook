import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
});

pool.getConnection((err) => {
    if (err) {
        console.error('❌ Erreur de connexion à la DB:', err);
    } else {
        console.log('✅ Connexion à la DB réussie !');
    }
});

export default pool.promise();
