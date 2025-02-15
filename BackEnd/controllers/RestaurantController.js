import { RestaurantModel } from "../models/RestaurantModel.js";
import mongoose from "mongoose";
export const RestaurantController = {

    getRestaurants: async (req, res) => {
        try {
            const restaurants = await RestaurantModel.find();
            res.send(restaurants);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },


    getRestaurantById: async (req, res) => {
       try {
           const { id } = req.params;
    
           if (!mongoose.Types.ObjectId.isValid(id)) {
               return res.status(400).send({ message: "Invalid restaurant ID" });
           }
    
           const restaurant = await RestaurantModel.findById(id)
           .populate('menu')

             
             
    
           if (!restaurant) {
               return res.status(404).send({ message: 'Restaurant not found' });
           }
    
           res.send(restaurant);
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