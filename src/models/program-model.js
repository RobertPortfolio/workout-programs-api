const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    programName: String,
    mainGoal: String,
    tags: [String],
    shortDescription: String,
    description: String,
    type: String,
    level: String,
    equipment: [String],
    daysPerWeek: String,
    workouts: [
        {
            dayName: String,
            muscleGroups: [String],
            workoutDescription: String,
            exercises: [
                {
                    exerciseName: String,
                    sets: String,
                    exerciseDescription: String,
                    reps: String,
                    rir: String,  
                },
            ],
        },
    ],
});

module.exports = mongoose.model('Program', programSchema);