const express = require('express');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');
const crypto = require('crypto');
const configEnv = require('../config.env');
const router = express.Router();

router.all('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

router.post('/user-noao', (req, res) => {
    userController.createUser(req.body.name, req.body.avatar).then((result) => {
        res.jsonp({
            data: result
        });
    }).catch((err) => {
        res.jsonp({
            data: err
        });
    });
    
});

router.post('/user', validateToken, (req, res) => {
    userController.createUser(req.body.name, req.body.avatar).then((result) => {
        res.jsonp({
            data: result
        });
    }).catch((err) => {
        res.jsonp({
            data: err
        });
    });
});

router.post('/article', validateToken, (req, res) => {
    articleController.createArticle(req.body._userId, req.body.title, req.body.text, req.body.tags).then((result) => {
        res.jsonp({
            data: result
        });
    }).catch((err) => {
        res.jsonp({
            data: err
        });
    });
});

router.put('/article/:id', validateToken, (req, res) => {
    articleController.updateArticle(req.params.id, req.body.title, req.body.text, req.body.tags).then((result) => {
        res.jsonp({
            data: result
        });
    }).catch((err) => {
        res.jsonp({
            data: err
        });
    });
});

router.delete('/article/:id', validateToken, (req, res) => {
    articleController.removeArticle(req.params.id).then((result) => {
        res.jsonp({
            data: result
        });
    }).catch((err) => {
        res.jsonp({
            data: err
        });
    });
});

router.get('/article/:tag', validateToken, (req, res) => {
    articleController.getArticlesByTags(req.params.tag).then((result) => {
        res.jsonp({
            data: result
        });
    }).catch((err) => {
        res.jsonp({
            data: err
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