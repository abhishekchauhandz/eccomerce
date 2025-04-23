import React from "react";
import Image from "next/image";
import { AiFillStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Button from "../button/Button";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({
  id,
  image,
  name = "Unnamed Item",
  price,
  discount,
  rating = 0,
  seller = "Unknown Seller",
  onAddToCart,
  onBuyNow,
  onClick,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const discountedPrice =
    discount && price ? price - (price * discount) / 100 : price;

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    const product = { id, image, name, price, discount, rating, seller };
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out bg-white w-full flex flex-col h-full cursor-pointer"
    >
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-1 left-2 bg-blood text-white text-[6px] xs:text-[8px] sm:text-[10px] md:text-xs font-semibold px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-md shadow">
          {discount}% off
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-28 xs:h-32 sm:h-36 md:h-40 lg:h-48 w-full" onClick={onClick}>
        <div className="absolute top-2 right-2 z-10">
          <button
            className="rounded-full p-1"
            onClick={handleWishlistClick}
          >
            {isInWishlist(id) ? (
              <AiFillHeart className="text-primary text-lg xs:text-xl transition" />
            ) : (
              <AiOutlineHeart className="text-primary hover:text-primary text-lg xs:text-xl transition" />
            )}
          </button>
        </div>
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain pt-8 xs:pt-10 rounded-t-lg transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-2 xs:p-2.5 sm:p-3 flex flex-col flex-grow">
        <h3 className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 truncate">
          {name}
        </h3>
        <p className="text-gray-600 text-[8px] xs:text-[10px] sm:text-xs md:text-sm truncate">
          {seller}
        </p>
        <div className="flex justify-between items-center mt-1 xs:mt-1.5 sm:mt-2">
          <span className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-[#299E60]">
            ₹{price}
          </span>
          <span className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-bold flex items-center">
            <AiFillStar className="text-yellow-400 mr-0.5 xs:mr-1" /> {rating}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-2 xs:mt-2.5 sm:mt-3 flex flex-col sm:flex-row gap-4 xs:gap-2">
          <Button
            btnVariant="shopnow"
            onClick={onBuyNow}
            className="flex-1"
            text={
              <span className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm hidden sm:inline">
                Buy
              </span>
            }
          />
          <Button
            btnVariant="addtocart"
            onClick={onAddToCart}
            className="flex-1"
            text={<span className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm hidden sm:inline">Add</span>}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
