import { BasketModel } from "../models/BasketModel.js";
export const BasketController = {
    addToBasket: async (req, res) => {
        try {
            const { restaurantId, menuId, image, count, size, addons, note } = req.body;
            const userId = req.user.id;
            console.log(userId);
            console.log(restaurantId, menuId, image, count, size, addons, note);
            let basket = await BasketModel.findOne({ userId, restaurantId });

            if (basket) {

                const existingItem = basket.items.find(item => item.menuId.toString() === menuId);

                if (existingItem) {
                    existingItem.count += 1;
                } else {

                    basket.items.push({ menuId, image, count, size, addons, note });
                }

            } else {

                basket = new BasketModel({
                    userId,
                    restaurantId,
                    items: [{ menuId, image, count, size, addons, note }]
                });
            }

            await basket.save();
            res.status(200).send({ message: "Məhsul səbətə əlavə edildi", basket });

        } catch (error) {
            res.status(500).send({ error: "Səbətə əlavə edilərkən xəta baş verdi" });
        }
    },
    getBasket: async (req, res) => {
        try {
            const userId = req.user.id;

            const basket = await BasketModel.findOne({ userId })
                .populate("items.menuId")
                .populate("restaurantId", "name");

            if (!basket) {
                return res.status(404).send({ message: "Səbət boşdur" });
            }
            let subtotal = 0;
            basket.items.forEach(item => {3
                subtotal += item.menuId.unitPrice * item.count;
            });
            res.status(200).send({
                basket,
                subtotal
            });
        } catch (error) {
            res.status(500).send({ error: "Səbəti gətirərkən xəta baş verdi" });
        }
    },
    updateBasketItem: async (req, res) => {
        try {
            const { menuId, count } = req.body;
            const userId = req.user.id;

            const basket = await BasketModel.findOne({ userId });

            if (!basket) {
                return res.status(404).send({ message: "Səbət tapılmadı" });
            }

            if (count < 1) {
         
                const updatedBasket = await BasketModel.findOneAndUpdate(
                    { userId },
                    { $pull: { items: { menuId } } },  
                    { new: true }
                );

                return res.status(200).send({ message: "Məhsul səbətdən silindi", basket: updatedBasket });
            }

   
            const updatedBasket = await BasketModel.updateOne(
                { userId, "items.menuId": menuId },
                { $set: { "items.$.count": count } }
            );

            if (!updatedBasket.modifiedCount) {
                return res.status(404).send({ message: "Məhsul tapılmadı və ya dəyişiklik olunmadı" });
            }

            res.status(200).send({ message: "Məhsulun sayı yeniləndi", basket: updatedBasket });
        } catch (error) {
            res.status(500).send({ error: "Məhsul yenilənərkən xəta baş verdi" });
        }
    }



};
