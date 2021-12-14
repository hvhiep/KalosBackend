const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FreeWorkout = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
        },
        muscleGroups: [
            {
                type: Number,
            },
        ],
        tags: [
            {
                type: Number,
            },
        ],
        workouts: {
            beginner: {
                type: Schema.Types.ObjectId,
                ref: 'Workout',
            },
            intermediate: {
                type: Schema.Types.ObjectId,
                ref: 'Workout',
            },
            advanced: {
                type: Schema.Types.ObjectId,
                ref: 'Workout',
            },
        },
    },
    { timestamps: true, collection: 'FreeWorkouts' }
);

module.exports = mongoose.model('FreeWorkout', FreeWorkout);
