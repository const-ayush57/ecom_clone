"use client";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
    const { items, addItem, updateQty } = useCartStore();
    const cartItem = items.find((i) => i.id === product.id);
    const qty = cartItem?.quantity ?? 0;

    return (
        /**
         * Mobile  (<sm):  flex-row  — image left, text+button right
         * Desktop (sm+):  flex-col  — image top, text+button below
         */
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-row sm:flex-col hover:shadow-md transition-shadow">

            {/* ── Image ── */}
            <div className="relative shrink-0">
                <Link href={`/item/${product.id}`}>
                    {/* mobile: 80×80; desktop: full-width square */}
                    <div className="relative w-20 h-20 sm:w-full sm:h-auto sm:aspect-square bg-gray-50 overflow-hidden">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 80px, (max-width: 1024px) 33vw, 25vw"
                        />
                    </div>
                </Link>
            </div>

            {/* ── Info ── */}
            <div className="flex-1 px-3 py-2 sm:p-3 flex flex-col min-w-0">
                <Link href={`/item/${product.id}`}>
                    <p className="text-sm text-gray-800 font-medium leading-tight line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.name}
                    </p>
                </Link>
                {product.itemCode && (
                    <p className="text-[10px] text-gray-400 mt-0.5">
                        ITEM CODE: {product.itemCode}
                    </p>
                )}

                {/* Price + Add — always inline */}
                <div className="mt-auto pt-1.5 flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-1 min-w-0">
                        <span className="text-sm font-bold text-gray-900">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                            <span className="text-[11px] text-gray-400 line-through truncate">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Fixed-width capsule */}
                    <div className="shrink-0 w-[88px] h-[30px]">
                        {qty === 0 ? (
                            <button
                                onClick={() => addItem(product)}
                                className="w-full h-full border border-blue-500 text-blue-600 text-xs font-semibold rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap"
                            >
                                +Add
                            </button>
                        ) : (
                            <div className="w-full h-full flex items-center justify-between border border-blue-500 rounded-full overflow-hidden">
                                <button
                                    onClick={() => updateQty(product.id, qty - 1)}
                                    className="w-7 h-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                    <Minus size={12} />
                                </button>
                                <span className="text-xs font-bold text-gray-800 text-center">
                                    {qty}
                                </span>
                                <button
                                    onClick={() => updateQty(product.id, qty + 1)}
                                    className="w-7 h-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                    <Plus size={12} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
