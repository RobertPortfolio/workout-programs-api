const Program = require('../models/program-model');

// Получить все программы
const getPrograms = async (req, res) => {
    try {
        const programs = await Program.find();
        res.status(200).json(programs);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Получить программу по ID
const getProgramById = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) return res.status(404).json({ message: 'Program not found' });
        res.status(200).json(program);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Создать программу
const createProgram = async (req, res) => {
    try {
        const newProgram = new Program(req.body);
        await newProgram.save();
        res.status(201).json(newProgram);
    } catch (err) {
        res.status(400).json({ message: 'Bad request', error: err.message });
    }
};

// Удалить программу по ID
const deleteProgramById = async (req, res) => {
    try {
        const { id } = req.params; // Получаем ID из параметров маршрута
        const deletedProgram = await Program.findByIdAndDelete(id); // Удаляем запись
        if (!deletedProgram) {
            return res.status(404).json({ message: 'Program not found' });
        }
        res.status(200).json({ message: 'Program deleted successfully', deletedProgram });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updateProgramById = async (req, res) => {
    try {
        const { id } = req.params; // Получаем ID из параметров маршрута
        const updatedProgram = await Program.findByIdAndUpdate(id, req.body, { new: true }); // Обновляем программу
        if (!updatedProgram) {
            return res.status(404).json({ message: 'Program not found' });
        }
        res.status(200).json(updatedProgram); // Возвращаем обновленную программу
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    getPrograms,
    getProgramById,
    createProgram,
    deleteProgramById,
    updateProgramById, // Экспортируем функцию
};