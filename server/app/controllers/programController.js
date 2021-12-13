const Program = require('../models/Program');
const Progress = require('../models/Progress');

const programController = {
    getAll: async (req, res) => {
        try {
            const programs = await Program.find({}).populate({
                path: 'weeks',
                populate: [
                    {
                        path: 'workouts',
                        model: 'Workout',
                        select: 'name',
                    },
                ],
            });

            return res.json({ programs });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const programs = await Program.find({ _id: id }).populate({
                path: 'weeks',
                populate: [
                    {
                        path: 'workouts',
                        model: 'Workout',
                        select: 'name',
                    },
                ],
            });

            return res.json({ programs });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const { name, level, image, weeks } = req.body;

            const program = new Program();

            program.name = name;
            program.level = level;
            program.image = image;
            program.weeks = weeks;

            await program.save();

            return res.json({ program });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getProgress: async (req, res) => {
        try {
            const user = req.user;

            const { completed } = req.query;

            if (!user) return res.json({ msg: 'user not found' });

            let progresses = await Progress.find({ user: user._id }).populate({
                path: 'program',
                model: 'Program',
                select: 'name image',
            });

            if (completed == 1) {
                progresses = progresses.filter((item) => item.value == 1);
            }

            return res.json({ progresses });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = programController;
