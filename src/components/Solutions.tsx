'use client'

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { BackgroundGradient } from './BackgroundGradient';

const expertiseHighlights = [
  {
    title: "Jolanta Stankiewicz",
    subtitle: "Ekspert Prawa Podatkowego",
    description: "Ponad 40 lat doświadczenia w Urzędzie Skarbowym oraz sektorze prywatnym. Dogłębna znajomość procedur podatkowych i interpretacji przepisów z perspektywy obu stron.",
    color: "from-[#862B44]/20 to-[#A13553]/10"
  },
  {
    title: "Skuteczność w Trudnych Sprawach",
    description: "Wieloletnie doświadczenie w rozwiązywaniu skomplikowanych spraw podatkowych, które wydawały się niemożliwe do rozstrzygnięcia. Specjalizacja w sprawach wymagających głębokiej analizy i niestandardowego podejścia.",
    color: "from-[#862B44]/15 to-[#A13553]/5"
  },
  {
    title: "Unikalna Perspektywa",
    description: "Doświadczenie zdobyte w Urzędzie Skarbowym pozwala na skuteczne przewidywanie potencjalnych problemów i ich wyprzedzanie, zanim staną się poważnymi wyzwaniami dla klienta.",
    color: "from-[#862B44]/10 to-[#A13553]/5"
  }
];

const specializations = [
  {
    title: "Trudne Sprawy Podatkowe",
    description: "Specjalizacja w rozwiązywaniu skomplikowanych spraw podatkowych, które inni uznali za beznadziejne."
  },
  {
    title: "Kontrole Skarbowe",
    description: "Profesjonalne wsparcie podczas kontroli skarbowych, wykorzystując doświadczenie z pracy w Urzędzie Skarbowym."
  },
  {
    title: "Optymalizacja Podatkowa",
    description: "Legalne metody optymalizacji podatkowej oparte na dogłębnej znajomości przepisów i ich interpretacji."
  },
  {
    title: "Reprezentacja Prawna",
    description: "Skuteczna reprezentacja przed organami podatkowymi, wsparta 40-letnim doświadczeniem w branży."
  }
];

export function Solutions() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#F5E6D3]/30 to-[#862B44]/10 overflow-hidden">
      <BackgroundGradient />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#862B44] to-[#A13553] text-transparent bg-clip-text mb-4">
            Doświadczenie, Któremu Możesz Zaufać
          </h2>
          <p className="text-lg text-[#862B44] max-w-3xl mx-auto font-medium">
            40 lat praktyki w Urzędzie Skarbowym i doradztwie podatkowym
          </p>
        </motion.div>

        {/* Expertise Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {expertiseHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm shadow-lg border border-[#862B44]/10"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${highlight.color} -z-10`} />
              {highlight.subtitle && (
                <p className="text-[#A13553] font-medium mb-2">{highlight.subtitle}</p>
              )}
              <h3 className="text-xl font-bold text-[#862B44] mb-4">{highlight.title}</h3>
              <p className="text-[#862B44] leading-relaxed">{highlight.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Specializations Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specializations.map((spec, index) => (
            <motion.div
              key={spec.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm shadow-md border border-[#862B44]/10"
            >
              <h3 className="text-lg font-bold text-[#862B44] mb-3">{spec.title}</h3>
              <p className="text-[#862B44] leading-relaxed">{spec.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Experience Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-[#862B44] max-w-3xl mx-auto italic">
            "Każda sprawa podatkowa ma swoje rozwiązanie. Dzięki doświadczeniu z obu stron - urzędu skarbowego i doradztwa prywatnego - potrafię znaleźć najlepsze wyjście nawet z najtrudniejszej sytuacji."
          </p>
          <p className="mt-2 text-[#A13553] font-medium">
            - Jolanta Stankiewicz
          </p>
        </motion.div>
      </div>
    </div>
  );
}
