const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { maxHeaderSize } = require('http');

const  UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Userame must be at least 3 characters long'],
        maxlength: [30, 'Username cannot contain more than 30 characters'],
        match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Userame must be at least 2 characters long'],
        maxlength: [50, 'Username cannot contain more than 50 characters'],
    },
    hash: String,
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
    }  
}, {
    timestamps: true
});

UserSchema.methods.setPassword = function(password, passwordConfirm) {
    // Password validation
    if (!password) {
        throw new Error('Password is required');
    }
    
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }

    if (password !== passwordConfirm) {
        throw new Error('Passwords do not match');
    }

    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, 
        this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        role: this.role,
        exp: parseInt(expiry.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
};

// Static methods to check for existing username/email
UserSchema.statics.usernameExists = async function(username) {
    const user = await this.findOne({ username: username });
    return !!user;
};

UserSchema.statics.emailExists = async function(email) {
    const user = await this.findOne({ email: email.toLowerCase() });
    return !!user;
};

// Registration methods
UserSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

UserSchema.methods.updateLastLogin = function() {
    this.lastLogin = new Date();
    return this.save();
};

// Pre-save middleware to ensure email is always lowercase
UserSchema.pre('save', function(next) {
    // Only run this if email is modified
    if (!this.isModified('email')) return next();

    // Convert email to lowercase
    this.email = this.email.toLowerCase();
    next();
});

module.exports = mongoose.model('users', UserSchema);