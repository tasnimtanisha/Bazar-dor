import Image from 'next/image';
import Link from 'next/link'; 
import React from 'react';
import Navlinks from './Navlinks';
import UserAuthButton from './UserAuthButton'; // নতুন কম্পোনেন্ট ইমপোর্ট করুন

const Header = () => {
    return (
        <div className='py-4 px-20 space-y-4'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <div className='bg-green-700 flex justify-center items-center px-4 py-2 rounded-xl'>
                        <Image src="/logo.png" alt='Logo' width={30} height={30} />
                    </div>
                    <div>
                        <h2 className='text-3xl font-hind font-bold'>বাজার দর</h2>
                        <p className='font-hind'>মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-end items-center'>
                    <UserAuthButton />
                </div>
            </div> 
            <Navlinks></Navlinks>
        </div>
    );
};

export default Header;