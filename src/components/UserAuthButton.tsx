"use client";

import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';

const UserAuthButton = () => {
    const { data: session, isPending } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // ড্রপডাউনের বাইরে ক্লিক করলে মেনু বন্ধ হয়ে যাবে
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // সাইন আউট হ্যান্ডলার
    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/Sign-in");
                    router.refresh();
                },
            },
        });
    };

    if (isPending) {
        return <div className='text-sm text-gray-400 font-hind'>লোড হচ্ছে...</div>;
    }

    if (session && session.user) {
        return (
            <div className="relative" ref={dropdownRef}>
                {/* প্রোফাইল ট্রিগার বাটন */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 focus:outline-none py-1.5 px-2 rounded-xl hover:bg-gray-100 transition duration-200"
                >
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 relative bg-gray-200">
                        {session.user.image ? (
                            <Image 
                                src={session.user.image} 
                                alt={session.user.name || "User"} 
                                fill 
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">
                                {session.user.name?.charAt(0) || "U"}
                            </div>
                        )}
                    </div>
                    <span className="font-hind font-medium text-gray-800 text-sm md:text-base">
                        {session.user.name}
                    </span>
                    <FiChevronDown className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* ড্রপডাউন কার্ড মেনু */}
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 z-50 font-hind">
                        {/* ইউজার ইনফো সেকশন */}
                        <div className="px-4 pb-3 border-b border-gray-100">
                            <p className="font-bold text-gray-900 text-base truncate">
                                {session.user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {session.user.email}
                            </p>
                        </div>

                        {/* মেনু অপশনস */}
                        <div className="pt-2 flex flex-col">
                            <Link 
                                href="/profile" 
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                            >
                                <FiUser className="text-lg text-gray-600" />
                                <span>আমার প্রোফাইল</span>
                            </Link>

                            <button 
                                onClick={() => {
                                    setIsOpen(false);
                                    handleSignOut();
                                }}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition w-full text-left"
                            >
                                <FiLogOut className="text-lg text-red-500" />
                                <span>সাইন আউট</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Link href="/Sign-in">
                <button className='btn btn-ghost font-hind'>সাইন ইন</button>
            </Link>
            <Link href="/Sign-up">
                <button className='btn font-hind bg-green-700 text-white'>সাইন ইন</button>
            </Link>
        </div>
    );
};

export default UserAuthButton;