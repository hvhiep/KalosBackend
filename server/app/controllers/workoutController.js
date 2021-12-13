const Workout = require('../models/Workout');
const Program = require('../models/Program');
const Progress = require('../models/Progress');
const Submit = require('../models/Submit');

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
    submit: async (req, res) => {
        try {
            const { idWorkout, duration } = req.body;
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            let submit = await Submit.findOne({
                user: user._id,
                workout: idWorkout,
            });

            if (submit) return res.status(400).json({ msg: 'Submit exist' });

            submit = new Submit();
            submit.user = user._id;
            submit.workout = idWorkout;
            submit.duration = duration;
            await submit.save();

            let programs = await Program.find({});

            let program;
            let orderWeek;

            programs.forEach((item) => {
                let weeks = item.weeks;
                weeks.forEach((subItem) => {
                    let workouts = subItem.workouts;
                    let workout = workouts.find(
                        (miniItem) => miniItem == idWorkout
                    );

                    if (workout) {
                        program = item;
                        if (!orderWeek) orderWeek = subItem.order;
                    }
                });
            });

            if (program) {
                let maxWorkoutBig = 0;
                let maxWorkout = [];

                program.weeks.forEach((week) => {
                    maxWorkout.push(week.workouts.length);
                    maxWorkoutBig += week.workouts.length;
                });

                let progress = await Progress.findOne({
                    user: user._id,
                    program: program._id,
                });

                if (!progress) {
                    let progress = new Progress();
                    progress.user = user._id;
                    progress.program = program._id;
                    progress.submitted = 1;
                    progress.maxWorkout = maxWorkoutBig;
                    progress.value = 1 / maxWorkoutBig;
                    progress.weeks = [];
                    program.weeks.forEach((week, index) => {
                        let check;
                        if (week.order == orderWeek) check = true;
                        else check = false;

                        let tmpWeek = {};

                        if (check) {
                            tmpWeek = {
                                order: week.order,
                                maxWorkout: maxWorkout[index],
                                submitted: 1,
                                workouts: [idWorkout],
                                value: 1 / maxWorkout[index],
                            };
                        } else {
                            tmpWeek = {
                                order: week.order,
                                maxWorkout: maxWorkout[index],
                                submitted: 0,
                                workouts: [],
                                value: 0,
                            };
                        }

                        progress.weeks.push(tmpWeek);
                    });

                    await progress.save();
                } else {
                    progress.submitted = progress.submitted + 1;
                    progress.value = progress.submitted / progress.maxWorkout;
                    let weeks = progress.weeks;
                    weeks.forEach((week) => {
                        if (week.order == orderWeek) {
                            week.submitted = week.submitted + 1;
                            week.value = week.submitted / week.maxWorkout;
                            week.workouts.push(idWorkout);
                        }
                    });
                    progress.weeks = weeks;

                    await progress.save();
                }
            }

            return res.json({ submit });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getSubmitted: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'user not found' });

            const submitted = await Submit.find({ user: user._id }).populate({
                path: 'workout',
                model: 'Workout',
                select: 'name image',
            });

            return res.json({ submitted });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = workoutController;
