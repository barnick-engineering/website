"use client";

import {
  BadgeDollarSign,
  Route,
  ShieldCheck,
  Truck,
  Undo2,
  UserRoundCheck,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const FAQ = () => {
  const { t } = useLanguage();
  
  const faq = [
    {
      icon: Undo2,
      question: t("faq.1.q"),
      answer: t("faq.1.a"),
    },
    {
      icon: Route,
      question: t("faq.2.q"),
      answer: t("faq.2.a"),
    },
    {
      icon: Truck,
      question: t("faq.3.q"),
      answer: t("faq.3.a"),
    },
    {
      icon: BadgeDollarSign,
      question: t("faq.4.q"),
      answer: t("faq.4.a"),
    },
    {
      icon: ShieldCheck,
      question: t("faq.5.q"),
      answer: t("faq.5.a"),
    },
    {
      icon: UserRoundCheck,
      question: t("faq.6.q"),
      answer: t("faq.6.a"),
    },
  ];

  return (
    <div
      id="faq"
      className="flex items-center justify-center px-6 py-8 xs:py-12"
    >
      <div className="max-w-screen-lg">
        <h2 className="text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight text-center">
          {t("faq.title")}
        </h2>

        <div className="mt-12 grid md:grid-cols-2 bg-background rounded-xl overflow-hidden outline outline-[1px] outline-border outline-offset-[-1px]">
          {faq.map(({ question, answer, icon: Icon }) => (
            <div key={question} className="border p-6 -mt-px -ml-px">
              <div className="h-8 w-8 xs:h-10 xs:w-10 flex items-center justify-center rounded-full bg-accent">
                <Icon className="h-4 w-4 xs:h-6 xs:w-6" />
              </div>
              <div className="mt-3 mb-2 flex items-start gap-2 text-lg xs:text-[1.35rem] font-semibold tracking-tight">
                <span>{question}</span>
              </div>
              <p className="text-sm xs:text-base">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
