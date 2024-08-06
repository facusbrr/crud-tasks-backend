const { connectDB } = require('../databases/task_db'); 
const { connect } = require('../routes/tasks.routes');
const ctrl = {};

// Obtener todas las tareas
ctrl.obtenerTasks = async(req, res) =>{
    const connection = await connectDB();
    const [results] = await connection.query('SELECT * FROM tasks');
    connection.end();
    return res.json(results);
}
// Obtener una tarea mediante su id
ctrl.obtenerTask = async(req, res) =>{
    const id = parseInt(req.params.id);
    if(!id){
        res.status(404).send({message:'El id tiene que ser un numero'})
    }
    const connection = await connectDB();
    const [results] = await connection.query('SELECT * FROM tasks WHERE id = ?', id);
    connection.end();
    if(results.length === 0){
        res.status(404).send({message: 'Tarea no encontrada'})
    }
    return res.json(results);
}
// Crear una nueva tarea
// Tienen controles como max caracteres 255 y que no puede estar vacío
ctrl.createTasks = async (req, res) => {
    const { title, description, isComplete } = req.body;
    if (!title.trim() || !description.trim()) {
        return res.status(400).json({ message: 'Hay datos que estan vacíos' });
    }else if (title.length > 255) {
        return res.status(400).json({ message: 'El título solo debe tener 255 caracteres.' });
    }else if(isComplete !== 0 && isComplete !== 1){
        return res.status(400).json({ message: 'isComplete Debe ser 0 o 1'})
    } else {
        const connection = await connectDB();
        await connection.query('INSERT INTO TASKS(title, description, isComplete) VALUES (?,?,?)', [title, description, isComplete]);
        connection.end();
        return res.status(201).send({message: 'Tarea completa'})
    }
}
// Editar tareas por id
ctrl.editTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    if (!title.trim() || !description.trim()) {
        return res.status(400).json({ message: 'Hay datos que estan vacíos' });
    }else if (title.length > 255) {
        return res.status(400).json({ message: 'El título solo debe tener 255 caracteres.' });
    }else if(isComplete !== 0 && isComplete !== 1){
        return res.status(400).json({ message: 'isComplete Debe ser 0 o 1'})
    }else{
        const connection = await connectDB();
        connection.query('UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?', [title, description, isComplete, id]);
        connection.end;
        res.status(200).send({message: 'Tarea editada'})
    }
}

// Actualizar 

// Eliminar

module.exports = ctrl;