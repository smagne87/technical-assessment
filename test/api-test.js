/* global it, describe */
const should = require('should');
const assert = require('assert');
const request = require('supertest');
const winston = require('winston');
const configEnv = require('../config.env');
const crypto = require('crypto');

describe('Testing Token Validation', () => {
    it('should validate token', (done) => {
        request(configEnv.testUrl)
            .post('/user')
            .end((err, res) => {
                if (err) {
                    throw err;
                }

                res.should.have.property('status', 401);
                done();
            });
    });
});

describe('Testing User/Article API', () => {

    let _userId = '';
    let _articleId = '';
    const _tag = 'lorem';

    it('should validate required fields for User', (done) => {
        let user = {
            'name': '',
            'avatar': '',
            'date': new Date().toString()
        };
        const token = crypto.createHash('md5').update(user.date + configEnv.secretApiKey).digest('hex');
        request(configEnv.testUrl)
            .post('/user')
            .set({ 'Authorization': token })
            .send(user)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.data.success.should.equal(false);
                res.body.data.message.should.not.equal('');
                done();
            });
    });

    it('should create an user', (done) => {
        const user = {
            'name': 'name test',
            'avatar': 'avatar-test',
            'date': new Date().toString()
        };
        const token = crypto.createHash('md5').update(user.date + configEnv.secretApiKey).digest('hex');
        request(configEnv.testUrl)
            .post('/user')
            .set({ 'Authorization': token })
            .send(user)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.data.success.should.equal(true);
                res.body.data.message.should.equal('');
                res.body.data.user.should.have.property('_id');
                _userId = res.body.data.user._id;
                done();
            });
    });

    it('should validate required fields for Article', (done) => {
        const art = {
            '_userId': '',
            'title': '',
            'text': '',
            'tags': [],
            'date': new Date().toString()
        };
        const token = crypto.createHash('md5').update(art.date + configEnv.secretApiKey).digest('hex');
        request(configEnv.testUrl)
            .post('/article')
            .set({ 'Authorization': token })
            .send(art)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.data.success.should.equal(false);
                res.body.data.message.should.not.equal('');
                done();
            });
    });


    it('should create an Article', (done) => {
        const art = {
            '_userId': _userId,
            'title': 'testing article',
            'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'tags': ['lorem', 'test', 'technical', 'assessment'],
            'date': new Date().toString()
        };
        const token = crypto.createHash('md5').update(art.date + configEnv.secretApiKey).digest('hex');
        request(configEnv.testUrl)
            .post('/article')
            .set({ 'Authorization': token })
            .send(art)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.data.success.should.equal(true);
                res.body.data.message.should.equal('');
                _articleId = res.body.data.article._id;
                done();
            });
    });

    it('should update an Article', (done) => {
        const art = {
            'title': 'updating article',
            'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. update',
            'tags': ['lorem', 'test', 'technical', 'assessment', 'new tag'],
            'date': new Date().toString()
        };
        const token = crypto.createHash('md5').update(art.date + configEnv.secretApiKey).digest('hex');
        request(configEnv.testUrl)
            .put('/article/' + _articleId)
            .set({ 'Authorization': token })
            .send(art)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.data.success.should.equal(true);
                res.body.data.message.should.equal('');
                done();
            });
    });

    it('should delete an Article', (done) => {
        const art = {
            'date': new Date().toString()
        };
        const token = crypto.createHash('md5').update(art.date + configEnv.secretApiKey).digest('hex');
        request(configEnv.testUrl)
            .del('/article/' + _articleId)
            .set({ 'Authorization': token })
            .send(art)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.data.success.should.equal(true);
                res.body.data.message.should.equal('');
                done();
            });
    });

    it('should retrieve Article with tag', (done) => {
        const art = {
            'date': new Date().toString()
        };
        const token = crypto.createHash('md5').update(art.date + configEnv.secretApiKey).digest('hex');
        request(configEnv.testUrl)
            .get('/article/' + _tag)
            .set({ 'Authorization': token })
            .send(art)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.data.success.should.equal(true);
                res.body.data.message.should.equal('');
                done();
            });
    });
});