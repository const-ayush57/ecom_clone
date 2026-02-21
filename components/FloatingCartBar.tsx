"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";

export default function FloatingCartBar() {
    const pathname = usePathname();

    // Subscribe to raw `items` array — Zustand tracks changes to primitives/arrays,
    // not to computed-function results. This is what makes the bar reactive.
    const items = useCartStore((s) => s.items);

    // Guard: Zustand `persist` rehydrates from localStorage asynchronously after
    // the first client render. Without this guard the bar stays hidden even when
    // items exist, because SSR rendered it as null (empty store).
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    if (items.length === 0) return null;
    if (pathname === "/cart") return null;

    const totalItems = items.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
            <Link href="/cart">
                <div className="bg-[#0075e8] hover:bg-blue-700 transition-colors rounded-full px-5 py-3 flex items-center justify-between cursor-pointer shadow-2xl">
                    {/* Left: items + price */}
                    <div className="text-white text-sm font-semibold">
                        {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"}&nbsp;•&nbsp;₹{" "}
                        {totalPrice.toFixed(2)}
                    </div>

                    {/* Divider */}
                    <div className="w-px h-5 bg-white/30 mx-3" />

                    {/* Right: cart icon with badge + label */}
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <ShoppingCart size={18} className="text-white" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                                {totalItems}
                            </span>
                        </div>
                        <span className="text-white text-sm font-semibold">View cart</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
