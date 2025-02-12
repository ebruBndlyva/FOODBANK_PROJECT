import { RestaurantModel } from "../models/RestaurantModel.js";

export const RestaurantController = {
    getRestaurants: async (req, res) => {
        try {
            const restaurants = await RestaurantModel.find();
            res.send(restaurants);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },
    createRestaurant: async (req, res) => {
        try {
            const newRestaurant = new RestaurantModel(req.body);
            await newRestaurant.save();
            res.send(newRestaurant);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}