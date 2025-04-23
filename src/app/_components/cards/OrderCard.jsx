"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function OrderCard({ order }) {
  const getStatusStyle = (status) => {
    const statusStyles = {
      Delivered: "bg-green-100 text-green-700",
      Shipped: "bg-yellow-100 text-yellow-700",
      Processing: "bg-blue-100 text-blue-700",
      Canceled: "bg-red-100 text-red-600",
      Pending: "bg-orange-100 text-orange-700",
      default: "bg-gray-200 text-gray-700",
    };
    return statusStyles[status] || statusStyles.default;
  };

  const total = useMemo(
    () =>
      order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [order.items]
  );

  const formattedDate = useMemo(() => {
    return new Date(order.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [order.date]);

  return (
    <Link href={`/orders/${order.id}`} passHref legacyBehavior>
      <a className="block mb-6 last:mb-0">
        {" "}
        {/* Added vertical spacing here */}
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl p-6 cursor-pointer space-y-6">
          {" "}
          {/* Increased vertical spacing */}
          {/* Order Meta */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b pb-4">
            <div className="space-y-1">
              {" "}
              {/* Added vertical spacing */}
              <p className="text-sm text-gray-500">Order #{order.id}</p>
              <p className="text-gray-700">Placed on {formattedDate}</p>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusStyle(
                order.status
              )} self-start sm:self-auto`}
            >
              {order.status}
            </span>
          </div>
          {/* Items */}
          <div className="space-y-4">
            {" "}
            {/* Maintained item spacing */}
            {order.items.map((item) => (
              <ProductItem key={`${item.id}-${item.name}`} item={item} />
            ))}
          </div>
          {/* Total */}
          <div className="flex justify-between pt-4 border-t font-semibold text-gray-800">
            <span>Total ({order.items.length} items)</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}

function ProductItem({ item }) {
  const [imgSrc, setImgSrc] = useState(item.image || "/assets/auto3.png");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex items-center gap-4 py-2">
      {" "}
      {/* Added vertical padding */}
      <div className="relative w-16 h-16 rounded-md overflow-hidden border bg-gray-100 shrink-0">
        {isLoading && (
          <div className="animate-pulse absolute inset-0 bg-gray-200" />
        )}
        <Image
          src={imgSrc}
          alt={item.name}
          width={64}
          height={64}
          priority={false}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImgSrc("/images/fallback.jpg");
            setIsLoading(false);
          }}
          className={`object-cover w-full h-full transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800 line-clamp-1">
          {item.quantity}× {item.name}
        </p>
        <p className="text-gray-600 text-sm">
          ₹{item.price.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
