export const PriceDetailsSection = ({ products }) => {

  const getOriginalPrice = (price, discount) => {
    return discount > 0 ? price / (1 - discount / 100) : price;
  };

  const totalMRP = products.reduce((sum, p) => {
    const originalPrice = getOriginalPrice(p.price, p.discount);
    return sum + originalPrice * (p.quantity || 1);
  }, 0);

  const totalSellingPrice = products.reduce(
    (sum, p) => sum + p.price * (p.quantity || 1),
    0
  );

  const totalDiscount = totalMRP - totalSellingPrice;
  const discountPercent = totalMRP > 0 ? (totalDiscount / totalMRP) * 100 : 0;

  const gst = totalSellingPrice * 0.1;
  const finalAmount = totalSellingPrice + gst;

  return (
    <div className="bg-white rounded-2xl text-xs md:text-[1rem] p-4 shadow  overflow-hidden">
      <h2 className="inline-flex w-[13rem] overflow-hidden items-center bg-primary text-white text-xs md:text-[1rem] px-4 py-2 font-bold rounded-lg mb-4">
        Price Details
      </h2>
      <div className="text-gray-700 space-y-1">
        <p className="flex justify-between">
          <span>Total MRP</span>
          <span>Rs. {totalMRP.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Discount</span>
          <span className="text-accent">- Rs. {totalDiscount.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {totalSellingPrice.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>GST (10%)</span>
          <span>Rs. {gst.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Charges</span>
          <span className="text-accent">Free</span>
        </p>
        <hr className="my-2" />
        <p className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>Rs. {finalAmount.toFixed(2)}</span>
        </p>
        {totalDiscount > 0 && (
          <p className="text-accent font-medium mt-1 text-sm text-right">
            You save ₹{totalDiscount.toFixed(2)} ({discountPercent.toFixed(0)}%
            off)
          </p>
        )}
      </div>
    </div>
  );
};
