var express = require('express');
var router = express.Router();
var UserAPI = require('../API/DataAPI')
var uuid = require('uuid');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', { 
    title: 'BOTFlook',
    userapi: UserAPI
  });
});

// GET all users
router.get('/users', function(req, res){
  res.json(UserAPI);
});


// GET singel Uuser
router.get('/users/:id', function(req, res){
  //เช็คว่ามีค่าไหม
  let found = UserAPI.some(User => User.id === parseInt(req.params.id));
  if (found){
    res.json(UserAPI.filter(User => User.id === parseInt(req.params.id)));
  } else{
    res.status(400).json({ messages : `No users with the id of ${req.params.id}` });
  }
});

// Create users
router.post('/users', function(req, res) {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email
  }
  if (!newUser.name || !newUser.email){
    return res.status(400).json({messages : 'Please include a name and email'})
  }
  UserAPI.push(newUser);
  //res.json(UserAPI);
  res.redirect('/api');
});

// Update User
router.put('/users/:id', (req, res)=>{
  let found = UserAPI.some(User => User.id === parseInt(req.params.id));

  if (found){
    const updUser =  req.body;
    UserAPI.forEach(user => {
      if (user.ud === parseInt(req.params.id)){
        user.name = updUser.name ? updUser.name : user.name;
        user.email = updUser.email ? updUser.email : user.email;

        res.json({ messages : 'User updated',user })
      }
    })
  } else {
    res.status(400).json({ messages:`No user with the id of ${req.params.id}` })
  }
});

router.delete('/users/:id', (req, res)=>{
  let found = UserAPI.some(User => User.id === parseInt(req.params.id));

  if (found){
      res.json({
        messages: 'Member Deleted',
        users : UserAPI.filter(User => User.id !== parseInt(req.params.id))
      })
  }else {
    res.status(400).json({ messages:`No user with the id of ${req.params.id}` })
  }
});




module.exports = router;
