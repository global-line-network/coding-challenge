const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const { isPassword } = require('./validate');
const { hashPassword } = require('./middleware');
const { comparePassword } = require('./methods');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }]
        },
        displayName: {
            type: String
        },
        emailVerified: {
            type: Boolean
        },
        verificationToken: {
            type: String
        },
        password: {
            type: String,
            validate: [{ validator: isPassword, msg: 'Invalid password.' }]
        },
        googleId: {
            type: String
        }
    },
    { timestamps: true }
);

userSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
    const userObj = new this();
    this.findOne({ googleId: profile.googleId }, function(err, result) {
        if (!result) {
            userObj.email = profile.email;
            if (profile.googleId) {
                userObj.googleId = profile.googleId;
            }
            if (profile.facebookId) {
                userObj.facebookId = profile.facebookId;
            }
            userObj.displayName = profile.displayName;
            userObj.save(cb);
        } else {
            cb(err, result);
        }
    });
};

/**
 * Middleware
 */
userSchema.pre('save', hashPassword);

/**
 * Methods.
 */
userSchema.methods.comparePassword = comparePassword;

module.exports = mongoose.model('User', userSchema);
