import express, { json } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'
import mongoose from 'mongoose';
import authRouter from "./Auth/auth.router.js";

dotenv.config();
const app = express();
app.use(json());
app.use(morgan('dev'));
app.use(cors());

//DB Connection
console.log(process.env.DB_URL);
// (async ()=>{
//     try{
//         if(process.env.DB_URL){
//             await mongoose.connect(process.env.DB_URL);
//             console.log("DB Server connected successfully.");
//         }
//         else{
//             throw new Error('DB Server URL not found.')
//         }
//     }
//     catch(err){
//         console.log(err);
//         process.exit(0);
//     }
// })
mongoose.connect(process.env.DB_URL)
    .then(val => console.log(`Successfully connected to DB`))
    .catch(error => console.log(`Error in connecting DB ${error}`));


//routes
app.use('/auth', authRouter)
app.all('*',(req,res,next)=>{
    next(new Error('Route Not Found'));
})

//error
app.use((err,req,res,next)=>{
    res.status(400).json({success: false, data : err.message});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('Listening to :'+PORT));