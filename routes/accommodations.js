const express = require('express');
const router = express.Router();
const accommodationModel = require('../models/Accommodation.js')

router.get('/', function(req, res){
  accommodationModel.find(function(err, accomodations){
    if(err){
      console.log("error : ", err);
    }else{
      res.json(accomodations);
    }
  })
});

router.get('/:id', function(req, res){

  let id = req.params.id;

  accommodationModel.findById(id, function(err, accommodation){
    if(err){
      console.log("lesson not found :", err);
    }else{
      res.json(accommodation);
    }
  });
});

router.post('/addAccommodation', function(req, res){

  let newAccommodation = new accommodationModel(req.body);

  newAccommodation.save()
    .then(function(newAccommodation){
      res.status(200).json({'newAccommodation' : 'Accommodation added successfully'});
    })
    .catch(function(err){
      console.log('err', err);
      res.status(400).send('Unable to add new accommodation')
    })
});

router.post('/update/:id', function(req,res){
  accommodationModel.findById(req.params.id, function(err, accommodation){
    if(!accommodation){
      res.status(404).send('Data not found')
    }else{
      accommodation.fullyBooked = req.body.fullyBooked;
      accommodation.costOverview = req.body.costOverview;
      accommodation.bedRooms = req.body.bedRooms;


      accommodation.save().then(function(accommodation){
        res.status(200).json('Update successful')
      })
      .catch(function(err){
        res.status(400).send('Update unsuccessful')
      });
    }
  });
});

router.delete('/delete/:id', function(req, res){
  accommodationModel.findByIdAndDelete({_id : req.params.id}, function(err){
    if(err){
      res.status(404).send("Data not found")
    }else{
      res.status(200).send('Bedroom successfully removed')
    }
  });
})

module.exports = router;
