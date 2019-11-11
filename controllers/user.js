const userModel = require('../models/User.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userSignUp = function(req, res, next){
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
          const newUser = new userModel ({
            _id : new mongoose.Types.ObjectId(),
            email : req.body.email,
            password : hash
          });
          newUser.save()
            .then(function(newUser){
              //create token for when user signs up too.
              const token = jwt.sign({
                email : newUser.email,
                id : newUser._id
              }, process.env.JWT_KEY,
              {
                expiresIn : "1h"
              }, function(err, token){
                if (err) {
                  console.log('token error');
                  return res.status(401).send('Unable to authenticate new user :', err)
                }
                res.status(201).json({user : newUser, token : token});
              })
            })
            .catch(function(err){
              console.log('err', err);
              res.status(400).send('Unable to add new user :', err)
            })
        }
      });
    }
  });
}

exports.userLogin = function(req,res, next){
  userModel.find({ email : req.body.email }).exec()
    .then(function(user){
      if(user.length < 1){
        return res.status(401).json({ message : "Auth failed - user not found"})
      }

      bcrypt.compare(req.body.password, user[0].password, function(err, result){
        if(err){
          return res.status(401).json({ message : "Auth failed", error : err});
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
        // error msg below only shows if incorrect pwd. BUT the message says password or email so we do not specifically say email is correct. 
        return res.status(401).json({ message : "Auth failed - incorrect password or email"});
      });
    })
    .catch(function(err){
      console.log('error', err);
      res.status(500).json({ error : err })
    })
}

exports.deleteUser = function(req, res, next){
  userModel.findByIdAndDelete({_id : req.params.id}, function(err){
    if(err){
      res.status(404).send("User not found")
    }else{
      res.status(200).json({message : 'User successfully removed'})
    }
  });
}

exports.getUser = function(req,res){
  userModel.findById( req.userData.id )
    .select('-password')
    .then(function(user){
      return res.json({ user : user})
    })
}
