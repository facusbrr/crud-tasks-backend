const {obtenerTasks, createTasks} = require('../controllers/tasks.controllers');
const router = require('express').Router();

// Indice
router.get('/tasks', obtenerTasks);
// Crear
router.post('/tasks', createTasks);
// Mostrar
router.get('tasks/:id', );
// Actualizar
router.put('tasks/:id', );
// Eliminar
router.delete('tasks/:id',);

module.exports = router;