
"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./cards/ProductCard";
import CategorySidebar from "./CategorySidebar";
import { categories, products } from "@/helper";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useBuyNow } from "../context/BuyNowContext";
import Pagination from "./pagination";


const ProductListingPage = () => {
  // Sample data - in a real app, you'd fetch this from an API
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const { triggerBuyNow } = useBuyNow();

  const [activeCategory, setActiveCategory] = useState(null);
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const filteredProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products;

  const priceFilteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const sortedProducts = [...priceFilteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "discount":
        return (b.discount || 0) - (a.discount || 0);
      default:
        return 0; // Default/featured sorting
    }
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
    if (typeof window !== 'undefined') {
      const storedCategory = sessionStorage.getItem('selectedCategory');
      if (storedCategory) {
        setActiveCategory(storedCategory);
        sessionStorage.removeItem('selectedCategory');
      }
    }
  }, [activeCategory, sortOption, priceRange]);

  // Get current category name
  const activeCategoryObj = categories.find((c) => c.id === activeCategory);
  const categoryName = activeCategoryObj?.name;

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const handleBuyNow = (product) => {
    triggerBuyNow({ ...product, quantity: 1 });
    router.push("/checkout");
  };

  return (
    <>
      <title>
        {categoryName
          ? `${categoryName} Products - MyStore`
          : "All Products - MyStore"}
      </title>
      <meta
        name="description"
        content={
          categoryName
            ? `Explore top products from ${categoryName}. Find great deals and best prices now.`
            : "Browse all our amazing products. Find the best deals and top-rated items here."
        }
      />
      <meta
        name="keywords"
        content={
          categoryName
            ? `${categoryName}, ${categoryName} deals, ${categoryName} products`
            : "products, online store, best deals"
        }
      />

      <div className="h-[calc(100vh-100px)] w-full flex gap-0 sm:gap-2 overflow-hidden">
        <div className="h-full overflow-y-auto border-r border-gray-200">
          <CategorySidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={(categoryId) => {
              setActiveCategory(
                categoryId === activeCategory ? null : categoryId
              );
            }}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto px-4 py-8">
          {/* Category Title */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 w-full">
            <h1 className="text-2xl font-bold text-foreground">
              {activeCategory
                ? categories.find((c) => c.id === activeCategory)?.name
                : "All Products"}{" "}
              ({sortedProducts.length})
            </h1>

            {/* Filter + Sort Controls */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full md:w-auto">
              {/* Price Range Filter */}
              <div className="flex flex-wrap items-center gap-2 text-sm w-full sm:w-auto">
                <label className="text-gray-600 whitespace-nowrap">
                  Price:
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full sm:w-20 appearance-none bg-transparent 
                  [&::-webkit-slider-runnable-track]:bg-primary 
                  [&::-webkit-slider-runnable-track]:h-1
                  [&::-webkit-slider-thumb]:appearance-none 
                  [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:w-4 
                  [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-primary 
                  [&::-webkit-slider-thumb]:hover:bg-primary-light
                  [&::-webkit-slider-thumb]:mt-[-6px]"
                />
                <span className="text-foreground whitespace-nowrap">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 text-sm w-full sm:w-auto">
                <label className="text-gray-600 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full">
            {currentProducts.map((product) => (
              <div key={product.id}>
                <ProductCard
                  id={product.id}
                  variant="product"
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  discount={product.discount}
                  rating={product.rating}
                  seller={product.seller}
                  onAddToCart={() => handleAddToCart(product)}
                  onBuyNow={() => handleBuyNow(product)}
                  onClick={() => router.push(`/product/${product.id}`)}
                />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No products found in this category
              </p>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-8"
          />
        </div>
      </div>
    </>
  );
};

export default ProductListingPage;