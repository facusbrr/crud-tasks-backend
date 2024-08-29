import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 1000,
});

// Obtener una conexión con el pool
export default async function connectionDB() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado a la base de datos');
    return connection;
  } catch (err) {
    console.error('No se conectó a la base de datos', err.stack);
    throw err;
  }
}
