import { motion } from "framer-motion";
import { FlipCard } from "@/components/animata/card/flip-card";
import { 
  BarChart3, 
  Leaf, 
  Pill, 
  Droplet, 
  Brain, 
  Palette 
} from "lucide-react";

const expertiseAreas = [
  {
    title: "Business Strategy",
    subtitle: "Strategic Planning",
    description: "Expert guidance in market expansion and strategic planning for sustainable global business growth.",
    image: "/images/expertise/business-strategy.jpg",
    icon: BarChart3
  },
  {
    title: "Cannabis Industry",
    subtitle: "Cannabis Solutions",
    description: "Specialized consulting in cannabis market entry, compliance, and operational optimization.",
    image: "/images/expertise/cannabis.png",
    icon: Leaf
  },
  {
    title: "Neutraceuticals",
    subtitle: "Health Products",
    description: "Guidance in neutraceutical development, market positioning, and regulatory compliance.",
    image: "/images/expertise/neutraceuticals.png",
    icon: Pill
  },
  {
    title: "Water Management",
    subtitle: "Water Solutions",
    description: "Innovative water resource management and sustainability solutions for businesses.",
    image: "/images/expertise/water.png",
    icon: Droplet
  },
  {
    title: "AI Integration",
    subtitle: "AI Solutions",
    description: "Cutting-edge AI implementation and automation for business transformation.",
    image: "/images/expertise/ai.jpg",
    icon: Brain
  },
  {
    title: "Brand Development",
    subtitle: "Strategic Branding",
    description: "Comprehensive brand strategy and identity creation for market differentiation.",
    image: "/images/expertise/branding.jpg",
    icon: Palette
  }
];

export function Expertise() {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Our Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Specialized knowledge and experience across diverse industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="scale-90"
            >
              <FlipCard
                title={area.title}
                subtitle={area.subtitle}
                description={area.description}
                image={area.image}
                icon={area.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
