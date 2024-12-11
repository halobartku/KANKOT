import { ReactNode } from "react";
import { HTMLMotionProps, motion, useSpring, useTransform } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { cn } from "../../../lib/utils";
import logo from '../../../assets/Logo_Kankot.png';
import TextFlip from '../text/TextFlip';
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

interface FeatureCardProps extends HTMLMotionProps<"div"> {
  feature: {
    title: ReactNode;
    category: string;
    imageUrl: string;
    description: string;
  };
  zIndexOffset?: number;
}

function FeatureCard({ feature, className, zIndexOffset = 0, ...props }: FeatureCardProps) {
  const { title, category, imageUrl, description } = feature;
  const springValue = useSpring(0, {
    bounce: 0,
  });
  const zIndex = useTransform(springValue, (value) => +Math.floor(value * 10) + 10 + zIndexOffset);
  const scale = useTransform(springValue, [0, 1], [1, 1.1]);

  const content = (
    <>
      <img 
        {...{
          src: imageUrl,
          alt: category,
          className: "-z-1 absolute inset-0 h-full w-full object-cover"
        } as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>}
      />
      <div className="z-10 flex h-full w-full flex-col gap-2 bg-gradient-to-t from-emerald-900/60 from-15% to-transparent p-3">
        <small className="inline w-fit rounded-xl bg-emerald-600 bg-opacity-50 px-2 py-1 text-xs font-medium leading-none text-white">
          {category}
        </small>

        <div className="flex-1" />
        <div className="space-y-2 rounded-xl bg-emerald-900/40 p-3 backdrop-blur-sm">
          <h3 className="text-base font-bold leading-none text-white">
            {title}
          </h3>
          <p className="text-xs text-emerald-50">
            {description}
          </p>
        </div>
      </div>
    </>
  );

  const containerClassName = cn(
    "relative flex h-72 w-56 flex-col overflow-hidden rounded-2xl shadow-none transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-emerald-100/20",
    className,
  );

  return (
    <>
      <motion.div
        onMouseEnter={() => springValue.set(1)}
        onMouseLeave={() => springValue.set(0)}
        style={{
          zIndex,
          scale,
        }}
        className={cn(containerClassName, "hidden sm:flex")}
        {...props}
      >
        {content}
      </motion.div>
      <motion.div
        initial={{ y: 100 }}
        whileInView={{ y: 0, transition: { duration: 0.5 } }}
        className={cn(containerClassName, "flex sm:hidden")}
      >
        {content}
      </motion.div>
    </>
  );
}

export default function ProductFeatures() {
  const cardWidth = 56 * 4; // w-56 x 4
  const angle = 6;
  const yOffset = 30;

  const handleGetStarted = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex w-full flex-col items-center gap-4 pt-0 pb-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(16,185,129,0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(59,130,246,0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_50%)]" />
      
      {/* Content */}
      <div className="relative w-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-8 z-20 w-1/4 max-w-[400px] min-w-[200px]"
        >
          <img 
            {...{
              src: logo,
              alt: "Kankot Logo",
              className: "w-full h-auto",
              loading: "eager"
            } as DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>}
          />
        </motion.div>

        <motion.header
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.5,
            },
          }}
          className="flex max-w-2xl flex-col items-center gap-4 px-4 mt-20 mx-auto"
        >
          <div className="sm:mt-0 mt-16">
            <TextFlip />
          </div>
        </motion.header>

        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.5,
              delay: 0.2,
            },
          }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={handleGetStarted}
            className="rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:from-emerald-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Get Started →
          </button>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: 0.3,
            },
          }}
          className="mt-6 flex w-full justify-center px-8"
        >
          <div className="relative flex w-full flex-wrap justify-center gap-8 px-4 py-12 sm:flex-row sm:gap-0">
            <FeatureCard
              feature={{
                category: "Strategy",
                imageUrl: "/images/expertise/business-strategy.jpg",
                title: "Business Strategy",
                description: "Comprehensive strategic planning and market analysis for sustainable growth.",
              }}
              initial={{
                x: cardWidth,
                y: yOffset,
                opacity: 0,
                rotate: 0,
                scale: 0.9,
              }}
              animate={{
                x: yOffset,
                y: 10,
                opacity: 1,
                scale: 0.95,
                rotate: -angle,
                transition: {
                  type: "spring",
                  delay: 0.8,
                },
              }}
            />

            <FeatureCard
              feature={{
                category: "Innovation",
                title: "Innovation Solutions",
                description: "Pioneering advancements in business processes, sustainable farming practices, and water management technologies.",
                imageUrl: "/images/expertise/ai.jpg",
              }}
              initial={{
                y: yOffset,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  delay: 0.4,
                },
              }}
              zIndexOffset={1}
            />

            <FeatureCard
              feature={{
                category: "Products",
                title: "Natural Products",
                description: "Specialized development of nutraceuticals and cannabis products with focus on quality, compliance, and market readiness.",
                imageUrl: "/images/expertise/neutraceuticals.png",
              }}
              initial={{
                x: -cardWidth,
                y: yOffset,
                opacity: 0,
                rotate: 0,
                scale: 0.9,
              }}
              animate={{
                x: -yOffset,
                y: 10,
                opacity: 1,
                rotate: angle,
                scale: 0.95,
                transition: {
                  type: "spring",
                  delay: 0.6,
                },
              }}
              zIndexOffset={1}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
