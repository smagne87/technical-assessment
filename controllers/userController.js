let mongoose = require('mongoose');
let models = require('../models/userModel')(mongoose);

let uController = module.exports = {};

uController.createUser = function (name, avatar, callback) {
    let result = {
        success: true,
        message: "",
        user: {}
    };

    if (!name || name == '') {
        result.success = false;
        result.message = 'name is required';
        callback(null, result);
    }

    if (!avatar || avatar == '') {
        result.success = false;
        result.message = 'avatar is required';
        callback(null, result);
    }

    if (result.success) {
        let u = new models.User();
        u.name = name;
        u.avatar = avatar;
        u.save(function (err) {
            if (err) {
                console.log(err);
                result.success = false;
                result.message = 'Unexpected error!';
            }
            else {
                result.user = u;
            }
            callback(err, result);
        });
    }
};