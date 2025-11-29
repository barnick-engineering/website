import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "আমাদের সম্পর্কে",
    href: "#about",
  },
  {
    title: "সেবা সমূহ",
    href: "#features",
  },
  {
    title: "কাজের নমুনা",
    href: "#products",
  },
  {
    title: "সাধারণ জিজ্ঞাসা (FAQ)",
    href: "#faq",
  },
  {
    title: "যোগাযোগ",
    href: "#contact",
  },
];

const Footer = () => {
  return (
    <footer className="dark:border-t mt-40 dark bg-background text-foreground">
      <div className="max-w-screen-xl mx-auto">
        <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
          <div>
            {/* Logo */}
            <Image
              src="/barnick.png"
              alt="Barnick Pracharani"
              width={80}
              height={80}
              className="object-contain"
            />

            <ul className="mt-6 flex items-center gap-4 flex-wrap">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div className="max-w-xs w-full">
            <h6 className="font-semibold">ঠিকানা</h6>
            <p className="mt-6 text-muted-foreground">
              2/ka pc culture housing dhaka
            </p>
          </div>
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground text-center sm:text-start">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/">বার্ণিক প্রচারাণী</Link>. সর্বস্বত্ব সংরক্ষিত।
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
