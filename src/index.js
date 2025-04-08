import dotenv from 'dotenv';
import connectDB from "./db/index.js"; 


dotenv.config({
    path:'./env'
});


connectDB()


/*
import express from "express";
const app = express();
;(async ( )=> {
    try {
        await  mongoose.connect(`${process.env.MONGODB_URI}/
                ${DB_NAME}`);
                app.on("error", (eror) =>{
                    console.log("error:", eror)
                    throw eror
                });
                app.listen(process.env.PORT, () => {
                    console.log("app is listen")
                })
                
        
    } catch (error) {
        console.error("ERROR:", ERROR)
    }
})()
*/