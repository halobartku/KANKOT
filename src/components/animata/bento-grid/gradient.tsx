import { cn } from "@/lib/utils";
import { Service } from "@/components/Services";
import { motion } from "framer-motion";

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          key={service.title}
          className={cn(
            "group relative overflow-hidden rounded-3xl",
            "bg-white shadow-sm transition-all duration-300",
            "hover:shadow-lg hover:bg-gradient-to-br from-emerald-50/50 to-blue-50/50"
          )}
        >
          <div className="p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100/80">
                <service.icon className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {service.title}
              </h3>
            </div>
            
            <p className="text-sm text-gray-600">
              {service.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
