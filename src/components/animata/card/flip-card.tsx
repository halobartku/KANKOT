import { cn } from "../../../utils/cn";
import type { HTMLAttributes } from "react";
import type { LucideIcon } from 'lucide-react';

interface FlipCardProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  description: string;
  subtitle?: string;
  icon?: LucideIcon;
  rotate?: "x" | "y";
}

export function FlipCard({
  image,
  title,
  description,
  subtitle,
  icon: Icon,
  rotate = "y",
  className,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
    y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
  };
  const self = rotationClass[rotate];

  return (
    <div 
      className={cn(
        "group relative w-full aspect-[4/3]",
        "[perspective:1000px]",
        className
      )} 
      {...props}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-2xl transition-all duration-500",
          "[transform-style:preserve-3d]",
          self[0],
        )}
      >
        {/* Front */}
        <div className="absolute h-full w-full [backface-visibility:hidden]">
          <img
            {...{
              src: image,
              alt: title,
              className: "h-full w-full rounded-2xl object-cover"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#862B44]/90 via-[#A13553]/80 to-[#DAA520]/20 rounded-2xl" />
          <div className="absolute bottom-4 left-4 text-xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
            {title}
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full rounded-2xl bg-gradient-to-br from-[#FFF5F7] via-[#F5E6D3]/20 to-[#FFF8FA] p-6",
            "text-gray-800 [backface-visibility:hidden] shadow-lg",
            self[1],
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              {Icon && (
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#862B44]/10 to-[#DAA520]/10">
                  <Icon className="w-6 h-6 text-[#862B44]" />
                </div>
              )}
              <h3 className="text-xl font-bold text-[#862B44]">
                {subtitle || title}
              </h3>
            </div>
            <div className="grow">
              <p className="text-base text-[#862B44] font-medium leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
