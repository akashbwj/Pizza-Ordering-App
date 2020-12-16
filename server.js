require('dotenv').config()

const express= require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const expressLayout=require('express-ejs-layouts');
const mongoose=require('mongoose');
const session=require('express-session');
const flash =require('express-flash');
const MongoDbStore=require('connect-mongo')(session);
const PORT=process.env.PORT||3000

//Database connection
const dbUrl="mongodb://localhost:27017/pizza"
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
	useUnifiedTopology:true,
	useFindAndModify:false,
	useCreateIndex:true
})
.then(()=>console.log("connected to DB!"))
.catch(error=>console.log(error.message));
const connection=mongoose.connection;


//Session store
let mongoStore=new MongoDbStore({
    mongooseConnection: connection,
    collection: "sessions"
})

//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store: mongoStore,
    saveUninitialized:false,
    cookie:{maxAge: 1000*60*60*24} //24 hours in milliseconds
}))

app.use(flash());

//Assets
app.use(express.static('public'));
app.use(express.json());

//Global middleware to make session available on the frontend
app.use((req,res,next)=>{
    res.locals.session=req.session;
    next()
})


//set Template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

//Routes
require('./routes/web')(app)


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});