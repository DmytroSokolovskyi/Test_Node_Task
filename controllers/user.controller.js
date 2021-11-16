const { User, O_Auth } = require('../dataBase');
const { emailService, userService} = require('../service');
const { errorsEnum, statusEnum } = require('../configs');
const { emailActionEnum } = require('../configs');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllusers(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.userById;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { email, name } = req.userById;
            await User.deleteOne({ _id : user_id });
            await O_Auth.deleteMany({ user_id });

            await emailService.sendMail(email, emailActionEnum.GOODBYE, { userName: name });

            res.sendStatus(statusEnum.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { email, name } = req.body;
            let newUser = await User.createUserWithPassword(req.body);

            newUser = newUser.normalize();

            await emailService.sendMail(
                email,
                emailActionEnum.WELCOME,
                { userName: name },
            );

            res.status(errorsEnum.CREATED.status).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findByIdAndUpdate(user_id, req.body, { new: true });

            await emailService.sendMail(user.email, emailActionEnum.UPDATE, { userName: user.name });

            res.status(errorsEnum.CREATED.status).json(user);
        } catch (e) {
            next(e);
        }
    },


};
