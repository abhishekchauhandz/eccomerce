import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  FaChevronRight,
  FaChevronLeft,
  FaCartPlus,
  FaShoppingBag,
  FaSignInAlt
} from "react-icons/fa";

const Button = ({
  text,
  btnVariant = "standard",
  onClick,
  disabled = false,
  loading = false,
  isStyled = false,
  className = "",
  ...rest
}) => {
  const btnBaseClasses =
    "inline-flex items-center justify-center rounded-full transition-all duration-300 ease-in-out font-medium focus:outline-none disabled:opacity-50 cursor-pointer";

  const btnVariants = {
    next: `absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-primary border border-primary shadow opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 text-white ${isStyled ? "" : "top-24"
      }`,
    prev: `absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-primary border border-primary shadow opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 text-white ${isStyled ? "" : "top-24"
      }`,
    shopnow:
      "bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 text-[10px] sm:text-xs md:text-sm hover:from-green-600 hover:to-emerald-700 shadow-md hover:scale-105",
    addtocart:
      "bg-white text-[#299E60] border border-[#299E60] px-3 py-2 text-[10px] sm:text-xs md:text-sm hover:bg-[#299E60] hover:text-white shadow-md hover:scale-105",
    standard: "bg-[#006400] text-white px-4 py-2 text-sm hover:bg-[#af242f]",
    back: "py-1 hover:bg-gray-100 transition-colors text-2xl md:text-3xl font-bold text-gray-800",
  };

  const renderIcon = () => {
    switch (btnVariant) {
      case "next":
        return <FaChevronRight className="text-white" size={14} />;
      case "prev":
        return <FaChevronLeft className="text-white" size={14} />;
      case "addtocart":
        return <FaCartPlus className="mr-1 sm:mr-2" />;
      case "shopnow":
        return <FaShoppingBag className="mr-1 sm:mr-2" />;
      case "back":
        return <IoIosArrowBack className="text-3xl text-gray-800" />;
      case "sign-in":
        return <FaSignInAlt className="mr-1 sm:mr-2 " />;
      default:
        return null;
    }
  };

  return (
    <button
      className={`${btnBaseClasses} ${btnVariants[btnVariant]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={text ? text.toString() : "button"}
      {...rest}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
          ></path>
        </svg>
      ) : (
        <>
          {renderIcon()}
          {text && <span>{text}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
