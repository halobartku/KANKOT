import { cn } from "@/lib/utils";
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
          <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          <div className="absolute bottom-4 left-4 text-xl font-bold text-white">
            {title}
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full rounded-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6",
            "text-gray-800 [backface-visibility:hidden] shadow-lg",
            self[1],
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              {Icon && (
                <div className="p-2 rounded-xl bg-slate-100">
                  <Icon className="w-6 h-6 text-slate-600" />
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900">
                {subtitle || title}
              </h3>
            </div>
            <div className="grow">
              <p className="text-base text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
