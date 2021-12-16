const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FavoriteVideo = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: 'Video',
            required: true,
        },
    },
    { timestamps: true, collection: 'FavoriteVideos' }
);

module.exports = mongoose.model('FavoriteVideo', FavoriteVideo);
