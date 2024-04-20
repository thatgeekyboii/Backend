import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';
const app = express();

// configuring cors
// middleware 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

// accept json as data input to be stored - form data acceptance
app.use(express.json({limit:"16kb"}))

//getting data from the URL's
app.use(express.urlencoded({extended: true, limit:"16kb"})) // extended is used for object extention

// public access where all the files are stored in the server - public is the folder name
app.use(express.static("public"))

//cookie-parser - access cookies of the browser
app.use(cookieParser())
export {app}