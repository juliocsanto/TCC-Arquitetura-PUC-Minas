import mongoose from "mongoose";

const associadoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true 
    },
    phone: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: false
    },
    sexo: {
        type: String,
        enum: ['F', 'M'],
        required: false
    },
    tipo_plano_de_saude: {
        type: String,
        enum: ['individual', 'empresarial'],
        required: false,
        default: 'individual'
    },
    classe_plano_de_saude: {
        type: String,
        enum: ['enfermaria', 'apartamento', 'vip'],
        required: false,
        default: 'enfermaria'
    },
    tem_plano_odonto: {
        type: Boolean,
        required: false,
        default: false
    },
    status: {
        type: String,
        enum: ['ativo', 'suspenso', 'inativo'],
        required: false,
        default: 'inativo'
    },
})

const Associado = mongoose.model("associado", associadoSchema);

export { Associado }