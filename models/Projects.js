const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    gitlink: {
        type: String,
        required: true
    },
    renderlink: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    hero: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("projects", projectSchema)