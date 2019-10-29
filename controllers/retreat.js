const retreatModel = require('../models/Retreat.js');
const moment = require('moment');
const mongoose = require('mongoose');

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
    req.files.map((image) => {
      return imgArray.push(image.path)
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

  if(newRetreat.dateStart){
    var x = moment( new Date(newRetreat.dateStart)).format("DD/MM/YYYY")
    newRetreat.dateStart = x;
  }

  if(newRetreat.dateEnd){
    var x = moment( new Date(newRetreat.dateEnd)).format("DD/MM/YYYY")
    newRetreat.dateEnd = x;
  }

  newRetreat.save()
    .then(function(newRetreat){
      res.status(201).json({'newRetreat' : 'Retreat added successfully'});
    })
    .catch(function(err){
      console.log('err', err);
      res.status(400).send('Unable to add new retreat')
    })
}

exports.updateRetreat = function(req,res){
  retreatModel.findById(req.params.id, function(err, retreat){
    if(!retreat){
      res.status(404).send('Data not found')
    }else{

      retreat.name = req.body.name;
      retreat.dateStart = req.body.dateStart;
      retreat.dateEnd = req.body.dateEnd;
      retreat.retreatSummary = req.body.retreatSummary;
      retreat.accomodationOverview = req.body.accomodationOverview;
      retreat.bedRooms.booked = req.body.bedRooms.booked;
      retreat.bedRooms.description = req.body.bedRooms.description;
      retreat.bedRooms.costPerPerson = req.body.bedRooms.costPerPerson;
      retreat.food = req.body.food;
      retreat.byCar = req.body.byCar;
      retreat.byTrain = req.body.byTrain;
      retreat.bookingDetails = req.body.bookingDetails;
      retreat.bookingUrl = req.body.bookingUrl;
      retreat.whatsIncluded = req.body.whatsIncluded.tags;

      retreat.save().then(function(retreat){
        res.status(200).json('Update successful')
      })
      .catch(function(err){
        res.status(400).send('Update unsuccessful')
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
