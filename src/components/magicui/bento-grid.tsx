import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children?: ReactNode;
  className?: string;
}

const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
      "bg-white border border-slate-200 shadow-sm",
      "transition-all duration-300 hover:shadow-md",
      className,
    )}
  >
    <div className="absolute inset-0 pointer-events-none">{background}</div>

    <div className="pointer-events-none z-10 flex flex-col gap-1 p-6 mt-auto transition-all duration-300 group-hover:-translate-y-10">
      <Icon
        className="h-8 w-8 text-blue-600 mb-2 transition-all duration-300 ease-in-out group-hover:scale-90 origin-left"
        strokeWidth={1.5}
      />
      <h3 className="text-lg font-bold text-slate-900">{name}</h3>
      <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{description}</p>
    </div>

    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
      <a
        href={href}
        className="pointer-events-auto text-sm font-semibold text-blue-600 hover:underline"
      >
        {cta} →
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-slate-50/40 rounded-2xl" />
  </div>
);

export { BentoCard, BentoGrid };
