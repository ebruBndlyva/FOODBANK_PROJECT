import { CouponModel } from "../models/MenageRestModel.js";

export const CouponController = {
    // ! Kuponlar
    getCoponByCode: async (req, res) => {
        try {
            const { code } = req.body;  // URL-dən deyil, body-dən kupon kodunu alırıq
            const currentDate = new Date();

            // Kuponu tapırıq
            const coupon = await CouponModel.findOne({ code });

            // Kupon tapılmadıqda və ya etibarsız olduqda
            if (!coupon) {
                return res.status(404).json({ message: "Kupon tapılmadı." });
            }

            // Kuponun etibarlılığını yoxlayırıq
            if (coupon.isActive === false) {
                return res.status(400).json({ message: "Bu kupon artıq istifadə edilə bilməz." });
            }

            // Kuponun etibarlılıq tarixlərini yoxlayırıq
            if (coupon.validFrom > currentDate || coupon.validUntil < currentDate) {
                return res.status(400).json({ message: "Bu kuponun istifadə müddəti bitmişdir." });
            }

            return res.status(200).json(coupon);  // Kuponu geri qaytarırıq
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Kuponu əldə edərkən xəta baş verdi." });
        }
    },
    // ! Kupon elave etme
    addCoupon: async (req, res) => {
        try {
            const { code, discountType, discountValue, minOrderAmount, validFrom, validUntil } = req.body;

            // Kupon kodunun təkrarlanmasını yoxlayırıq
            const existingCoupon = await CouponModel.findOne({ code });
            if (existingCoupon) {
                return res.status(400).json({ message: "Bu kupon kodu artıq mövcuddur." });
            }

            // Yeni kuponu yaradırıq
            const newCoupon = CouponModel({
                code,
                discountType,
                discountValue,
                minOrderAmount,
                validFrom,
                validUntil,
            });

            // Yeni kuponu yaddaşa yazırıq
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

            // 1. Kuponun mövcud olub-olmadığını yoxlayırıq
            const coupon = await CouponModel.findOne({ code });

            if (!coupon) {
                return res.status(404).send({ message: "Kupon tapılmadı" });
            }

            // 2. Kupon aktivdirmi?
            if (!coupon.isActive) {
                return res.status(400).send({ message: "Bu kupon artıq aktiv deyil" });
            }

            // 3. Kupon vaxtı keçibmi?
            const now = new Date();
            if (now < coupon.validFrom || now > coupon.validUntil) {
                return res.status(400).send({ message: "Bu kuponun vaxtı keçib və ya hələ aktiv deyil" });
            }

            // 4. Minimal sifariş məbləği uyğun gəlirmi?
            if (orderAmount < coupon.minOrderAmount) {
                return res.status(400).send({ message: `Bu kupon minimum ${coupon.minOrderAmount} AZN sifariş üçün keçərlidir` });
            }

            // 5. Endirim məbləğini hesablayırıq
            let discountAmount = 0;
            if (coupon.discountType === "percentage") {
                discountAmount = (orderAmount * coupon.discountValue) / 100;
            }

            // 6. Yeni sifariş məbləğini hesablayırıq
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