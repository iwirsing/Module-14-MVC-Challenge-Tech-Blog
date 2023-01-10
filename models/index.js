const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

//user has many article posts -
User.hasMany(Article, {
  foreignKey: 'username_id',
});

//user has many comments -
User.hasMany(Comment, {
  foreignKey: 'username_id',
});

//article belongs to a user -
Article.belongsTo(User, {
  foreignKey: 'username_id',});

//article has many comments -
Article.hasMany(Comment, {
  foreignKey: 'article_id',});


//comment belongs to  article -
Comment.belongsTo(Article, {
  foreignKey: 'article_id',
});

//comment belongs to  user -
Comment.belongsTo(User, {
  foreignKey: 'username_id',
});



module.exports = { User, Article, Comment };
