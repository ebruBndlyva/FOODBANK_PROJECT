import { RestaurantModel } from "../models/RestaurantModel.js";

export const RestaurantController = {
    getRestaurants: async (req, res) => {
        let restaurants = await RestaurantModel.find()
        res.send(restaurants)
    },
    getRestaurantById: async (req, res) => {
        let { id } = req.params
        let restaurant = await RestaurantModel.findById(id)
        res.save(restaurant)
    },
    deleteRestaurant: async (req, res) => {
        let { id } = req.params
        await RestaurantModel.findByIdAndDelete(id)
        res.save({
            message: "deleted"
        })
    },
    createRestaurant: async (req, res) => {
        let newRestaurant = RestaurantModel(req.body)
        await newRestaurant.save()
        res.send({
            message: "created",
            data: newRestaurant
        })
    },
    updateRestaurant: async (req, res) => {
        let { id } = req.params
        let updateRest = req.body
        let updatedRestaurant = await RestaurantModel.findByIdAndUpdate({ _id: id }, updateRest, { new: true })
        res.send({
            message: "updated",
            data: updatedRestaurant
        })
    }
}