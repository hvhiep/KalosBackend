const Video = require('../models/Video');
const FavoriteVideo = require('../models/FavoriteVideo');

const videoController = {
    getAll: async (req, res) => {
        try {
            const videos = await Video.find({});
            const favoriteVideos = await FavoriteVideo.find({});

            const user = req.user;
            if (user) {
                videos.forEach((video) => {
                    let favorite = favoriteVideos.find(
                        (item) =>
                            item.video.equals(video._id) &&
                            item.user.equals(user._id)
                    );
                    if (favorite) video.liked = true;
                    else video.liked = false;
                    if (favorite) console.log(user.name);
                });
            }

            videos.forEach((video) => {
                let favorites = favoriteVideos.filter((item) =>
                    item.video.equals(video._id)
                );
                let count = favorites.length;
                video.likes = count;
            });

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
