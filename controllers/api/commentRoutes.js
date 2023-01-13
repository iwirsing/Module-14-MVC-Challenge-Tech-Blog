const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
var helpers = require('handlebars-helpers')();

//route for posting comment
router.post('/', withAuth,  (req, res) => {
    try {
    
        console.log('line 8 at commentroutes.js');
  
      //create new Comment
      Comment.create({
        content: req.body.content,
        username_id: req.session.user_id,
        article_id: req.body.article_id
      }).then(newComment =>{
        res.json(newComment);
      })
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
module.exports = router;