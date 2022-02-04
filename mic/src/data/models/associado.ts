import mongoose from "mongoose";

const associadoSchema = new mongoose.Schema({
    cadastro_info: {
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
    },
    plano_saude_info: {
        tipo_plano_de_saude: {
            type: String,
            enum: ['individual', 'empresarial', 'none'],
            required: false,
            default: 'none'
        },
        classe_plano_de_saude: {
            type: String,
            enum: ['enfermaria', 'apartamento', 'vip', 'none'],
            required: false,
            default: 'none'
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
    }
})

const Associado = mongoose.model("associado", associadoSchema);

export { Associado }