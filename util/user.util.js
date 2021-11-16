const userNormalizator = (userToNormalize = {}) => {
    const fieldsToRemove = ['password'];

    fieldsToRemove.forEach((field) => {
        delete userToNormalize[field];
    });

    return userToNormalize;
};
class UserNormalize {
    constructor({ _id, username, first_name, last_name, email, user_type }) {
        this._id = _id;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.user_type = user_type;
    }
}

module.exports = {
    userNormalizator,
    UserNormalize
};
