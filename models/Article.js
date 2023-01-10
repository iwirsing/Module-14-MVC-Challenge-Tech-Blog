const { Model, DataTypes} = require('sequelize'); //import part of sequelize library
const sequelize = require('../config/connection'); //import database connection
const { belongsTo } = require('./User');

//initialize article model (table) by extending Model from sequelize
class Article extends Model{}

//set up fields and rules for Article model
Article.init(
    {
        //define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type:DataTypes.STRING,
            allowNull:false,
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
      
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'article',
    }
);

module.exports = Article;