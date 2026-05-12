import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
// import userModel from './models/userModel.js';

//congigure env
dotenv.config();

//connection to database
connectDB();
//rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// 
app.use('/api/v1/user',userRoutes)



app.get('/',(req,res)=>{
    res.send('hey buddy')
})

//port
const PORT = process.env.PORT || 8080
 

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
