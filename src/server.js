import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import url from 'url';
import { SERVER_PORT } from "./constants/server.constant.js";
import cors from "cors";
import { getAllSellers, getSingleStudentById } from "./controllers/seller.controllers.js";
import sellersRoutes from "./routes/seller.routes.js";
import authRoutes from "./routes/auth.routes.js";






const server = express();
server.set("view engine", "ejs");

server.use(cors())
server.use(bodyParser.json());

server.use(bodyParser.urlencoded({extended: true}))
console.log(process.cwd())

console.log(path.join(process.cwd(),"src","public"))
server.set("views",path.join(process.cwd(),"src","views"));
server.use("/public",express.static(path.join(process.cwd(), 'src', 'public')));

server.get("/register",(req,res)=>{
    res.render("register.ejs")
})

server.get("/login", (req, res)=>{
    res.render("logIn.ejs")
})

server.use(sellersRoutes)
server.use(authRoutes)
// server.get("/404", (req, res)=>{
//     res.render("404.ejs")
// })   
server.listen(SERVER_PORT,()=>{
    console.log("Server is running....")
})