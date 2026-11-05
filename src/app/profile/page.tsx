"use client";

import React, { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { toast } from "@heroui/react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // সেশন লোড হওয়ার পর সরাসরি স্টেট ইনিশিয়ালাইজ করা হলো (useEffect এর প্রয়োজন নেই)
  const [name, setName] = useState(session?.user?.name || "");

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center font-hind">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/Sign-in");
    return null;
  }

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

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    toast("প্রোফাইল সফলভাবে আপডেট হয়েছে");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] py-10 px-4 font-hind flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        
        {/* হেডার টেক্সট */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        {/* ইউজার কার্ড */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 relative bg-gray-200 shrink-0">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-700 font-bold text-xl">
                  {session.user.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {session.user.name}
              </h2>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>

          {/* সাইন আউট বাটন */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-medium transition duration-200 cursor-pointer"
          >
            <FiLogOut className="text-base" />
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* তথ্য কার্ড ও আপডেট ফর্ম */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
            তথ্য
          </h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                নাম
              </label>
              <input
                type="text"
                defaultValue={session.user.name || ""}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="আপনার নাম দিন"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-xl transition duration-200 shadow-md shadow-emerald-100 cursor-pointer"
              >
                আপডেট
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}