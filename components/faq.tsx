import {
  BadgeDollarSign,
  Route,
  ShieldCheck,
  Truck,
  Undo2,
  UserRoundCheck,
} from "lucide-react";

const faq = [
  {
    icon: Undo2,
    question: "Barnick কী ধরনের প্রিন্টিং সার্ভিস দেয়?",
    answer:
      "আমরা ভিজিটিং কার্ড, স্টিকার, লেবেল, ফ্লায়ার, ব্যানার, ব্রোশিওর, কাস্টম প্যাকেজিং বক্সসহ সব ধরনের প্রিন্টিং ও ব্র্যান্ডিং সার্ভিস দিই।",
  },
  {
    icon: Route,
    question: "প্রিন্ট করতে কত সময় লাগে?",
    answer:
      "সাধারণত ১–৩ কর্মদিবস লাগে। জরুরি অর্ডারের জন্য এক্সপ্রেস সার্ভিসও আছে।",
  },
  {
    icon: Truck,
    question: "কীভাবে অর্ডার করতে হবে?",
    answer:
      "ডিজাইন/ডিটেইল ফেসবুক মেসেঞ্জার, +8801712347097 নাম্বারে অর্ডার কনফার্ম করতে পারবেন। ৫০% অগ্রিমের পর কাজ শুরু হয়।",
  },
  {
    icon: BadgeDollarSign,
    question: "ডিজাইন কি আপনারা করে দেন?",
    answer:
      "হ্যাঁ, আমাদের ডিজাইনাররা আপনার ব্র্যান্ড অনুযায়ী কাস্টম ডিজাইন তৈরি করে দেয়। কিন্তু সেই ক্ষেত্রে চার্চ আলাদা।",
  },
  {
    icon: ShieldCheck,
    question: "দাম কীভাবে নির্ধারিত হয়?",
    answer:
      "ডিজাইন, ম্যাটেরিয়াল, সাইজ, পরিমাণ এবং ফিনিশিং অনুযায়ী প্রাইস নির্ধারিত হয়।",
  },
  {
    icon: UserRoundCheck,
    question: "ডেলিভারি কিভাবে পাবো?",
    answer: "হ্যাঁ, ঢাকা ও সারা বাংলাদেশে কুরিয়ার ডেলিভারি সুবিধা রয়েছে।",
  },
];

const FAQ = () => {
  return (
    <div
      id="faq"
      className="flex items-center justify-center px-6 py-8 xs:py-12"
    >
      <div className="max-w-screen-lg">
        <h2 className="text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight text-center">
          সাধারণ জিজ্ঞাসা (FAQ)
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
