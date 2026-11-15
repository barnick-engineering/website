import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the custom type scale and shadow from tailwind.config.ts,
// otherwise `text-display-xl` is mistaken for a colour and dropped next to `text-foreground`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-xl", "display-l", "display-m", "price", "lead"] }],
      shadow: [{ shadow: ["paper"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
