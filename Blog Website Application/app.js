import dotenv from 'dotenv';
dotenv.config(); //Load environment variable from .env file

import express from "express";
import expressLayout from "express-ejs-layouts";
import methodOverride from "method-override"
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import session from 'express-session';

import mainRouter from './server/routes/main.js';
import adminRouter from './server/routes/admin.js';
import connectDB from './server/config/db.js';
import isActiveRoute from './server/helpers/routeHelpers.js'

const app = express();
const PORT = 5000 || process.env.PORT; //If published online may have to use the servers port


//Connect to DB
connectDB();

//Pass Data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MMONGODB_URI }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));

app.use(express.static("public")); //Allows the code to detect static files under 'public' folder like JS, html

//Templating Engine
app.use(expressLayout); //Use expressLayout as a middlere
app.set('layout', './layouts/main');//Set default layout
app.set('view engine', 'ejs');//Set view engine

app.locals.isActiveRoute = isActiveRoute;


// Mounting the main router at the root path 'main.js'
app.use('/', mainRouter);

// Mounting the admin router at the root path 'admin.js'
app.use('/', adminRouter);

app.listen(PORT, ()=>{
    console.log(`App listen on port ${PORT}`);
})
