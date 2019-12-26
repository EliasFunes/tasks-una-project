const {Schema, model} = require('mongoose');

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    }
}, {
    timestamp: false
});

module.exports = model('Task', TaskSchema);
