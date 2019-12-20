const retreatModel = require('../models/Retreat.js');
const moment = require('moment');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const s3Config = require('../auth/s3.env.js');
const fs = require('fs');

exports.getAllRetreats = function(req, res){
  retreatModel.find(function(err, retreats){
    if(err){
      console.log("error : ", err);
    }else{
      res.json(retreats);
    }
  })
}

exports.showRetreat = function(req, res){
  let id = req.params.id;

  retreatModel.findById(id, function(err, retreat){
    if(err){
      console.log("retreat not found :", err);
    }else{
      res.json(retreat);
    }
  });
}

exports.addRetreat = function(req, res, next){

  if(Array.isArray(req.body.bedRooms)){
    if(req.body.bedRooms && req.body.bedRooms.length >= 0){
      req.body.bedRooms = req.body.bedRooms.map((room) => {
        return JSON.parse(room);
      })
    }
  }else{
    let room = JSON.parse(req.body.bedRooms);
    req.body.bedRooms = [];
    req.body.bedRooms.push(room)
  }

  let imgArray = [];

  if(req.files && req.files.length >= 0){
    req.files.map((image, i) => {
      image._id = mongoose.Types.ObjectId();
      uploadImage(image)
      return imgArray.push({
        name : image.originalname,
        key : i
      })
    });
  }

  let newRetreat = new retreatModel({
    _id: new mongoose.Types.ObjectId(),
    name : req.body.name,
    dateStart : req.body.dateStart,
    dateEnd : req.body.dateEnd,
    retreatSummary : req.body.retreatSummary,
    accomodationOverview : req.body.accomodationOverview,
    food : req.body.food,
    byCar : req.body.byCar,
    byTrain : req.body.byTrain,
    bookingDetails : req.body.bookingDetails,
    bookingUrl : req.body.bookingUrl,
    whatsIncluded : req.body.whatsIncluded,
    bedRooms : req.body.bedRooms,
    retreatImages : imgArray
  });

  if(newRetreat.whatsIncluded.length > 0){
    newRetreat.whatsIncluded = newRetreat.whatsIncluded[0].split(',')
  }

  newRetreat.save()
    .then(function(newRetreat){
      res.status(201).json({message : 'Retreat added successfully'});
    })
    .catch(function(err){
      console.log('err', err);
      res.status(400).json({message : 'Unable to add new retreat'})
    })
}

const uploadImage = (image) => {

  const s3 = new AWS.S3();
  const file = fs.readFileSync(image.path);

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: image.filename,
    Body: file
  };

  s3.putObject(params, function(err, data) {
    if (err) {
      console.log("S3 upload UNSUCCESSFUL :", err);
      return
    }
    console.log(`File uploaded to s3 successfully. ${data}`);
    return
  });
}

exports.updateRetreat = function(req,res){
  retreatModel.findById(req.params.id, function(err, retreat){
    if(!retreat){
      console.log('data not found');
      res.status(404).json({ message : 'Data not found' })
    }else{

      if(Array.isArray(req.body.bedRooms)){
        if(req.body.bedRooms && req.body.bedRooms.length >= 0){
          req.body.bedRooms = req.body.bedRooms.map((room) => {
            return JSON.parse(room);
          })
        }
      }else{
        let room = JSON.parse(req.body.bedRooms);
        req.body.bedRooms = [];
        req.body.bedRooms.push(room)
      }

      let imgArray = [];

      if(req.files && req.files.length >= 0){
        req.files.map((image) => {
          image._id = mongoose.Types.ObjectId();
          uploadImage(image)
          return imgArray.push(image.originalname)
        });
      }

      retreat.name = req.body.name;
      retreat.dateStart = req.body.dateStart;
      retreat.dateEnd = req.body.dateEnd;
      retreat.retreatSummary = req.body.retreatSummary;
      retreat.accomodationOverview = req.body.accomodationOverview;
      retreat.food = req.body.food;
      retreat.byCar = req.body.byCar;
      retreat.byTrain = req.body.byTrain;
      retreat.bookingDetails = req.body.bookingDetails;
      retreat.bookingUrl = req.body.bookingUrl;
      retreat.whatsIncluded = req.body.whatsIncluded;
      retreat.bedRooms = req.body.bedRooms;
      retreat.retreatImages = imgArray;

      if(retreat.whatsIncluded.length > 0){
        retreat.whatsIncluded = retreat.whatsIncluded[0].split(',')
      }

      retreat.save().then(function(retreat){
        res.status(200).json({ message : 'Update successful' })
      })
      .catch(function(err){
        res.status(400).json({ message : 'Update unsuccessful' })
      });
    }
  });
}

exports.deleteRetreat = function(req, res){
  retreatModel.findByIdAndDelete({_id : req.params.id}, function(err){
    if(err){
      res.status(404).send("Data not found")
    }else{
      res.status(200).send('Retreat successfully removed')
    }
  });
}
