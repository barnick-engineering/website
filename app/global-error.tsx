"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-[#F3EEE3] text-[#111111]">
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-[#111111]/60 max-w-md">
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 px-4 py-2 rounded-md bg-[#D9541E] text-[#F3EEE3] text-sm font-medium hover:bg-[#D9541E]/90"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
