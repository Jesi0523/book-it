const { body } = require("express-validator");

const createServicioValidator = [
    // nombre - exista y no este vacio
    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre del servicio es requerido")
        .isLength({ max: 100 })
        .withMessage("El nombre excedió longitud"),

    body("descripcion")
        // descripcion - exista y no este vacia
        .trim()
        .notEmpty()
        .withMessage("La descripción es requerida"),

    body("precio")
        // precio - exista, sea numerico y no negativo
        .notEmpty()
        .withMessage("Debe asignar un precio")
        .isNumeric()
        .withMessage("El precio debe ser un número")
        .custom((value) => {
            if (value < 0) throw new Error("El precio no puede ser negativo");
            return true;
        }),

    body("duracion")
        // duracion - opcional porq el default es 30min, que sea numerico, no mayor a 3h y no negativo
        .optional()
        .isNumeric()
        .withMessage("La duración del servicio debe ser un número")
        .isLength({ max: 180 })
        .withMessage("La duración del servicio no puede exceder 3hrs")
        .custom((value) => {
            if (value < 0)
                throw new Error(
                    "La duración del servicio no puede ser negativa",
                );
            return true;
        }),

    body("foto").custom((value, { req }) => {
        if (Array.isArray(req.files.foto)) {
            throw new Error("Solo se permite un archivo por empleado");
        }

        if (!req.files || !req.files.foto) {
            throw new Error(
                "La foto es obligatoria para registrar un nuevo empleado.",
            );
        }

        if (req.files.foto.size === 0) {
            throw new Error("El archivo de la foto está vacío");
        }

        const formatosValidos = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
        ];
        if (!formatosValidos.includes(req.files.foto.mimetype)) {
            throw new Error(
                "Solo se permiten imágenes en formato JPG, PNG o WEBP",
            );
        }

        return true;
    }),
];

const updateServicioValidator = [
    // nombre - exista y no este vacio
    body("nombre")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El nombre del servicio es requerido")
        .isLength({ max: 100 })
        .withMessage("El nombre excedió longitud"),

    body("descripcion")
        // descripcion - exista y no este vacia
        .optional()
        .trim()
        .notEmpty()
        .withMessage("La descripción es requerida"),

    body("precio")
        // precio - exista, sea numerico y no negativo
        .optional()
        .notEmpty()
        .withMessage("Debe asignar un precio")
        .isNumeric()
        .withMessage("El precio debe ser un número")
        .custom((value) => {
            if (value < 0) throw new Error("El precio no puede ser negativo");
            return true;
        }),

    body("duracion")
        // duracion - opcional porq el default es 30min, que sea numerico, no mayor a 3h y no negativo
        .optional()
        .isNumeric()
        .withMessage("La duración del servicio debe ser un número")
        .isLength({ max: 180 })
        .withMessage("La duración del servicio no puede exceder 3hrs")
        .custom((value) => {
            if (value < 0)
                throw new Error(
                    "La duración del servicio no puede ser negativa",
                );
            return true;
        }),

    body("foto").custom((value, { req }) => {
        if (!req.files || !req.files.foto) {
            return true;
        }

        const foto = req.files.foto;

        if (foto.size === 0) {
            throw new Error("El archivo de la foto está vacío o dañado");
        }

        const formatosValidos = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
        ];

        if (!formatosValidos.includes(foto.mimetype)) {
            throw new Error(
                "Solo se permiten imágenes en formato JPG, PNG o WEBP",
            );
        }

        return true;
    }),
];

module.exports = { createServicioValidator, updateServicioValidator };
