const mongoose = require('mongoose');
const User = require('../models/user-model');

// Добавление тренировки
exports.addWorkout = async (req, res) => {
    const workoutData = req.body; // workout - это объект с данными тренировки
    if (!workoutData) {
        return res.status(400).json({ error: 'Workout data are required' });
    }

    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const workoutWithId = {
            ...workoutData,
            _id: new mongoose.Types.ObjectId(), // Генерация уникального ID
        };
        user.workoutLog.push(workoutWithId); // Добавление данных в журнал тренировок
        await user.save();

        res.status(200).json({ message: 'Workout added successfully', workoutLog: user.workoutLog });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Получение списка тренировок
exports.getUserWorkouts = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({
            userId: user._id,
            username: user.username,
            workoutLog: user.workoutLog,
            selectedProgram: user.selectedProgram,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserWorkoutById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Поиск тренировки в массиве workoutLog
        const workout = user.workoutLog.find(
            (item) => item._id.toString() === req.params.workoutId
        );

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        res.status(200).json({
            workout: workout,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUserWorkoutById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Удаляем объект тренировки по ID из массива workoutLog
        const workoutIndex = user.workoutLog.findIndex(
            (item) => item._id.toString() === req.params.workoutId
        );

        if (workoutIndex === -1) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        // Удаляем элемент из массива
        const [deletedWorkout] = user.workoutLog.splice(workoutIndex, 1);

        // Сохраняем изменения в базе данных
        await user.save();

        res.status(200).json({ 
            message: 'Workout deleted successfully', 
            deletedWorkout 
        });
    } catch (err) {
        res.status(500).json({ 
            message: 'Server error', 
            error: err.message 
        });
    }
};

exports.selectProgram = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const programData = req.body;
        if (!programData) {
            return res.status(400).json({ error: 'Program data are required' });
        }
        user.selectedProgram = programData;
        await user.save();
        res.status(200).json({ message: 'Program selected successfully', selectedProgram: user.selectedProgram });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}