// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectDB()



/*
import express from 'express';
const app = express();

;(async () => {
    try{
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // listeners after database is connected
        app.on("err", (error) => {
            console.log("Errr:",error);
            throw error;
        })

        // listening on the port
        app.listen(process.env.PORT, () => {
            console.log(`App is running on port ${process.env.PORT}`)
        })
    }
    catch (error) {
        console.log("ERROR: ", error)
        throw error;
    }
})()
*/