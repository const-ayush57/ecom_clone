"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { categories } from "@/data/products";
import { useRef, useState, useEffect } from "react";

type Props = {
    active: string;
    onSelect: (cat: string) => void;
};

export default function CategoryFilter({ active, onSelect }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = () => {
        const el = ref.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        updateScrollState();
        el.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState);
        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, []);

    const scrollLeft = () => {
        ref.current?.scrollBy({ left: -200, behavior: "smooth" });
    };
    const scrollRight = () => {
        ref.current?.scrollBy({ left: 200, behavior: "smooth" });
    };

    return (
        <div className="relative flex items-center">
            {/* Left arrow */}
            {canScrollLeft && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 z-10 bg-white shadow-md rounded-full p-1 border border-gray-200 hover:bg-gray-50"
                >
                    <ChevronLeft size={16} className="text-gray-600" />
                </button>
            )}

            <div
                ref={ref}
                className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-8"
                style={{ scrollbarWidth: "none" }}
            >
                {categories.map((cat) => {
                    const isActive = active === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => onSelect(cat)}
                            className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${isActive
                                ? "bg-[#f9dce0] text-[#dc3226] border-[#f9dce0]"
                                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Right arrow */}
            {canScrollRight && (
                <button
                    onClick={scrollRight}
                    className="absolute right-0 bg-white shadow-md rounded-full p-1 border border-gray-200 hover:bg-gray-50"
                >
                    <ChevronRight size={16} className="text-gray-600" />
                </button>
            )}
        </div>
    );
}
