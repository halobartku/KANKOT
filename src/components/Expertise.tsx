import { motion } from "framer-motion";
import { FlipCard } from "./animata/card/flip-card";
import { 
  Calculator, 
  Building2, 
  FileText, 
  Receipt, 
  Scale, 
  Users 
} from "lucide-react";

const expertiseAreas = [
  {
    title: "Podatki Firmowe",
    subtitle: "Rozliczenia CIT",
    description: "Profesjonalne obsługa w zakresie podatku dochodowego od osób prawnych (CIT) oraz optymalizacji podatkowej.",
    image: "/images/expertise/firmowe.png",
    icon: Building2
  },
  {
    title: "Podatki Osobiste",
    subtitle: "Rozliczenia PIT",
    description: "Kompleksowa obsługa w zakresie podatku dochodowego od osób fizycznych (PIT) oraz ulg podatkowych.",
    image: "/images/expertise/personal.png",
    icon: Calculator
  },
  {
    title: "VAT i Akcyza",
    subtitle: "Podatki Pośrednie",
    description: "Specjalistyczna obsługa w zakresie podatku VAT, akcyzy oraz rozliczeń międzynarodowych.",
    image: "/images/expertise/VAT.png",
    icon: Receipt
  },
  {
    title: "Księgowość",
    subtitle: "Usługi Księgowe",
    description: "Pełna obsługa księgowa firm, prowadzenie ksiąg rachunkowych i dokumentacji finansowej.",
    image: "/images/expertise/ksiegowos.png",
    icon: FileText
  },
  {
    title: "ZUS",
    subtitle: "Rozliczenia z ZUS",
    description: "Pełna obsługa w zakresie rozliczeń z Zakładem Ubezpieczeń Społecznych.",
    image: "/images/expertise/prawo.png",
    icon: Scale
  },
  {
    title: "Kadry i Płace",
    subtitle: "Obsługa HR",
    description: "Kompleksowa obsługa kadrowo-płacowa, rozliczenia z ZUS, umowy i dokumentacja pracownicza.",
    image: "/images/expertise/kadry.png",
    icon: Users
  }
];

export function Expertise() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#F5E6D3]/30 to-[#862B44]/10 overflow-hidden py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#862B44] to-[#A13553] text-transparent bg-clip-text pb-2 leading-relaxed">
            Specjalizacje i Usługi
          </h2>
          <p className="mt-4 text-lg text-[#862B44]/90 font-medium">
            Profesjonalne usługi podatkowe i księgowe dla firm oraz osób prywatnych
          </p>
        </div>

        {/* Background decorative elements */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#862B44] rounded-full blur-[100px] opacity-10 animate-blob-slow" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#DAA520] rounded-full blur-[100px] opacity-10 animate-blob-slow animation-delay-2000" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#862B44] rounded-full blur-[100px] opacity-10 animate-blob-slow animation-delay-4000" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="w-4/5 scale-80 hover:scale-85 transition-transform duration-300"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#862B44] to-[#A13553] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <FlipCard
                  title={area.title}
                  subtitle={area.subtitle}
                  description={area.description}
                  image={area.image}
                  icon={area.icon}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
