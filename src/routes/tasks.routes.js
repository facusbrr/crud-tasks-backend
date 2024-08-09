import { Router } from 'express';
import {
  obtenerTasks,
  obtenerTask,
  createTasks,
  editTask,
  deleteTask,
} from '../controllers/tasks.controllers.js';
const taskRouter = Router();

// Todas las tareas
taskRouter.get('/', obtenerTasks);
// Mostrar por id las tareas
taskRouter.get('/:id', obtenerTask);
// Crear una nueva tarea
taskRouter.post('/', createTasks);
// Actualizar una tarea por id
taskRouter.put('/:id', editTask);
// Eliminar una tarea por id
taskRouter.delete('/:id', deleteTask);

export { taskRouter };
