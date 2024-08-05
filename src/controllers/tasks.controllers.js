const { connectDB } = require('../databases/task_db'); 
const ctrl = {};

// Obtener
ctrl.obtenerTasks = async(req, res) =>{
    const connection = await connectDB();
    const [results] = await connection.query('SELECT * FROM tasks');
    return res.json(results);
}
// Crear
ctrl.createTasks = async (req, res) => {
    const {title, description, isComplete} = req.body;

    title.trim() || description.trim('') ? null : res.status(400).json('Faltan datos');
    const connection = await connectDB();
    await connection.query('INSERT INTO TASKS(title, description, isComplete) VALUES (?,?,?)', [title, description, isComplete]);
    res.json('Tarea creada');
}


// Editar

// Actualizar 

// Eliminar

module.exports = ctrl;