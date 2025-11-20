const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        gender: { type: String },
        insurance: { type: String },
        guardian: { type: String },
        phone: { type: String },
        email: { type: String },
        language: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
