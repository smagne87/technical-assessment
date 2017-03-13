let mongoose = require('mongoose');
let models = require('../models/articleModel')(mongoose);

let aController = module.exports = {};

aController.createArticle = function (userId, title, text, tags, callback) {
    let result = {
        success: true,
        message: '',
        article: {}
    };

    if (!userId || userId == '') {
        result.success = false;
        result.message = 'User is required';
        callback(null, result);
    }

    if (!title || title == '') {
        result.success = false;
        result.message = 'Title is required';
        callback(null, result);
    }

    if (!text || text == '') {
        result.success = false;
        result.message = 'Text is required';
        callback(null, result);
    }

    if (!tags || tags.length <= 0) {
        result.success = false;
        result.message = 'Tags are required';
        callback(null, result);
    }

    if (result.success) {
        let art = new models.Article();
        art.title = title;
        art.userId = userId;
        art.text = text;
        art.tags = tags;
        art.save(function (err) {
            if (err) {
                console.log(err);
                result.success = false;
                result.message = 'Unexpected error!';
            }
            else {
                result.article = art;
            }
            callback(err, result);
        });
    }
};

aController.updateArticle = function (articleId, title, text, tags, callback) {
    let result = {
        success: true,
        message: '',
        article: {}
    };

    if (!articleId || articleId == '') {
        result.success = false;
        result.message = 'Article Id is required';
        callback(null, result);
    }

    if (!title || title == '') {
        result.success = false;
        result.message = 'Title is required';
        callback(null, result);
    }

    if (!text || text == '') {
        result.success = false;
        result.message = 'Text is required';
        callback(null, result);
    }

    if (!tags || tags.length <= 0) {
        result.success = false;
        result.message = 'Tags are required';
        callback(null, result);
    }

    if (result.success) {
        models.Article.findOne({ _id: articleId }).exec(function (err, art) {
            if (err) {
                result.success = false;
                result.message = 'Unexpected error!';
                callback(err, result);
            }
            art.title = title;
            art.text = text;
            art.tags = tags;
            art.save(function (err) {
                if (err) {
                    console.log(err);
                    result.success = false;
                    result.message = 'Unexpected error!';
                }
                else {
                    result.article = art;
                }
                callback(err, result);
            });
        });
    }
};

aController.removeArticle = function (articleId, callback) {
    let result = {
        message: '',
        success: true
    };

    models.Article.remove({ _id: articleId }, function (err) {
        if (err) {
            result.success = false;
            result.message = 'Unexpected error!';
            console.log(err);
        } else {
            result.success = true;
        }
        callback(err, result);
    });
};

aController.getArticlesByTags = function (tag, callback) {
    let result = {
        success: true,
        message: '',
        articles: []
    };

    models.Article.find({ tags: tag }).exec(function (err, arts) {
        if (err) {
            result.success = false;
            result.message = 'Unexpected error!';
            console.log(err);
        } else {
            result.success = true;
            result.articles = arts;
        }

        callback(err, result);
    });
};


aController.getLatestArticle = function (callback) {
    models.Article.findOne({}, function (err, art) {
        callback(art);
    });
};