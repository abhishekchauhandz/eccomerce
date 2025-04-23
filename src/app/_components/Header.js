"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { IoIosSearch } from 'react-icons/io';
import { BsCart4 } from 'react-icons/bs';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProfilePopup from './Profile';
import WishlistSidebar from './WishlistSidebar';

const Header = () => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const { wishlistItems, setIsWishlistOpen } = useWishlist();

    return (
        <>
            <header className="max-w-[1700px] mx-auto sticky top-0 z-40 w-full bg-white shadow-sm px-4 py-3 h-auto">
                <div className='flex flex-col gap-1'>
                    <div className="flex items-center justify-between">
                        <Image
                            src="/assets/naatuSandhai.png"
                            alt="Logo"
                            width={130}
                            height={130}
                            className="object-cover"
                        />

                        {/* Right side (cart and profile) */}
                        <div className="flex items-center gap-6 relative">
                            {/* Wishlist icon with counter */}
                            <div
                                className="relative cursor-pointer"
                                onClick={() => setIsWishlistOpen(true)}
                            >
                                <div className="flex items-center justify-center">
                                    <AiOutlineHeart className="text-3xl md:text-4xl text-orange-400" />
                                    {wishlistItems.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {wishlistItems.length}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Cart icon with counter */}
                            <div
                                className="relative cursor-pointer"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <div className="flex items-center justify-center">
                                    <BsCart4 className="text-3xl md:text-4xl text-orange-400" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Profile button */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="md:w-14 w-8 md:h-14 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                                    aria-expanded={isProfileOpen}
                                    aria-haspopup="true"
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
                    <div className='flex flex-col md:flex-row md:items-center md:justify-start gap-2 md:gap-0 px-4'>
                        <div className="flex flex-col items-center gap-2">
                            <div className='flex gap-2'>
                                <Image
                                    src="/assets/image.png"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="object-contain w-8 md:w-10"
                                />
                                <button className="text-gray-600 text-sm md:text-base flex items-center gap-1">
                                    Add your location
                                </button>
                            </div>
                            <span className="text-xs text-gray-400">To see items in your area</span>
                        </div>
                        <div className=" max-w-xl md:mx-auto w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                                />
                                <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <WishlistSidebar />
        </>
    );
};

export default Header;
