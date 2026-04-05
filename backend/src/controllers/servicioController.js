
const logger = require("../config/logger");
const Servicio = require("../models/servicioModel");

// @route   GET /api/servicios/
// @desc    GET ALL servicios
// @access  Public
const getAllServicios = async (req, res) => {
    try{
        const servicios = await Servicio.find({ activo: true }); //.find() trae todos los activos

        res.status(200).json({
            ok:true,
            servicios // llave y valor se llaman igual, con solo ponerlo una vez funciona
        });
    } catch (error){
        logger.error("Error al obtener servicios:", error);
        res.status(500).json({
            ok:false,
            msg:"Error interno"
        });
    }
};

// @route   GET /api/servicios/:id
// @desc    GET ONE servicio
// @access  Public
const getOneServicio = async (req,res) => {
    try{
        const {id} = req.params; //extraer id de la URL

        const servicio = await Servicio.findById(id);

        if(!servicio) {
            return res.status(404).json({
                ok:false,
                msg:"Servicio no encontrado"
            });
        }

        res.status(200).json({
            ok:true,
            servicio
        });
    } catch (error) {
        logger.error("Error al obtener el servicio: ", error);
        res.status(500).json({ ok:false, msg: "Error interno. Revisa que el Id sea válido"});
    }

};

// @route   POST /api/servicios/
// @desc    CREATE servicio
// @access  Admin only
const createServicio = async (req, res) => {
    try {
        //extraer el req.body
        const {nombre, descripcion, precio, duracion } = req.body;

        const newServicio = new Servicio({
            nombre,
            descripcion,
            precio,
            duracion,
            fotoURL: "url_temporal_cloudinary" //dato falso temporal
        });

        //escribe en mongo
        await newServicio.save();

        res.status(201).json({
            ok:true,
            msg: "Servicio creado exitosamente",
        });
    } catch (error) {
        logger.error("Error al crear servicio:", error);
        res.status(500).json({ ok:false, msg:"Error interno"});
    }

};

// @route   PATCH /api/servicios/:id
// @desc    UPDATE servicio
// @access  Admin only
const updateServicio = async (req, res) => {
    try{
        const {id} = req.params;

        //findByIdAndUpdate(id, los nuevos datos, y opciones)
        //{new:true} trae el objeto ya actualizado no el anterior
        const updatedServicio = await Servicio.findByIdAndUpdate(id, req.body, {new:true});

        if(!updatedServicio){
            return res.status(404).json({ok:false, msg:"Servicio no encontrado"});
        }

        res.status(200).json({
            ok:true,
            servicio: updatedServicio,
            msg:"Servicio actualizado correctamente"
        });
    } catch(error) {
        logger.error("Error al actualizar servicio", error);
        res.status(500).json({ ok:false, msg:"Error interno"});
    }
};

// @route   DELETE /api/servicios/:id
// @desc    DELETE servicio SOFT DELETE
// @access  Admin only
const deleteServicio = async (req, res) => {
    try {
        const { id } = req.params;

        // findByIdAndUpdate solo para cambiar activo a false
        const deletedServicio = await Servicio.findByIdAndUpdate(
            id, 
            { activo: false },
            { new: true }      //devuelve el doc ya actualizado
        );

        if (!deletedServicio) {
            return res.status(404).json({ ok: false, msg: "Servicio no encontrado" });
        }

        res.status(200).json({
            ok: true,
            id:id,
            msg: "Servicio desactivado"
        });
    } catch (error) {
        logger.error("Error al eliminar servicio:", error);
        res.status(500).json({ ok: false, msg: "Error interno" });
    }
};

module.exports = {
    getAllServicios,
    getOneServicio,
    createServicio,
    updateServicio,
    deleteServicio
}