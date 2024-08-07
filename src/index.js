const express = require('express');

const app = express();
const PORT = 3000;

//MIDDLEWARE
app.use(express.json());

//ROUTES
app.use(require('./routes/tasks.routes'));

app.listen(PORT, () =>
  console.log(`Server funcionando en el puerto: http://localhost:${PORT}`)
);
