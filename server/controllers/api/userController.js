const { processGreeting } = require('../../services/indexService').homeService;

function all(req, res, next) {
  return [{ DOB: '888' }];
}

function create(user) {}

function update(user) {}

function remove(name) {}

module.exports = {
  all,
  create,
  update,
  remove
};
