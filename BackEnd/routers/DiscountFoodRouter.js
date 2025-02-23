import { DiscountFoodsController } from "../controllers/DiscoundFoodsController.js";

import express from "express"


export const discountRouter = express.Router()

discountRouter.post("/", DiscountFoodsController.addDiscountFood);
discountRouter.get("/",DiscountFoodsController.getDiscountFoodsByMenuIdAndTime)
