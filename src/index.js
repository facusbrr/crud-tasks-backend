import express from 'express';
import { taskRouter } from './routes/tasks.routes.js';

const app = express();
const PORT = 3000;

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use('/tasks', taskRouter);

app.listen(PORT, () =>
  console.log(`Server funcionando en el puerto: http://localhost:${PORT}`)
);
