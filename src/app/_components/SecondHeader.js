'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';

function SecondHeader({ productInfo }) {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    }

    const formattedCategory = productInfo.category
        ? productInfo.category.charAt(0).toUpperCase() + productInfo.category.slice(1)
        : 'All Products';

    return (
        <header className="sticky top-0 w-full bg-white px-2 sm:px-4 py-2 h-[4rem] sm:h-[5rem] z-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={handleBack}
                        className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <IoIosArrowBack className="text-xl sm:text-2xl" />
                    </button>

                    {/* Breadcrumbs - only shown when productInfo exists */}
                    {productInfo && (
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link
                                href="/"
                                className="hover:text-primary hover:underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (productInfo.category) {
                                        sessionStorage.setItem('selectedCategory', productInfo.category);
                                    }
                                    router.push("/");
                                }}
                            >
                                Home
                            </Link>
                            <span>/</span>
                            <Link
                                href="/"
                                className="hover:text-primary hover:underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (productInfo.category) {
                                        sessionStorage.setItem('selectedCategory', productInfo.category);
                                        router.push("/");
                                    }
                                }}
                            >
                                {formattedCategory}
                            </Link>
                            <span>/</span>
                            <span className="font-medium text-gray-900 truncate max-w-[120px] sm:max-w-[200px]">
                                {productInfo.name}
                            </span>
                            <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                                <Image
                                    src={productInfo.image || '/assets/placeholder.png'}
                                    alt={productInfo.name}
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default SecondHeader