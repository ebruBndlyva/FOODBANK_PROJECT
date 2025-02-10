import express from "express"
import { RestaurantController } from "../controllers/RestaurantController.js"

export const restaurantRouter = express.Router()

restaurantRouter.get("/",RestaurantController.getRestaurants)
restaurantRouter.get("/:id",RestaurantController.getRestaurantById)
restaurantRouter.delete("/:id",RestaurantController.deleteRestaurant)
restaurantRouter.post("/",RestaurantController.createRestaurant)
restaurantRouter.put("/:id",RestaurantController.updateRestaurant)