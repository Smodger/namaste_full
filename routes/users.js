const express = require('express');
const router = express.Router();
const userModel = require('../models/User.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', function(req, res, next){
  // IF WE WANT ONLY ONE EMAIL SIGN UP, EG JUST emthomsonyoga@gmail.com THEN ADD STATEMENT REQ.BODY.EMAIL !== 'emthomsonyoga@gmail.com'

  userModel.find({ email : req.body.email}).exec()
  .then(function(user){
    if(user.length >= 1){
      //409 = conflict
      return res.status(409).json({ message : "Email address already exists" })
    }else {
      bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err){
          return res.status(500).json({
            error : err
          });
        }else{
        // using a more verbose method to create user as per bcrypt documemtation
          const newUser = new userModel ({
            _id : new mongoose.Types.ObjectId(),
            email : req.body.email,
            password : hash
          });
          newUser.save()
            .then(function(newUser){
              console.log('User', newUser);
              res.status(201).json({'newUser' : 'User added successfully'});
            })
            .catch(function(err){
              console.log('err', err);
              res.status(400).send('Unable to add new user :', err)
            })
        }
      });
    }
  });
});

router.post('/login', function(req,res, next){
  userModel.find({ email : req.body.email }).exec()
    .then(function(user){
      if(user.length < 1){
        return res.status(401).json({ message : "Auth failed"})
      }

      bcrypt.compare(req.body.password, user[0].password, function(err, result){
        if(err){
          return res.status(401).json({ message : "Auth failed"});
        }
        if(result){
          const token = jwt.sign({
            email : user[0].email,
            id : user[0]._id
          },
          process.env.JWT_KEY,
          {
            expiresIn : "1h"
          })
          return res.status(200).json({ message : "Auth successful" , token : token });
        }
        return res.status(401).json({ message : "Auth failed"});
      });
    })
    .catch(function(err){
      console.log('error', err);
      res.status(500).json({ error : err })
    })
})

router.delete('/delete/:id', function(req, res, next){
  userModel.findByIdAndDelete({_id : req.params.id}, function(err){
    if(err){
      res.status(404).send("User not found")
    }else{
      res.status(200).json({message : 'User successfully removed'})
    }
  });
})

module.exports = router;
