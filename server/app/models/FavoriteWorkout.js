const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FavoriteWorkout = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        workout: {
            type: Schema.Types.ObjectId,
            ref: 'Workout',
            required: true,
        },
    },
    { timestamps: true, collection: 'FavoriteWorkouts' }
);

module.exports = mongoose.model('FavoriteWorkout', FavoriteWorkout);
