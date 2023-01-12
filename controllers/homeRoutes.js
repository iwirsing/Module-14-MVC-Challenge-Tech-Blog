const sequelize = require('../config/connection');

const router = require('express').Router();
const {Article, Comment, User}=require('../models');
const withAuth = require('../utils/auth');

//get all articles
router.get('/', async (req,res)=>{
    try{
        //get data from database
        const articleData= await Article.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'createdAt'
            ],
            include: User,
        }).then(data=>{
        
            console.log('line 12 at homeroutes ');
            
            const articles = data.map(article=>article.get({plain:true}));

            //check
            console.log('line 17 at homeroutes');

            res.render('homepage',{articles,logged_in: req.session.logged_in,});
            
            res.status(200);

        });
    
        
    } catch (err) {
        res.status(500).json(err);
    }

});

//click on article and see the comments
router.get('/article/:id', withAuth, async (req,res) => {
    try{

        //get data from database
        const articleData = await Article.findOne({
            where:{id:req.params.id},
            attributes: [
                'id',
                'title',
                'content',
                'createdAt'
            ],
            include: [User,{
                model: Comment,
                attributes: ['id','content','username_id','createdAt'],
                include:{
                    model:User,
                    attributes:['username']
                    }
                }],
        }).then(article=>{
            
            //check
            console.log('line 66 at homeroutes ');
            
            const data = article.get({plain:true});

            res.render('single-article',{data,logged_in: req.session.logged_in,current_user: req.session.username});
            //check
            console.log('line 71 at homeroutes');

        });
       
    }catch (err) {
        res.status(500).json(err);
    }

});

//logging in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  //to be deleted
//get all articles with comments
router.get('/comment', async (req,res)=>{
    try{
        //get data from database
        const articleData= await Article.findOne({
            where:{id:1},
            include: [User,{
                model: Comment,
                attributes: ['id','content','username_id','createdAt'],
                include:{
                    model:User,
                    attributes:['username']
                    }
                }],
    });
        console.log('display mapped data /n '+ articleData);
        res.status(200).json(articleData);
    
    } catch (err) {
        res.status(500).json(err);
    }
        // res.render('all-posts');
        //all post needs to be in view 
    });

module.exports = router;