var db = require('../db/dbConnection');

var User = {

    handleRegisterUser: function (data, token, callback) {
        try {
            return db.query('CALL SP_Register_User(?,?,?,?,?)', [data.email, data.password, data.first_name, data.last_name, token], callback);
        } catch (e) {
            console.log("Error in handleRegisterUser : " + e);
        }
    },

    handleLoginUser: function (data, callback) {
        try {
            return db.query('CALL SP_Login_User(?,?)', [data.email, data.password], callback);
        } catch (e) {
            console.log("Error in handleLoginUser : " + e);
        }
    },

    handleDeleteUser: function (data, callback) {
        try {
            return db.query('CALL SP_Delete_User(?)', [data], callback);
        } catch (e) {
            console.log("Error in handleDeleteUser : " + e);
        }
    },

    handleUpdateUser(data, callback) {
        try {
            return db.query('CALL SP_Update_User(?)', [data], callback);
        } catch (e) {
            console.log("Error in handleUpdateUser : " + e);
        }

    },

    handleListUsers(data, callback) {
        try {
            return db.query('CALL SP_List_Users(?)', [data], callback);
        } catch (e) {
            console.log("Error in handleListUsers : " + e);
        }

    }

};
module.exports = User;