const config = require('../config.json');
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');



var mongoose = require('mongoose');
mongoose.connect(config.connectionString);



router.get('/', getAll);
router.post('/register', createUser)
router.post('/authenticate', authenticate);
router.delete('/:id', removeUser);


function getAll(req, res) {
  User.find()
    .exec(function (err, users) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({ users });
    });
}

function createUser(req, res){
    var user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    console.log(user)
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error did occur',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
}

function authenticate(req, res){

  User.findOne({username: req.body.username}, function(err, user) {
    console.log(user)
    if (err) {

        return res.status(500).send(err)
    }
    if (!user) {
      console.log(err)
      return res.status(401).send(
            'Password and or Username invalid'
      )
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send(
          'Password and or Username invalid'
        );
    }
    var token = jwt.sign({user: user}, config.secret, {expiresIn: 7200});
    res.status(200).json({
        message: 'Successfully logged in',
        token: token,
        userId: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
    });
  });
}

function removeUser(req, res){
  User.deleteOne({_id: req.params.id}, function(err, user){
    if(err){
        return res.status(500).json(err);
    }
    return res.status(200).json({
      message: 'User Successfully deleted'
    })
  });



}
module.exports = router;
