"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    // Load wishlist items from localStorage on initial render
    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            try {
                setWishlistItems(JSON.parse(storedWishlist));
            } catch (error) {
                console.error('Error parsing wishlist from localStorage:', error);
            }
        }
    }, []);

    // Save wishlist items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product) => {
        if (!wishlistItems.find((item) => item.id === product.id)) {
            setWishlistItems([...wishlistItems, product]);
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                isWishlistOpen,
                setIsWishlistOpen,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}; 