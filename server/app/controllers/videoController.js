const Video = require('../models/Video');

const videoController = {
    getAll: async (req, res) => {
        try {
            const videos = await Video.find({});

            return res.json({ videos });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const video = await Video.find({ _id: id });

            return res.json({ video });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const { name, image, videoUrl } = req.body;

            const video = new Video();

            video.name = name;
            video.image = image;
            video.videoUrl = videoUrl;

            await video.save();

            return res.json({ video });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = videoController;
