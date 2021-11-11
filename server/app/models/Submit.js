const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Submit = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        workout: {
            type: Schema.Types.ObjectId,
            ref: 'Workout',
        },
        start: {
            type: Date,
        },
        end: {
            type: Date,
        },
    },
    { timestamps: true, collection: 'Submits' }
);

module.exports = mongoose.model('Submit', Submit);
