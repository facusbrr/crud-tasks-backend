import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  return await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};

export { connectDB };
