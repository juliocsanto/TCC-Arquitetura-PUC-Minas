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
        required: true
    }
})

const Prestador = mongoose.model("prestadores", prestadorSchema);

export default Prestador