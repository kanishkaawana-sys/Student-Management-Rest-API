const express = require("express");
const students = require("../data/students");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(students);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
});

router.post("/", (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({ message: "Name and course are required" });
    }

    const newId = students.length > 0
        ? Math.max(...students.map(student => student.id)) + 1
        : 1;

    const newStudent = {
        id: newId,
        name,
        course
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({ message: "Name and course are required" });
    }

    student.name = name;
    student.course = course;

    res.status(200).json(student);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1)[0];

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent
    });
});

module.exports = router;
