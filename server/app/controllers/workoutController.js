const Workout = require('../models/Workout');

const workoutController = {
    getAll: async (req, res) => {
        try {
            const workouts = await Workout.find({}).populate({
                path: 'rounds',
                populate: [
                    {
                        path: 'exercises',
                        populate: [
                            {
                                path: 'idExercise',
                                model: 'Exercise',
                                select: 'name image',
                            },
                        ],
                    },
                ],
            });

            return res.json({ workouts });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const workout = await Workout.find({ _id: id }).populate({
                path: 'rounds',
                populate: [
                    {
                        path: 'exercises',
                        populate: [
                            {
                                path: 'idExercise',
                                model: 'Exercise',
                                select: 'name image',
                            },
                        ],
                    },
                ],
            });

            return res.json({ workout });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const { name, order, level, type, image, rounds } = req.body;

            const workout = new Workout();

            workout.name = name;
            workout.order = order;
            workout.level = level;
            workout.type = type;
            workout.image = image;
            workout.rounds = rounds;

            await workout.save();

            return res.json({ workout });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = workoutController;
