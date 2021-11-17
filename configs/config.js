module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/Okten',
    PORT: process.env.PORT || 5001,

    EMAIL_LOGIN: process.env.EMAIL_LOGIN,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@gmail.com',
    ADMIN_PASS: process.env.ADMIN_PASS || 'Q323zzzRz3%$#5vxcv',

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
};
