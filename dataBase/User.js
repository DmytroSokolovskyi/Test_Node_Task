const { Schema, model } = require('mongoose');

const { tableNamesEnum, userTypeEnum } = require('../configs');
const { UserNormalize } = require('../util/user.util');
const {passwordService} = require("../service");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    user_type: {
        type: String,
        default: userTypeEnum.DRIVER,
        enum: Object.values(userTypeEnum)
    },

}, { timestamps: true, toObject: { virtuals: true}, toJSON: { virtuals: true } });

userSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    },

    normalize() {
        return new UserNormalize(this);
    }
};

userSchema.statics = {
    async createUserWithPassword(user) {
        const hashedPassword = await passwordService.hash(user.password);

        return this.create({ ...user, password: hashedPassword });
    }
};

module.exports = model(tableNamesEnum.USER, userSchema);
