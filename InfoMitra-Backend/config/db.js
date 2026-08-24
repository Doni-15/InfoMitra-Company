import pg from 'pg';
import { databaseCa, runtimeConfig } from './env.js';

const { Pool } = pg;

const isProduction = runtimeConfig.isProduction;
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const useTls = isProduction || process.env.DB_SSL === 'true';
const ca = databaseCa();
const ssl = useTls
    ? {
        rejectUnauthorized: true,
        ...(ca ? { ca } : {}),
    }
    : false;

const dbConfig = connectionString
    ? {
        connectionString: connectionString,
        ssl,
    }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl,
    };

const pool = new Pool(dbConfig);

pool.connect((err) => {
    if (err) {
        console.error('Koneksi Database Gagal:', err.message);
    } 
    else {
        console.log(`Terhubung ke Database (${isProduction ? 'Cloud/Railway' : 'Lokal'})`);
    }
});

export default pool;
