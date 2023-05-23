const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},

    {
        timestamps: true
    });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;