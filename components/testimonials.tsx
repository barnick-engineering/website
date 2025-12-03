"use client";

import Marquee from "@/components/ui/marquee";
import React, { useState } from "react";
import Image from "next/image";
import { ImageModal } from "./image-modal";

const testimonials = [
  {
    id: 1,
    avatar: "/testimonials/1.webp", // Local image path
  },
  {
    id: 2,
    avatar: "/testimonials/2.webp", // Local image path
  },
  {
    id: 3,
    avatar: "/testimonials/3.webp", // Local image path
  },
  {
    id: 4,
    avatar: "/testimonials/4.webp", // Local image path
  },
  {
    id: 5,
    avatar: "/testimonials/5.webp", // Local image path
  },
  {
    id: 6,
    avatar: "/testimonials/6.webp", // Local image path
  },
  {
    id: 7,
    avatar: "/testimonials/7.webp", // Local image path
  },
];

const Testimonials = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div
      id="products"
      className="flex justify-center items-center py-8 xs:py-12"
    >
      <div className="h-full w-full">
        <h2 className="mb-12 text-4xl md:text-5xl font-bold text-center tracking-tight px-6">
          কাজের নমুনা / পোর্টফোলিও
        </h2>
        <div className="relative">
          <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-gradient-to-r from-background to-transparent" />
          <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-gradient-to-l from-background to-transparent" />
          <Marquee pauseOnHover className="[--duration:20s]">
            <TestimonialList onImageClick={setSelectedImage} />
          </Marquee>
        </div>
      </div>
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          imageSrc={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

interface TestimonialListProps {
  onImageClick: (imageSrc: string) => void;
}

const TestimonialList: React.FC<TestimonialListProps> = ({ onImageClick }) =>
  testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="min-w-96 max-w-sm bg-accent rounded-xl p-6 overflow-hidden"
    >
      <div className="flex items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={testimonial.avatar}
          alt="Testimonial"
          width={200}
          height={200}
          className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
          onClick={() => onImageClick(testimonial.avatar)}
        />
      </div>
    </div>
  ));

export default Testimonials;
