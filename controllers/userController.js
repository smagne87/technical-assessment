const mongoose = require('mongoose');
const models = require('../models/userModel')(mongoose);
const Promise = require('bluebird');
Promise.promisifyAll(models.User);
Promise.promisifyAll(models.User.prototype);

let uController = module.exports = {};

uController.createUser = function (name, avatar) {
    return new Promise((resolve, reject) => {
        let result = {
            success: true,
            message: '',
            user: {}
        };

        try {
            if (!name || name == '') {
                result.success = false;
                result.message = 'name is required';
                resolve(result);
            }

            if (!avatar || avatar == '') {
                result.success = false;
                result.message = 'avatar is required';
                resolve(result);
            }

            if (result.success) {
                let u = new models.User();
                u.name = name;
                u.avatar = avatar;
                u.saveAsync().then((savedUser) => {
                    result.user = savedUser;
                    resolve(result);
                }).catch(() => {
                    result.success = false;
                    result.message = 'Unexpected error!';
                    reject(result);
                });
            }
        } catch (err) {
            reject(err);
        }
    });
};