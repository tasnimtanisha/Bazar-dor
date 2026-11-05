"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoTriangleSharp } from 'react-icons/io5';
import { CommodityItem } from '@/components/Type';
import { useParams } from 'next/navigation';

const ProductDetailCategoryPage = () => {
    const params = useParams();
    const id = params?.id;

    const [data, setData] = useState<CommodityItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [sortType, setSortType] = useState<string>("default");

    // API theke data fetch kora (Client side e useEffect diye)
    useEffect(() => {
        if (!id) return;

        fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${id}`)
            .then((res) => res.json())
            .then((jsonResponse) => {
                setData(jsonResponse || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    // English number ke Bangla number e rupantor korar function
    const englishToBanglaNumber = (number: string | number): string => {
        const engToBng: Record<string, string> = {
            '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
            '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
            '.': '.'
        };
        return String(number).split('').map(char => engToBng[char] || char).join('');
    };

    // Sorting logic
    const sortedProducts = [...data].sort((a, b) => {
        if (sortType === "price-increase") {
            return Number(a.today) - Number(b.today);
        } else if (sortType === "price-decrease") {
            return Number(b.today) - Number(a.today);
        }
        return 0; // default
    });

    const totalCount = sortedProducts.length;

    if (loading) {
        return <div className="px-20 py-20 text-center font-hind text-xl">লোড হচ্ছে...</div>;
    }

    return (
        <div className='px-20 py-8 bg-gray-50 min-h-screen'>
            {/* Top Category Banner */}
            {sortedProducts.length > 0 && (
                <div className='bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm'>
                    <div className='flex items-center gap-4'>
                        <span className='text-3xl bg-gray-100 p-3 rounded-xl'>{sortedProducts[0].categoryIcon}</span>
                        <div>
                            <h1 className='font-hind font-bold text-2xl text-gray-800'>{sortedProducts[0].categoryNameBn}</h1>
                            <p className='font-hind text-gray-500 text-sm mt-1'>
                                {englishToBanglaNumber(totalCount)}টি পণ্যের আজকের দাম ও পরিবর্তন
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter / Sort Bar */}
            <div className='bg-white border border-gray-200 rounded-xl px-6 py-4 mb-6 flex justify-end items-center shadow-sm'>
                <div className='flex items-center gap-2'>
                    <span className='font-hind text-sm text-gray-500'>সাজান</span>
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className='border border-gray-300 rounded-lg px-3 py-1.5 font-hind text-sm bg-white outline-none cursor-pointer'
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="price-increase">মূল্য বৃদ্ধি (কম থেকে বেশি)</option>
                        <option value="price-decrease">মূল্য হ্রাস (বেশি থেকে কম)</option>
                    </select>
                </div>
            </div>

            <p className='font-hind text-gray-600 text-sm py-5'>
                মোট {englishToBanglaNumber(totalCount)}টি পণ্য দেখানো হচ্ছে
            </p>

            {/* Products Grid */}
            <div className='grid grid-cols-3 gap-4'>
                {sortedProducts.map((product) => {
                    const isUp = Number(product.change.pct) >= 0;
                    const iszero = Number(product.change.pct) === 0;

                    return (
                        <Link
                            key={product.id}
                            href={`/product-d1/${product.id}`}
                            className='border bg-white border-gray-200 rounded-2xl p-4 block transition hover:shadow-md'
                        >
                            <div className='mb-3 flex gap-4 items-center'>
                                <span className='text-2xl rounded-xl bg-gray-100 p-3'>{product.image}</span>
                                <div>
                                    <h3 className='font-hind font-semibold text-xl text-gray-800'>{product.nameBn}</h3>
                                    <p className='font-hind text-sm text-gray-500'>প্রতি কেজি</p>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <p className='font-hind text-xs text-gray-500 mb-1'>আজকের দাম</p>
                                <div className='flex justify-between items-end'>
                                    <p className='font-hind'>
                                        <span className='font-bold text-xl text-gray-900'>{englishToBanglaNumber(product.today)}</span> টাকা
                                    </p>
                                    <div className='flex items-center rounded-xl bg-gray-100 px-2 py-1'>
                                        {iszero ? "-" : <IoTriangleSharp className={`text-xs ${isUp ? "text-green-500" : "text-red-500 rotate-180"}`} />}
                                        <span className='font-hind text-xs ml-1'>
                                            {iszero ? englishToBanglaNumber(product.change.pct.toFixed(2)) : englishToBanglaNumber(product.change.pct)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductDetailCategoryPage;