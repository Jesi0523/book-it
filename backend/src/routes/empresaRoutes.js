const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

const { validarCampos } = require("../middleware/validarCampos");
const { updateEmpresaValidator } = require("../validators/empresaValidator");
const { validarJWT } = require("../middleware/validarJWT");
const { validarAdmin } = require("../middleware/validarAdmin");

router.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
    }),
);

const {
    getEmpresa,
    updateEmpresa,
} = require("../controllers/empresaController");

router.get("/", getEmpresa);
router.patch(
    "/",
    [validarJWT, validarAdmin, updateEmpresaValidator, validarCampos],
    updateEmpresa,
);

module.exports = router;
