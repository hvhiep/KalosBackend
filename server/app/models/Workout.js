const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Workout = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
        },
        level: {
            type: Number,
        },
        likes: {
            type: Number,
        },
        liked: {
            type: Boolean,
        },
        completed: {
            type: Boolean,
        },
        muscleGroups: [
            {
                type: Number,
            },
        ],
        type: {
            type: Number,
        },
        rounds: [
            {
                name: {
                    type: String,
                },
                sets: {
                    type: Number,
                },
                rest: {
                    type: Number,
                },
                order: {
                    type: Number,
                },
                exercises: [
                    {
                        order: {
                            type: Number,
                        },
                        reps: {
                            type: Number,
                        },
                        duration: {
                            type: Number,
                        },
                        rest: {
                            type: Number,
                        },
                        idExercise: {
                            type: Schema.Types.ObjectId,
                            ref: 'Exercise',
                        },
                    },
                ],
            },
        ],
        image: {
            type: String,
        },
    },
    { timestamps: true, collection: 'workouts' }
);

module.exports = mongoose.model('Workout', Workout);
