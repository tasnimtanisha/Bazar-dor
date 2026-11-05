import MarqueeText from "react-marquee-text"
// import "react-marquee-text/dist/index.css"
import React from 'react';
import { IoTriangleSharp } from "react-icons/io5";

export interface PriceChange {
    dir: 'up' | 'down' | 'same';
    pct: number;
}

export interface CommodityItem {
    id: number;
    nameBn: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: PriceChange;
}

const Marquee = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const jsonResponse = await res.json();
    const data: CommodityItem[] = jsonResponse || [];

    return (
        <div className="flex gap-6 w-full border-t border-b overflow-hidden border-gray-200 py-2">
            <MarqueeText direction="right">
                {data.map((product) => {
                    const isUp = product.change.dir === "up";

                    return (
                        <p key={product.id} className="flex items-center gap-1.5 whitespace-nowrap pr-5 border-r border-gray-200">
                            <span>{product.categoryIcon}</span>
                            <span className="font-medium">{product.nameBn}</span>
                            <span>{product.today}৳/{product.unit}</span>
                            <IoTriangleSharp className={`text-xs ${isUp ? "text-green-500" : "text-red-500 rotate-180"}`} />
                            <span className={`text-xs ${isUp ? "text-green-600" : "text-red-600"}`}>
                                {product.change.pct}%
                            </span>
                        </p>
                    );
                })}
            </MarqueeText>
        </div>
    );
};

export default Marquee;