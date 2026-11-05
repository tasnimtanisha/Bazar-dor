"use client";

import GithubButton from "@/components/Buttons/Github/page";
import GoogleButton from "@/components/Buttons/Google/page";
import { signIn } from "@/lib/auth-client";
import { FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";
import Link from "next/link";
// import SignUpPage from "../Sign-up/page";

export default function SignInPage() {
  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);
    const{data: resData, error } = await signIn.email({
      email:data.email as string,
      password:data.password as string,
      callbackURL: '/'
    });

    console.log("SignIn response:" , resData, error);
    if (error) {
      toast("Login failed");
    } else {
      toast("Login successful");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 font-hind">
      {/* মূল ফর্ম কন্টেইনার */}
      <Form className="flex w-full max-w-md flex-col items-center gap-4" onSubmit={onSubmit}>
        
        <p className="font-bold text-2xl pt-2 text-gray-900">সাইন ইন</p>
        <p className="text-gray-600 text-sm mb-2 text-center">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন</p>

        {/* মূল কার্ড বক্স */}
        <div className="border border-gray-200 shadow-sm bg-white rounded-2xl w-full p-6 sm:p-8 flex flex-col gap-4">

          {/* ইমেইল ফিল্ড */}
          <TextField
            name="email"
            type="email"
            className="w-full flex flex-col gap-1"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল ঠিকানা দিন";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">ইমেইল</Label>
            <Input placeholder="you@example.com" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
            <FieldError />
          </TextField>

          {/* পাসওয়ার্ড ফিল্ড */}
          <TextField
            minLength={8}
            name="password"
            type="password"
            className="w-full flex flex-col gap-1"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700 pt-2">পাসওয়ার্ড</Label>
            <Input placeholder="কমপক্ষে ৮ অক্ষর" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
            <FieldError />
          </TextField>

          {/* সাইন ইন বাটন */}
          <div className="pt-2">
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 px-4 w-full rounded-lg transition duration-200 shadow-md shadow-emerald-200">
              সাইন ইন
            </button>
          </div>

          {/* অথবা ডিভাইডার */}
          <div className="flex items-center my-2">
            <div className="grow border-t border-gray-200"></div>
            <span className="px-3 text-gray-400 text-sm">অথবা</span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          {/* সোশ্যাল বাটন দুটি (Google & GitHub) */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
            <GoogleButton />
            <GithubButton />
          </div>

          {/* সাইন আপ লিংক */}
          <div className="text-center mt-2 text-sm text-gray-600">
            <p>
              অ্যাকাউন্ট নেই?{" "}
              <Link href="/Sign-up" className="text-green-600 font-semibold hover:underline">
                সাইন আপ করুন
              </Link>
            </p>
          </div>

        </div>

        {/* হোম পেজে ফিরে যান */}
        <div className="mt-2 text-sm text-gray-600 hover:text-gray-900">
          <Link href="/">← হোম পেজে ফিরে যান</Link>
        </div>

      </Form>
    </div>
  );
}


