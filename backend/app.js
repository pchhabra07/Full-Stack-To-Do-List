const express=require('express')
const session=require('express-session')
const passport=require('passport')
const mongoose=require('mongoose')
const flash=require('connect-flash')

const router=require('./routers/router.js')

const app=express();

const port=3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:'yourkey',
    resave:false,
    saveUninitialized:true
}))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

require('./authentication/passport.js')

app.use('/',router);

mongoose.connect('mongodb://localhost:27017/to-do-app')
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running at http://localhost:${port}`);
    })
})
.catch(err=>{
    console.log(err);
})