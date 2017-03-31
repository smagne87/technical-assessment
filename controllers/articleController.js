const mongoose = require('mongoose');
const models = require('../models/articleModel')(mongoose);
const Promise = require('bluebird');
Promise.promisifyAll(models.Article);
Promise.promisifyAll(models.Article.prototype);

let aController = module.exports = {};

aController.createArticle = function (userId, title, text, tags) {
    return new Promise((resolve, reject) => {
        let result = {
            success: true,
            message: '',
            article: {}
        };

        if (!userId || userId == '') {
            result.success = false;
            result.message = 'User is required';
            reject(result);
        }

        if (!title || title == '') {
            result.success = false;
            result.message = 'Title is required';
            reject(result);
        }

        if (!text || text == '') {
            result.success = false;
            result.message = 'Text is required';
            reject(result);
        }

        if (!tags || tags.length <= 0) {
            result.success = false;
            result.message = 'Tags are required';
            reject(result);
        }

        if (result.success) {
            let art = new models.Article();
            art.title = title;
            art.userId = userId;
            art.text = text;
            art.tags = tags;
            art.saveAsync().then((savedArt) => {
                result.article = savedArt;
                resolve(result);
            }).catch(() => {
                result.success = false;
                result.message = 'Unexpected error!';
                reject(result);
            });
        }
    });
};

aController.updateArticle = function (articleId, title, text, tags) {
    return new Promise((resolve, reject) => {
        let result = {
            success: true,
            message: '',
            article: {}
        };

        if (!articleId || articleId == '') {
            result.success = false;
            result.message = 'Article Id is required';
            reject(result);
        }

        if (!title || title == '') {
            result.success = false;
            result.message = 'Title is required';
            reject(result);
        }

        if (!text || text == '') {
            result.success = false;
            result.message = 'Text is required';
            reject(result);
        }

        if (!tags || tags.length <= 0) {
            result.success = false;
            result.message = 'Tags are required';
            reject(result);
        }

        if (result.success) {
            models.Article.findOne({ _id: articleId }).exec().then((art) => {
                art.title = title;
                art.text = text;
                art.tags = tags;
                art.saveAsync().then((artSaved) => {
                    result.article = artSaved;
                    resolve(result);
                }).catch(() => {
                    result.success = false;
                    result.message = 'Unexpected error!';
                    reject(result);
                });
            }).catch(() => {
                result.success = false;
                result.message = 'Unexpected error!';
                reject(result);
            });
        }
    });
};

aController.removeArticle = function (articleId) {
    return new Promise((resolve, reject) => {
        let result = {
            message: '',
            success: true
        };
        models.Article.remove({ _id: articleId }).then(() => {
            result.success = true;
            resolve(result);
        }).catch(() => {
            result.success = false;
            result.message = 'Unexpected error!';
            reject(result);
        });
    });
};

aController.getArticlesByTags = function (tag) {
    return new Promise((resolve, reject) => {
        let result = {
            success: true,
            message: '',
            articles: []
        };

        models.Article.find({ tags: tag }).exec().then((arts) => {
            result.articles = arts;
            resolve(result);
        }).catch(() => {
            result.success = false;
            result.message = 'Unexpected error!';
            reject(result);
        });
    });
};


aController.getLatestArticle = function () {
    return new Promise((resolve, reject) => {
        models.Article.findOne({}).exec().then((art) => {
            resolve(art);
        }).catch((err) =>{
            reject(err);
        });
    });
};