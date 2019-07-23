const express = require('express');
const router = express.Router();
const bedroomModel = require('../models/Bedroom.js')

router.get('/', function(req, res){
  bedroomModel.find(function(err, bedrooms){
    if(err){
      console.log("error : ", err);
    }else{
      res.json(bedrooms);
    }
  })
});

router.get('/:id', function(req, res){

  let id = req.params.id;

  bedroomModel.findById(id, function(err, bedroom){
    if(err){
      console.log("lesson not found :", err);
    }else{
      res.json(bedroom);
    }
  });
});

router.post('/addBedroom', function(req, res){

  let newBedroom = new bedroomModel(req.body);

  newBedroom.save()
    .then(function(newBedroom){
      res.status(200).json({'newBedroom' : 'Bedroom added successfully'});
    })
    .catch(function(err){
      console.log('err', err);
      res.status(400).send('Unable to add new bedroom')
    })
});

router.post('/update/:id', function(req,res){
  bedroomModel.findById(req.params.id, function(err, bedroom){
    if(!bedroom){
      res.status(404).send('Data not found')
    }else{
      bedroom.booked = req.body.booked;
      bedroom.description = req.body.description;
      bedroom.costPerPerson = req.body.costPerPerson;


      bedroom.save().then(function(bedroom){
        res.status(200).json('Update successful')
      })
      .catch(function(err){
        res.status(400).send('Update unsuccessful')
      });
    }
  });
});

router.delete('/delete/:id', function(req, res){
  bedroomModel.findByIdAndDelete({_id : req.params.id}, function(err){
    if(err){
      res.status(404).send("Data not found")
    }else{
      res.status(200).send('Bedroom successfully removed')
    }
  });
})

module.exports = router;
