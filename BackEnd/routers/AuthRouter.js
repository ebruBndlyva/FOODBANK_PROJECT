import express from "express"
import { AuthController } from "../controllers/AuthController.js"
import { Validation } from "../middlewares/AuthValdMiddleware.js"
import { loginValidation, registerValidation } from "../validations/AuthValidations.js"

export const authRouter = express.Router()

// Register -post 
authRouter.post("/register", Validation(registerValidation), AuthController.register)

// login - post 

authRouter.post("/login", Validation(loginValidation), AuthController.login)

// email verification - get

authRouter.get('/verify',AuthController.verifyEmail)