const { body } = require("express-validator");
const Usuario = require("../models/usuarioModel");

const registroValidator = [
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
            const usuarioExistente = await Usuario.findOne({ correo: value });
            if (usuarioExistente) {
                // si existe lanza un error
                throw new Error("El correo electrónico ya está registrado");
            }
            return true;
        }),

    body("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
        .isLength({ max: 20 })
        .withMessage("La contraseña no puede tener más de 20 caracteres")
        .matches(/[A-Z]/)
        .withMessage("Debe contener al menos una letra mayúscula")
        .matches(/[a-z]/)
        .withMessage("Debe contener al menos una letra minúscula")
        .matches(/[0-9]/)
        .withMessage("Debe contener al menos un número")
        .matches(/[^A-Za-z0-9]/)
        .withMessage("Debe contener al menos un carácter especial"),

    body("sexo")
        .toLowerCase()
        .notEmpty()
        .withMessage("El sexo es requerido")
        .isIn(["masculino", "femenino"])
        .withMessage("El sexo debe ser 'masculino' o 'femenino'"),

    body("telefono")
        .trim()
        .notEmpty()
        .withMessage("El teléfono es requerido")
        .isMobilePhone("any")
        .withMessage("El teléfono debe ser válido"),

    body("fechaNacimiento", "La fecha de nacimiento no es válida")
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
                    "Debes tener al menos 18 años para registrarte",
                );
            }

            return true;
        }),
];

module.exports = { registroValidator };
