import connectionDB from '../databases/task_db.js';

// Obtener todas las tareas
export const obtenerTasks = async (req, res) => {
  let connection;
  try {
    // Lógica de la base de datos
    connection = await connectionDB();
    const [results] = await connection.query('SELECT * FROM tasks');
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener las tareas' });
  } finally {
    if (connection) connection.release();
  }
};

// Obtener una tarea mediante su id
export const obtenerTask = async (req, res) => {
  let connection;
  try {
    // El ID tiene que ser número
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).send({ message: 'El id tiene que ser un numero' });
    }
    // Lógica de la Base de Datos
    connection = await connectionDB();
    const [results] = await connection.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );
    if (results.length === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error al obtener la tarea específica' });
  } finally {
    if (connection) connection.release();
  }
};

// Crear una nueva tarea
export const createTasks = async (req, res) => {
  let connection;
  try {
    const { title, description, isComplete } = req.body;
    // Lógica Base de Datos
    connection = await connectionDB();
    await connection.query(
      'INSERT INTO TASKS(title, description, isComplete) VALUES (?,?,?)',
      [title, description, isComplete]
    );
    return res.status(201).json({ message: 'Tarea creada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear la tarea' });
  } finally {
    if (connection) connection.release();
  }
};

// Editar tareas por id
export const editTask = async (req, res) => {
  let connection;
  try {
    const id = parseInt(req.params.id);
    const { title, description, isComplete } = req.body;
    // Lógica Base de Datos
    connection = await connectionDB();
    await connection.query(
      'UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?',
      [title, description, isComplete, id]
    );
    return res.status(200).json({ message: 'Tarea editada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'No se pudo editar la tarea' });
  } finally {
    if (connection) connection.release();
  }
};

// Eliminar tareas
export const deleteTask = async (req, res) => {
  let connection;
  try {
    const id = parseInt(req.params.id);
    connection = await connectionDB();
    const [results] = await connection.query(
      'SELECT * FROM tasks WHERE id = ?',
      [id]
    );
    if (results.length === 0) {
      return res.status(404).send({ message: 'Tarea no encontrada' });
    }
    await connection.query('DELETE FROM tasks WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar la tarea' });
  } finally {
    if (connection) connection.release();
  }
};
