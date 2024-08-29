import { Router } from 'express';
import {
  obtenerTasks,
  obtenerTask,
  createTasks,
  editTask,
  deleteTask,
} from '../controllers/tasks.controllers.js';
import {
  validacionesDeTasks,
  validacionesDeTasksUpdate,
} from '../middlewares/validations.js';
import { applyValidations } from '../middlewares/applyValidation.js';

const taskRouter = Router();

// Todas las tareas
taskRouter.get('/', obtenerTasks);
// Mostrar por id las tareas
taskRouter.get('/:id', obtenerTask);
// Crear una nueva tarea
taskRouter.post('/', validacionesDeTasks, applyValidations, createTasks);
// Actualizar una tarea por id
taskRouter.put('/:id', validacionesDeTasksUpdate, applyValidations, editTask);
// Eliminar una tarea por id
taskRouter.delete('/:id', deleteTask);

export { taskRouter };
