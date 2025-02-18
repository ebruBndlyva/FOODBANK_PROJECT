import { CategoryContoller } from "../controllers/CategoryController.js";
import express from "express";

export const categoryRouter = express.Router();


categoryRouter.get("/", CategoryContoller.getAllCategories);
categoryRouter.post("/", CategoryContoller.createCategory);