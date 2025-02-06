import express from "express"
import { AdminController } from "../controllers/AdminController.js"

import { Validation } from "../middlewares/AuthValdMiddleware.js"
import { loginValidation } from "../validations/AuthValidations.js"
export const adminRouter = express.Router()

// create Admin -post
adminRouter.post("/createAdmin",AdminController.createAdmin)

// admin login -post
adminRouter.post("/loginAdmin",Validation(loginValidation),AdminController.adminLogin)