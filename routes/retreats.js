const express = require('express');
const router = express.Router();
const retreatModel = require('../models/Retreat.js')

router.get('/', function(req, res){
  retreatModel.find(function(err, retreats){
    if(err){
      console.log("error : ", err);
    }else{
      res.json(retreats);
    }
  })
});

router.get('/:id', function(req, res){

  let id = req.params.id;

  retreatModel.findById(id, function(err, retreat){
    if(err){
      console.log("retreat not found :", err);
    }else{
      res.json(retreat);
    }
  });
});

router.post('/addRetreat', function(req, res){

  let newRetreat = new retreatModel(req.body);

  newRetreat.save()
    .then(function(newRetreat){
      res.status(200).json({'newRetreat' : 'Retreat added successfully'});
    })
    .catch(function(err){
      console.log('err', err);
      res.status(400).send('Unable to add new retreat')
    })
});

router.post('/update/:id', function(req,res){
  retreatModel.findById(req.params.id, function(err, retreat){
    if(!retreat){
      res.status(404).send('Data not found')
    }else{

      retreat.dateStart = req.body.dateStart;
      retreat.dateEnd = req.body.dateEnd;
      retreat.retreatSummary = req.body.retreatSummary;
      retreat.housing = req.body.housing;
      retreat.food = req.body.food;
      retreat.travel.byCar = req.body.travel.byCar;
      retreat.travel.byTrain = req.body.travel.byTrain;
      retreat.bookingInfo.details = req.body.bookingInfo.details;
      retreat.bookingInfo.url = req.body.bookingInfo.url;
      retreat.whatsIncluded.tags = req.body.whatsIncluded.tags;

      retreat.save().then(function(retreat){
        res.status(200).json('Update successful')
      })
      .catch(function(err){
        res.status(400).send('Update unsuccessful')
      });
    }
  });
});

router.delete('/delete/:id', function(req, res){
  retreatModel.findByIdAndDelete({_id : req.params.id}, function(err){
    if(err){
      res.status(404).send("Data not found")
    }else{
      res.status(200).send('Retreat successfully removed')
    }
  });
})

module.exports = router;
