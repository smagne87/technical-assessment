let express = require('express');
let path = require('path');
let userController = require('../controllers/userController');
let articleController = require('../controllers/articleController');
let crypto = require('crypto');
let configEnv = require('../config.env');
let router = express.Router();

router.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.post('/user', validateToken, function (req, res, next) {
    userController.createUser(req.body.name, req.body.avatar, function (err, result) {
        res.jsonp({
            data: result
        });
    });
});

router.post('/article', validateToken, function (req, res, next) {
    articleController.createArticle(req.body._userId, req.body.title, req.body.text, req.body.tags, function (err, result) {
        res.jsonp({
            data: result
        });
    });
});

router.put('/article/:id', validateToken, function (req, res, next) {
    articleController.updateArticle(req.params.id, req.body.title, req.body.text, req.body.tags, function (err, result) {
        res.jsonp({
            data: result
        });
    });
});

router.delete('/article/:id', validateToken, function (req, res, next) {
    articleController.removeArticle(req.params.id, function (err, result) {
        res.jsonp({
            data: result
        });
    });
});

router.get('/article/:tag', validateToken, function (req, res, next) {
    articleController.getArticlesByTags(req.params.tag, function (err, result) {
        res.jsonp({
            data: result
        });
    });
});

function validateToken(req, res, next) {
    let result = {
        success: true,
        message: ''
    };
    if (!req.body.date || !req.headers['authorization']) {
        result.success = false;
        result.message = 'Access Denied';
        res.status(401).jsonp({ data: result });
    } else {
        const token = crypto.createHash('md5').update(req.body.date + configEnv.secretApiKey).digest('hex');
        if (token != req.headers['authorization']) {
            result.success = false;
            result.message = 'Access Denied';
            res.status(401).jsonp({ data: result });
        }
        else
            next();
    }
}

module.exports = router;