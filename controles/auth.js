const { response } = require("express");
const Usuario = require("../model/usuarios");

// Crear usuario
const crearUsuario = async (req, res = response) => {
    const { email } = req.body;

    try {
        const existe = await Usuario.findOne({ email });
        if (existe) {
            console.log("❌ Ya existe un usuario con este correo\n");
            return res.status(400).json({ message: "Ya existe un usuario con ese correo" });
        }

        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();

        console.log("✅ Usuario creado correctamente\n");
        return res.status(201).json({ message: "Usuario creado" });

    } catch (err) {
        console.error("❌ Error al crear usuario:", err.message);
        return res.status(500).json({ message: err.message });
    }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res = response) => {
    try {
        const usuarios = await Usuario.find();
        console.log("📋 Lista de usuarios obtenida\n");
        res.json(usuarios);
    } catch (err) {
        console.error("❌ Error al obtener usuarios:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Obtener un solo usuario
const traerUnSoloUsuario = (req, res = response) => {
    console.log("👤 Usuario obtenido:", res.usuario, "\n");
    res.json(res.usuario);
};

// Actualizar usuario
const actualizarUsuario = async (req, res = response) => {
    try {
        const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario actualizado", usuario: actualizado });
    } catch (err) {
        console.error("❌ Error al actualizar usuario:", err.message);
        res.status(400).json({ message: err.message });
    }
};

// Eliminar usuario
const elimiarUsuario = async (req, res = response) => {
    try {
        const eliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado", usuario: eliminado });
    } catch (err) {
        console.error("❌ Error al eliminar usuario:", err.message);
        res.status(500).json({ message: err.message });
    }
};

// Middleware: obtener un usuario por ID
const getRegister = async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.usuario = usuario;
        next();
    } catch (err) {
        console.error("❌ Error en middleware getRegister:", err.message);
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    traerUnSoloUsuario,
    actualizarUsuario,
    elimiarUsuario,
    getRegister
};
