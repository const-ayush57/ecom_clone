"use client";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Trash2, Plus, ChevronDown, ArrowLeft } from "lucide-react";
import { useState } from "react";

// Country list: { code (ISO-3166-1 alpha-2 lowercase), name, dial }
const COUNTRIES = [
    { code: "in", name: "India", dial: "+91" },
    { code: "us", name: "United States", dial: "+1" },
    { code: "gb", name: "United Kingdom", dial: "+44" },
    { code: "ae", name: "UAE", dial: "+971" },
    { code: "sa", name: "Saudi Arabia", dial: "+966" },
    { code: "ca", name: "Canada", dial: "+1" },
    { code: "au", name: "Australia", dial: "+61" },
    { code: "sg", name: "Singapore", dial: "+65" },
    { code: "my", name: "Malaysia", dial: "+60" },
    { code: "np", name: "Nepal", dial: "+977" },
    { code: "bd", name: "Bangladesh", dial: "+880" },
    { code: "pk", name: "Pakistan", dial: "+92" },
    { code: "lk", name: "Sri Lanka", dial: "+94" },
    { code: "de", name: "Germany", dial: "+49" },
    { code: "fr", name: "France", dial: "+33" },
];

const INPUT_CLS =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all";

export default function CartPage() {
    const { items, removeItem, updateQty, totalPrice, totalItems } =
        useCartStore();
    const count = totalItems();
    const subtotal = totalPrice();

    const [name, setName] = useState("");
    const [country, setCountry] = useState(COUNTRIES[0]);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const MIN_ORDER = 500;
    const remaining = Math.max(0, MIN_ORDER - subtotal);

    /** Allow digits, +, spaces, dashes, parentheses — same as real site */
    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9+\s\-()]/g, "");
        setPhone(val);
    };
    const phoneDigits = phone.replace(/\D/g, ""); // digit-only count for validation

    if (count === 0) {
        return (
            <main className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center text-center px-4">
                <p className="text-5xl mb-4">🛒</p>
                <h2 className="text-xl font-bold text-gray-700">Your cart is empty</h2>
                <p className="text-sm text-gray-400 mt-1">
                    Add some products to get started
                </p>
                <Link
                    href="/"
                    className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                    Browse Products
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f5f5f5]">
            {/* Back — mobile: circle arrow, tablet+: "Go to Store" */}
            <div className="max-w-5xl mx-auto px-4 pt-4">
                {/* Mobile circle arrow */}
                <Link
                    href="/"
                    className="md:hidden inline-flex w-9 h-9 bg-gray-700 rounded-full items-center justify-center"
                >
                    <ArrowLeft size={18} className="text-white" />
                </Link>
                {/* Tablet+ text button */}
                <Link
                    href="/"
                    className="hidden md:inline-block border border-gray-300 bg-white text-gray-700 text-sm font-medium px-5 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Go to Store
                </Link>
            </div>
            <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
                {/* ── LEFT: Order Summary ── */}
                <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-900">
                            Order Summary
                        </h2>
                        <span className="text-sm text-gray-500">
                            {count} {count === 1 ? "item" : "items"}
                        </span>
                    </div>

                    <div className="divide-y divide-gray-50">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 px-5 py-4">
                                <div className="relative w-14 h-14 rounded-md overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-1"
                                        sizes="56px"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                                        {item.name}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900 mt-0.5">
                                        ₹ {(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-xs text-red-500 hover:text-red-600 mt-0.5"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shrink-0">
                                    <button
                                        onClick={() => updateQty(item.id, item.quantity - 1)}
                                        className="p-1.5 hover:bg-gray-100 transition-colors text-gray-500"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                    <span className="px-3 text-sm font-semibold text-gray-800">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQty(item.id, item.quantity + 1)}
                                        className="p-1.5 hover:bg-gray-100 transition-colors text-gray-500"
                                    >
                                        <Plus size={13} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: Delivery + Price ── */}
                <div className="md:w-80 flex flex-col gap-4">
                    {/* Delivery Address */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
                        <h2 className="text-base font-semibold text-gray-900 mb-3">
                            Delivery Address
                        </h2>

                        <div className="space-y-3">
                            {/* Full name */}
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={INPUT_CLS}
                            />

                            {/* Phone with inline country selector */}
                            <div>
                                <div className="flex items-stretch border border-gray-200 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all">

                                    {/* Flag trigger — real flag img + invisible select overlay */}
                                    <div className="relative shrink-0 border-r border-gray-200 bg-gray-50">
                                        {/* Visible: flag image + chevron */}
                                        <div className="pointer-events-none flex items-center gap-1.5 px-2.5 py-2">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={`https://flagcdn.com/w20/${country.code}.png`}
                                                alt={country.name}
                                                width={20}
                                                height={14}
                                                className="rounded-sm object-cover"
                                                style={{ minWidth: 20, height: 14 }}
                                            />
                                            <ChevronDown size={13} strokeWidth={2.5} className="text-gray-500" />
                                        </div>
                                        {/* Invisible select covering the whole div */}
                                        <select
                                            value={country.name}
                                            onChange={(e) => {
                                                const found = COUNTRIES.find((c) => c.name === e.target.value);
                                                if (found) { setCountry(found); setPhone(""); }
                                            }}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                            title="Select country"
                                        >
                                            {COUNTRIES.map((c) => (
                                                <option key={c.name} value={c.name}>
                                                    {c.name} ({c.dial})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Fixed dial code + phone input */}
                                    <div className="flex items-center flex-1">
                                        <span className="pl-3 pr-1 text-sm font-medium text-gray-700 select-none whitespace-nowrap">
                                            {country.dial}
                                        </span>
                                        <input
                                            type="tel"
                                            placeholder=""
                                            value={phone}
                                            onChange={handlePhone}
                                            maxLength={20}
                                            className="flex-1 pl-1 pr-3 py-2 text-sm text-gray-800 focus:outline-none bg-white"
                                        />
                                    </div>

                                </div>
                                {phoneDigits.length > 0 && phoneDigits.length < 7 && (
                                    <p className="text-xs text-red-500 mt-1 ml-1">Enter a valid phone number</p>
                                )}
                            </div>

                            {/* Address */}
                            <textarea
                                placeholder="Full address (Street, City, PIN Code)"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows={3}
                                className={`${INPUT_CLS} resize-none`}
                            />
                        </div>
                    </div>

                    {/* Price Details */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
                        <h2 className="text-base font-semibold text-gray-900 mb-3">
                            Price Details
                        </h2>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Sub Total</span>
                                <span className="text-gray-900 font-medium">
                                    ₹ {subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discounts</span>
                                <span className="text-gray-900 font-medium">- ₹ 0.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Other Charges ∨</span>
                                <span className="text-gray-900 font-medium">₹ 0.00</span>
                            </div>
                            <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-semibold text-gray-900">
                                <span>To Pay</span>
                                <span>₹ {subtotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {remaining > 0 && (
                            <div className="mt-3 bg-teal-50 border border-teal-200 rounded-md px-3 py-2 text-xs text-teal-700 text-center">
                                Add Items worth ₹{remaining.toFixed(2)} more to place an order
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
