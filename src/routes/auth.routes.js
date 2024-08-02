import { Router } from "express";
import path from "path"
import { login } from "../controllers/auth.controller.js";
import { register } from "../controllers/auth.controller.js";



const authRoutes = Router()
// logIn.ejs ni ichidagi /sign-in ga kelgan ma'lumotlarni login authcontroller.js dagi login funktsiyasiga yuboradi
authRoutes.post("/sign-in", login)

authRoutes.post("/register", register)
export default authRoutes