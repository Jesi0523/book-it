const fileUpload = require("express-fileupload");

const subirArchivos = fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
});

module.exports = subirArchivos;
