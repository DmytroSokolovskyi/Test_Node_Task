const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware, mainMiddleware} = require('../middlewares');
const {userValidator} = require('../validators');
const {User} = require('../dataBase');

router.route('/')
    .get(
        userController.getUsers)
    .post(
        mainMiddleware.validateBody(userValidator.createUserValidator),
        mainMiddleware.checkOne(User, 'username'),
        userController.createUser
    );
router.route('/:user_id')
    .put(
        mainMiddleware.validateBody(userValidator.userEditValidator),
        userMiddleware.checkUserIdMiddleware,
        userController.updateUserById
    )
    .get(
        userMiddleware.checkUserIdMiddleware,
        userController.getUserById
    )
    .delete(
        userMiddleware.userCheckPass,
        userController.deleteUserById
    );

module.exports = router;
