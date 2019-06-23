
var userServices = require('../services/userServices');
var uuid = require("uuid");

var controller = {

    registerUser(req, res) {
        if (req.body.email && req.body.password && req.body.first_name && req.body.last_name && req.body.email) {
            userServices.handleRegisterUser(req.body, uuid.v4(), function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    return res.status(200).send(rows[0]);
                }

            });
        } else {
            return res.status(400).send("Missing required fields");
        }
    },

    loginUser(req, res) {
        if (req.body.email && req.body.password) {
            userServices.handleLoginUser(req.body, function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    return res.status(200).send(rows[0]);
                }

            });
        } else {
            return res.status(400).send("Missing fields");
        }

    },

    deleteUser(req, res) {
        if (req.params.id) {
            userServices.handleDeleteUser(req.params.id, function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    return res.status(204).send();
                }

            });

        } else {
            return res.status(400).send("Missing fields");
        }
    },

    listUsers(req, res) {
        if (req.query.page && req.query.page > 0) {
            userServices.handleListUsers(req.params.id, function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    var userlists = {
                        "page": parseInt(req.query.page),
                        "per_page": rows[1][0].per_page,
                        "total": rows[1][0].total,
                        "total_pages": rows[1][0].total_pages,
                        "data": rows[0]
                    }
                }
                res.json(userlists);
            });

        } else {
            return res.status(400).send("Page Number Should be greater than Zero");
        }
    }

};
module.exports = controller;