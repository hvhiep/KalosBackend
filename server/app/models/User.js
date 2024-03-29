const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            level: {
                type: Number,
            },
            gender: {
                type: Number,
            },
            goals: [
                {
                    type: Number,
                },
            ],
            performance: {
                pullUp: {
                    type: Number,
                },
                pushUp: {
                    type: Number,
                },
                squats: {
                    type: Number,
                },
                dips: {
                    type: Number,
                },
            },
            height: {
                type: Number,
            },
            weight: [
                {
                    value: {
                        type: Number,
                    },
                    time: {
                        type: Date,
                    },
                },
            ],
        },
    },
    { timestamps: true, collection: 'users' }
);

User.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

User.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    return token;
};

module.exports = mongoose.model('User', User);
