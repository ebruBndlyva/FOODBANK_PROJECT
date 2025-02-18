import { BasketController } from "../controllers/BasketController.js";
import { AuthTokenMiddleWare } from "../middlewares/AuthTokenMiddleware.js";
import express from "express"

export const basketRouter = express.Router()

basketRouter.get("/",AuthTokenMiddleWare,BasketController.getBasket)
basketRouter.post("/",AuthTokenMiddleWare,BasketController.addToBasket)
basketRouter.delete("/remove",AuthTokenMiddleWare,BasketController.getBasket)
basketRouter.put("/update",AuthTokenMiddleWare,BasketController.updateBasketItem)