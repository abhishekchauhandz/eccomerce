"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Page() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const { clearCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    const buynow = localStorage.getItem("buyNowProduct");
    if (buynow) {
      localStorage.removeItem("buyNowProduct");
    } else {
      clearCart();
    }
    router.push("/");
  };

  if (!showPopup) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600 text-xl">Processing your payment...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl text-center animate-fade-in">
        <CheckCircle className="mx-auto text-primary" size={60} />
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Payment Successful
        </h2>
        <p className="text-gray-600 mt-2">Thank you for your purchase!</p>
        <button
          onClick={handleClose}
          className="mt-6 px-6 py-2 bg-primary text-white rounded-full transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
