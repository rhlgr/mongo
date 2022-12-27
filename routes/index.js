var express = require('express');
var router = express.Router();

const User = require("../model/taskModel");

router.get('/', function (req, res, next) {
  res.render('signup', { title: 'signup' });
});

router.post('/signup', function (req, res, next) {
  // res.json(req.body);
  
  User.create((req.body))
  .then((createdUser) => {
    res.redirect("/signin");
  })
  .catch((err) => res.send(err));
});

router.get('/signin', function (req, res, next) {
  res.render('signin', { title: 'signin' });
});

router.post('/signin', function (req, res, next) {
  const { username, password}  = req.body;
  User.findOne({username})
  .then((foundUser) => {
    if (!foundUser) {
      return res.send("user not found <a href='/signin'> Go back </a>");
    }
    if (password !== foundUser.password){
      return res.send(
        "Invalid input <a href='/signin'> Go back </a>"
      );
    }
  
  res.redirect('/profile/' + foundUser.username);
})

.catch((err)=> res.send(err));
});

router.get('/profile/:username', function (req, res, next) {
  User.findOne({username:req.params.username})
  .then((user)=> {
    if(user){

      res.render('profile', { title: req.params.username, user })
      
    } else {
      res.send("user not found")
    }
  })

.catch((err)=>res.send(err));
});

router.get('/delete/:id', function (req, res, next) {
  User.findByIdAndDelete(req.params.id)
  .then((user)=> {
  res.redirect('/')
  })

.catch((err)=>res.send(err));
});

router.get('/update/:id', function (req, res, next) {
  User.findById(req.params.id)
  .then((user)=> {
  res.render("update",{
    title: "update" + user.username, user,
  })
  })
.catch((err)=>res.send(err));
});

router.post('/update/:id', function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body)
  .then((user)=> {
  res.redirect("/profile/"+ req.body.username);
    
  })
.catch((err)=>res.send(err));
});

router.get('/logout', function (req, res, next) {
  res.redirect('/');
});



module.exports = router;
