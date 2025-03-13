import Coupon from "../models/couponModel.js";
import { generateCoupons } from "../utils/generateCoupons.js";

export const claimCoupon = async (req, res) => {
    try {
        let coupon = await Coupon.findOneAndUpdate(
            { assigned: false },
            { assigned: true },
            { new: true }
        );

        if (!coupon) {
            await generateCoupons();
            coupon = await Coupon.findOneAndUpdate(
                { assigned: false },
                { assigned: true },
                { new: true }
            );
        }

        res.cookie("couponClaimed", true, { maxAge: 3600000, httpOnly: true });
        res.status(200).json({ coupon: coupon.code });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};
