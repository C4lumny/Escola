const { Router } = require('express');
const { getAllTeachers } = require("../controllers/teachers.controllers")

const router = Router();

router.get('/teachers', getAllTeachers)

module.exports = {
    teachersRouter: router,
}

