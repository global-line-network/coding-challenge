const { processGreeting } = require('../../services/indexService').homeService;
const User = require('../../models/User');

function all(req, res, next) {
  return new Promise(function(reslove, reject) {
    User.find(function(err, users) {
      if (err) reject(next(err));
      reslove(users);
    });
  });
}

function create(req, res) {
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    DOB: req.body.DOB,
    avatar: req.file ? req.file.cloudStoragePublicUrl : '',
    email: req.body.email
  });

  user.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send('User Created successfully');
  });
}

function update(req) {
  console.log(req);
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, user) {
    if (err) return next(err);
    // res.send('User udpated.');
  });
}

function remove(name) {}

module.exports = {
  all,
  create,
  update,
  remove
};
