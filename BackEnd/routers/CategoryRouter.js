
import express from "express"
import { CategoryController } from "../controllers/CategoryController.js"

export const categoryRouter = express.Router()

categoryRouter.get("/",CategoryController.getCategories)
categoryRouter.get("/:id",CategoryController.getCategoryById)
categoryRouter.delete("/:id",CategoryController.deleteCategory)
categoryRouter.post("/",CategoryController.createCategory)
categoryRouter.put("/:id",CategoryController.updateCategory)