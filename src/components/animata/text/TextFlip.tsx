"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TextFlip() {
  const words = [
    'dla Firm',
    'dla Przedsiębiorców',
    'dla Spółek',
    'dla Rolników',
    'dla Fundacji',
    'dla Prawników',
    'dla Lekarzy',
    'dla Małych i Dużych',
    'dla Każdego',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex flex-col items-center text-center gap-0 text-4xl font-bold lg:text-5xl">
      <h1 className="bg-gradient-to-r from-[#862B44] to-[#A13553] text-transparent bg-clip-text whitespace-nowrap text-[2rem] sm:text-4xl lg:text-5xl leading-tight">
        Kancelaria Podatkowa
      </h1>
      <h1 className="bg-gradient-to-r from-[#862B44] to-[#A13553] text-transparent bg-clip-text whitespace-nowrap text-[2rem] sm:text-4xl lg:text-5xl leading-tight">
        Stankiewicz
      </h1>
      <div className="relative h-[4rem] sm:h-[5rem] lg:h-[6rem] w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[currentIndex]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute bg-gradient-to-r from-[#862B44] to-[#A13553] text-transparent bg-clip-text animate-gradient-x text-[2rem] sm:text-4xl lg:text-5xl whitespace-nowrap leading-tight"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
