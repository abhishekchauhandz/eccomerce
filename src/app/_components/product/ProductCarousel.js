"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import ProductCard from "../cards/ProductCard";
import Button from "../button/Button";
import "swiper/css";
import "swiper/css/navigation";
import { useCart } from "@/app/context/CartContext";

const ProductCarousel = ({
    title,
    description,
    products = [],
}) => {
    const swiperRef = useRef(null);
    const { addToCart, setIsCartOpen } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        setIsCartOpen(true);
    };

    const handleBuyNow = (product) => {
        addToCart(product);
        setIsCartOpen(true);
    };

    return (
        <section className="py-3 sm:py-4 px-2 sm:px-4">
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h2>
                <div className="w-12 sm:w-16 h-1 bg-primary mx-auto mt-3 sm:mt-4 mb-3 sm:mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600">{description}</p>
            </div>

            <div className="relative">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Autoplay]}
                    spaceBetween={12}
                    slidesPerView={2}  // Default 2 slides for mobile
                    centeredSlides={false}
                    navigation={{
                        nextEl: '.custom-swiper-next',
                        prevEl: '.custom-swiper-prev',
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        900: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 32,
                        },
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 32,
                        }
                    }}
                    className="pb-8 sm:pb-10 mx-auto relative"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} className="flex justify-center">
                            <div className="w-full max-w-[200px]">
                                <ProductCard
                                    variant="product"
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    discount={product.discount}
                                    rating={product.rating}
                                    seller={product.seller}
                                    onAddToCart={() => handleAddToCart(product)}
                                    onBuyNow={() => handleBuyNow(product)}
                                />
                            </div>
                        </SwiperSlide>
                    ))}

                    {/* Custom navigation buttons - show on all screens */}
                    <button className="custom-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-primary rounded-full shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5 sm:w-6 sm:h-6">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="custom-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-primary rounded-full shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5 sm:w-6 sm:h-6">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                        </svg>
                    </button>
                </Swiper>
            </div>
        </section>
    );
};

export default ProductCarousel;