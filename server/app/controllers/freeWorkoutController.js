const FreeWorkout = require('../models/FreeWorkout');

const freeWorkoutController = {
    getAll: async (req, res) => {
        try {
            let freeWorkouts = await FreeWorkout.find({});

            const { tag } = req.query;

            if (tag) {
                freeWorkouts = freeWorkouts.filter(
                    (item) =>
                        item.tags.find((subItem) => subItem == tag) != undefined
                );
            }

            return res.json({ freeWorkouts });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = freeWorkoutController;
