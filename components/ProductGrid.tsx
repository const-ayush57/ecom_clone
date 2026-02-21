"use client";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

type Props = {
    products: Product[];
};

export default function ProductGrid({ products }: Props) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-1">Try a different search or category</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}
