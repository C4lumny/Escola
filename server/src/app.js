const { studentsRouter } = require('./routes/students.routes')
const { authRouter } = require('./routes/auth.routes');
const express = require("express");
const app = express();

app.use(express.json());
app.use(authRouter);

module.exports = app;

