import { CategoryContoller } from "../controllers/CategoryController.js";
import express from "express";

export const categoryRouter = express.Router();

categoryRouter.get("/", CategoryContoller.getCategoriesByRestaurant);
categoryRouter.get("/:id", CategoryContoller.getCategoriesByRestaurant);
categoryRouter.post("/", CategoryContoller.createCategory);