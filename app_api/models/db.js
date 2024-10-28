const mongoose = require('mongoose');
const readLine = require('readline');

// Environmment variables
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'travlr',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

/* 
This code checks if dbConfig.user and dbConfig.password exists, 
otherwise it defaults to the simpler connection string 'mongodb://localhost:27017/travlr'
*/
const dbURI = process.env.MONGODB_URI || 
    (dbConfig.user && dbConfig.password
        ? `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`
        : `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);

// Connection options
const options = {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

// Connect function with retry logic
const connect = async () => {
    try {
        await mongoose.connect(dbURI, options);
        console.log(`Mongoose connected to ${dbURI}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
        
        // Retry connection after 5 seconds
        setTimeout(connect, 5000);
    }
};


// Connection event handlers
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});


// Handle process termination
const gracefulShutdown = async (msg, callback) => {
    try {
        await mongoose.connection.close();
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    } catch (err) {
        console.error('Error during mongoose shutdown:', err);
        callback(err);
    }
};

// Handle termination signals
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ('SIGINT', () => {
        process.emit("SIGINT");
    });
}

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

connect();

// Bring in the Mongoose schema
require('./travlr');
require('./users');

module.exports = { mongoose, connect };