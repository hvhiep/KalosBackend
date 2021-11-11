const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FavoriteWorkout = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        workout: {
            type: Schema.Types.ObjectId,
            ref: 'Workout',
        },
    },
    { timestamps: true, collection: 'FavoriteWorkouts' }
);

module.exports = mongoose.model('FavoriteWorkout', FavoriteWorkout);
