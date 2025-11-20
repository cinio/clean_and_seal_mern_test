const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
    {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
        schoolYear: { type: String },
        currentDentist: { type: String },
        language: { type: String },
        dateEmailed: { type: Date },
        dateCalled: { type: Date },
        dentalIssue: { type: String },
        typeOfReferral: { type: String },
        notes: { type: String },
        createdBy: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Referral", referralSchema);
