const Referral = require("../models/Referral");

// GET /referrals?studentId=...
const getReferrals = async (req, res) => {
    try {
        const filter = {};
        if (req.query.studentId) {
            filter.student = req.query.studentId;
        }

        // Populate the student details
        const referrals = await Referral.find(filter).populate("student");
        res.json(referrals);
    } catch (error) {
        console.error("Error fetching referrals:", error);
        res.status(500).json({ message: error.message });
    }
};

// POST /referrals
const createReferral = async (req, res) => {
    try {
        const referral = new Referral(req.body);
        const saved = await referral.save();
        // Populate student before sending back
        await saved.populate("student");
        res.status(201).json(saved);
    } catch (error) {
        console.error("Error creating referral:", error);
        res.status(400).json({ message: error.message });
    }
};

// PUT /referrals/:id
const updateReferral = async (req, res) => {
    try {
        const updated = await Referral.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await updated.populate("student");
        res.json(updated);
    } catch (error) {
        console.error("Error updating referral:", error);
        res.status(400).json({ message: error.message });
    }
};

// DELETE /referrals/:id
const deleteReferral = async (req, res) => {
    try {
        await Referral.findByIdAndDelete(req.params.id);
        res.json({ message: "Referral deleted" });
    } catch (error) {
        console.error("Error deleting referral:", error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getReferrals, createReferral, updateReferral, deleteReferral };
