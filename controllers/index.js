const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/',require('./homeRoutes'));
router.use('/api', apiRoutes);


//when all other routes entered
router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;