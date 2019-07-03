const { processGreeting } = require('../../services/indexService').homeService;

function hello(req, res, next) {
    return { msg: req.txtM('USER_FOUND', 2, 2) };
}

function getGreeting(name) {
    const greeting = processGreeting(name);
    return { msg: greeting };
}

function postGreeting(name) {
    const greeting = processGreeting(name);
    return { msg: greeting };
}

module.exports = {
    hello,
    getGreeting,
    postGreeting
};
