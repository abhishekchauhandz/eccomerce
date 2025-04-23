"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useBuyNow } from "../context/BuyNowContext";
import { useAuth } from "../context/AuthContext";

const CartSidebar = () => {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
  const sidebarRef = useRef(null);
  const { clearBuyNow } = useBuyNow();
  const { isAuthenticated } = useAuth();

  // Close sidebar when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isCartOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    clearBuyNow();
    router.push("/checkout");
  };

  const handleRemoveItem = (id, e) => {
    e.stopPropagation();
    removeFromCart(id);
  };

  const handleUpdateQuantity = (id, newQuantity, e) => {
    e.stopPropagation();
    updateQuantity(id, newQuantity);
  };

  const handleMoveToWishlist = (item, e) => {
    e.stopPropagation();
    addToWishlist(item);
    removeFromCart(item.id);
  };

  const handleRemoveFromWishlist = (item, e) => {
    e.stopPropagation();
    removeFromWishlist(item.id);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-lg transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col bg-white shadow-xl">
          {/* Header */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-medium text-gray-900">
                Shopping cart
              </h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setIsCartOpen(false)}
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

            {/* Cart items */}
            <div className="mt-8">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {cartItems.length === 0 ? (
                    <li className="py-6 flex">
                      <p className="text-gray-500">Your cart is empty</p>
                    </li>
                  ) : (
                    cartItems.map((item) => (
                      <li key={item.id} className="py-6 flex">
                        <div
                          className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cursor-pointer"
                          onClick={() => {
                            router.push(`/product/${item.id}`);
                            setIsCartOpen(false);
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
                              setIsCartOpen(false);
                            }}
                          >
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.category}
                            </p>
                          </div>

                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center rounded border">
                              <button
                                className="px-2 py-1 text-xl"
                                onClick={(e) =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1,
                                    e
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="px-2">{item.quantity}</span>
                              <button
                                className="px-2 py-1 text-xl"
                                onClick={(e) =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity + 1,
                                    e
                                  )
                                }
                              >
                                +
                              </button>
                            </div>

                            <div className="flex items-center gap-4">
                              {isInWishlist(item.id) ? (
                                <button
                                  type="button"
                                  className="flex items-center gap-1 text-primary "
                                  onClick={(e) =>
                                    handleRemoveFromWishlist(item, e)
                                  }
                                >
                                  <AiFillHeart className="text-xl" />
                                  <span className="hidden sm:inline text-sm">
                                    Remove from Wishlist
                                  </span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="flex items-center gap-1 text-primary"
                                  onClick={(e) => handleMoveToWishlist(item, e)}
                                >
                                  <AiOutlineHeart className="text-xl" />
                                  <span className="hidden sm:inline text-sm">
                                    Move to Wishlist
                                  </span>
                                </button>
                              )}
                              <button
                                type="button"
                                className="text-blood"
                                onClick={(e) => handleRemoveItem(item.id, e)}
                              >
                                <BsTrash className="text-xl" />
                              </button>
                            </div>
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
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>₹{cartTotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm "
                >
                  Checkout
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="font-medium text-primary"
                    onClick={() => setIsCartOpen(false)}
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

export default CartSidebar;
