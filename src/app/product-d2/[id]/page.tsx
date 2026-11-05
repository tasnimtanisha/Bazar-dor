import { CommodityItem } from '@/components/Type';
// import Image from 'next/image';
import React from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`);
    const jsonResponse = await res.json();
    const data: CommodityItem = jsonResponse || {};

    const englishToBanglaNumber = (number: string | number): string => {
        const engToBng: Record<string, string> = {
            '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
            '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
            '.': '.'
        };
        return String(number).split('').map(char => engToBng[char] || char).join('');
    };

    // দামের পার্থক্য হিসাব করা (আজকের দাম - গতকালের দাম)
    const priceDiff = data.today - data.yesterday;
    const absDiff = Math.abs(priceDiff);

    // টেবিলের ডেটা থেকে সর্বনিম্ন, সর্বোচ্চ এবং গড় দাম হিসাব করা
    const lowestPrice = data.markets && data.markets.length > 0 ? Math.min(...data.markets.map(m => m.min)) : 0;
    const highestPrice = data.markets && data.markets.length > 0 ? Math.max(...data.markets.map(m => m.max)) : 0;
    
    const totalAverage = data.markets && data.markets.length > 0 
        ? data.markets.reduce((sum, m) => sum + ((m.min + m.max) / 2), 0) 
        : 0;
    const avgPrice = data.markets && data.markets.length > 0 ? Math.round(totalAverage / data.markets.length) : 0;

    return (
        <div className="font-hind p-4">
            <div>
                <p className="text-sm text-gray-500 p-4">হোম &gt; {data.categoryNameBn} &gt; {data.nameBn}</p>
            </div>

            <div className='flex justify-between border border-gray-300 rounded-2xl p-5 '>
                <div className='flex'>
                <div className="my-4 pt-5">
                    <span className="text-4xl p-4 border border-gray-300 rounded-2xl bg-gray-100 inline-block ">
                        {data.image}
                    </span>
                </div>
                <div className="space-y-2 pl-5 pt-5">
                    <p className="font-bold text-3xl">{data.nameBn}</p>
                    <p>প্রতি কেজি . {data.nameBn}</p>

                    {/* দাম বাড়লো নাকি কমলো তার ডায়নামিক হিসাব */}
                    <p className="text-lg">
                        গতকালের তুলনায় আজ দাম{' '}
                        {priceDiff === 0 ? (
                            <span className="text-gray-600">পরিবর্তন হয়নি</span>
                        ) : (
                            <span>
                                {priceDiff > 0 ? <span className="font-bold">বেড়েছে</span>: <span className="font-bold">কমেছে</span>} .  {englishToBanglaNumber(absDiff)} টাকা
                            </span>
                        )}
                    </p>
                </div>
                </div>
                <div className=" border border-gray-300 rounded-2xl w-fit p-5 mt-2 bg-gray-100 ">
                    <p>আজকের দাম</p>
                    <p className='font-bold text-4xl'>{englishToBanglaNumber(data.today)}</p>
                    <p> টাকা/কেজি</p>
                    <p className={priceDiff > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold border border-gray-400 w-fit rounded-2xl pr-2 pl-2 bg-gray-100'}>{' '}{priceDiff > 0 ? '▲' : '▼'} {englishToBanglaNumber(data.change?.pct)}%</p>
                </div>
            </div>

            <div>
                <p className='font-bold p-4 text-xl'>দামের সারসংক্ষেপ</p>
            </div>
            <div className='grid grid-cols-3 gap-5 p-5'>
                <div className='border border-gray-300 rounded-2xl p-5'>
                    <p>সর্বনিম্ন দাম</p>
                    <p className='font-bold text-3xl text-green-700'>{englishToBanglaNumber(lowestPrice)} টাকা</p>
                    <p>সবচেয়ে কম দামের বাজার</p>
                </div>
                <div className='border border-gray-300 rounded-2xl p-5'>
                    <p>সর্বোচ্চ দাম</p>
                    <p className='font-bold text-3xl text-red-600'>{englishToBanglaNumber(highestPrice)} টাকা</p>
                    <p>সবচেয়ে বেশি দামের বাজার</p>
                </div>
                <div className='border border-gray-300 rounded-2xl p-5'>
                    <p>গড় দাম</p>
                    <p className='font-bold text-3xl text-green-700'>{englishToBanglaNumber(avgPrice)} টাকা</p>
                    <p>প্রতি কেজি এর হিসেবে </p>
                </div>
            </div>
            <div>
                <p className='font-bold p-4 text-xl'>বাজারভিত্তিক আজকের দাম</p>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='grid grid-cols-5 border-b border-gray-300'>
                            <td className='p-3 font-semibold'>বাজার</td>
                            <td className='p-3 font-semibold'>বিভাগ</td>
                            <td className='p-3 font-semibold'>সর্বনিম্ন</td>
                            <td className='p-3 font-semibold'>সর্বাধিক</td>
                            <td className='p-3 font-semibold'>গড়</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.markets && [...data.markets]
                            .sort((a, b) => a.min - b.min) // সর্বনিম্ন দামের ভিত্তিতে ছোট থেকে বড় সাজানো
                            .map((market, index) =>
                                <tr key={index} className={`grid grid-cols-5 ${index !== data.markets.length - 1 ? 'border-b border-gray-300' : ''} ${index % 2 !== 0 ? "bg-gray-300" : ""}`}>
                                    <td className='p-3'>{market.market}</td>
                                    <td className='p-3'>{market.division}</td>
                                    <td className='p-3'>{englishToBanglaNumber(market.min)}</td>
                                    <td className='p-3'>{englishToBanglaNumber(market.max)}</td>
                                    <td className='p-3'>{englishToBanglaNumber(Math.round((market.min + market.max) / 2))}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default page;