const { pool } = require("../database/database");
const { response } = require("../utils/apiResponse");

const getAllTeachers = async (req, res) => {
    try {
      const { rows: teachers } = await pool.query("SELECT * FROM VistaProfesores");
      res.status(200).json(response(teachers, 200, 'ok', 'correcto'));
    } catch (err) {
     res.status(500).json(response(null, 500, 'error', 'Error al traer profesores'));
    }
  };

module.exports = {
    getAllTeachers,
}