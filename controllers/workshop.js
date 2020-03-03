const workshopModel = require('../models/Workshop');
const mongoose = require('mongoose')
const AWS = require('aws-sdk');
const s3Config = require('../auth/s3.env.js');
const fs = require('fs');

exports.getAllWorkshops = function(req,res){
  workshopModel.find((err, workshops) => {
    if(err){
      console.log('error getting workshops : ', err);
    }else{
      res.json(workshops)
    }
  })
}

exports.showWorkshop = function(req,res){
  const id = req.params.id;

  workshopModel.findById(id, (err, workshop) => {
    if(err){
      console.log("cannot find workshop : ", err)
    }else{
      res.json(workshop)
    }
  })
}

exports.createWorkshop = function(req, res){

  let imgArray = [];

  if(req.files && req.files.length >= 0){
    req.files.map((image) => {
      image._id = mongoose.Types.ObjectId();
      uploadImage(image)
      return imgArray.push(image.originalname)
    });
  }

  let newWorkshop = new workshopModel({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    date : req.body.date,
    startHour : req.body.startHour,
    startMins : req.body.startMins,
    endHour : req.body.endHour,
    endMins : req.body.endMins,
    description : req.body.description,
    booking : req.body.booking,
    location : req.body.location,
    image : imgArray
  });

  newWorkshop.save()
    .then(function(newWorkshop){
      res.status(201).json({ message : 'Workshop added successfully'});
    })
    .catch(function(err){
      console.log('err', err);
      res.status(400).json({ message : 'Unable to add new workshop'});
    })
}

exports.updateWorkshop = function(req, res){
  workshopModel.findById(req.params.id, (err, workshop) => {
    if (!workshop){
      console.log('workshop cannot be found on db');
    }else{
      workshop.title = req.body.title;
      workshop.date = req.body.date;
      workshop.startHour = req.body.startHour;
      workshop.startMins = req.body.startMins;
      workshop.endHour = req.body.endHour;
      workshop.endMins = req.body.endMins;
      workshop.description = req.body.description;
      workshop.booking = req.body.booking;
      workshop.location = req.body.location;

      if(!workshop.booking || workshop.booking === ""){
        workshop.booking = "email me at emthomsonyoga@gmail.com for booking information";
      }

      workshop.save().then(function(workshop){
        res.status(200).json({message : 'Update successful'})
      })
      .catch(function(err){
        res.status(400).json({message : 'Update unsuccessful', error : err})
      });
    }
  })
}

exports.deleteWorkshop = function(req, res){
  workshopModel.findByIdAndDelete({_id : req.params.id}, function(err){
    if(err){
      res.status(404).send({message : "Data not found"})
    }else{
      res.status(200).json({message : 'Workshop successfully removed'})
    }
  });
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
