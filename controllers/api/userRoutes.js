const router = require('express').Router();
const { User } = require('../../models');

//route for logging in
router.post('/login', async (req, res) => {
  try {
    //get the user that matches
    const userData = await User.findOne({ where: { username: req.body.username } });
    
    //if no matching user
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    //check user password if it matches the input password
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      //sets logged_in true in the sessions
      req.session.logged_in = true;
      req.session.username =userData.username;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//route for logging out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(500).end();
  }
});

//route for signup
router.post('/signup',  (req, res) => {
  try {

    console.log(req.body.username,req.body.email,req.body.password);
    //create new User
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(newUser =>{
      //get the user logged in after sign up
      req.session.save(() => {
        req.session.user_id = newUser.id;
        //sets logged_in true in the sessions
        req.session.logged_in = true;
        req.session.username =userData.username;
        
        res.json({ user: newUser, message: 'You are now logged in!' });
      });
    })



    

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
