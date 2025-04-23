"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Button from "./button/Button";
import { BsTrash } from "react-icons/bs";

const WishlistSidebar = () => {
  const {
    wishlistItems,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
  } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isWishlistOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsWishlistOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsWishlistOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isWishlistOpen]);

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    addToCart(item);
    removeFromWishlist(item.id);
  };

  const handleBuyNow = (item, e) => {
    e.stopPropagation();
    addToCart(item);
    removeFromWishlist(item.id);
    setIsWishlistOpen(false);
    router.push("/checkout");
  };

  const handleRemoveItem = (id, e) => {
    e.stopPropagation();
    removeFromWishlist(id);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isWishlistOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-lg transform transition-transform duration-300 ease-in-out ${
          isWishlistOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col bg-white shadow-xl">
          {/* Header */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-medium text-gray-900">Wishlist</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setIsWishlistOpen(false)}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Wishlist items */}
            <div className="mt-8">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {wishlistItems.length === 0 ? (
                    <li className="py-6 flex">
                      <p className="text-gray-500">Your wishlist is empty</p>
                    </li>
                  ) : (
                    wishlistItems.map((item) => (
                      <li
                        key={`wishlist-item-${item.id}`}
                        className="py-6 flex"
                      >
                        <div
                          className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cursor-pointer"
                          onClick={() => {
                            router.push(`/product/${item.id}`);
                            setIsWishlistOpen(false);
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              router.push(`/product/${item.id}`);
                              setIsWishlistOpen(false);
                            }}
                          >
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">₹{item.price.toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.category}
                            </p>
                          </div>

                          <div className="flex-1 flex items-end justify-between">
                            <div className="flex items-center gap-4">
                              <Button
                                btnVariant="addtocart"
                                onClick={(e) => handleAddToCart(item, e)}
                                text={
                                  <span className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm hidden sm:inline">
                                    Add
                                  </span>
                                }
                                className="max-w-[10rem] md:px-8 px-6"
                              />
                              <Button
                                btnVariant="shopnow"
                                onClick={(e) => handleBuyNow(item, e)}
                                text={
                                  <span className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm hidden sm:inline">
                                    Buy
                                  </span>
                                }
                                className="max-w-[10rem] md:px-8 px-6"
                              />
                            </div>

                            <button
                              type="button"
                              className="text-blood"
                              onClick={(e) => handleRemoveItem(item.id, e)}
                            >
                              <BsTrash className="text-xl" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          {wishlistItems.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="font-medium text-primary"
                    onClick={() => setIsWishlistOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistSidebar;
