import { CategoryModel } from "../models/MenageRestModel.js";

export const CategoryContoller = {
    getCategoriesByRestaurant : async (req, res) => {
        try {
            const categories = await Category.find({ restaurant: req.params.restaurantId }).populate("menuItems");
            res.json(categories);
        } catch (err) {
            res.status(500).json({ error: "Kateqoriyaları tapmaq mümkün olmadı" });
        }
    },
}