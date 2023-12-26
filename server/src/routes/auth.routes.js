const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');

// Rutas de registro
router.post('/registro/estudiante', authController.registroEstudiante);
router.post('/registro/profesor', authController.registroProfesor);
router.post('/registro/acudiente', authController.registroAcudiente);
router.post('/signup/administrators', authController.registroAdministrador);

// Rutas de inicio de sesión
router.post('/login', authController.login);

module.exports = {
    authRouter: router,
};
