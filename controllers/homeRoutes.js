const router = require('express').Router();

router.get('/', (req,res)=>{
    res.render('all-posts');
    //all post needs to be in view 


});

module.exports = router;