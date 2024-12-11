const express = require('express');
const { addWorkout, getUserWorkouts } = require('../controllers/user-controllers');
const router = express.Router();

router.get('/:userId/workouts', getUserWorkouts);
router.post('/:userId/workoutLog', addWorkout);


module.exports = router;