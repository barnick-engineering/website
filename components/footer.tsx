"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { ColorBar } from "@/components/ui/color-bar";
import { useLanguage } from "@/contexts/language-context";
import { facebookInsights } from "@/data/insights";
import { toBengaliDigits } from "@/lib/formatBn";
import { getPhoneUrl } from "@/lib/order";
import { sectionLabelClass } from "@/lib/typography";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { t, language } = useLanguage();

  const footerLinks = [
    { title: t("nav.portfolio"), href: "/#products" },
    { title: t("nav.estimate"), href: "/#estimate" },
    { title: t("nav.design"), href: "/#design" },
    { title: t("nav.guide"), href: "/guide" },
    { title: t("nav.policies"), href: "/policies" },
    { title: t("nav.faq"), href: "/#faq" },
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

  const year = new Date().getFullYear();
  const yearLabel = language === "bn" ? toBengaliDigits(year) : String(year);

  const headingClass = cn(sectionLabelClass(language), "text-on-ink-muted");

  // pb-24 on mobile reserves room for the sticky contact bar, in ink rather than as a cream gap
  return (
    <footer data-surface="ink" className="bg-surface-ink text-on-ink pb-24 md:pb-0">
      <ColorBar />
      <div className="px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="max-w-[75rem] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-5">
              {/* Logo unaltered: same /barnick.png on a cream chip */}
              <Link href="/" aria-label={t("logo.name")} className="inline-flex bg-background p-2">
                <Image
                  src="/barnick.png"
                  alt={t("logo.name")}
                  width={56}
                  height={56}
                  className="h-14 w-14 object-contain"
                />
              </Link>
              <p className="mt-5 text-base text-on-ink-muted max-w-sm">{t("footer.tagline")}</p>
              <address className="mt-4 not-italic text-base text-on-ink max-w-sm">
                <span className="sr-only">{t("footer.address")}: </span>
                {t("footer.addressValue")}
              </address>
            </div>

            {/* Links */}
            <div className="lg:col-span-3">
              <p className={headingClass}>{t("footer.links")}</p>
              <ul className="mt-3">
                {footerLinks.map(({ title, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="min-h-11 inline-flex items-center text-base text-on-ink hover:text-primary transition-colors duration-150"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <p className={headingClass}>{t("nav.contact")}</p>
              <a
                href={getPhoneUrl()}
                className="mt-3 inline-flex min-h-11 items-center font-display text-display-m tabular-nums text-on-ink hover:text-primary transition-colors duration-150"
              >
                {facebookInsights.phone}
              </a>
              <div>
                <a
                  href={facebookInsights.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-on-ink underline underline-offset-4 decoration-primary hover:text-primary"
                >
                  {t("cta.messenger")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
              <div className="mt-5 flex gap-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="h-11 w-11 border border-on-ink/40 flex items-center justify-center text-on-ink hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors duration-150"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative sign-off wordmark (brand name is already in the logo alt) */}
          <p
            aria-hidden="true"
            className="mt-12 border-t border-on-ink/15 pt-8 font-display font-semibold leading-none text-on-ink/90 text-[clamp(2.75rem,8vw,6.5rem)] break-words"
          >
            {t("logo.name")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-on-ink-muted">
            <span>
              &copy; {yearLabel} {t("footer.copyright")}{t("footer.separator")} {t("footer.rights")}
            </span>
            <Link
              href="/policies"
              className="min-h-11 inline-flex items-center hover:text-on-ink underline-offset-4 hover:underline"
            >
              {t("nav.policies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
