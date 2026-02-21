const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    informacionAdicional: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },

    servicios: [
        // es opcional porque el Admin puede crear al empleado y luego editarlo para agregarle los servicios, o almenos para el seeding lol
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "servicio",
        },
    ],

    horario: [
        // es opcional porque el Admin puede crear al empleado y luego editarlo para agregarle el horario
        {
            dia: {
                // es obligatorio SOLO SI se ingresa el objeto horario, pero no es obligatorio ingresar el objeto horario
                type: String,
                enum: [
                    "lunes",
                    "martes",
                    "miercoles",
                    "jueves",
                    "viernes",
                    "sabado",
                    "domingo",
                ],
                required: true,
            },
            horaInicio: {
                // es obligatorio SOLO SI se ingresa el objeto horario
                type: String,
                required: true,
            },
            horaFin: {
                // es obligatorio SOLO SI se ingresa el objeto horario
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model("empleado", empleadoSchema);
