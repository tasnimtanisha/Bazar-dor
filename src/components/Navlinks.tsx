import Link from 'next/link';
import React from 'react';

interface Navs {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}
const Navlinks = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');
    const data: Navs[] = await res.json();
    
    return (
        <div className='space-x-4 text-lg border-t border-b border-gray-200'>
            {data.map((item, i) => <Link key={i} href={`/product-d1/${item.slug}`}>{item.icon}{item.nameBn}</Link>)}
        </div>
    );
};

export default Navlinks;