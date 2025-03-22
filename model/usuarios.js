const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    nombre:{ type:String, required: true},
    segundoNombre:{ type:String, required: true},
    primerApellido:{ type:String, required: true},
    segundoApellido:{ type:String, required: true},
    correo:{ type:String, required: true, unique:true},
    contrasena:{ type:String, required: true},
    fechaNacimiento:{ type:String,required:true},
    numeroCelular:{type:Number,required:true}
})

module.exports = mongoose.model('Usuario',registerSchema);