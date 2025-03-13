import Coupon from "../models/couponModel.js";

export const generateCoupons = async () => {
    try {
        await Coupon.deleteMany(); // Clearing old data

        const coupons = [];
        for (let i = 1; i <= 10; i++) {
            coupons.push({ code: `COUPON-${i}` });
        }

        await Coupon.insertMany(coupons);
        console.log("Coupons saved to MongoDB!");
    } catch (error) {
        console.error("Error saving coupons:", error);
        process.exit(1);
    }
};