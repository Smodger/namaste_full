const userModel = require('../models/User.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSignUp = function(req, res, next){

  userModel.find().exec()
  .then(function(users){
    if(users.length > 2){
      throw new Error("Maximum number of users reached.");
    }
  })
  .then(function(){
    return userModel.find({ email : req.body.email}).exec()
  })
  .then(function(user){

    if(user.length >= 1){
      //409 = conflict
      return res.status(409).json({ message : "Email address already exists" })
    }else {
      bcrypt.hash(req.body.password, 10, function(err, hash){
        if(err){
          console.log('hashing error :', err);
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
  })
  .catch(function(err){
    console.log('err', err);
    res.status(401).json({ message : err.message})
  })
}

const userLogin = function(req,res, next){
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

const deleteUser = function(req, res, next){
  userModel.findByIdAndDelete({_id : req.params.id}, function(err){
    if(err){
      res.status(404).send("User not found")
    }else{
      res.status(200).json({message : 'User successfully removed'})
    }
  });
}

const getUser = function(req,res){
  let id = req.params.id;

  userModel.findById(id, function(err, user){
    if(err){
      console.log("user not found :", err);
    }else{
      res.json(user);
    }
  });
}

const getAllUsers = function(req, res){
  userModel.find(function(err, users){
    if(err){
      console.log("error : ", err);
    }else{
      res.json(users);
    }
  })
}

module.exports = {
  userSignUp : userSignUp,
  userLogin : userLogin,
  deleteUser : deleteUser,
  getUser : getUser,
  getAllUsers : getAllUsers
}
