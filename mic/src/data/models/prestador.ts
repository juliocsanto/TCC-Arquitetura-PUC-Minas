import mongoose from "mongoose";

const prestadorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cnpj: {
        type: Number,
        required: true 
    },
    type: {
        type: String,
        enum: ['medico', 'enfermeiro', 'fisioterapeuta', 'dentista', 'outros'],
        required: true,
        default: 'outros'
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

const Prestador = mongoose.model("prestadores", prestadorSchema);

export { Prestador }