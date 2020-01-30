const workshopModel = require('../models/Workshop')

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
  const id = req.params._id;

  workshopModel.findById(id, (err, workshop) => {
    if(err){
      console.log("cannot find workshop : ", err)
    }else{
      res.json(workshop)
    }
  })
}

exports.createWorkshop = function(req, res){
  let newWorkshop = new workshopModel(req.body);

  if(!newWorkshop.booking || newWorkshop.booking === ""){
    newWorkshop.booking = "email me at emthomsonyoga@gmail.com for booking information";
  }

  newWorkshop.save()
    .then(function(newWorkshop){
      res.status(200).json({ message : 'Workshop added successfully'});
    })
    .catch(function(err){
      console.log('err', err);
      res.status(400).json({ message : 'Unable to add new workshop'})
    })
}

exports.updateWorkshop = function(req, res){
  workshopModel.findById(id, (err, workshop) => {
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
