import React from 'react';
import Link from 'next/link';
import { IoTriangleSharp } from 'react-icons/io5';
import { CommodityItem } from './Type';

const Cards = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    const jsonResponse = await res.json();
    const data: CommodityItem[] = jsonResponse || [];

    const englishToBanglaNumber = (number: string | number): string => {
        const engToBng: Record<string, string> = {
            '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
            '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
            '.': '.'
        };

        return String(number).split('').map(char => engToBng[char] || char).join('');
    }

    const updata: CommodityItem[] = jsonResponse.filter((product: CommodityItem) => product.change.dir === "up") || [];
    const dpdata: CommodityItem[] = jsonResponse.filter((product: CommodityItem) => product.change.dir === "down") || [];
    

    return (
        <div className='px-20'>
            {/* price up */}
            <p className='font-hind text-xl font-bold my-7'><span className='text-red-500'>▲</span> আজ দাম বেড়েছে</p>
            <div className='grid grid-cols-3 gap-4'>
                {updata.map((product) => {
                    const isUp = Number(product.change.pct) >= 0;
                    const iszero = Number(product.change.pct) == 0;
                    return (
                        <Link 
                            key={product.id} 
                            href={`/product-d2/${product.id}`} 
                            className='border bg-gray-50 border-gray-300 rounded-2xl gap-5 py-4 block transition hover:shadow-md'
                        >
                            <div className='px-4 mb-3 flex gap-4'>
                                <span className='text-2xl border-none rounded bg-gray-200 px-2 py-2'>{product.image}</span>
                                <div>
                                    <h3 className='font-hind font-semibold text-xl'>{product.nameBn}</h3>
                                    <p className='font-hind text-sm'>প্রতি কেজি</p>
                                </div>
                            </div>
                            <div className='px-4 flex justify-between items-end'>
                                <div>
                                    <p className='font-hind text-sm'>আজকের দাম</p>
                                    <p className='text-xs font-hind'><span className='font-bold text-lg'>{englishToBanglaNumber(product.today)}</span> টাকা</p>
                                </div>
                                <div className='flex items-center border-none rounded-xl bg-gray-100 w-fit px-2'>
                                    {iszero ? "-" : <IoTriangleSharp className={`text-xs ${isUp ? "text-green-500" : "text-red-500 rotate-180"}`} />}
                                    <span className='font-hind'>{iszero ? englishToBanglaNumber(product.change.pct.toFixed(2)) : englishToBanglaNumber(product.change.pct)}%</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* price down */}
            <p className='font-hind text-xl font-bold my-7'><span className='text-green-500'>▼ </span>আজ দাম কমেছে</p>
            <div className='grid grid-cols-3 gap-4'>
                {dpdata.map((product) => {
                    const isUp = Number(product.change.pct) >= 0;
                    const iszero = Number(product.change.pct) == 0;
                    return (
                        <Link 
                            key={product.id} 
                           href={`/product-d2/${product.id}`}  
                            className='border bg-gray-50 border-gray-300 rounded-2xl gap-5 py-4 block transition hover:shadow-md'
                        >
                            <div className='px-4 mb-3 flex gap-4'>
                                <span className='text-2xl border-none rounded bg-gray-200 px-2 py-2'>{product.image}</span>
                                <div>
                                    <h3 className='font-hind font-semibold text-xl'>{product.nameBn}</h3>
                                    <p className='font-hind text-sm'>প্রতি কেজি</p>
                                </div>
                            </div>
                            <div className='px-4 flex justify-between items-end'>
                                <div>
                                    <p className='font-hind text-sm'>আজকের দাম</p>
                                    <p className='text-xs font-hind'><span className='font-bold text-lg'>{englishToBanglaNumber(product.today)}</span> টাকা</p>
                                </div>
                                <div className='flex items-center border-none rounded-xl bg-gray-100 w-fit px-2'>
                                    {iszero ? "-" : <IoTriangleSharp className='text-xs text-red-500 rotate-180' />}
                                    <span className='font-hind'>{iszero ? englishToBanglaNumber(product.change.pct.toFixed(2)) : englishToBanglaNumber(product.change.pct)}%</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* All products */}
            <p className='font-hind font-bold my-7 text-xl'>সব পণ্য</p>
            <p className='font-hind text-xs my-5'>মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
            <div className='grid grid-cols-3 gap-4'>
                {data.map((product) => {
                    const isUp = Number(product.change.pct) >= 0;
                    const iszero = Number(product.change.pct) == 0;
                    return (
                        <Link 
                            key={product.id} 
                           href={`/product-d2/${product.id}`}  
                            className='border bg-gray-50 border-gray-300 rounded-2xl gap-5 py-4 block transition hover:shadow-md'
                        >
                            <div className='px-4 mb-3 flex gap-4'>
                                <span className='text-2xl border-none rounded bg-gray-200 px-2 py-2'>{product.image}</span>
                                <div>
                                    <h3 className='font-hind font-semibold text-xl'>{product.nameBn}</h3>
                                    <p className='font-hind text-sm'>প্রতি কেজি</p>
                                </div>
                            </div>
                            <div className='px-4 flex justify-between items-end'>
                                <div>
                                    <p className='font-hind text-sm'>আজকের দাম</p>
                                    <p className='text-xs font-hind'><span className='font-bold text-lg'>{englishToBanglaNumber(product.today)}</span> টাকা</p>
                                </div>
                                <div className='flex items-center border-none rounded-xl bg-gray-100 w-fit px-2'>
                                    {iszero ? "-" : <IoTriangleSharp className={`text-xs ${isUp ? "text-green-500" : "text-red-500 rotate-180"}`} />}
                                    <span className='font-hind'>{iszero ? englishToBanglaNumber(product.change.pct.toFixed(2)) : englishToBanglaNumber(product.change.pct)}%</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Cards;