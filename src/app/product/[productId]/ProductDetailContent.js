import React from "react";
import ProductDetail from "@/app/_components/product/ProductDetail";
import SecondHeader from "@/app/_components/SecondHeader";
import RatingAndReviews from "@/app/_components/product/RatingAndReviews";
import ProductCarousel from "@/app/_components/product/ProductCarousel";

const productRatings = {
    totalRatings: 22106,
    averageRating: 4,
    ratings: [
        { stars: 5, percentage: 50 },
        { stars: 4, percentage: 24 },
        { stars: 3, percentage: 14 },
        { stars: 2, percentage: 5 },
        { stars: 1, percentage: 7 },
    ],
};

const relatedProducts = [
    {
        id: 1,
        image: "/assets/Vegetables.png",
        name: "Elegant Top",
        price: 500,
        discount: 30,
    },
    {
        id: 2,
        image: "/assets/Vegetables.png",
        name: "Trendy Jeans",
        price: 700,
    },
    {
        id: 3,
        image: "/assets/Vegetables.png",
        name: "Classic Jacket",
        price: 1650,
        discount: 20,
    },
    {
        id: 4,
        image: "/assets/Vegetables.png",
        name: "Stylish Shoes",
        price: 600,
    },
    {
        id: 5,
        image: "/assets/Vegetables.png",
        name: "Casual T-Shirt",
        price: 450,
        discount: 25,
    },
    {
        id: 6,
        image: "/assets/Vegetables.png",
        name: "Formal Pants",
        price: 220,
    },
    {
        id: 7,
        image: "/assets/Vegetables.png",
        name: "Denim jeans",
        price: 220,
    },
];

const productReviews = [
    {
        user: "Suchitha",
        rating: 1,
        date: "9 July 2024",
        comment: "There is warm not fresh. Bad experience, not a good product.",
        images: [
            "/assets/Vegetables.png",
            "/assets/Vegetables.png"],
    },
    {
        user: "Santhosh",
        rating: 5,
        date: "1 january 2024",
        comment: "The product arrived late, and the quality was not as described. Some items were spoiled. Won't order again.",
        images: [
            "/assets/Fruits.png",
            "/assets/Fruits.png"],
    },
    {
        user: "Abishek chauhan",
        rating: 3,
        date: "16 June 2024",
        comment: "The product exceeded my expectations. Fresh, well-packaged, and arrived on time. Definitely worth the purchase!",
        images: [
            "/assets/Strawberry.png",
            "/assets/Strawberry.png"],
    },
    // Add more reviews...
];

// Function to enhance product data with additional details
const getProductDetails = (product) => {
    if (!product) return null;

    // Add mock detailed information based on product category


    const categoryDetails = {
        electronics: {
            description: "Premium electronic device with advanced features and durable build quality.",
            images: [
                "/assets/Fruits.png",
                "/assets/Vegetables.png",
                "/assets/Pomogranate.png",
                "/assets/Strawberry.png",
            ],
            specifications: [
                { key: "Brand", value: "TechMaster" },
                { key: "Model", value: "Pro-X200" },
                { key: "Warranty", value: "2 Years" },
                { key: "Color", value: "Black" },
            ]
        },
        clothing: {
            description: "High-quality clothing item made from premium materials for comfort and style.",
            images: [
                "/assets/Fruits.png",
                "/assets/Vegetables.png",
            ],
            specifications: [
                { key: "Material", value: "100% Cotton" },
                { key: "Size", value: "M, L, XL" },
                { key: "Care Instructions", value: "Machine wash cold" },
                { key: "Origin", value: "India" },
            ]
        },
        furnitures: {
            description: "Beautifully crafted furniture piece that combines functionality with aesthetic appeal.",
            images: [
                "/assets/Pomogranate.png",
                "/assets/Strawberry.png",
            ],
            specifications: [
                { key: "Material", value: "Solid Wood" },
                { key: "Dimensions", value: "50 x 30 x 80 cm" },
                { key: "Weight", value: "15 kg" },
                { key: "Assembly", value: "Required" },
            ]
        },
        auto: {
            description: "High-performance auto part designed for durability and optimal performance.",
            images: [
                "/assets/Fruits.png",
                "/assets/Vegetables.png",
                "/assets/Pomogranate.png",
            ],
            specifications: [
                { key: "Compatibility", value: "Multiple Models" },
                { key: "Warranty", value: "1 Year" },
                { key: "Installation", value: "Professional recommended" },
            ]
        },
        // Default details for other categories
        default: {
            description: "Quality product designed to meet your needs and exceed expectations.",
            images: [
                "/assets/Fruits.png",
                "/assets/Vegetables.png",
            ],
            specifications: [
                { key: "Brand", value: "Premium" },
                { key: "Quality", value: "High" },
                { key: "Warranty", value: "1 Year" },
            ]
        }
    };

    const details = categoryDetails[product.category] || categoryDetails.default;

    return {
        ...product,
        originalPrice: product.price * 1.2, // Add 20% as original price
        reviews: Math.floor(Math.random() * 100) + 10, // Random reviews count
        ...details,
        categories: [product.category],
        tags: ["popular", "new", "trending"],
    };
};

export default function ProductDetailContent({ product }) {
    const enhancedProduct = getProductDetails(product);

    return (
        <>
            <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8 flex flex-col gap-3 sm:gap-4 md:gap-6">
                <SecondHeader productInfo={{
                    name: product.name,
                    image: product.image,
                    items: product.items,
                    category: product.category
                }} />

                <ProductDetail product={enhancedProduct} />
                <RatingAndReviews summary={productRatings} reviews={productReviews} />
                <ProductCarousel
                    title="Related Products"
                    description="We have find products related to this"
                    products={relatedProducts} />
            </div>
        </>
    );
} 