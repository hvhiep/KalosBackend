const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Program = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        level: {
            type: Number,
            required: true,
        },
        likes: {
            type: Number,
        },
        liked: {
            type: Boolean,
        },
        progress: {
            type: Number,
        },
        weeks: [
            {
                name: {
                    type: String,
                },
                order: {
                    type: Number,
                },
                progress: {
                    type: Number,
                },
                workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
            },
        ],
        image: {
            type: String,
        },
    },
    { timestamps: true, collection: 'programs' }
);

module.exports = mongoose.model('Program', Program);
