"use client";

import { useEffect, useMemo, useRef } from "react";

export default function TextFlip() {
  const words = useMemo(() => [
    "Today",
    "Tomorrow",
    "Businesses",
    "Farmers",
    "Entrepreneurs",
    "Governments",
    "Startups",
    "Innovators",
    "Visionaries",
    "Industries",
    "Enterprises",
    "Organizations",
    "Companies"
  ], []);

  const tallestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tallestRef.current) {
      let maxHeight = 0;

      words.forEach((word) => {
        const span = document.createElement("span");
        span.className = "absolute opacity-0";
        span.textContent = word;
        tallestRef.current?.appendChild(span);
        const height = span.offsetHeight;
        tallestRef.current?.removeChild(span);

        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      tallestRef.current.style.height = `${maxHeight}px`;
    }
  }, [words]);

  return (
    <div className="flex flex-col items-center text-center gap-4 text-4xl font-bold lg:text-5xl mb-16">
      <h1 className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent whitespace-nowrap px-6 sm:px-4 text-[2rem] sm:text-4xl lg:text-5xl">
        Business Solutions for
      </h1>
      <div ref={tallestRef} className="relative h-16 flex flex-col overflow-hidden">
        {words.map((word, index) => (
          <span
            key={index}
            className="animate-flip-words bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent text-center"
          >
            {word}
          </span>
        ))}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .animate-flip-words {
              animation: spin_words 18s infinite;
            }
            
            @keyframes spin_words {
              10% {
                transform: translateY(0%);
              }
              25% {
                transform: translateY(-100%);
              }
              35% {
                transform: translateY(-200%);
              }
              45% {
                transform: translateY(-300%);
              }
              55% {
                transform: translateY(-400%);
              }
              65% {
                transform: translateY(-500%);
              }
              75% {
                transform: translateY(-600%);
              }
              85% {
                transform: translateY(-700%);
              }
              95% {
                transform: translateY(-800%);
              }
              100% {
                transform: translateY(-900%);
              }
            }
          `,
        }}
        data-jsx="true"
      />
    </div>
  );
}
