import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import url from 'url';
import { SERVER_PORT } from "./constants/server.constant.js";
import cors from "cors";
import sellersRoutes from "./routes/seller.routes.js";
import authRoutes from "./routes/auth.routes.js";


const server = express();
server.set("view engine", "ejs");

server.use(cors())
server.use(bodyParser.json());

server.use(bodyParser.urlencoded({extended: true}))


// /-ga sorov bolganda index.ejsni ochib beradi
server.get('/', (req, res) => {
    res.render('index.ejs')
})


// /superadmin ga so'rov kelganda superadmin.ejs ni ochib beradi
server.get("/superadmin", (req, res) => {
    res.render("superadmin");
});

server.get("/admin", (req, res) => {
    res.render("admin");
});

server.get("/seller", (req, res) => {
    res.render("seller.ejs");
});

server.get("/register", (req, res) => {
    res.render("register");
});

server.get("/login", (req, res) => {
    res.render("login");
});

server.get("/index", (req, res) => {
    res.render("index");
});

server.get("/404", (req, res) => {
    res.render("404");
});

server.get("/contact",(req,res)=>{
    res.render("contact")
})


console.log(path.join(process.cwd(),"src","public"))
server.set("views",path.join(process.cwd(),"src","views"));
server.use("/public",express.static(path.join(process.cwd(), 'src', 'public')));

server.use(sellersRoutes)
server.use(authRoutes)
  

server.listen(SERVER_PORT,()=>{
    console.log("Server is running....")
})