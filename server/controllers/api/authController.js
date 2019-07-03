const passport = require('passport');
const { ServerError } = require('../../helpers/serverHelper');
require('../../helpers/passportHelper');
const { User } = require('../../models');
const getJWT = require('../../helpers/jwtHelper');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const validations = require('../../../src/validations/SignInValidations');
/**
 * Sign in using email and password.
 * req, res, next params are all required this time (passport requires them). This is an exceptional
 * case.
 */

function signin(req, res, next) {
    return new Promise((resolve, reject) => {
        passport.authenticate('local-signin', (error, user, info) => {
            if (error) {
                return reject(error); // Passport uses callback, but controllerHandler uses Promise.
            }
            if (!user) {
                return reject(new ServerError(info, 400));
            }

            return req.logIn(user, loginError => {
                if (loginError) {
                    return reject(loginError);
                }

                return resolve(user.token);
            });
        })(req, res, next);
    });
}

function refreshToken(req, res, next) {
    return new Promise((resolve, reject) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const user = jwt.verify(token, 'secret');
        resolve(getJWT(user.email));
    });
}

function verify(req, res, next) {
    return new Promise(async (resolve, reject) => {
        const verificationToken = req.params.verificationToken;
        try {
            const user = await User.findOne({
                verificationToken
            }).exec();
            if (!user) {
                return reject('Invalid token');
            }
            user.emailVerified = true;
            user.save();
            const resp = getJWT(user.email, res);
            return resolve(resp);
        } catch (error) {
            return reject(error);
        }
    });
}

function signup(req, res, next) {
    return new Promise((resolve, reject) => {
        passport.authenticate('local-signup', (error, user, info) => {
            if (error) {
                return reject(error); // Passport uses callback, but controllerHandler uses Promise.
            }
            if (!user) {
                return reject(new ServerError(info, 400));
            }
            return resolve(user);
        })(req, res, next);
    });
}

module.exports = {
    signin,
    signup,
    verify,
    refreshToken
};
