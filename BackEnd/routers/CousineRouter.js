
import express from "express"

import { CuisineController } from "../controllers/CuisineController.js"

export const cuisineRouter = express.Router()

cuisineRouter.get("/",CuisineController.getCusines)
cuisineRouter.get("/:id",CuisineController.getCuisineById)
cuisineRouter.delete("/:id",CuisineController.deleteCusine)
cuisineRouter.post("/",CuisineController.createCuisine)
cuisineRouter.put("/:id",CuisineController.updateCuisine)
