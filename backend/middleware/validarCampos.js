const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    // extrae los errores de la validacion
    const errors = validationResult(req);

    // si hay errores responde con un status 400 y los errores
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false, // es para el frontend
            errors: errors.mapped(), // devuelve los errores en objeto
        });
    }
    next(); // continuea con el siguiente middleware si no hay errores
};

module.exports = { validarCampos };
