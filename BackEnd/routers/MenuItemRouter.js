import { MenuItemController } from "../controllers/MenuItemsController.js";
import express from "express";

export const menuItemRouter = express.Router();


menuItemRouter.get("/", MenuItemController.getMenues);
menuItemRouter.post("/", MenuItemController.createMenuItem);