const express=require('express')
const session=require('express-session')
const passport=require('passport')
const mongoose=require('mongoose')
const flash=require('connect-flash')

const userRouter=require('./routers/userRouter.js')
const taskRouter=require('./routers/taskRouter.js')

const app=express();

const port=3000;

require('dotenv').config({quiet:true});

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

app.use('/user',userRouter);
app.use('/tasks',taskRouter);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running at ${process.env.SERVER_URL}:${port}`);
    })
})
.catch(err=>{
    console.log(err);
})