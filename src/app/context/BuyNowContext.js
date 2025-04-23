"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BuyNowContext = createContext();

export const BuyNowProvider = ({ children }) => {
  const [buyNowProduct, setBuyNowProduct] = useState(null);

  useEffect(() => {
    const storedProduct = localStorage.getItem("buyNowProduct");
    if (storedProduct) {
      setBuyNowProduct(JSON.parse(storedProduct));
    }
  }, []);

  useEffect(() => {
    if (buyNowProduct) {
      localStorage.setItem("buyNowProduct", JSON.stringify(buyNowProduct));
    } else {
      localStorage.removeItem("buyNowProduct");
    }
  }, [buyNowProduct]);

  const triggerBuyNow = (product) => {
    setBuyNowProduct(product);
  };

  const clearBuyNow = () => {
    setBuyNowProduct(null);
  };

  const updateBuyNowQuantity = (productId, newQuantity) => {
    if (!buyNowProduct || buyNowProduct.id !== productId) return;

    if (newQuantity < 1) {
      clearBuyNow();
    } else {
      const updatedProduct = { ...buyNowProduct, quantity: newQuantity };
      setBuyNowProduct(updatedProduct);
    }
  };

  return (
    <BuyNowContext.Provider
      value={{ buyNowProduct, triggerBuyNow, clearBuyNow, updateBuyNowQuantity }}
    >
      {children}
    </BuyNowContext.Provider>
  );
};

export const useBuyNow = () => useContext(BuyNowContext);
