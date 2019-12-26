const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    estado: {
        type: String,
        default: "activo"
    }
}, {
    timestamp: false
});

module.exports = model('User', UserSchema);
