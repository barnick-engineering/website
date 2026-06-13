import Image from "next/image";
import { cn } from "@/lib/utils";

type ClientLogoProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ClientLogo({ src, alt, className }: ClientLogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={64}
      className={cn("max-h-10 sm:max-h-12 w-auto object-contain", className)}
    />
  );
}
