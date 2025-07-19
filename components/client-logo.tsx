import Image from "next/image";
import Link from "next/link";

// get parameter from props
type ClientLogoProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const ClientLogo = ({
  src,
  alt,
  width = 64,
  height = 64,
}: ClientLogoProps) => (
  <Link
    href="/"
    className="flex items-center justify-center p-1 sm:p-1.5 md:p-2"
  >
    <Image
      src={src.toString()}
      alt={alt.toString()}
      width={width}
      height={height}
    />
  </Link>
);
