const {isValidObjectId} = require('mongoose');

const User = require('../dataBase/User');
const {errorsEnum} = require('../configs');

module.exports = {
    checkUserIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            if (!isValidObjectId(user_id)) {
                return next(errorsEnum.BAD_REQUEST);
            }

            const user = await User.findById(user_id).lean();

            if (!user) {
                return next(errorsEnum.NOT_FOUND);
            }

            req.userById = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    userCheckPass: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User
                .findOne({ _id : user_id })
                .select('+password');

            if (!user) {
                return next(errorsEnum.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
