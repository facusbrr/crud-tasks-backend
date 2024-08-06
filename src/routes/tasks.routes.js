const {obtenerTasks, createTasks, editTask, obtenerTask} = require('../controllers/tasks.controllers');
const router = require('express').Router();

// Todas las tareas
router.get('/tasks', obtenerTasks);
// Mostrar por id las tareas
router.get('/tasks/:id', obtenerTask)
// Crear una nueva tarea
router.post('/tasks', createTasks);
// Actualizar una tarea por id
router.put('/tasks/:id', editTask);
// Eliminar una tarea por id
router.delete('tasks/:id',);

module.exports = router;