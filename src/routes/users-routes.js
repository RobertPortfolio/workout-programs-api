const express = require('express');
const { 
	addWorkout, 
	getUserWorkouts, 
	getUserWorkoutById, 
	deleteUserWorkoutById,
	selectProgram,
} = require('../controllers/user-controllers');
const router = express.Router();

router.get('/:userId/workouts', getUserWorkouts);
router.get('/:userId/workouts/:workoutId', getUserWorkoutById);
router.delete('/:userId/workouts/:workoutId', deleteUserWorkoutById);
router.post('/:userId/workoutLog', addWorkout);
router.post('/:userId/program', selectProgram);


module.exports = router;