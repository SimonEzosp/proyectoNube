const {Router} = require("express");
const router = Router();
const {crearUsuario,loginUsuario, traerUnSoloUsuario, actualizarUsuario,getRegister,elimiarUsuario,obtenerUsuarios,} = require("../controles/auth")


// crear usuario
router.post('/SignUp', crearUsuario );
// crear usuario
router.post('/SignIn', loginUsuario );
//traer usuario
router.get('/SignUp/Usuario/:id',getRegister,traerUnSoloUsuario );
//traer usuarios
router.get('/SignUp/Usuarios/all',obtenerUsuarios );
//actualizar usuairo
router.put('/SignUp/Actualizar/:id',getRegister,actualizarUsuario);
//eliminar usuario
router.delete('/SignUp/Eliminar/:id',getRegister,elimiarUsuario );


module.exports=router;