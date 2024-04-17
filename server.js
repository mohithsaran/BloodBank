const express=require('express');
const dotenv=require('dotenv')
const app=express();
const colors=require('colors')
const morgan=require('morgan')
const cors=require('cors')
const connectDB=require('./config/db')

//dot config
dotenv.config()

//mongodb connect
connectDB()

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


//portnumber-8060
const port=process.env.PORT||8060;

//home
app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Welcome to Blood Bank!'
    })
})


//stitching the route
app.use('/api/v1/auth',require('./routes/authRoutes'))


//listen
app.listen(port,()=>console.log(`Listening on port ${port}`))
