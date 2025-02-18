import { RestaurantModel } from "../models/RestaurantModel.js";
import { MenuItemModel } from "../models/MenageRestModel.js";
import { CuisineModel } from "../models/MenageRestModel.js";
import { UserModel } from "../models/UserModel.js"
import mongoose from "mongoose";
export const RestaurantController = {

    getRestaurants: async (req, res) => {
        try {
            const restaurants = await RestaurantModel.find()
                .populate({
                    path: "menu",
                    select: "name category",
                    populate: {
                        path: "category",
                        select: "name"
                    }
                });
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
                .populate({
                    path: "menu",
                    select: "name category image description unitPrice discountPrice",
                    populate: {
                        path: "category",
                        select: "name"
                    }
                })
                .populate("cuisine",'name')




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
            const { name, status, featuredImage, location, menu, openingTime, closingTime, restaurantAddress, cuisine, description, owner } = req.body;
            const cuisineExsist = await CuisineModel.findById(cuisine)
            const menuExsist = await MenuItemModel.findById(menu)
            const ownerExsist = await UserModel.findById(owner)
            if (!menuExsist && !cuisineExsist && !ownerExsist) {
                return res.status(400).send({ message: 'Invalid menu ID' })
            }
            const newRestaurant = RestaurantModel({
                name,
                status,
                featuredImage,
                description,
                location,
                menu,
                cuisine,
                openingTime,
                closingTime,
                restaurantAddress,
                owner
            })
            await newRestaurant.save();
            res.send(newRestaurant);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }



}
