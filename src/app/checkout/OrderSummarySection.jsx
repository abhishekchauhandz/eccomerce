"use client";

import { SectionHeading } from "./SectionHeading";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useBuyNow } from "../context/BuyNowContext";
import Button from "../_components/button/Button";
import { useNavigate } from "../hooks/useNavigate";
import Link from "next/link";

export const OrderSummarySection = ({
  activeSection,
  onProceedToPayment,
  products,
  setProducts,
}) => {
  const { updateQuantity: updateCartQuantity } = useCart();
  const { updateBuyNowQuantity, buyNowProduct } = useBuyNow();
  const { goTo } = useNavigate();

  const totalItems = products.reduce((sum, p) => sum + (p.quantity || 1), 0);

  const handleQuantityChange = (productId, quantity) => {
    if (
      buyNowProduct &&
      products.length === 1 &&
      products[0].id === buyNowProduct.id
    ) {
      // It's a Buy Now product
      updateBuyNowQuantity(productId, quantity);
      setProducts([{ ...products[0], quantity }]);
    } else {
      // It's from cart
      updateCartQuantity(productId, quantity);
      const updated = products.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      setProducts(updated);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow mb-4">
      <div className="flex justify-between gap-4 items-start w-full">
        <SectionHeading title="Order Summary" number={"3"} />
        <Link
          href="/"
          className="text-bold text-accent underline sm:pt-2"
        >
          Browse more Products
        </Link>
      </div>
      <div className="mt-2 space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="text-gray-700 flex justify-between items-center gap-4 border p-2 rounded"
          >
            <div className="w-16 h-16 relative">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-500">
                Rs. {product.price} × {product.quantity}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleQuantityChange(product.id, product.quantity - 1)
                }
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() =>
                  handleQuantityChange(product.id, product.quantity + 1)
                }
                className="px-2 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
        <p className="text-gray-600 mt-2">Total Products: {totalItems}</p>
      </div>
      {activeSection !== "PAYMENT" && (
        <Button
          onClick={onProceedToPayment}
          type="submit"
          text={"Continue to Payment"}
          btnVariant="standard"
          className="text-white mt-4 px-4 py-2 rounded bg-blood"
        />
      )}
    </div>
  );
};
