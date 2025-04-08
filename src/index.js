import mongoose, { connect } from "mongoose";
import { DB_NAME } from "./constants";




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