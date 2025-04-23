import React from "react";
import { CiShop } from "react-icons/ci";
import Image from "next/image";

const CategorySidebar = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <div className="flex flex-col items-center h-full w-full max-w-[8rem] md:max-w-[12rem] bg-white text-black border-r border-gray-200 shadow-lg rounded-r-lg p-2 sm:p-4 overflow-y-auto transition-all duration-300">
      <h2 className="text-sm sm:text-md font-bold text-gray-800 mb-3 sm:mb-6 flex items-center gap-1 sm:gap-2 justify-center sm:justify-start">
        <CiShop className="text-lg sm:text-xl" />
        <span className="text-[10px] sm:text-sm">Categories</span>
      </h2>
      <ul className="flex flex-col sm:flex-col gap-2 sm:gap-4 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
        {categories.map((category) => (
          <li key={category.id} className="w-20 sm:w-24">
            <div className="flex flex-col items-center px-1 sm:px-0">
              <div
                onClick={() => onCategoryClick(category.id)}
                className={`w-14 h-14 sm:w-16 sm:h-16 bg-secondary rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 
            ${activeCategory === category.id
                    ? "bg-red-100 ring-2 ring-red-900"
                    : "border-2 border-transparent"
                  } 
            hover:shadow-md hover:scale-100`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={50}
                  height={50}
                  className="object-contain rounded-full"
                />
              </div>
              <h3
                className={`text-[10px] sm:text-sm font-medium ${activeCategory === category.id
                    ? "text-red-500 font-bold"
                    : "text-gray-700"
                  } mt-1 sm:mt-2 text-center w-full`}
              >
                {category.name}
              </h3>
              <p className="text-[9px] sm:text-xs text-teal-600 text-center">
                {category.productCount}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
