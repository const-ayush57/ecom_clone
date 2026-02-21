"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, MapPin, Phone, ArrowLeft } from "lucide-react";

type Props = {
    params: Promise<{ id: string }>;
};

export default function ProductDetailPage({ params }: Props) {
    const { id } = use(params);
    const product = products.find((p) => p.id === Number(id));
    if (!product) notFound();

    const { items, addItem, updateQty } = useCartStore();
    const cartItem = items.find((i) => i.id === product.id);
    const qty = cartItem?.quantity ?? 0;

    const [activeImg, setActiveImg] = useState(0);

    return (
        <main className="min-h-screen bg-[#f5f5f5]">

            {/* ============================================= */}
            {/* MOBILE LAYOUT  (< md)                         */}
            {/* ============================================= */}
            <div className="md:hidden">
                {/* Full-width hero image with back arrow overlay */}
                <div className="relative w-full aspect-square bg-white">
                    <Image
                        src={product.images[activeImg]}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                    />
                    {/* Back arrow — circle overlay top-left */}
                    <Link
                        href="/"
                        className="absolute top-3 left-3 z-20 w-9 h-9 bg-black/60 rounded-full flex items-center justify-center"
                    >
                        <ArrowLeft size={18} className="text-white" />
                    </Link>
                </div>

                {/* Thumbnail dots / strip */}
                {product.images.length > 1 && (
                    <div className="flex justify-center gap-1.5 py-2 bg-white">
                        {product.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImg(idx)}
                                className={`w-2 h-2 rounded-full transition-colors ${idx === activeImg
                                    ? "bg-gray-800"
                                    : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Product info card */}
                <div className="px-4 py-3 bg-white border-t border-gray-100">
                    <h1 className="text-base font-semibold text-gray-900">
                        {product.name}
                    </h1>

                    {/* Price + Add row */}
                    <div className="mt-2 flex items-center justify-between">
                        <div>
                            <p className="text-xl font-bold text-gray-900">
                                ₹{product.price.toLocaleString()}
                            </p>
                            {product.originalPrice > product.price && (
                                <p className="text-xs text-gray-400 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                </p>
                            )}
                        </div>
                        {/* Fixed-size capsule */}
                        <div className="w-[88px] h-[30px]">
                            {qty === 0 ? (
                                <button
                                    onClick={() => addItem(product)}
                                    className="w-full h-full border border-blue-500 text-blue-600 text-xs font-semibold rounded-full hover:bg-blue-50 transition-colors"
                                >
                                    +Add
                                </button>
                            ) : (
                                <div className="w-full h-full flex items-center justify-between border border-blue-500 rounded-full overflow-hidden">
                                    <button
                                        onClick={() => updateQty(product.id, qty - 1)}
                                        className="w-7 h-full flex items-center justify-center text-blue-600"
                                    >
                                        <Minus size={12} />
                                    </button>
                                    <span className="text-xs font-bold text-gray-800">{qty}</span>
                                    <button
                                        onClick={() => updateQty(product.id, qty + 1)}
                                        className="w-7 h-full flex items-center justify-center text-blue-600"
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* About Product */}
                <div className="mt-2 px-4 py-3 bg-white border-t border-gray-100">
                    <h2 className="text-sm font-semibold text-gray-900 mb-1">About Product</h2>
                    <p className="text-xs text-gray-600">
                        <span className="font-medium text-gray-700">CATEGORY :</span>{" "}
                        {product.category}
                    </p>
                    {product.description && (
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* Seller */}
                <div className="mt-2 px-4 py-3 bg-white border-t border-gray-100">
                    <h2 className="text-sm font-semibold text-gray-900 mb-2">Seller</h2>
                    <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">Wholeseller India</p>
                            <div className="flex items-start gap-1 text-xs text-blue-600 mt-1">
                                <MapPin size={11} className="mt-0.5 shrink-0" />
                                <span>
                                    Shop no. 310, 3rd Floor, Network Plaza, Gaffar Market,
                                    Karol Bagh, Delhi-110005
                                </span>
                            </div>
                            <a
                                href="tel:8882387534"
                                className="flex items-center gap-1.5 mt-2 border border-gray-200 rounded-md px-3 py-1.5 text-xs text-gray-700 w-fit bg-white"
                            >
                                <Phone size={11} />
                                8882387534
                            </a>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo.png" alt="Wi" width={36} height={36} className="rounded-full" />
                    </div>
                </div>
            </div>

            {/* ============================================= */}
            {/* DESKTOP / TABLET LAYOUT  (md+)                */}
            {/* ============================================= */}
            <div className="hidden md:block">
                {/* Go to Store button — desktop/tablet */}
                <div className="px-4 pt-4 pb-2">
                    <Link href="/">
                        <button className="border border-gray-300 bg-white text-gray-700 text-sm font-medium px-5 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
                            Go to Store
                        </button>
                    </Link>
                </div>

                <div className="max-w-5xl mx-auto px-4 pb-6">
                    <div className="flex gap-4">
                        {/* Left: Thumbnails */}
                        <div className="flex flex-col gap-2 shrink-0">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImg(idx)}
                                    className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${idx === activeImg
                                        ? "border-blue-500"
                                        : "border-gray-200 hover:border-gray-400"
                                        } bg-white`}
                                >
                                    <Image
                                        src={img}
                                        alt={`View ${idx + 1}`}
                                        fill
                                        className="object-contain p-1"
                                        sizes="64px"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Center: Main Image */}
                        <div className="flex-1 max-w-xs">
                            <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-100">
                                <Image
                                    src={product.images[activeImg]}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4"
                                    sizes="300px"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right: Product Info */}
                        <div className="flex-1 min-w-0 flex flex-col gap-4">
                            {/* Title & Price */}
                            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-bold text-gray-900 mt-2">
                                    ₹{product.price.toLocaleString()}
                                </p>

                                {/* Add to Cart / Qty control — fixed capsule */}
                                <div className="mt-4 w-[160px] h-[42px]">
                                    {qty === 0 ? (
                                        <button
                                            onClick={() => addItem(product)}
                                            className="w-full h-full flex items-center justify-center gap-2 border-2 border-blue-500 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors text-sm"
                                        >
                                            <Plus size={15} />
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-between border-2 border-blue-500 rounded-full overflow-hidden">
                                            <button
                                                onClick={() => updateQty(product.id, qty - 1)}
                                                className="w-11 h-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="font-bold text-gray-800 text-sm">
                                                {qty}
                                            </span>
                                            <button
                                                onClick={() => updateQty(product.id, qty + 1)}
                                                className="w-11 h-full flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* About Product */}
                            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                                <h2 className="text-base font-semibold text-gray-900 mb-2">
                                    About Product
                                </h2>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                        <span className="font-medium text-gray-700">CATEGORY</span> :{" "}
                                        {product.category}
                                    </p>
                                    <p className="text-gray-600 mt-2 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            </div>

                            {/* Seller */}
                            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                                <h2 className="text-base font-semibold text-gray-900 mb-3">
                                    Seller
                                </h2>
                                <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">
                                            Wholeseller India
                                        </p>
                                        <div className="flex items-start gap-1.5 text-xs text-blue-600 mt-1">
                                            <MapPin size={12} className="mt-0.5 shrink-0" />
                                            <span>
                                                Shop no. 310, 3rd Floor, Network Plaza, Gaffar Market,
                                                Karol Bagh, Delhi-110005
                                            </span>
                                        </div>
                                        <a
                                            href="tel:8882387534"
                                            className="flex items-center gap-1.5 mt-2 border border-gray-200 rounded-md px-3 py-1.5 text-xs text-gray-700 w-fit hover:bg-gray-50 transition-colors"
                                        >
                                            <Phone size={12} />
                                            8882387534
                                        </a>
                                    </div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/logo.png" alt="Wi" width={48} height={48} className="rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
