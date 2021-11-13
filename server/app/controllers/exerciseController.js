const Exercise = require('../models/Exercise');

const exerciseController = {
    getAll: async (req, res) => {
        try {
            const exercises = await Exercise.find({});

            return res.json({ exercises });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const exercise = await Exercise.find({ _id: id });

            return res.json({ exercise });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const { name, image, videoUrl, levels, muscleGroups, equipments } =
                req.body;

            const exercise = new Exercise();

            exercise.name = name;
            exercise.image = image;
            exercise.videoUrl = videoUrl;
            exercise.levels = levels;
            exercise.muscleGroups = muscleGroups;
            exercise.equipments = equipments;

            await exercise.save();

            return res.json({ exercise });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = exerciseController;
