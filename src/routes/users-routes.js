const express = require('express');
const { addWorkout, getUserWorkouts, getUserWorkoutById } = require('../controllers/user-controllers');
const router = express.Router();

router.get('/:userId/workouts', getUserWorkouts);
router.get('/:userId/workouts/:workoutId', getUserWorkoutById);
router.post('/:userId/workoutLog', addWorkout);


module.exports = router;