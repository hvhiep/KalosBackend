const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Exercise = new Schema(
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
        levels: [
            {
                type: Number,
            },
        ],
        muscleGroups: [
            {
                type: Number,
            },
        ],
        equipments: [
            {
                type: Number,
            },
        ],
    },
    { timestamps: true, collection: 'exercises' }
);

module.exports = mongoose.model('Exercise', Exercise);
