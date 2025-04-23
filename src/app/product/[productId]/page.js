import React from "react";
import { products, categories } from "@/helper";
import ProductDetailContent from "./ProductDetailContent";

export async function generateMetadata({ params }) {
    const { productId } = await params;


    const product = products.find((p) => p.id === productId);
    const category = categories.find((c) => c.id === product?.category);

    if (!product) {
        return {
            title: "Product Not Found",
            description: "This product does not exist or has been removed.",
        };
    }

    const productTitle = `${product.name} - Buy Online | ${category?.name || "E-Shop"}`;

    return {
        title: productTitle,
        description: `Buy ${product.name} from our ${category?.name || "Store"} collection. Fast delivery & best price guaranteed.`,
        openGraph: {
            title: productTitle,
            description: `Explore details and pricing for ${product.name}.`,
            type: "website",
            images: [product.image],
        },
        twitter: {
            card: "summary_large_image",
            title: productTitle,
            description: `Buy ${product.name} online at the best price.`,
            images: [product.image],
        },
        keywords: [
            product.name,
            product.category,
            "best price",
            "online shopping",
            "buy now",
        ],
    };
}

export default async function ProductDetailPage({ params }) {
    const { productId } = await params;

    const product = products.find((p) => String(p.id) === productId) || {
        name: "Product Not Found",
        image: "/assets/placeholder.png",
        items: 0,
    };

    return (
        <div className="w-full max-w-[1700px] mx-auto overflow-x-hidden">
            <ProductDetailContent product={product} />
        </div>
    );
}