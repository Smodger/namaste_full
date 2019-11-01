const lessonModel = require('../models/Lesson');
//Simple version, without validation or sanitation
exports.getAllLessons = function(req, res){
  lessonModel.find(function(err, lessons){
    if(err){
      console.log("error : ", err);
    }else{
      res.json(lessons);
    }
  })
}

exports.showLesson = function(req, res){
  let id = req.params.id;

  lessonModel.findById(id, function(err, lesson){
    if(err){
      console.log("lesson not found :", err);
    }else{
      res.json(lesson);
    }
  });
}

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

exports.createLesson = function(req, res){

  let newLesson = new lessonModel(req.body);

  if(newLesson.linkToStudio.length <= 0 && newLesson.location !== "Tooting Bec Lido"){
    newLesson.linkToStudio = "email me at emthomsonyoga@gmail.com for booking information"
  }else if(newLesson.linkToStudio.length <= 0 && newLesson.location === "Tooting Bec Lido"){
    newLesson.linkToStudio = "Email me at emthomsonyoga@gmail.com, £5/£8"
  }

  let lowerCase = newLesson.dayOfTheWeek.toLowerCase()
  if(!days.includes(lowerCase)){
    return res.status(400).json({ message : "Invalid entry: Must be a day of the week"})
  }

  newLesson.save()
    .then(function(newLesson){
      res.status(200).json({'newLesson' : 'Lesson added successfully'});
    })
    .catch(function(err){
      console.log('err', err);
      res.status(400).send('Unable to add new lesson')
    })
}

exports.updateLesson = function(req,res){
  lessonModel.findById(req.params.id, function(err, lesson){
    if(!lesson){
      res.status(404).send('Data not found')
    }else{
      lesson.dayOfTheWeek = req.body.dayOfTheWeek;
      lesson.startHour = req.body.startHour;
      lesson.startMinutes = req.body.startMinutes;
      lesson.location = req.body.location;
      lesson.yogaStyle = req.body.yogaStyle;
      lesson.linkToStudio = req.body.linkToStudio;
      lesson.additionalInfo = req.body.additionalInfo;

      // force all DOW to lower case so we can set a universal standard for checking user entry is day of the week.
      const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      let lowerCase = lesson.dayOfTheWeek.toLowerCase();

      if(!days.includes(lowerCase)){
        return res.status(400).json({ message : "Invalid entry: Must be a day of the week"})
      }

      // accommodate for empty field for linkToStudio

      //MAKE CASE INSENSITIVE
      if(lesson.linkToStudio.length <= 0 && lesson.location !== "Tooting Bec Lido"){
        lesson.linkToStudio = "email me at emthomsonyoga@gmail.com for booking information"
      }else if(lesson.linkToStudio.length <= 0 && lesson.location === "Tooting Bec Lido"){
        lesson.linkToStudio = "Drop in sessions cost between £5 - £8"
      }


      lesson.save().then(function(lesson){
        res.status(200).json('Update successful')
      })
      .catch(function(err){
        res.status(400).send('Update unsuccessful')
      });
    }
  });
}

exports.deleteLesson = function(req, res){
  lessonModel.findByIdAndDelete({_id : req.params.id}, function(err){
    if(err){
      res.status(404).send("Data not found")
    }else{
      res.status(200).send('Lesson successfully removed')
    }
  });
}
