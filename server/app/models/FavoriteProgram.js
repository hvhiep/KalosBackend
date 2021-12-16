const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FavoriteProgram = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        program: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
            required: true,
        },
    },
    { timestamps: true, collection: 'FavoritePrograms' }
);

module.exports = mongoose.model('FavoriteProgram', FavoriteProgram);
