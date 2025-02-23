import { DiscountFoodsModel } from "../models/DiscountFoddsModel.js";
import { MenuItemModel } from "../models/MenageRestModel.js";
import moment from "moment"

export const DiscountFoodsController = {
    addDiscountFood: async (req, res) => {
        try {
            const { menuId, discountPercentage, discountStartTime } = req.body;

            const menuItem = await MenuItemModel.findById(menuId);
            if (!menuItem) {
                return res.status(404).json({ message: "Menu item not found" });
            }

            const discountPrice = menuItem.unitPrice - (menuItem.unitPrice * (discountPercentage / 100));

            const newDiscountFood = new DiscountFoodsModel({
                menuId,
                discountPrice,
                discountStartTime,
                discountPercentage,
            });

            await newDiscountFood.save();
            res.status(201).json({ message: "Discounted food added successfully", data: newDiscountFood });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },

    getDiscountFoodsByMenuIdAndTime: async (req, res) => {
        try {
            const currentTime = moment();
            const discountFoods = await DiscountFoodsModel.find().populate('menuId');

            if (!discountFoods || discountFoods.length === 0) {
                return res.status(404).json({ message: "No discounted foods found for this menu" });
            }

            const validDiscountFoods = discountFoods.filter(item => {
                const discountStartTime = moment(item.discountStartTime); 
                const discountEndTime = discountStartTime.clone().add(item.discountPercentage, 'hours'); 

               
                return discountStartTime.isBefore(currentTime) && currentTime.isBefore(discountEndTime);
            });

            if (validDiscountFoods.length === 0) {
                return res.status(404).json({ message: "No valid discounted foods available at this time" });
            }

            res.status(200).json({ message: "Valid discounted foods retrieved successfully", data: validDiscountFoods });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
};
