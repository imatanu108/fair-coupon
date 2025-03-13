import { useState } from "react";
import config from "../config/config.js";

const CouponClaim = () => {
    const [coupon, setCoupon] = useState("");
    const [message, setMessage] = useState("");

    const claimCoupon = async () => {
        try {
            const requestUrl = `${config.apiUri}/api/coupons/claim`;
            console.log(requestUrl)
            const response = await fetch(requestUrl);

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.message || "Something went wrong")
                return
            }
            const data = await response.json();
            setCoupon(data.coupon);
            setMessage("");
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="relative flex w-full h-full items-center justify-center bg-gray-900 px-4">
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-[400px] h-[400px] bg-blue-500 opacity-30 blur-3xl rounded-full"></div>
            </div>

            <div>
                <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-6 text-center">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300">
                        Claim Your Coupon
                    </h1>

                    {coupon ? (
                        <p className="text-green-400 text-lg font-semibold mt-3">
                            🎉 Your Coupon: <span className="underline">{coupon}</span>
                        </p>
                    ) : null}
                    {message ? <p className="text-orange-400 mt-2">{message}</p> : null}
                    <button
                        onClick={claimCoupon}
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                    >
                        Claim Coupon
                    </button>
                </div>

                <div className="relative flex gap-4 md:gap-5 justify-center items-center mt-10">
                    <div>
                        <a href="https://github.com/imatanu108/fair-coupon" target="_blank"
                        rel="noopener noreferrer">
                            <img src="/github.svg" alt="" width={27} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CouponClaim;
