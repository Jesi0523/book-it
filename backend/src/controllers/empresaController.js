const logger = require("../config/logger");
const Empresa = require("../models/empresaModel");
const { subirImagen, borrarImagen } = require("../helpers/cloudinaryHelper");

// @route GET api/empresa
// @desc Get info empresa
// @access Admin Only
const getEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findOne(); // se supone que solo hay una empresa

        if (!empresa) {
            return res.status(404).json({
                ok: false,
                msg: "Empresa no encontrada",
            });
        }

        res.status(200).json({
            ok: true,
            empresa,
        });
    } catch (error) {
        logger.error("Error al obtener información de la empresa: ", error);
        res.status(500).json({
            ok: false,
            msg: "Error interno",
        });
    }
};

// @route PATCH api/empresa
// @desc PATCH info empresa
// @access Admin Only
const updateEmpresa = async (req, res) => {
    try {
        // solo hay una empresa
        const empresa = await Empresa.findOne();

        if (!empresa) {
            return res
                .status(404)
                .json({ ok: false, msg: "Empresa no encontrada" });
        }

        // sacar cosas que ocupan parseo
        const {
            logo,
            horarioGlobal,
            galeriaConservada,
            imagenPrincipal,
            ...data
        } = req.body || {};

        // actualiza datos simples
        Object.assign(empresa, data);

        // se procesa el horario global
        if (horarioGlobal) {
            empresa.horarioGlobal =
                typeof horarioGlobal === "string"
                    ? JSON.parse(horarioGlobal)
                    : horarioGlobal;
        }

        // archivos de 1 foto - logo e imagen principal

        // LOGO - si mandaron la foto
        if (req.files && req.files.logo) {
            if (empresa.logo && empresa.logo.public_id) {
                await borrarImagen(empresa.logo.public_id);
            }
            empresa.logo = await subirImagen(req.files.logo, "empresa");
        }

        // Imagen principal - si mandaron la foto
        if (req.files && req.files.imagenPrincipal) {
            if (empresa.imagenPrincipal && empresa.imagenPrincipal.public_id) {
                await borrarImagen(empresa.imagenPrincipal.public_id);
            }
            empresa.imagenPrincipal = await subirImagen(
                req.files.imagenPrincipal,
                "empresa_portada",
            );
        }

        // Galería

        // Checar si modificaron la galería o si mandaron fotos nuevas
        const tocaGaleria =
            galeriaConservada !== undefined ||
            (req.files && req.files.nuevasFotosGaleria);

        if (tocaGaleria) {
            // desempaquetar fotos viejas
            let viejas = [];
            if (
                galeriaConservada &&
                galeriaConservada !== "undefined" &&
                galeriaConservada !== "null"
            ) {
                viejas =
                    typeof galeriaConservada === "string"
                        ? JSON.parse(galeriaConservada)
                        : galeriaConservada;
            }

            // sacar id que sobrevivieron
            const idsConservados = viejas.map((img) => img.public_id);

            // borrar en cloudinary las que el usuario quitó
            const imagenesParaBorrar = empresa.galeria.filter(
                (img) => !idsConservados.includes(img.public_id),
            );

            for (const img of imagenesParaBorrar) {
                if (img.public_id) await borrarImagen(img.public_id);
            }

            let galeriaFinal = [...viejas];

            // subir fotos y agregarlas al arreglo
            if (req.files && req.files.nuevasFotosGaleria) {
                const fotosNuevas = Array.isArray(req.files.nuevasFotosGaleria)
                    ? req.files.nuevasFotosGaleria
                    : [req.files.nuevasFotosGaleria];

                for (const foto of fotosNuevas) {
                    const fotoSubida = await subirImagen(
                        foto,
                        "empresa_galeria",
                    );
                    galeriaFinal.push(fotoSubida);
                }
            }

            // guardar el arreglo
            empresa.galeria = galeriaFinal;
        }

        // guardar todo
        const empresaActualizada = await empresa.save();

        res.status(200).json({
            ok: true,
            msg: "Información actualizada correctamente",
            empresa: empresaActualizada,
        });
    } catch (error) {
        logger.error(
            "Error al actualizar la información de la empresa: ",
            error,
        );
        res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
};

module.exports = {
    getEmpresa,
    updateEmpresa,
};
