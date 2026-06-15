"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { getMessengerUrlWithText } from "@/lib/order";
import type { PortfolioItem } from "@/lib/portfolioData";

const IMAGE_WIDTH = 1080;
const IMAGE_HEIGHT = 1350;

interface Props {
  item: PortfolioItem;
  onClick: () => void;
  priority?: boolean;
}

export default function PortfolioCard({ item, onClick, priority }: Props) {
  const messengerUrl = getMessengerUrlWithText(item.messengerText);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="relative group aspect-[4/5] w-full overflow-hidden cursor-pointer bg-muted"
      onClick={onClick}
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        className="h-full w-full object-contain object-center transition-opacity duration-300 group-hover:opacity-95"
        sizes="(max-width: 640px) 50vw, 33vw"
        priority={priority}
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 hidden sm:flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        <p className="text-white font-medium text-base leading-snug mb-1">{item.productName}</p>
        <p className="text-white/70 text-xs mb-3">{item.specs}</p>
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 bg-background text-foreground text-xs font-medium px-3 py-1.5 w-fit hover:bg-background/90 transition-colors pointer-events-auto"
        >
          এই রকম অর্ডার করুন →
        </a>
      </div>

      <div className="sm:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pointer-events-none">
        <p className="text-white text-sm font-medium leading-tight">{item.productName}</p>
      </div>
    </motion.div>
  );
}
