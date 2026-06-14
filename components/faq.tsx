"use client";

import { Route, Truck, Undo2, UserRoundCheck } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { DotPattern } from "@/components/ui/dot-pattern";

const FAQ = () => {
  const { t } = useLanguage();

  const faq = [
    { icon: Undo2, question: t("faq.1.q"), answer: t("faq.1.a") },
    { icon: Route, question: t("faq.2.q"), answer: t("faq.2.a") },
    { icon: Truck, question: t("faq.3.q"), answer: t("faq.3.a") },
    { icon: UserRoundCheck, question: t("faq.4.q"), answer: t("faq.4.a") },
  ];

  return (
    <div id="faq" className="relative flex items-center justify-center px-6 py-12 bg-background">
      <DotPattern />
      <div className="relative z-10 max-w-screen-lg w-full">
        <h2 className="text-3xl xs:text-4xl font-bold tracking-tight text-center">
          {t("faq.title")}
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {faq.map(({ question, answer, icon: Icon }) => (
            <div key={question} className="border rounded-2xl p-6 bg-background">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-muted">
                <Icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">{question}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
