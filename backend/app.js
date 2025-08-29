const express=require('express')
const mongoose=require('mongoose')

const router=require('./routers/router.js')

const app=express();

const port=3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

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