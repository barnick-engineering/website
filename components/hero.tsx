import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import LogoCloud from "./logo-cloud";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center py-20 px-6">
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <Badge className="bg-primary rounded-full py-1 border-none">
            ১৯৮৯ এর অ্যানালগ যুগ থেকে AI যুগে 🚀
          </Badge>
          <h1 className="mt-6 max-w-[20ch] text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
            প্রিন্টিং / প্যাকেজিং এখন সহজ, দ্রুত ও বিশ্বস্ত
          </h1>
          <p className="mt-6 max-w-[60ch] xs:text-lg">
            Idea -&gt; Design -&gt; Print
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full text-base"
              asChild={true}
            >
              <a href="#contact">
                Get Started <ArrowUpRight className="!h-5 !w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full text-base shadow-none"
              asChild={true}
            >
              <a href="https://www.youtube.com/@barnickpracharani">
                <CirclePlay className="!h-5 !w-5" /> Watch Demo
              </a>
            </Button>
          </div>
        </div>
      </div>
      <LogoCloud className="mt-24 max-w-3xl mx-auto" />
    </div>
  );
};

export default Hero;
