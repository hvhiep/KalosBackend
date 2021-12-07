const User = require('../models/User');
const Video = require('../models/Video');
const FavoriteVideo = require('../models/FavoriteVideo');
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
                let weightArr = user.information.weight;
                weightArr.push({
                    value: weight,
                    time: today,
                });
                user.information.weight = weightArr;
            }

            await user.save();

            return res.json({ user });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    register: async (req, res) => {
        try {
            const { name, username, password } = req.body;

            let user = await User.findOne({ username });

            if (user)
                return res
                    .status(400)
                    .json({ msg: 'This email or username is exist' });

            const newUser = new User({
                name,
                username,
                password,
            });

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
    favoriteVideo: async (req, res) => {
        try {
            const user = req.user;
            if (!user) return res.status(400).json({ msg: 'User not found' });

            const { idVideo } = req.body;
            const video = await FavoriteVideo.find({ _id: idVideo });
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
};

module.exports = userController;
