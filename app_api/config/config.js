const { mongo } = require('mongoose');

require('dotenv').config();

const config = {
    development: {
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET,
        mongodb: {
            uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/travlr'
        },
        cors: {
            origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4200']
        }
    },
    production: {
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET,
        mongodb: {
            uri: process.env.MONGODB_URI
        },
        cors: {
            origin: process.env.ALLOWED_ORIGINS?.split(',')
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];