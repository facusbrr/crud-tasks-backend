import express from 'express';
import { configMiddleware } from './middlewares/index.js';
import { taskRouter } from './routes/tasks.routes.js';

const app = express();
//MIDDLEWARE
configMiddleware(app);
//ROUTES
app.use('/tasks', taskRouter);

export { app };
