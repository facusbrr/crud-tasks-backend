import { createConnection } from 'mysql2/promise';

const connectDB = async () => {
  return await createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasks_db',
  });
};

export { connectDB };
