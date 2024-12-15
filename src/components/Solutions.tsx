'use client'

import { motion } from "framer-motion";
import { Button } from "./ui/button";

const goldenCircle = [
  {
    title: "Why",
    description: "Transform businesses by starting with purpose. Discover the deeper reason for existence that creates authentic connections.",
    color: "from-emerald-400/20 to-emerald-400/5"
  },
  {
    title: "How",
    description: "Align operations with purpose through proven methodologies. Bridge the gap between vision and execution.",
    color: "from-blue-400/20 to-blue-400/5"
  },
  {
    title: "What",
    description: "Deliver solutions driving growth and innovation. From market analysis to operational excellence, achieve results with purpose.",
    color: "from-emerald-300/20 to-blue-300/5"
  }
];

const growthAreas = [
  {
    title: "Purpose-Driven Strategy",
    description: "Clear strategies that inspire action and drive growth."
  },
  {
    title: "Cultural Alignment",
    description: "Strong culture aligned with your 'why' for peak performance."
  },
  {
    title: "Market Differentiation",
    description: "Stand out by communicating purpose effectively."
  },
  {
    title: "Operational Excellence",
    description: "Align operations with purpose for consistent value."
  }
];

export function Solutions() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Purpose-Driven Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transform your business with our innovative solutions and strategic approach
          </p>
        </motion.div>

        {/* Golden Circle Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {goldenCircle.map((circle, index) => (
            <motion.div
              key={circle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-emerald-100/20 relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${circle.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{circle.title}</h3>
                <p className="text-gray-600">{circle.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth Areas Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {growthAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl shadow-lg backdrop-blur-sm border border-blue-100/20 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{area.title}</h3>
              <p className="text-gray-600">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
