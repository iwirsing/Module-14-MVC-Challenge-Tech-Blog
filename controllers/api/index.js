const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const editArticleRoutes = require('./editArticleRoutes');

router.use('/users', userRoutes);
router.use('/comment', commentRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/edit',editArticleRoutes);

module.exports = router;
