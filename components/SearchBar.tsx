"use client";
import { Search } from "lucide-react";

type Props = {
    value: string;
    onChange: (val: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
    return (
        <div className="relative w-full">
            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search for an item"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
            />
        </div>
    );
}
