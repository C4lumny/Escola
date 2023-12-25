const { studentsRouter } = require('./routes/students.routes')
const express = require("express");
const app = express();

app.use(express.json());

app.use(studentsRouter);

module.exports = app;

