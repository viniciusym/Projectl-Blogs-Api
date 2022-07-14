const express = require('express');
require('express-async-errors');
const errorHandler = require('./middleware/errorHandler');
const loginRoute = require('./routes/loginRoute');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRoute);

app.use(errorHandler);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
