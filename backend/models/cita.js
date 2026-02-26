const mongoose = require("mongoose");

const citaSchema = new mongoose.Schema(
    {
        usuarioId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usuario",
        }, // viene del front, el ID del cliente que tiene la sesión iniciada

        empleadoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "empleado",
        }, // ID del empleado que el cliente seleccionó

        fecha: {
            type: Date,
            required: true,
        },

        horaInicio: {
            type: String,
            required: true,
        },

        // SE CALCULA EN EL BACK
        // ** QUIZA NO HACE FALTA GUARDARLO, PERO PUEDE QUE SEA MAS FACIL EN EL FRONT YA TENERLO **
        // la duración total de todos los servicios seleccionados.
        horaFin: {
            type: String,
            required: true,
        },

        // SE ARMA EN EL BACK ** nota para aylin
        // El Front manda el ID del servicio, y haces un findById(), sacas estos datos y los pegas aquí para congelar el precio y duración
        servicioAgendado: {
            servicioId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Servicio",
                required: true,
            },
            nombreSnapshot: {
                type: String,
                required: true,
            },
            precioSnapshot: {
                type: Number,
                required: true,
            },
            /* duracionSnapshot: {
                type: Number,
                required: true,
            }, // en minutos */
        },

        total: {
            type: Number,
            required: true,
        },

        estado: {
            type: String,
            enum: ["pendiente", "confirmada", "realizada", "cancelada"],
            default: "pendiente",
        },

        datosPaciente: {
            // es por si es para un tercero
            nombre: { type: String },
            edad: { type: Number },
            sexo: { type: String },
            telefono: { type: String },
            correo: { type: String },
        },
    },
    { timestamps: true }, // Crea 'createdAt' y 'updatedAt' solitos
);

module.exports = mongoose.model("cita", citaSchema);
