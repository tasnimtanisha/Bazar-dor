"use client";

import GithubButton from "@/components/Buttons/Github/page";
import GoogleButton from "@/components/Buttons/Google/page";
import { signUp } from "@/lib/auth-client";
import { Form, Input, Label, TextField, FieldError } from "@heroui/react";
import Link from "next/link"; 
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const Router = useRouter();
  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    

    // পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে কিনা চেক করা
    if (data.password !== data.confirmPassword) {
      alert("পাসওয়ার্ড দুটি মিল না");
      return;
    }

    try {
      const { data: resdata, error } = await signUp.email({
        email: data.email as string,
        password: data.password as string,
        name: data.name as string,
        callbackURL: "/", 
      });

      console.log("Signup response:", resdata, error);

      if(resdata?.user?.name && resdata?.user?.email) {
        alert("সাইন আপ সফল! অনুগ্রহ করে আপনার ইমেইল যাচাই করুন।");
        Router.push("/Sign-in");
      }

      if (error) {
        console.error("Signup error:", error);
        return;
      }

      console.log("Signup success:", resdata);
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 font-hind">
      {/* মূল ফর্ম কন্টেইনার */}
      <Form className="flex w-full max-w-md flex-col items-center gap-4" onSubmit={onSubmit}>
        
        <p className="font-bold text-2xl pt-2">অ্যাকাউন্ট তৈরি করুন</p>
        <p className="text-gray-600 text-sm mb-2">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন</p>

        {/* কার্ড বক্স */}
        <div className="border border-gray-200 shadow-sm bg-white rounded-2xl w-full p-6 sm:p-8 flex flex-col gap-4">

          {/* নাম ফিল্ড */}
          <TextField name="name" type="text" className="w-full flex flex-col gap-1">
            <Label className="text-sm font-medium text-gray-700">নাম</Label>
            <Input placeholder="যেমন: রহিম উদ্দিন" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
            <FieldError />
          </TextField>

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
              if (!/[A-Z]/.test(value)) {
                return "কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে";
              }
              if (!/[0-9]/.test(value)) {
                return "কমপক্ষে একটি সংখ্যা থাকতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">পাসওয়ার্ড</Label>
            <Input placeholder="কমপক্ষে ৮ অক্ষর" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
            <FieldError />
          </TextField>

          {/* পাসওয়ার্ড নিশ্চিত করুন ফিল্ড */}
          <TextField
            minLength={8}
            name="confirmPassword"
            type="password"
            className="w-full flex flex-col gap-1"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input placeholder="আবার লিখুন" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
            <FieldError />
          </TextField>

          {/* সাবমিট বাটন */}
          <button type="submit" className="bg-green-700 hover:bg-green-800 text-white shadow-md shadow-emerald-200 font-medium py-2.5 px-4 w-full rounded-lg transition duration-200 mt-2">
            অ্যাকাউন্ট তৈরি করুন
          </button>

          {/* অথবা ডিভাইডার */}
          <div className="flex items-center my-2">
            <div className="grow border-t border-gray-200"></div>
            <span className="px-3 text-gray-400 text-sm">অথবা</span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          {/* সোশ্যাল লগইন বাটন দুটি */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
            <GoogleButton />
            <GithubButton />
          </div>

          {/* সাইন ইন লিংক */}
          <div className="text-center mt-2 text-sm text-gray-600">
            <p>
              অ্যাকাউন্ট আছে?{" "}
              <Link href="/Sign-in" className="text-green-600 font-semibold hover:underline">
                সাইন ইন করুন
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