import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { taskRouter } from './routes/tasks.routes.js';

const app = express();
const corsOptions = {
  origin: 'http://localhost:4000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
//MIDDLEWARE
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

//ROUTES
app.use('/tasks', taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server funcionando en el puerto: http://localhost:${PORT}`)
);
