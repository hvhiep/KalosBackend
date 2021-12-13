const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Progress = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        program: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
        },
        summary: {
            type: Number,
        },
        weeks: [
            {
                order: {
                    type: Number,
                },
                value: {
                    type: Number,
                },
            },
        ],
    },
    { timestamps: true, collection: 'Progress' }
);

module.exports = mongoose.model('Progress', Progress);
