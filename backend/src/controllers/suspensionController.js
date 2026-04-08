const { matchedData } = require("express-validator");
const logger = require("../config/logger");
const Suspension = require("../models/suspensionModel");

// @route GET api/suspensiones
// @desc GET suspensiones by month
// @access Private
const getSuspensiones = async (req, res) => {
    try {
        const mes = parseInt(req.query.mes) || new Date().getMonth() + 1;
        const anio = parseInt(req.query.anio) || new Date().getFullYear();

        const inicioMes = new Date(anio, mes - 1, 1);
        const finMes = new Date(anio, mes, 1);

        const suspensiones = await Suspension.find({
            fecha: { $gte: inicioMes, $lt: finMes },
            activo: true,
        });

        res.status(200).json({
            ok: true,
            suspensiones,
        });
    } catch (error) {
        logger.error("Error al traer las suspensiones: ", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno",
        });
    }
};

// @route POST api/suspensiones
// @desc POST suspensiones
// @access Admin Only

const createSuspension = async (req, res) => {
    try {
        const data = matchedData(req, { locations: ["body"] });

        if (data.todoElDia) {
            data.horaInicio = "00:00";
            data.horaFin = "23:59";
        }

        const newSuspension = new Suspension(data);

        await newSuspension.save();

        res.status(201).json({
            ok: true,
            msg: "Suspension creada correctamente",
        });
    } catch (error) {
        logger.error("Error al crear la suspension: ", error);
        res.status(500).json({
            ok: false,
            msg: "Error Interno",
        });
    }
};

// @route DELETE api/suspensiones
// @desc DELETE suspensiones
// @access Admin Only

const deleteSuspension = async (req, res) => {
    try {
        let { id } = req.params;

        const deletedSuspension = await Suspension.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        if (!deletedSuspension) {
            return res.status(404).json({
                ok: false,
                msg: "Suspension no encontrada",
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Suspension eliminada correctamente",
        });
    } catch (error) {
        logger.error("Error al eliminar la suspension: ", error);
        res.status(500).json({
            ok: false,
            msg: "Error Interno",
        });
    }
};

module.exports = {
    getSuspensiones,
    createSuspension,
    deleteSuspension,
};
