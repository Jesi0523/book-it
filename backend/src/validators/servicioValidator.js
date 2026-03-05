

const {body} = require("express-validator");

const createServicioValidator = [
    // nombre - exista y no este vacio
    body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre del servicio es requerido")
    .isLength({max:100}).withMessage("El nombre excedió longitud"),

    body("descripcion")
    // descripcion - exista y no este vacia
    .trim()
    .notEmpty().withMessage("La descripción es requerida"),

    body("precio")
    // precio - exista, sea numerico y no negativo
    .notEmpty().withMessage("Debe asignar un precio")
    .isNumeric().withMessage("El precio debe ser un número")
    .custom((value) => {
        if (value < 0) throw new Error("El precio no puede ser negativo");
        return true;
    }),

    body("duracion")
    // duracion - opcional porq el default es 30min, que sea numerico, no mayor a 3h y no negativo
    .optional()
    .isNumeric().withMessage("La duración del servicio debe ser un número")
    .isLength({max:180}).withMessage("La duración del servicio no puede exceder 3hrs")
    .custom((value) => {
        if (value < 0) throw new Error("La duración del servicio no puede ser negativa");
        return true;
    })
];

const updateServicioValidator = [
    // nombre - exista y no este vacio
    body("nombre")
    .optional()
    .trim()
    .notEmpty().withMessage("El nombre del servicio es requerido")
    .isLength({max:100}).withMessage("El nombre excedió longitud"),

    body("descripcion")
    // descripcion - exista y no este vacia
    .optional()
    .trim()
    .notEmpty().withMessage("La descripción es requerida"),

    body("precio")
    // precio - exista, sea numerico y no negativo
    .optional()
    .notEmpty().withMessage("Debe asignar un precio")
    .isNumeric().withMessage("El precio debe ser un número")
    .custom((value) => {
        if (value < 0) throw new Error("El precio no puede ser negativo");
        return true;
    }),

    body("duracion")
    // duracion - opcional porq el default es 30min, que sea numerico, no mayor a 3h y no negativo
    .optional()
    .isNumeric().withMessage("La duración del servicio debe ser un número")
    .isLength({max:180}).withMessage("La duración del servicio no puede exceder 3hrs")
    .custom((value) => {
        if (value < 0) throw new Error("La duración del servicio no puede ser negativa");
        return true;
    })
];

module.exports = { createServicioValidator, updateServicioValidator };