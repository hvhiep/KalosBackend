const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FavoriteProgram = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        program: {
            type: Schema.Types.ObjectId,
            ref: 'Program',
        },
    },
    { timestamps: true, collection: 'FavoritePrograms' }
);

module.exports = mongoose.model('FavoriteProgram', FavoriteProgram);
