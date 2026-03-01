const mongoose = require("mongoose");

const suspensionSchema = new mongoose.Schema(
    {
        empleadoId: {
            // si no tiene id, es para todos los empleados
            type: mongoose.Schema.Types.ObjectId,
            ref: "Empleado",
            default: null,
        },
        fecha: {
            type: Date,
            required: true,
        },
        todoElDia: {
            type: Boolean,
            default: true,
        },
        horaInicio: {
            type: String,
            // Solo es obligatorio si "todoElDia" es falso
            required: function () {
                return this.todoElDia === false;
            },
        },
        horaFin: {
            type: String,
            // Solo es obligatorio si "todoElDia" es falso
            required: function () {
                return this.todoElDia === false;
            },
        },
    },
    { timestamps: true }, // Crea 'createdAt' y 'updatedAt' solitos
);

module.exports = mongoose.model("Suspension", suspensionSchema);
