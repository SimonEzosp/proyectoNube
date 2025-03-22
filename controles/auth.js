const {response} = require("express");
const Usuario = require("../model/usuarios")

const crearUsuario = async (req,res)=>{
    const {correo} = req.body;
    try {
        let register = await Usuario.findOne({correo : correo});
        if(register){
            console.log("Ya existe un usuario con este correo","\n")
            return res.status(400).json({message: "ya existe un usuario con ese correo"})
        }
        console.log("usuario creado");
        let usuario = new Usuario(req.body);
        await usuario.save();
        return res.status(200).json({message: "usuario creado"});

    } catch (err) {
        console.log(err)
        res.status(400).json({status: err.message})
    }
}

//tomar solo un usuario

const traerUnSoloUsuario =(req, res)=>{
    console.log(res.usuario,"\n")
    res.json(res.usuario)
}

//obtener usuarios
const obtenerUsuarios =async (req, res)=>{
    try {
        const registers = await Usuario.find();
        console.log(registers,"\n");
        res.json(registers);
    } catch (err) {
        console.log(err)
        res.status(500).json({status: err.message})
        
    }
}

//actualizar usuario
const actualizarUsuario = async(req, res)=>{
    // if(req.nombre != null){
    //     res.usuario.nombre= req.body.name;
    // }
    // if(req.segundoNombre != null){
    //     res.usuario.segundoNombre= req.body.segundoNombre;
    // }
    // if(req.primerApellido != null){
    //     res.usuario.primerApellido= req.body.primerApellido;
    // }
    // if(req.segundoApellido != null){
    //     res.usuario.segundoApellido= req.body.segundoApellido;
    // }
    // if(req.correo != null){
    //     res.usuario.correo= req.body.correo;
    // }
    // if(req.contrasena != null){
    //     res.usuario.contrasena= req.body.contrasena;
    // }
    // if(req.fechaNacimiento != null){
    //     res.usuario.fechaNacimiento= req.body.fechaNacimiento;
    // }
    // if(req.numeroCelular != null){
    //     res.usuario.numeroCelular= req.body.numeroCelular;
    // }
    try {
        const register = await Usuario.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: "Usuario actualizado",register})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//eliminar usuario
const elimiarUsuario = async (req, res)=>{
    const registerId = req.params.id
    let register
    try {
        register = await Usuario.findByIdAndDelete(registerId)
        res.json({message: 'usuario eliminado', register})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getRegister(req, res, next){
    const registerId = req.params.id
    let register = await Usuario.findById(registerId);
    try{
        if(!register){
            return res.status(404).json({message: ' cannot find user'})
        }else{
            res.usuario = register;
            next();
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    
}

module.exports={
    crearUsuario,
    actualizarUsuario,
    elimiarUsuario,
    traerUnSoloUsuario,
    obtenerUsuarios,
    getRegister
}