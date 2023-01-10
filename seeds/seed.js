const sequelize = require('../config/connection');
const { Article, Comment, User} = require ('../models');

const userData = require ('./userData.json');
const articleData = require ('./commentData.json');
const commentData = require('./commentData.json');

//seed the database
const seedDatabase = async () =>{
    //with force true the database gets dropped and recreated, all data reset
    await sequelize.sync({force:true});

    //create and insert multiple instances of User in bulk takes in arrays and options as objects
    const users = await User.bulkCreate(userData, {
        individualHooks: true, //allows individual hooks when bulk creating
        returning: true //returns the object
    });

    //create and insert multiple instances of article
    const article = await Article.bulkCreate(articleData, {
        individualHooks: true, //allows individual hooks when bulk creating
        returning: true //returns the object
    });

    //create and insert multiple instances of article
    const comment = await Comment.bulkCreate(commentData, {
        individualHooks: true, //allows individual hooks when bulk creating
        returning: true //returns the object
    });

    process.exit(0);
};

seedDatabase();