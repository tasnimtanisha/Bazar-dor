import React from 'react';
import Image from 'next/image';

const Banner = () => {
    return (
        <div className='flex justify-between border-gray-300 border-2 rounded-xl gap-4 mx-20 my-5'>
        <div className='py-5 px-5 space-y-4'>
             <h2 className='font-hind bg-green-100 text-green-600 rounded-2xl px-3 w-fit px-2 '>মঙ্গলবার, ৬ অক্টোবর, ২০২৬</h2>
             <p className='font-hind text-3xl font-bold'>আজকের বাজারের দাম এক নজরে</p>
             <p className='font-hind'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম বাজার ভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-<br/>সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
            <button className='font-hind bg-green-700 shadow-md shadow-green-800 rounded text-white px-2 py-2 '>সব পণ্য দেখুন</button>
        </div>
        <div>
            <Image src="/bazar-hero.png" alt="Bazar Image" width={300} height={300} />
        </div>
        </div>
    );
};

export default Banner;