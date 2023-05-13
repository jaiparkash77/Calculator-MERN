const mongoose = require('mongoose');

const calculatorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    calculation: {
        type: String,
        required: true,
    },
    result:{
        type: Number,
        required: true,
    },
    calculatedAt:{
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("Calculator", calculatorSchema);