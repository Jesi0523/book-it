const Usuario = require("../models/usuarioModel");
const bcrypt = require("bcryptjs");

// const jwt = require("jsonwebtoken");

// @route   POST /api/usuarios/register
// @desc    Registrar un nuevo usuario
// @access  Public
const registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password, sexo, telefono, fechaNacimiento } =
            req.body; // se desestructura el cuerpo para mayor seguridad, a lo que entendi lol

        // crear el nuevo usuario con los datos de req.body
        let usuario = new Usuario({
            nombre,
            correo,
            password,
            sexo,
            telefono,
            fechaNacimiento,
        });

        // encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);

        //guardar en la base de datos
        await usuario.save();

        // generar respuesta (cambiar luego, es para postman)
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombre,
            msg: "Registro completado con éxito",
        });
    } catch (error) {
        console.error("Error en Registrar Usuario:", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

module.exports = {
    registrarUsuario,
};
