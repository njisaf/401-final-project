'use strict';

require('./lib/test-env.js');

const expect = require('chai').expect;
const request = require('superagent');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const serverCtrl = require('./lib/server-ctrl.js');
const cleanDB = require('./lib/clean-db.js');
// const mockUser = require('./lib/user-mock.js');

mongoose.Promise = Promise;

const server = require('../server');
const url = `http://localhost:${process.env.PORT}`;

const exampleHospital = {
  name: 'Seattle Childrens',
};

describe('testing hospital-router', function(){

  before(done => serverCtrl.serverUp(server, done));
  after(done => serverCtrl.serverDown(server, done));
  afterEach(done => cleanDB(done));

  describe('testing POST /api/hospital', function(){

    describe('testing valid POST request', function(){

      it('should return a status code of 200', (done) => {
        request.post(`${url}/api/hospital`)
        .send(exampleHospital)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleHospital.name);
          done();
        });
      });
    });

    describe('testing invalid POST request', function(){

      it('should return a status code of 400', (done) => {
        request.post(`${url}/api/hospital`)
        .send('{youshallnotpass')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
