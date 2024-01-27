// 👇Import de routers
const { studentsRouter } = require('./routes/students.routes')
const { authRouter } = require('./routes/auth.routes');
const { teachersRouter } = require("./routes/teachers.routes")
// 👇Import de utilidades 
const express = require("express");
const cors = require('cors')
const app = express();

const routers = [authRouter, studentsRouter, teachersRouter];

// 👇 Uso de funciones de la app
app.use(express.json());
app.use(cors());
app.use(...routers);

module.exports = app;

