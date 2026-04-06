const { body } = require("express-validator");

const updateEmpresaValidator = [
    body("nombre")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El nombre de la empresa no puede estar vacío")
        .isLength({ max: 100 })
        .withMessage("El nombre de la empresa excedió longitud"),

    body("correo")
        .optional()
        .trim()
        .isEmail()
        .normalizeEmail() //convierte mayusculas a minusculas y elimina puntos innecesarios
        .withMessage("El correo de la empresa no es válido"),

    body("telefono")
        .optional()
        .trim()
        .isLength({ min: 10, max: 15 })
        .withMessage(
            "El teléfono de la empresa debe tener entre 10 y 15 caracteres",
        )
        .matches(/^\+?[0-9\s\-]+$/)
        .withMessage(
            "El teléfono de la empresa debe contener solo números, espacios, guiones o un signo + al inicio",
        ),

    body("descripcion")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("La descripción de la empresa no puede estar vacía")
        .isLength({ max: 1000 })
        .withMessage("La descripción de la empresa excedió la longitud máxima"),

    body("direccion")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("La dirección de la empresa no puede estar vacía"),

    body("slogan")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El slogan de la empresa no puede estar vacío")
        .isLength({ max: 500 })
        .withMessage("El slogan de la empresa excedió la longitud máxima"),

    body("logo").custom((value, { req }) => {
        // archivo nuevo de logo
        if (req.files && req.files.logo) {
            // si se sube un arreglo en lugar de un solo archivo se rechaza
            if (Array.isArray(req.files.logo)) {
                throw new Error(
                    "Solo se permite subir un archivo para el logo",
                );
            }

            const logoFile = req.files.logo;

            if (logoFile.size === 0) {
                throw new Error("El archivo del logo está vacío o dañado");
            }

            const formatosValidos = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/webp",
            ];
            if (!formatosValidos.includes(logoFile.mimetype)) {
                throw new Error(
                    "Solo se permiten imágenes en formato JPG, PNG o WEBP",
                );
            }

            return true;
        }

        // logo conservado
        if (value) {
            try {
                const logoViejo =
                    typeof value === "string" ? JSON.parse(value) : value;

                if (!logoViejo.url || !logoViejo.public_id) {
                    throw new Error(
                        "La estructura del logo conservado no es válida.",
                    );
                }
            } catch (error) {
                throw new Error(
                    "El formato de los datos del logo no es válido.",
                );
            }
        }

        return true;
    }),

    body("nuevasFotosGaleria").custom((value, { req }) => {
        if (!req.files || !req.files.nuevasFotosGaleria) {
            return true;
        }

        const fotosNuevas = Array.isArray(req.files.nuevasFotosGaleria)
            ? req.files.nuevasFotosGaleria
            : [req.files.nuevasFotosGaleria];

        const formatosValidos = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
        ];

        for (const foto of fotosNuevas) {
            if (foto.size === 0) {
                throw new Error(
                    `El archivo "${foto.name}" está vacío o dañado`,
                );
            }

            if (!formatosValidos.includes(foto.mimetype)) {
                throw new Error(
                    `El archivo "${foto.name}" no es válido. Solo se permiten imágenes JPG, PNG o WEBP`,
                );
            }
        }

        return true;
    }),
    body("galeria").custom((value) => {
        if (!value) {
            return true;
        }

        let galeriaParseada;

        try {
            galeriaParseada =
                typeof value === "string" ? JSON.parse(value) : value; // si es un string se parcea
        } catch (error) {
            throw new Error(
                "El formato de los datos de la galería no es válido.",
            );
        }

        // si no es un arreglo se rechaza
        if (!Array.isArray(galeriaParseada)) {
            throw new Error(
                "La galería debe enviarse como un arreglo de imágenes.",
            );
        }

        // cada imagen del arreglo debe tener url y public_id
        for (const [index, foto] of galeriaParseada.entries()) {
            if (!foto.url || !foto.public_id) {
                throw new Error(
                    `La imagen conservada en la posición ${index} no tiene una estructura válida (falta url o public_id).`,
                );
            }
        }

        return true;
    }),

    body("horarioGlobal").custom((value) => {
        if (!value) {
            return true;
        }

        let horarioParseado;

        try {
            horarioParseado =
                typeof value === "string" ? JSON.parse(value) : value;
        } catch (error) {
            throw new Error("El formato del horario no es válido.");
        }

        // debe de ser arreglo
        if (!Array.isArray(horarioParseado)) {
            throw new Error("El horario debe enviarse como un arreglo.");
        }

        const diasValidos = [
            "lunes",
            "martes",
            "miercoles",
            "jueves",
            "viernes",
            "sabado",
            "domingo",
        ];
        const diasVistos = new Set();
        const regexHora = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/; // formato de 00:00 a 23:59

        for (const turno of horarioParseado) {
            // campos obligatorios
            if (!turno.dia || !turno.horaInicio || !turno.horaFin) {
                throw new Error(
                    "Un registro del horario está incompleto. Faltan datos.",
                );
            }

            // que sea un dia de la semana valido
            if (!diasValidos.includes(turno.dia)) {
                throw new Error(`El día "${turno.dia}" no es un día válido.`);
            }

            // evitar dias duplicados
            if (diasVistos.has(turno.dia)) {
                throw new Error(
                    `El día "${turno.dia}" está duplicado en el horario.`,
                );
            }
            diasVistos.add(turno.dia);

            // formato hh mm valido
            if (
                !regexHora.test(turno.horaInicio) ||
                !regexHora.test(turno.horaFin)
            ) {
                throw new Error(
                    `Las horas para el día ${turno.dia} deben tener formato HH:MM (ej. 09:00).`,
                );
            }

            // Inicio debe ser antes de Fin
            if (turno.horaInicio >= turno.horaFin) {
                throw new Error(
                    `En el día ${turno.dia}, la hora de inicio debe ser menor a la hora de fin.`,
                );
            }
        }

        return true;
    }),
];

module.exports = {
    updateEmpresaValidator,
};
