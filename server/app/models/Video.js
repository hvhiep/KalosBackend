const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Video = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
        },
        videoUrl: {
            type: String,
        },
        likes: {
            type: Number,
        },
        liked: {
            type: Boolean,
        },
    },
    { timestamps: true, collection: 'Videos' }
);

module.exports = mongoose.model('Video', Video);
