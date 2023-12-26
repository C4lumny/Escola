const encriptarContraseña = require('../middlewares/authMiddleware');
const { pool } = require('../database/database');

const registroEstudiante = (req, res) => {
    // Lógica de registro para estudiantes
    // ...
  
    res.json({ mensaje: 'Registro de estudiante exitoso' });
  };
  
  const registroProfesor = (req, res) => {
    // Lógica de registro para profesores
    // ...

    res.json({ mensaje: 'Registro de profesor exitoso' });
  };
  
  const registroAcudiente = (req, res) => {
    // Lógica de registro para acudientes
    // ...
  
    res.json({ mensaje: 'Registro de acudiente exitoso' });
  };

  const registroAdministrador = async (req, res) => {
    try {
      const { usuario, contraseña, cedula, tipo_documento, tipo_usuario } = req.body;
      const contraseñaEncriptada = await encriptarContraseña(contraseña);
      await pool.query('CALL registrar_administrador($1, $2, $3, $4, $5)', [usuario, contraseñaEncriptada, cedula, tipo_documento, tipo_usuario]);

      res.status(201).json({ mensaje: 'Registro de administrador exitoso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const login = (req, res) => {
    // Lógica de inicio de sesión
    // ...
  
    res.json({ mensaje: 'Inicio de sesión exitoso' });
  };
  
  module.exports = {
    registroEstudiante,
    registroProfesor,
    registroAcudiente,
    registroAdministrador,
    login,
  };
  