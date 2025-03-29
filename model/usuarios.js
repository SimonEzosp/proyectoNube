const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    pNombre:         { type: String, required: true, maxlength: 30 },
    sNombre:         { type: String, required: true, maxlength: 30 },
    pApellido:       { type: String, required: true, maxlength: 30 },
    sApellido:       { type: String, required: true, maxlength: 30 },
    nDocumento:      { type: Number, required: true, unique: true, max: 999999999999 },
    fNacimiento:     { type: String, required: true, maxlength: 10 },
    email:           { type: String, required: true, unique: true },
    direccion:       { type: String, required: true,  },
    contrasenia:     { type: String, required: true },
    nTelefonico:     { type: Number, required: true },
    urlFoto:         { type: String },
    nombreContainer: { type: String, maxlength: 30 },
    nombreDirectorio:{ type: String, maxlength: 100 },
    tokenAccess:     { type: String }
});

module.exports = mongoose.model('Usuario', registerSchema);
