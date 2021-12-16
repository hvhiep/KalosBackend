const Program = require('../models/Program');
const Progress = require('../models/Progress');
const FavoriteProgram = require('../models/FavoriteProgram');
const Submit = require('../models/Submit');

const programController = {
    getAll: async (req, res) => {
        try {
            const programs = await Program.find({}).populate({
                path: 'weeks',
                populate: [
                    {
                        path: 'workouts',
                        model: 'Workout',
                        select: 'name type',
                    },
                ],
            });

            const favoritePrograms = await FavoriteProgram.find({});
            const progresses = await Progress.find({});
            const user = req.user;
            if (user) {
                programs.forEach((program) => {
                    let favorite = favoritePrograms.find(
                        (item) =>
                            item.program.equals(program._id) &&
                            item.user.equals(user._id)
                    );
                    if (favorite) program.liked = true;
                    else program.liked = false;

                    let progress = progresses.find(
                        (item) =>
                            item.program.equals(program._id) &&
                            item.user.equals(user._id)
                    );
                    console.log(progress);
                    if (progress) {
                        program.progress = progress.value;
                        program.weeks = program.weeks.map((item) => {
                            let value = progress.weeks.find(
                                (tmp) => tmp.order == item.order
                            ).value;
                            item.progress = value;
                            return item;
                        });
                    }
                });
            }

            programs.forEach((program) => {
                let favorites = favoritePrograms.filter((item) =>
                    item.program.equals(program._id)
                );
                let count = favorites.length;
                program.likes = count;
            });

            return res.json({ programs });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const program = await Program.findOne({ _id: id }).populate({
                path: 'weeks',
                populate: [
                    {
                        path: 'workouts',
                        model: 'Workout',
                        select: 'name type',
                    },
                ],
            });

            const favoritePrograms = await FavoriteProgram.find({});
            const progresses = await Progress.find({});
            let submits = await Submit.find({});
            const user = req.user;
            if (user) {
                // LIKED
                let favorite = favoritePrograms.find(
                    (item) =>
                        item.program.equals(program._id) &&
                        item.user.equals(user._id)
                );
                if (favorite) program.liked = true;
                else program.liked = false;

                // PROGRESS
                let progress = progresses.find(
                    (item) =>
                        item.program.equals(program._id) &&
                        item.user.equals(user._id)
                );
                if (progress) {
                    program.progress = progress.value;
                    program.weeks = program.weeks.map((item) => {
                        let value = progress.weeks.find(
                            (tmp) => tmp.order == item.order
                        ).value;
                        item.progress = value;
                        return item;
                    });
                }
                // COMPLETED WORKOUT
                submits = submits.filter((item) => item.user.equals(user._id));
                program.weeks.forEach((week) => {
                    week.workouts.map((workout) => {
                        if (
                            submits.find((submit) =>
                                submit.workout.equals(workout._id)
                            ) != undefined
                        )
                            workout.completed = true;
                        else workout.completed = false;
                    });
                });
            }

            let favorites = favoritePrograms.filter((item) =>
                item.program.equals(program._id)
            );
            let count = favorites.length;
            program.likes = count;

            return res.json({ program });
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
