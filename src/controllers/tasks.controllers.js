const { connectDB } = require('../databases/task_db'); 
const ctrl = {};

// Obtener
ctrl.obtenerTasks = async(req, res) =>{
    const connection = await connectDB();
    const [results] = await connection.query('SELECT * FROM tasks');
    connection.end();
    return res.json(results);
}
// Crear
ctrl.createTasks = async (req, res) => {
    const { title, description, isComplete } = req.body;
    if (!title.trim() || !description.trim()) {
        return res.status(400).json({ message: 'Hay datos vacíos' });
    } else if(isComplete !== 0 && isComplete !== 1){
        return res.status(400).json({ message: 'isComplete Debe ser 0 o 1'})
    } else {
        const connection = await connectDB();
        await connection.query('INSERT INTO TASKS(title, description, isComplete) VALUES (?,?,?)', [title, description, isComplete]);
        connection.end();
        return res.json({message: 'Tarea completa'})
    }
}
// Editar

// Actualizar 

// Eliminar

module.exports = ctrl;