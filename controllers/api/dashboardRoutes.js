const sequelize = require('../../config/connection');
const router = require('express').Router();
const { Article, User } = require('../../models');
const withAuth = require('../../utils/auth');
var helpers = require('handlebars-helpers')();

//route for viewing dashboard and one's own posts
router.get('/', withAuth, async (req,res)=>{
    try{
        console.log('line 9 at dashboardRoutes : '+req.session.user_id);
        const userID=req.session.user_id;
        //get data from database
        await Article.findAll({
            where:{
                username_id:userID
            },
            attributes: [
                'id',
                'title',
                'content',
                'createdAt'
            ],
            include: User
        }).then(data=>{
        
            console.log('line 25 at dashboardRoutes ');
            
            const articles = data.map(article=>article.get({plain:true}));
            const view=JSON.stringify(data);
            //check
            console.log('line 30 at dashboardRoutes ',view);

            res.render('dashboard',{articles,logged_in: req.session.logged_in,});
            
            res.status(200);

        });
    
        
    } 
    catch (err) {
        res.status(500).json(err);
    }

});

//route for posting article
router.post('/', withAuth,  (req, res) => {
    try {
    
        console.log('line 50 at dashboardroutes.js');
  
      //create new Comment
      Article.create({
        title: req.body.title,
        content: req.body.content,
        username_id: req.session.user_id
      }).then(newArticle =>{
        res.json(newArticle);
        // document.location.reload();
      })
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;