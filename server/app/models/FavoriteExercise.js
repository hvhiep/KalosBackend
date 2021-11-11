const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FavoriteExercise = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        exercise: {
            type: Schema.Types.ObjectId,
            ref: 'Exercise',
        },
    },
    { timestamps: true, collection: 'FavoriteExercises' }
);

module.exports = mongoose.model('FavoriteExercise', FavoriteExercise);
