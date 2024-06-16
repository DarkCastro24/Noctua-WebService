const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    id_tutor:{
        type: String,
        required: true
    },
    nombre_tutor: {
        type: String,
        required: true
    },
    materia: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    fecha_inicio: {
        type: Date,
        required: true
    },
    fecha_fin: {
        type: Date,
        required: true
    },
    imagen: {
        type: String,
        required: true,
        default: "https://vilmanunez.com/wp-content/uploads/2016/03/herramientas-y-recursos-para-crear-curso-online.png"
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    objetivos: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    recursos: [{
        semana: {
            type: Number
        },
        titulo: {
            type: String
        },
        descripcion: {
            type: String
        },
        url: {
            type: String
        }
    }],
    tutorados: [{
        username: {
            type: String
        },
        nombre: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Curso', cursoSchema);
