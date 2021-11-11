const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FavoriteVideo = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: 'Video',
        },
    },
    { timestamps: true, collection: 'FavoriteVideos' }
);

module.exports = mongoose.model('FavoriteVideo', FavoriteVideo);
