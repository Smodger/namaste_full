const retreatModel = require('../models/Retreat.js')

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

exports.addRetreat = function(req, res){

  let newRetreat = new retreatModel(req.body);
    newRetreat.whatsIncluded = newRetreat.whatsIncluded[0].split(',')

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

      retreat.dateStart = req.body.dateStart;
      retreat.dateEnd = req.body.dateEnd;
      retreat.retreatSummary = req.body.retreatSummary;

      retreat.fullyBooked = req.body.fullyBooked;
      retreat.costOverview = req.body.costOverview;
      // Do we need fully booked?
      // how do we set up room stuff etc?

      retreat.food = req.body.food;
      retreat.byCar = req.body.byCar;
      retreat.byTrain = req.body.byTrain;
      retreat.bookingDetails = req.body.bookingDetails;
      retreat.bookingUrl = req.body.bookingUrl;
      retreat.whatsIncluded.tags = req.body.whatsIncluded.tags;

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
