const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        information: {
            height: {
                type: Number,
            },
            weight: [
                {
                    value: {
                        type: Number,
                    },
                    updatedAt: {
                        type: Date,
                    },
                },
            ],
        },
    },
    { timestamps: true, collection: 'users' }
);

module.exports = mongoose.model('User', User);
