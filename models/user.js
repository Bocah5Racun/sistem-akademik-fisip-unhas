const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefon: {
        type: String,
        required: true
    },
    prodi: {
        type: String,
        required: true
    },
    jenjang: {
        type: String,
        required: true
    },
    ipk: {
        type: String
    },
    semester: {
        type: String
    },
    status: {
        type: String,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)