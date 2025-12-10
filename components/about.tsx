"use client";

import React from "react";
import { useLanguage } from "@/contexts/language-context";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div id="about" className="w-full py-8 xs:py-12 px-6">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-center mb-8 sm:mb-12">
          {t("about.title")}
        </h2>
        <div className="bg-accent rounded-xl p-6 sm:p-8 md:p-10">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-foreground/90 text-center whitespace-pre-line">
            {t("about.content")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

