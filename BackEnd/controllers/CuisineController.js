import { CuisineModel } from "../models/CuisineModel.js"


export const CuisineController = {
    getCusines: async (req, res) => {
        let cuisine = await CuisineModel.find()
        res.send(cuisine)
    },
    getCuisineById: async (req, res) => {
        let { id } = req.params
       let cuisine = await CuisineModel.findById(id)
        res.save(cuisine)
    },
    deleteCusine: async (req, res) => {
        let { id } = req.params
        await CuisineModel.findByIdAndDelete(id)
        res.save({
            message: "deleted"
        })
    },
    createCuisine: async (req, res) => {
        let newCusine = CuisineModel(req.body)
        await newCusine.save()
        res.send({
            message: "created",
            data: newCusine
        })
    },
    updateCuisine: async (req, res) => {
        let { id } = req.params
        let updatCuisine = req.body
        let updateCuisine = await CuisineModel.findByIdAndUpdate({ _id: id }, updatCuisine, { new: true })
        res.send({
            message: "updated",
            data: updateCuisine
        })
    }
}