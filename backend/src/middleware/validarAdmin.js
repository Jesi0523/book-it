

////VALIDAR SI EL USUARIO ES ADMIN////

const validarAdmin = (req, res, next) => {
    
    //1) ver que exista el rol en la peticion
    if (!req.rol){
        return res.status(500).json({
            ok: false,
            msg:"Se quiere verificar el rol sin validar el token primero"
        });
    }

    //2) revisar que sea admin
    if(req.rol !== "ADMIN"){
        return res.status(403).json({
            ok:false,
            msg:"NO AUTORIZADO: Esta acción requiere rol de administrador"
        })
    }

    //3) si no hubo errores es admin, continuar
    next();
};

module.exports = { validarAdmin };