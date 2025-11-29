import {
  Blocks,
  Bot,
  ChartPie,
  Film,
  MessageCircle,
  Settings2,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: Settings2,
    title: "কর্পোরেট এসেনশিয়াল",
    description:
      "বিজসেন কার্ড, লেটারহেড, ইনভেলপ, প্রেজেন্টেশন ফোল্ডার, নোটপ্যাড ইত্যাদি",
  },
  {
    icon: Blocks,
    title: "মার্কেটিং এসেনশিয়াল",
    description:
      "ফ্লেয়ার, ব্রশিউর, পোস্টার, পোস্টকার্ড, ব্যানার, ডিজিটাল ব্যানার, ক্যাটালগ ইত্যাদি",
  },
  {
    icon: Bot,
    title: "প্রমোশনাল আইটেম",
    description: "টি-শার্ট, ব্যাগ, মগ, কি চেইন, কাস্টম কলম ইত্যাদি",
  },
  {
    icon: Film,
    title: "ল্যাভেল এবং স্টিকার",
    description:
      "প্রোডাক্ট ল্যাভেল, এড্রেস ল্যাভেল, প্রেজেন্টেশন ল্যাভেল, কাস্টোম স্টিকার, উইন্ডো ক্লিং ইত্যাদি",
  },
  {
    icon: ChartPie,
    title: "লার্জ ফরমেট প্রিন্টিং",
    description:
      "সাইনেজ, ভাইনেল ব্যানার, উইন্ডো ডিক্যাল, ভ্যাহিক্যাল র‍্যাপ ইত্যাদি",
  },
  {
    icon: MessageCircle,
    title: "ষ্টেশনারী",
    description: "গ্রিটিং কার্ড, ইনভাইটেশন, ক্যালেন্ডার, প্ল্যানারস ইত্যাদি",
  },
  {
    icon: Bot,
    title: "ইভেন্ট ম্যাটেরিয়ালস",
    description:
      "ইভেন্ট টিকেটস, ব্যাজ, রিস্টব্যান্ড, প্রোগ্রাম ম্যাটেরিয়ালস, টেবিল ট্যান্ট ইত্যাদি",
  },
  {
    icon: Blocks,
    title: "সিকিউরিটি প্রিন্টিং",
    description:
      "সার্টিফিকেট, চেক, পাসপোর্ট, ইভেন্ট টিকেট (with security features) ইত্যাদি",
  },
];

const Features = () => {
  return (
    <div id="features" className="w-full py-8 xs:py-12 px-6">
      <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center">
        সেবা সমূহ
      </h2>
      <div className="w-full max-w-screen-lg mx-auto mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col bg-background border rounded-xl py-6 px-5"
          >
            <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
              <feature.icon className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">{feature.title}</span>
            <p className="mt-1 text-foreground/80 text-[15px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
