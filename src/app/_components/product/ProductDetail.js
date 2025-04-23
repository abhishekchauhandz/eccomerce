"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "../button/Button";
import Specifications from "./ProductSpecification";
import { RiHeartFill } from "react-icons/ri";
import { useCart } from "@/app/context/CartContext";
import { IoClose } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useBuyNow } from "../../context/BuyNowContext";

const ProductDetail = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showMobileZoom, setShowMobileZoom] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const { addToCart, setIsCartOpen } = useCart();
  const { triggerBuyNow } = useBuyNow();
  const router = useRouter();

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      setStartPosition({ x: distance, y: distance });
    } else if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      const newScale = Math.min(
        Math.max(scale * (distance / startPosition.x), 1),
        4
      );
      setScale(newScale);
    } else if (e.touches.length === 1 && isDragging) {
      const newX = e.touches[0].clientX - startPosition.x;
      const newY = e.touches[0].clientY - startPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleImageChange = (newImage) => {
    setSelectedImage(newImage);
    resetZoom();
  };

  const sellerInfo = {
    seller: "Del monte Store",
    rating: 3.4,
    returnPolicy: "7 days return policy",
    description: product.description,
    specifications: [
      { key: "Brand", value: "Del monte" },
      { key: "Weight", value: "207 Grams" },
      { key: "Ingredient Type", value: "Vegetarian" },
      { key: "Package Information", value: "Packet" },
      { key: "Manufacturer", value: "Ballaji Foods" },
      { key: "Net Quantity", value: "207.0 gram" },
      { key: "Product Dimensions", value: "13 x 9 x 26 cm; 207 g" },
    ],
  };

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    triggerBuyNow({ ...product, quantity: 1 });
    router.push("/checkout");
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[0.5fr_2fr_3fr] gap-4 md:gap-6 lg:gap-8">
        {/* Left Side: Image Thumbnails */}
        <div className="flex flex-col gap-4 items-center">
          <div className="lg:sticky top-8 flex lg:flex-col flex-row gap-2 sm:gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img}
                width={80}
                height={80}
                alt={`Thumbnail ${index + 1}`}
                className={`object-cover rounded-lg shadow-sm cursor-pointer w-16 h-16 sm:w-20 sm:h-20 ${
                  selectedImage === img
                    ? "border-2 border-primary"
                    : "border-2 border-transparent"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Main Image */}
        <div
          className="relative lg:sticky top-8 w-full h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center bg-gray-200 rounded-lg mb-4 sm:mb-6 md:mb-8 shadow-md overflow-hidden group"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => window.innerWidth < 768 && setShowMobileZoom(true)}
        >
          <Image
            key={selectedImage}
            src={selectedImage}
            width={500}
            height={500}
            alt={product.name}
            className={`object-contain w-auto h-full max-h-[400px] transition-transform duration-200 md:hover:scale-150 ${
              isZoomed ? "md:scale-150" : ""
            }`}
            style={{
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            }}
          />
          <RiHeartFill
            color={isLiked ? "red" : "white"}
            strokeWidth={1}
            stroke="gray"
            className="absolute right-2 top-2 text-2xl sm:text-3xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 md:hidden flex items-center justify-center">
            <IoMdSearch className="text-white text-3xl" />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {product.name}
          </h1>
          <div className="flex items-center">
            <span className="text-yellow-400 text-base sm:text-lg mr-2">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="text-gray-500 text-sm sm:text-base">
              ({product.reviews} reviews)
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-semibold text-primary">
            ${product.price.toFixed(2)}
            <span className="line-through text-gray-500 text-sm sm:text-base ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          </p>
          <p className="text-xs sm:text-sm">Inclusive of all taxes</p>
          <p className="text-gray-600 text-sm sm:text-base">
            {product.description}
          </p>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <Button
              btnVariant="addtocart"
              text="Add To Cart"
              onClick={handleAddToCart}
              className="w-full sm:w-auto"
            />
            <Button
              btnVariant="shopnow"
              text="Buy Now"
              onClick={handleBuyNow}
              className="w-full sm:w-auto"
            />
          </div>

          {/* Categories and Tags */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 py-1 px-2 sm:px-3 rounded-lg text-xs sm:text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
            <h3 className="text-base sm:text-lg font-semibold">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-500 py-1 px-2 sm:px-3 rounded-lg text-xs sm:text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Product Specifications */}
          <Specifications {...sellerInfo} />
        </div>
      </div>

      {/* Mobile Zoom Modal */}
      {showMobileZoom && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between md:hidden">
          {/* Header */}
          <div className="w-full px-4 py-3 flex justify-between items-center border-b">
            <span className="text-gray-700 font-medium">Product Preview</span>
            <button
              onClick={() => {
                setShowMobileZoom(false);
                resetZoom();
              }}
              className="text-gray-600 text-2xl p-1"
            >
              <IoClose />
            </button>
          </div>

          {/* Main Image Container */}
          <div className="flex-1 w-full relative overflow-hidden bg-gray-50">
            <div
              className="w-full h-full touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={selectedImage}
                width={1000}
                height={1000}
                alt={product.name}
                className="w-full h-full object-contain transition-transform"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                }}
              />
            </div>
            {scale > 1 && (
              <div className="absolute bottom-4 left-0 right-0 text-center text-gray-600 text-sm bg-white/80 py-1">
                Drag to pan
              </div>
            )}
          </div>

          {/* Thumbnail Navigation */}
          <div className="w-full border-t bg-white">
            <div className="p-4">
              <div className="text-sm text-gray-600 mb-2">
                All Photos ({product.images.length})
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 snap-start ${
                      selectedImage === img
                        ? "ring-2 ring-blue-500"
                        : "border border-gray-200"
                    } rounded-lg overflow-hidden cursor-pointer`}
                    onClick={() => handleImageChange(img)}
                  >
                    <Image
                      src={img}
                      width={80}
                      height={80}
                      alt={`Product ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Pinch or double-tap to zoom
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
