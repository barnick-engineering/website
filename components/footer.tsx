"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { getPhoneUrl } from "@/lib/order";

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = [
    { title: t("nav.portfolio"), href: "/#products" },
    { title: t("nav.faq"), href: "/#faq" },
    { title: t("nav.contact"), href: "/#contact" },
  ];

  const socialLinks = [
    { href: facebookInsights.pageUrl, icon: Facebook, label: "Facebook" },
    {
      href: "https://www.linkedin.com/company/barnick-pracharani",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/barnick_pracharani/",
      icon: Instagram,
      label: "Instagram",
    },
  ];

  return (
    <footer className="mt-12 bg-black text-white">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex rounded-lg bg-white p-2">
              <Image
                src="/barnick.png"
                alt="Barnick Pracharani"
                width={64}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h6 className="font-semibold text-sm uppercase tracking-wider text-white/60">
              {t("footer.links")}
            </h6>
            <ul className="mt-4 space-y-2">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="font-semibold text-sm uppercase tracking-wider text-white/60">
              {t("footer.address")}
            </h6>
            <p className="mt-4 text-sm text-white/80 leading-relaxed">
              {t("footer.addressValue")}
            </p>
            <a
              href={getPhoneUrl()}
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              {facebookInsights.phone}
            </a>
          </div>

          <div>
            <h6 className="font-semibold text-sm uppercase tracking-wider text-white/60">
              {t("footer.social")}
            </h6>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/60">
          <span>
            &copy; {new Date().getFullYear()} {t("footer.copyright")}.{" "}
            {t("footer.rights")}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
