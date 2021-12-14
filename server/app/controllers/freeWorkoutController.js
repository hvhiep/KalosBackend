const FreeWorkout = require('../models/FreeWorkout');

const freeWorkoutController = {
    getAll: async (req, res) => {
        try {
            const freeWorkouts = await FreeWorkout.find({});
            return res.json({ freeWorkouts });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = freeWorkoutController;
