"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Star } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  const letUsHelp = [
    { title: t("footer.shipping"), href: "/#contact" },
    { title: t("nav.contact"), href: "/#contact" },
    { title: t("footer.designHelp"), href: "/design-services" },
    { title: t("nav.faq"), href: "/#faq" },
  ];

  const ourCompany = [
    { title: t("nav.about"), href: "/#about" },
    { title: t("nav.portfolio"), href: "/#products" },
  ];

  return (
    <footer className="dark:border-t mt-12 dark bg-background text-foreground">
      <div className="max-w-screen-xl mx-auto">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 xl:px-0">
          <div className="space-y-4">
            <p className="text-lg font-semibold">{t("footer.tagline")}</p>
            <p className="text-sm text-muted-foreground">
              <Link href="/#contact" className="underline hover:text-foreground">
                {t("footer.hereToHelp")}
              </Link>
            </p>
            <Image
              src="/barnick.png"
              alt="Barnick Pracharani"
              width={64}
              height={64}
              className="object-contain mt-4"
            />
          </div>

          <div>
            <h6 className="font-semibold mb-4">{t("footer.letUsHelp")}</h6>
            <ul className="space-y-2">
              {letUsHelp.map(({ title, href }) => (
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

          <div>
            <h6 className="font-semibold mb-4">{t("footer.ourCompany")}</h6>
            <ul className="space-y-2">
              {ourCompany.map(({ title, href }) => (
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

          <div>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-amber-400 text-amber-400"
                  aria-hidden
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {t("footer.trustpilotText")}
            </p>
          </div>
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 px-6 xl:px-0">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-start">
            <a
              href="tel:+8801712347097"
              className="text-sm font-medium hover:underline"
            >
              +8801712347097
            </a>
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/">{t("footer.copyright")}</Link>. {t("footer.rights")}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>bKash</span>
            <span>Nagad</span>
            <span>Bank transfer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
