import Link from "next/link";
import { NotFoundTracker } from "@/components/not-found-tracker";
import { facebookInsights } from "@/data/insights";

export default function NotFound() {
  return (
    <main
      data-track-source="not_found"
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <NotFoundTracker />
      <p className="text-sm font-medium text-primary">404</p>
      <h1 className="mt-2 text-2xl sm:text-3xl font-bold">পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-muted-foreground max-w-md">
        This page doesn&apos;t exist or has moved.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          হোমে ফিরুন / Home
        </Link>
        <a
          href={facebookInsights.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full border border-foreground/25 text-sm font-medium hover:bg-muted transition-colors"
        >
          মেসেঞ্জারে লিখুন
        </a>
      </div>
    </main>
  );
}
