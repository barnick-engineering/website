import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <Image
      src="/barnick.png"
      alt="barnick Logo"
      width={32}
      height={32}
      className="h-8 w-8"
    />
    <span className="text-lg font-semibold">বর্ণিক প্রচারণী</span>
  </Link>
);
