const Student = require("../models/Student");

// GET /students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /students
const createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        const saved = await student.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getStudents, createStudent };
