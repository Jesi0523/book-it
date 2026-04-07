const { body } = require("express-validator");
const Empleado = require("../models/empleadoModel");

const createEmpleadoValidator = [
    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre es requerido")
        .isLength({ min: 3, max: 80 }) // se pueden separar pero por simplicidad asi lo deje
        .withMessage("El nombre debe tener entre 3 y 80 caracteres")
        .escape(), // para evitar inyecciones de codigo, convierte caracteres especiales a entidades HTML

    body("correo")
        .isEmail()
        .withMessage("El correo debe ser válido")
        .normalizeEmail() //convierte mayusculas a minusculas y elimina puntos innecesarios
        .custom(async (value) => {
            // checa si el correo ya existe en la db
            const empleadoExistente = await Empleado.findOne({ correo: value });
            if (empleadoExistente) {
                // si existe lanza un error
                throw new Error("El correo electrónico ya está registrado");
            }
            return true;
        }),

    body("telefono")
        .trim()
        .notEmpty()
        .withMessage("El teléfono es requerido")
        .isMobilePhone("any")
        .withMessage("El teléfono debe ser válido"),

    body("fechaNacimiento")
        .trim()
        .notEmpty()
        .withMessage("La fecha de nacimiento es requerida")
        .isISO8601() // AAAAA-MM-DD
        .toDate()
        .custom((value) => {
            const fechaIngresada = new Date(value);
            const hoy = new Date();
            if (fechaIngresada > hoy) {
                throw new Error(
                    "La fecha de nacimiento no puede ser en el futuro",
                );
            }
            let edad = hoy.getFullYear() - fechaIngresada.getFullYear();
            const diferenciaMeses = hoy.getMonth() - fechaIngresada.getMonth();

            if (
                diferenciaMeses < 0 ||
                (diferenciaMeses === 0 &&
                    hoy.getDate() < fechaIngresada.getDate())
            ) {
                edad--;
            }

            if (edad < 18) {
                throw new Error(
                    "El empleado debe de tener al menos 18 años de edad",
                );
            }

            return true;
        }),

    body("informacion")
        .trim()
        .notEmpty()
        .withMessage("La información es requerida")
        .isLength({ max: 500 })
        .withMessage("La información no puede tener más de 500 caracteres"),

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

    body("servicios")
        .customSanitizer((value) => {
            // si llega como string [] lo convierte a arreglo real
            // Si llega vacío o no llega, lo deja como arreglo vacío
            if (!value || value === "[]" || value === "") return [];
            return typeof value === "string" ? JSON.parse(value) : value;
        })
        .isArray()
        .withMessage("Los servicios deben enviarse como un arreglo")
        .custom(async (serviciosArray) => {
            if (serviciosArray.length === 0) return true;

            //validar que los strings tengan formato de ObjectId
            const m = require("mongoose");
            const todosSonIdsValidos = serviciosArray.every((id) =>
                m.Types.ObjectId.isValid(id),
            );

            if (!todosSonIdsValidos) {
                throw new Error(
                    "Uno o más IDs de servicios no tienen un formato válido",
                );
            }

            // verificar que esos servicios existan
            const Servicio = require("../models/servicioModel");
            const serviciosEncontrados = await Servicio.countDocuments({
                _id: { $in: serviciosArray },
                activo: true,
            });

            if (serviciosEncontrados !== serviciosArray.length) {
                throw new Error(
                    "Uno o más servicios seleccionados no existen en la base de datos",
                );
            }

            return true;
        }),

    body("horario")
        .customSanitizer((value) => {
            // si llega como string [] lo convierte a arreglo real
            // Si llega vacío o no llega, lo deja como arreglo vacío
            if (!value || value === "[]" || value === "") return [];
            return typeof value === "string" ? JSON.parse(value) : value;
        })
        .isArray()
        .withMessage("El horario debe de enviarse como un arreglo")
        .custom(async (value) => {
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

            // traer el horario de la empresa
            const Empresa = require("../models/empresaModel");
            const empresa = await Empresa.findOne();

            if (!empresa || !empresa.horarioGlobal) {
                throw new Error(
                    "No se puede validar el horario porque la empresa no tiene un horario configurado.",
                );
            }

            // ---

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
                    throw new Error(
                        `El día "${turno.dia}" no es un día válido.`,
                    );
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
                // validar que el horario del empleado esté dentro del horario global de la empresa

                const horarioEmpresaDia = empresa.horarioGlobal.find(
                    (h) => h.dia === turno.dia,
                );

                if (!horarioEmpresaDia) {
                    throw new Error(
                        `La empresa no abre los días ${turno.dia}, no le puedes asignar turno ese día.`,
                    );
                }

                // Validar apertura
                if (turno.horaInicio < horarioEmpresaDia.horaInicio) {
                    throw new Error(
                        `En ${turno.dia}, el empleado no puede entrar antes (${turno.horaInicio}) de que abra la empresa (${horarioEmpresaDia.horaInicio}).`,
                    );
                }

                // Validar cierre
                if (turno.horaFin > horarioEmpresaDia.horaFin) {
                    throw new Error(
                        `En ${turno.dia},   el empleado no puede salir después (${turno.horaFin}) del cierre de la empresa (${horarioEmpresaDia.horaFin}).`,
                    );
                }
            }

            return true;
        }),
];

const updateEmpleadoValidator = [
    body("nombre")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El nombre es requerido")
        .isLength({ min: 3, max: 80 })
        .withMessage("El nombre debe tener entre 3 y 80 caracteres")
        .escape(), // para evitar inyecciones de codigo, convierte caracteres especiales a entidades HTML

    body("correo")
        .optional()
        .isEmail()
        .withMessage("El correo debe ser válido")
        .normalizeEmail() //convierte mayusculas a minusculas y elimina puntos innecesarios
        .custom(async (value) => {
            // checa si el correo ya existe en la db
            const empleadoExistente = await Empleado.findOne({ correo: value });
            if (empleadoExistente) {
                // si existe lanza un error
                throw new Error("El correo electrónico ya está registrado");
            }
            return true;
        }),

    body("telefono")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El teléfono es requerido")
        .isMobilePhone("any")
        .withMessage("El teléfono debe ser válido"),

    body("fechaNacimiento")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("La fecha de nacimiento es requerida")
        .isISO8601() // AAAAA-MM-DD
        .toDate()
        .custom((value) => {
            const fechaIngresada = new Date(value);
            const hoy = new Date();
            if (fechaIngresada > hoy) {
                throw new Error(
                    "La fecha de nacimiento no puede ser en el futuro",
                );
            }
            let edad = hoy.getFullYear() - fechaIngresada.getFullYear();
            const diferenciaMeses = hoy.getMonth() - fechaIngresada.getMonth();

            if (
                diferenciaMeses < 0 ||
                (diferenciaMeses === 0 &&
                    hoy.getDate() < fechaIngresada.getDate())
            ) {
                edad--;
            }

            if (edad < 18) {
                throw new Error(
                    "El empleado debe de tener al menos 18 años de edad",
                );
            }

            return true;
        }),

    body("informacion")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("La información es requerida")
        .isLength({ max: 500 })
        .withMessage("La información no puede tener más de 500 caracteres"),

    body("foto").custom((value, { req }) => {
        if (!req.files || !req.files.foto) {
            return true; // si no mandan archivo se deja pasar
        }

        // valida que sea solo 1 imagen
        if (Array.isArray(req.files.foto)) {
            throw new Error("Solo se permite una foto para el empleado");
        }

        const foto = req.files.foto;

        // verificar que no esté dañado
        if (foto.size === 0) {
            throw new Error("El archivo de la foto del empleado viene dañado");
        }

        // validar formato
        const formatosValidos = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
        ];

        if (!formatosValidos.includes(foto.mimetype)) {
            throw new Error(
                "Formato inválido para la foto del empleado. Solo JPG, PNG o WEBP.",
            );
        }
        return true;
    }),

    body("servicios")
        .optional()
        .customSanitizer((value) => {
            // si llega como string [] lo convierte a arreglo real
            // Si llega vacío o no llega, lo deja como arreglo vacío
            if (!value || value === "[]" || value === "") return [];
            return typeof value === "string" ? JSON.parse(value) : value;
        })
        .isArray()
        .withMessage("Los servicios deben enviarse como un arreglo")
        .custom(async (serviciosArray) => {
            if (serviciosArray.length === 0) return true;

            //validar que los strings tengan formato de ObjectId
            const m = require("mongoose");
            const todosSonIdsValidos = serviciosArray.every((id) =>
                m.Types.ObjectId.isValid(id),
            );

            if (!todosSonIdsValidos) {
                throw new Error(
                    "Uno o más IDs de servicios no tienen un formato válido",
                );
            }

            // verificar que esos servicios existan
            const Servicio = require("../models/servicioModel");
            const serviciosEncontrados = await Servicio.countDocuments({
                _id: { $in: serviciosArray },
                activo: true,
            });

            if (serviciosEncontrados !== serviciosArray.length) {
                throw new Error(
                    "Uno o más servicios seleccionados no existen en la base de datos",
                );
            }

            return true;
        }),

    body("horario")
        .optional()
        .customSanitizer((value) => {
            // si llega como string [] lo convierte a arreglo real
            // Si llega vacío o no llega, lo deja como arreglo vacío
            if (!value || value === "[]" || value === "") return [];
            return typeof value === "string" ? JSON.parse(value) : value;
        })
        .isArray()
        .withMessage("El horario debe de enviarse como un arreglo")
        .custom(async (value) => {
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

            // traer el horario de la empresa
            const Empresa = require("../models/empresaModel");
            const empresa = await Empresa.findOne();

            if (!empresa || !empresa.horarioGlobal) {
                throw new Error(
                    "No se puede validar el horario porque la empresa no tiene un horario configurado.",
                );
            }

            // ---

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
                    throw new Error(
                        `El día "${turno.dia}" no es un día válido.`,
                    );
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
                // validar que el horario del empleado esté dentro del horario global de la empresa

                const horarioEmpresaDia = empresa.horarioGlobal.find(
                    (h) => h.dia === turno.dia,
                );

                if (!horarioEmpresaDia) {
                    throw new Error(
                        `La empresa no abre los días ${turno.dia}, no le puedes asignar turno ese día.`,
                    );
                }

                // Validar apertura
                if (turno.horaInicio < horarioEmpresaDia.horaInicio) {
                    throw new Error(
                        `En ${turno.dia}, el empleado no puede entrar antes (${turno.horaInicio}) de que abra la empresa (${horarioEmpresaDia.horaInicio}).`,
                    );
                }

                // Validar cierre
                if (turno.horaFin > horarioEmpresaDia.horaFin) {
                    throw new Error(
                        `En ${turno.dia},   el empleado no puede salir después (${turno.horaFin}) del cierre de la empresa (${horarioEmpresaDia.horaFin}).`,
                    );
                }
            }

            return true;
        }),
];

module.exports = { createEmpleadoValidator, updateEmpleadoValidator };
