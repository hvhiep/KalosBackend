const User = require('../models/User');
const Video = require('../models/Video');
const FavoriteVideo = require('../models/FavoriteVideo');
const Exercise = require('../models/Exercise');
const FavoriteExercise = require('../models/FavoriteExercise');
const Workout = require('../models/Workout');
const FavoriteWorkout = require('../models/FavoriteWorkout');
const Program = require('../models/Program');
const FavoriteProgram = require('../models/FavoriteProgram');
const bcrypt = require('bcrypt');

const userController = {
    getMe: async (req, res) => {
        try {
            const user = req.user;

            if (!user) return res.status(400).json({ msg: 'User not found' });

            return res.json({ user });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateName: async (req, res) => {
        try {
            let user = req.user;
            const { name } = req.body;

            if (!user) return res.status(400).json({ msg: 'User not found' });

            user.name = name;
            await user.save();

            return res.json({ user });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateInformation: async (req, res) => {
        try {
            let user = req.user;
            const { height, weight } = req.body;

            if (!user) return res.status(400).json({ msg: 'User not found' });

            if (height) {
                user.information.height = height;
            }

            if (weight) {
                let today = new Date();

                let updatedDate =
                    user.information.weight[user.information.weight.length - 1]
                        .time;

                if (
                    today.getDate() == updatedDate.getDate() &&
                    today.getMonth() == updatedDate.getMonth() &&
                    today.getFullYear() == updatedDate.getFullYear()
                ) {
                    let weightArr = user.information.weight;
                    weightArr[weightArr.length - 1].value = weight;
                    user.information.weight = weightArr;
                } else {
                    let weightArr = user.information.weight;
                    weightArr.push({
                        value: weight,
                        time: today,
                    });
                    user.information.weight = weightArr;
                }
            }

            await user.save();

            return res.json({ user });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    register: async (req, res) => {
        try {
            const {
                name,
                username,
                password,
                level,
                height,
                weight,
                goals,
                gender,
                pullUp,
                pushUp,
                squats,
                dips,
            } = req.body;

            let today = new Date();

            let user = await User.findOne({ username });

            if (user)
                return res
                    .status(400)
                    .json({ msg: 'This email or username is exist' });

            const newUser = new User();

            newUser.name = name;
            newUser.password = password;
            newUser.username = username;
            newUser.information = {
                level: level,
                gender: gender,
                goals: goals,
                performance: {
                    pullUp: pullUp,
                    pushUp: pushUp,
                    squats: squats,
                    dips: dips,
                },
                height: height,
                weight: [
                    {
                        value: weight,
                        time: today,
                    },
                ],
            };

            await newUser.save();

            return res.json({ user: newUser });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            let user = await User.findOne({ username });
            if (!user) {
                user = await User.findOne({ email: username });
            }
            if (!user) {
                return res
                    .status(400)
                    .json({ msg: 'Invalid login credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ msg: 'Invalid login credentials' });
            }

            const token = await user.generateAuthToken();
            return res.json({
                user,
                token,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // favorite video
    favoriteVideo: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const { idVideo } = req.body;
            const video = await Video.find({ _id: idVideo });
            if (!video) res.status(400).json({ msg: 'Video not found' });

            let favorite = await FavoriteVideo.findOne({
                user: user._id,
                video: idVideo,
            });

            if (favorite) {
                await favorite.delete();
                return res.json({ msg: "Don't like" });
            } else {
                favorite = new FavoriteVideo();
                favorite.user = user._id;
                favorite.video = idVideo;
                await favorite.save();
                return res.json({ favorite });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getFavoriteVideo: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const favorites = await FavoriteVideo.find({}).populate({
                path: 'video',
                model: 'Video',
            });
            return res.json({ favorites });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getFavoriteVideoById: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const { idVideo } = req.params;
            const video = await Video.findById(idVideo);
            if (!video) {
                return res.status(400).json({ msg: 'Video not found' });
            } else {
                const favorite = await FavoriteVideo.findOne({
                    user: user._id,
                    video: idVideo,
                }).populate({
                    path: 'video',
                    model: 'Video',
                });
                return res.json({ favorite });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // favorite exercise
    favoriteExercise: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const { idExercise } = req.body;
            const exercise = await Exercise.find({ _id: idExercise });
            if (!exercise) res.status(400).json({ msg: 'Exercise not found' });

            let favorite = await FavoriteExercise.findOne({
                user: user._id,
                exercise: idExercise,
            });

            if (favorite) {
                await favorite.delete();
                return res.json({ msg: "Don't like" });
            } else {
                favorite = new FavoriteExercise();
                favorite.user = user._id;
                favorite.exercise = idExercise;
                await favorite.save();
                return res.json({ favorite });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getFavoriteExercise: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const favorites = await FavoriteExercise.find({}).populate({
                path: 'exercise',
                model: 'Exercise',
            });
            return res.json({ favorites });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getFavoriteExerciseById: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const { idExercise } = req.params;
            const exercise = await Exercise.findById(idExercise);
            if (!exercise) {
                return res.status(400).json({ msg: 'Exercise not found' });
            } else {
                const favorite = await FavoriteExercise.findOne({
                    user: user._id,
                    exercise: idExercise,
                }).populate({
                    path: 'exercise',
                    model: 'Exercise',
                });
                return res.json({ favorite });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // favorite workout
    favoriteWorkout: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const { idWorkout } = req.body;
            const workout = await Workout.find({ _id: idWorkout });
            if (!workout) res.status(400).json({ msg: 'Workout not found' });

            let favorite = await FavoriteWorkout.findOne({
                user: user._id,
                workout: idWorkout,
            });

            if (favorite) {
                await favorite.delete();
                return res.json({ msg: "Don't like" });
            } else {
                favorite = new FavoriteWorkout();
                favorite.user = user._id;
                favorite.workout = idWorkout;
                await favorite.save();
                return res.json({ favorite });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getFavoriteWorkout: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const favorites = await FavoriteWorkout.find({}).populate({
                path: 'workout',
                model: 'Workout',
            });
            return res.json({ favorites });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getFavoriteWorkoutById: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const { idWorkout } = req.params;
            const workout = await Workout.findById(idWorkout);
            if (!workout) {
                return res.status(400).json({ msg: 'Workout not found' });
            } else {
                const favorite = await FavoriteWorkout.findOne({
                    user: user._id,
                    workout: idWorkout,
                }).populate({
                    path: 'workout',
                    model: 'Workout',
                });
                return res.json({ favorite });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // favorite program
    favoriteProgram: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const { idProgram } = req.body;
            const program = await Program.find({ _id: idProgram });
            if (!program) res.status(400).json({ msg: 'Program not found' });

            let favorite = await FavoriteProgram.findOne({
                user: user._id,
                program: idProgram,
            });

            if (favorite) {
                await favorite.delete();
                return res.json({ msg: "Don't like" });
            } else {
                favorite = new FavoriteProgram();
                favorite.user = user._id;
                favorite.program = idProgram;
                await favorite.save();
                return res.json({ favorite });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getFavoriteProgram: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const favorites = await FavoriteProgram.find({}).populate({
                path: 'program',
                model: 'Program',
            });
            return res.json({ favorites });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getFavoriteProgramById: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const { idProgram } = req.params;
            const program = await Program.findById(idProgram);
            if (!program) {
                return res.status(400).json({ msg: 'Program not found' });
            } else {
                const favorite = await FavoriteProgram.findOne({
                    user: user._id,
                    program: idProgram,
                }).populate({
                    path: 'program',
                    model: 'Program',
                });
                return res.json({ favorite });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = userController;
