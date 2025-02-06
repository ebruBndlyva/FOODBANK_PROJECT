import express from "express"
import { UserController } from "../controllers/UserController.js"


export const userRouter = express.Router()

// request password reset
userRouter.post("/requestPasswordReset", UserController.requestPasswordReset)
// Reset Password
userRouter.post("/resetPassword", UserController.resetPassword)