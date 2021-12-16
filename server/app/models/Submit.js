const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Submit = new Schema(
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
        duration: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true, collection: 'Submits' }
);

module.exports = mongoose.model('Submit', Submit);
