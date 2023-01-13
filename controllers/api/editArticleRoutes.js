const router = require('express').Router();
const { Article } = require('../../models');
const withAuth = require('../../utils/auth');
var helpers = require('handlebars-helpers')();

//route for viewing edit page
router.get('/:id', withAuth, async (req,res) => {
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
        }).then(article=>{
            
            
            const data = article.get({plain:true});

            //check
            console.log('line 22 at editArticleRoutes ',data);
            res.render('edit-delete-article',{data,logged_in: req.session.logged_in,current_user: req.session.username});
            //check
            console.log('line 27 at editArticleRoutes');

        });
       
    }catch (err) {
        res.status(500).json(err);
    }

});

//route for re-publishing content
router.put('/:id',withAuth, (req,res)=>{

    try {
    
        console.log('line 42 at editArticleRoutes.js');
  
      //edit article
      Article.update({
        title: req.body.title,
        content: req.body.content,
        username_id: req.session.user_id},
        {
        where: {id:req.params.id}
  
      }).then(editArticle =>{
        res.json(editArticle);
      })
  
    } catch (err) {
      res.status(400).json(err);
    }

});


//route for deleting content
router.delete('/:id',withAuth, (req,res)=>{
    Article.destroy({
        where: {
            id:req.body.article_id
        }
    }).then(deletedArticle =>{
        //check if deleted
        if(!deletedArticle){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(deletedArticle);
      }).catch (err=>{
      res.status(400).json(err);})
});

module.exports = router;