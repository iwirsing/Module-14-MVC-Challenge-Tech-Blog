const { Model, DataTypes} = require('sequelize'); //import part of sequelize library
const sequelize = require('../config/connection'); //import database connection

//initialize comment model (table) by extending Model from sequelize
class Comment extends Model {}

//set up fields and rules for COMMENT model
Comment.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        username_id: {
            type: DataTypes.INTEGER,
            references: {
                //references the user model id
                model: 'user',
                key:'id'
            },
        },
        article_id: {
            type: DataTypes.INTEGER,
            references: {
                //references the article model id
                model: 'article',
                key:'id'
            },
        },
        
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'comment',
    }

);

module.exports = Comment;
