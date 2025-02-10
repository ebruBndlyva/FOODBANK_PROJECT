import express from "express"
import { MenuController } from "../controllers/MenuController.js"

export const menuRouter = express.Router()

menuRouter.get("/",MenuController.getMenues)
menuRouter.get("/:id",MenuController.getMenuById)
menuRouter.delete("/:id",MenuController.deleteMenu)
menuRouter.post("/",MenuController.createMenu)
menuRouter.put("/:id",MenuController.updateMenu)