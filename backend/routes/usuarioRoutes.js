const express = require("express");
const router = express.Router();

const { registroValidator } = require("../validators/usuarioValidator");
const { validarCampos } = require("../middleware/validarCampos");
const { registrarUsuario } = require("../controllers/usuarioController");

router.post("/registro", [registroValidator, validarCampos], registrarUsuario);

module.exports = router;
