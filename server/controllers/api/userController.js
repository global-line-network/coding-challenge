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
  return new Promise(function(resolve, reject) {
    user.save(function(err) {
      if (err) {
        return reject(next(err));
      }
      resolve(user);
    });
  });
}

function update(req) {
  return new Promise(function(resolve, reject) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, user) {
      if (err) return reject(next(err));
      resolve(user);
    });
  });
}

function remove(id) {
  return User.findByIdAndRemove(id, function(err) {
    if (err) return next(err);
  });
}

module.exports = {
  all,
  create,
  update,
  remove
};
