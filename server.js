const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const path = require('path');
const helpers = require('./utils/helpers');

//creates express server
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
    secret: 'super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize,    
    })
};

app.use(session(sess));

//sets the app to use the handlebar engine
app.engine('handlebars',exphbs.engine());
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//make public root directory, serves static file for css
app.use(express.static(path.join(__dirname,'public')));


app.use(require('./controllers'));

//listens to port
// sync sequelize models to the database, then turn on the server
app.listen(PORT,()=>{
    console.log(`App listening on port http://localhost:${PORT}`);
    sequelize.sync({force:false});
});




