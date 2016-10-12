'use strict';

//node module
const fs = require('fs');
const path = require('path');


//npm module
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const createError = require('http-errors');
const debug = require('debug');
// const jsonParser = require('body-parser').json();


//app module
const Pic = require('../model/pic');
const Profile = require('../model/profile');
const picRouter = module.exports = require('express').Router();
const bearerAuth = require('../lib/bearer-auth-middleware');
//TODO: uncomment Status later when we have Status
// const Status = require('../model/status');

//bluebird
AWS.config.setPromisesDependency(require('bluebird'));

//module constants
const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({dest: dataDir});



function s3UploadPromise(params){
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, s3data) => {
      if (err) return reject(err);
      resolve (s3data);
    });
  });
}

//find profile, if !, 404
//upload pic to AWS, err 500 if not uploaded
//instantiate pic object
//take photo id and add it to profile
//save profile
//respond to user

picRouter.post('/api/profile/:profileID/pic', bearerAuth, upload.single('image'), function(req, res, next){
  debug('hit POST route /api/profile/:profileID/pic');
  if(!req.file)
    return next(createError(400, 'no file found'));

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: 'heretogether-assets',
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path),
  };

  Profile.findById(req.params.profileID)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(() => s3UploadPromise(params))
  .catch(err => err.status ? Promise.reject(err) : Promise.reject(createError(500, err.message)))
  .then(s3data => {
    console.log('req.body', req.body);

    del([`${dataDir}/*`]);
    let picData = {
      name: req.body.name,
      desc: req.body.desc,
      alt: req.body.alt,
      username: req.user.username,
      userID: req.user._id,
      imageURI: s3data.Location,
      objectKey: s3data.Key,
    };
    return new Pic(picData).save();
  })
  .then(pic => {
    // Profile.call(this, err => {
      // if (err) next(err);
      // pic.picID = this.tempProfile.picID.toString();
      // console.log('line 88', this.tempProfile.picID.toString());
    res.json(pic);
    // });
  })
  .catch(err => {
    del([`${dataDir}/*`]);
    next(err);
  });
});
