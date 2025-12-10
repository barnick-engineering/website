"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const Footer = () => {
  const { t } = useLanguage();
  
  const footerLinks = [
    {
      title: t("nav.about"),
      href: "#about",
    },
    {
      title: t("nav.services"),
      href: "#features",
    },
    {
      title: t("nav.portfolio"),
      href: "#products",
    },
    {
      title: t("nav.faq"),
      href: "#faq",
    },
    {
      title: t("nav.contact"),
      href: "#contact",
    },
  ];

  return (
    <footer className="dark:border-t mt-12 dark bg-background text-foreground">
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
            <h6 className="font-semibold">{t("footer.address")}</h6>
            <p className="mt-6 text-muted-foreground">
              {t("footer.addressValue")}
            </p>
          </div>
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground text-center sm:text-start">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/">{t("footer.copyright")}</Link>. {t("footer.rights")}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
