const { connectDB } = require('../databases/task_db');
const ctrl = {};

// Obtener todas las tareas
ctrl.obtenerTasks = async (req, res) => {
  try {
    const connection = await connectDB();
    const [results] = await connection.query('SELECT * FROM tasks');
    connection.end();
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};
// Obtener una tarea mediante su id
ctrl.obtenerTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).send({ message: 'El id tiene que ser un numero' });
    }
    const connection = await connectDB();
    const [results] = await connection.query(
      'SELECT * FROM tasks WHERE id = ?',
      id
    );
    connection.end();
    if (results.length === 0) {
      res.status(400).json({ message: 'Tarea no encontrada' });
    }
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: 'Error al obtener la tarea específica' });
  }
};
// Crear una nueva tarea
ctrl.createTasks = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;
    if (!title.trim() || !description.trim())
      return res.status(400).json({ message: 'Hay datos que estan vacíos' });

    if (title.length > 255)
      return res
        .status(400)
        .json({ message: 'El título solo debe tener 255 caracteres.' });

    if (typeof isComplete !== 'boolean')
      return res.status(400).json({ message: 'Debe ser verdadero o falso' });

    const connection = await connectDB();
    await connection.query(
      'INSERT INTO TASKS(title, description, isComplete) VALUES (?,?,?)',
      [title, description, isComplete]
    );
    connection.end();
    return res.status(200).json({ message: 'Tarea completa' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};
// Editar tareas por id
ctrl.editTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, isComplete } = req.body;

    if (!title.trim() || !description.trim())
      return res.status(400).json({ message: 'Hay datos que estan vacíos' });
    if (title.length > 255)
      return res
        .status(400)
        .json({ message: 'El título solo debe tener 255 caracteres.' });
    if (typeof isComplete !== 'boolean')
      return res.status(400).json({ message: 'Debe ser verdadero o falso' });
    if (!id)
      return res.status(400).send({ message: 'El id tiene que ser un numero' });

    const connection = await connectDB();
    connection.query(
      'UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?',
      [title, description, isComplete, id]
    );
    connection.end;
    return res.status(200).json({ message: 'Tarea editada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo editar la tarea' });
  }
};
// Eliminar tareas
ctrl.deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id)
      return res.status(400).send({ message: 'El id tiene que ser un numero' });
    const connection = await connectDB();
    const [results] = await connection.query(
      'SELECT * FROM tasks WHERE id = ?',
      id
    );
    if (results.length === 0)
      return res.status(404).send({ message: 'Tarea no encontrada' });

    await connection.query('DELETE FROM tasks WHERE id = ?', id);
    connection.end;
    return res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};
module.exports = ctrl;
