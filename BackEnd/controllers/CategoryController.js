import { CategoryModel } from "../models/MenageRestModel.js";

export const CategoryContoller = {
    getCategoriesByRestaurant: async (req, res) => {
        try {
            const {id} = req.params;
            const categories = await CategoryModel.find({ restaurant: id });

            res.send(categories);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    },

    createCategory: async (req, res) => {
        try {
            const newCategory = new CategoryModel(req.body);
            await newCategory.save();
            res.send(newCategory);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}