const sequelize = require('../../config/connection');
const router = require('express').Router();
const { Article, User } = require('../../models');
const withAuth = require('../../utils/auth');

//route for viewing dashboard and one's own posts
router.get('/', withAuth, async (req,res)=>{
    try{
        console.log('line 9 at dashboardRoutes : '+req.session.user_id);
        const userID=req.session.user_id;
        //get data from database
        const articleData= await Article.findAll({
            where:{
                id:userID
            },
            attributes: [
                'id',
                'title',
                'content',
                'createdAt'
            ],
            include: User
        }).then(data=>{
        
            console.log('line 20 at dashboardRoutes ');
            
            const articles = data.map(article=>article.get({plain:true}));

            //check
            console.log('line 25 at dashboardRoutes');

            res.render('dashboard',{articles,logged_in: req.session.logged_in,});
            
            res.status(200);

        });
    
        
    } 
    catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;