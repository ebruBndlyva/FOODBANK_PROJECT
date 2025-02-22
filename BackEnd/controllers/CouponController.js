import { CouponModel } from "../models/MenageRestModel.js";

export const CouponController = {
    // ! Kuponlar
    getCoponByCode: async (req, res) => {
        try {
            const { code } = req.body;  
            const currentDate = new Date();

            const coupon = await CouponModel.findOne({ code });

            if (!coupon) {
                return res.status(404).send({ message: "Kupon tapılmadı." });
            }

            if (coupon.isActive === false) {
                return res.status(400).send({ message: "Bu kupon artıq istifadə edilə bilməz." });
            }

            if (coupon.validFrom > currentDate || coupon.validUntil < currentDate) {
                return res.status(400).send({ message: "Bu kuponun istifadə müddəti bitmişdir." });
            }

            return res.status(200).send(coupon);  
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Kuponu əldə edərkən xəta baş verdi." });
        }
    },
    // ! Kupon elave etme
    addCoupon: async (req, res) => {
        try {
            const { code, discountType, discountValue, minOrderAmount, validFrom, validUntil } = req.body;

            const existingCoupon = await CouponModel.findOne({ code });
            if (existingCoupon) {
                return res.status(400).send({ message: "Bu kupon kodu artıq mövcuddur." });
            }

            const newCoupon = CouponModel({
                code,
                discountType,
                discountValue,
                minOrderAmount,
                validFrom,
                validUntil,
            });

            await newCoupon.save();

            return res.status(201).send({ message: "Kupon uğurla əlavə edildi.", coupon: newCoupon });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Kuponu əlavə edərkən xəta baş verdi." });
        }
    },
    // !kuponun tetbiqi
    applyCoupon: async (req, res) => {
        try {
            const { code, orderAmount } = req.body; 

            const coupon = await CouponModel.findOne({ code });

            if (!coupon) {
                return res.status(404).send({ message: "Kupon tapılmadı" });
            }

            if (!coupon.isActive) {
                return res.status(400).send({ message: "Bu kupon artıq aktiv deyil" });
            }

            const now = new Date();
            if (now < coupon.validFrom || now > coupon.validUntil) {
                return res.status(400).send({ message: "Bu kuponun vaxtı keçib və ya hələ aktiv deyil" });
            }

            if (orderAmount < coupon.minOrderAmount) {
                return res.status(400).send({ message: `Bu kupon minimum ${coupon.minOrderAmount} AZN sifariş üçün keçərlidir` });
            }

            let discountAmount = 0;
            if (coupon.discountType === "percentage") {
                discountAmount = (orderAmount * coupon.discountValue) / 100;
            }

            const finalAmount = orderAmount - discountAmount;

            return res.status(200).send({
                message: "Kupon uğurla tətbiq olundu",
                discountAmount,
                finalAmount
            });

        } catch (error) {
            res.status(500).send({ message: "Xəta baş verdi", error });
        }
    }
}