import React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("glass-panel p-8", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionHeading({ 
  title, 
  subtitle, 
  label,
  centered = false,
  className 
}: { 
  title: string; 
  subtitle?: string; 
  label?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {label && (
        <span className="inline-block mb-4 text-xs font-bold tracking-[0.08em] text-accent uppercase">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-text-heading mb-4 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-body max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
