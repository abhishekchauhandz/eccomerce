"use client";

import { SectionHeading } from "./SectionHeading";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Button from "../_components/button/Button";

const paymentMethods = [
  {
    id: "upi",
    label: "UPI (PhonePe, GPay, Paytm...)",
    defaultChecked: true,
  },
  {
    id: "card",
    label: "Credit / Debit / ATM Card",
  },
  {
    id: "netbanking",
    label: "Net Banking",
  },
];

export const PaymentOptionsSection = ({
  isActive,
  onBack,
  onPaymentSuccess,
  isProcessing,
}) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleProceedPayment = async () => {
    try {
      await onPaymentSuccess();
      router.push("/paymentSuccess");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <SectionHeading number="4" title="Payment Methods" />
        <Button
          onClick={onBack}
          disabled={isProcessing}
          btnVariant="text"
          className="text-primary hover:underline"
          text="Back"
        />
      </div>

      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <PaymentMethodOption
            key={method.id}
            id={method.id}
            label={method.label}
            defaultChecked={method.defaultChecked}
          />
        ))}
      </div>

      <Button
        onClick={handleProceedPayment}
        disabled={isProcessing}
        btnVariant="standard"
        loading={isProcessing}
        className="py-3 rounded-lg font-medium bg-blood"
        text={isProcessing ? "Processing..." : "Proceed To Checkout"}
      />
    </div>
  );
};

const PaymentMethodOption = ({ id, label, defaultChecked = false }) => (
  <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
    <input
      type="radio"
      id={id}
      name="payment-method"
      defaultChecked={defaultChecked}
      className="h-4 w-4 accent-primary"
    />
    <label htmlFor={id} className="ml-3 text-gray-700 cursor-pointer">
      {label}
    </label>
  </div>
);
