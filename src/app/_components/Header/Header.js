"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import ProfilePopup from "../Profile";
import WishlistSidebar from "../WishlistSidebar";
import Location from "./Location";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistItems, setIsWishlistOpen } = useWishlist();

  return (
    <>
      <header className="max-w-[1700px] mx-auto sticky top-0 z-40 w-full bg-white shadow-sm px-4 py-3">
        <div className="flex flex-col w-full">
          {/* First Row (Logo | Location+Search | Profile/Cart) */}
          <div className="flex items-center justify-between w-full gap-4">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/assets/naatuSandhai.png"
                alt="Logo"
                width={130}
                height={130}
                className="object-cover"
              />
            </Link>
            {/* Center: Location + Search (only md and up) */}
            <div className="hidden md:flex items-center gap-10 flex-1 justify-center max-w-6xl w-full">
              <Location />
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-2 px-4 pr-10 text-lg rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                />
                <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </div>

            <div className="flex items-center gap-6 relative">
              <div
                className="relative cursor-pointer"
                onClick={() => setIsWishlistOpen(true)}
              >
                <AiOutlineHeart className="text-3xl md:text-4xl text-primary" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </div>

              <div
                className="relative cursor-pointer"
                onClick={() => setIsCartOpen(true)}
              >
                <BsCart4 className="text-3xl md:text-4xl text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="md:w-14 w-8 md:h-14 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <Image
                    src="/assets/profile-user.png"
                    alt="User"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 z-50">
                    <ProfilePopup onClose={() => setIsProfileOpen(false)} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Second Row (Mobile view only: Location + Search side-by-side) */}
          <div className="flex md:hidden items-center gap-4 px-1 w-full">
            <Location />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 px-4 pr-10 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
              />
              <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400  text-lg sm:text-xl" />
            </div>
          </div>
        </div>
      </header>

      <WishlistSidebar />
    </>
  );
};

export default Header;
