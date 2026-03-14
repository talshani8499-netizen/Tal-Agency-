import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: boolean;
  children?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  icon,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group";
  
  const variants = {
    primary: "bg-accent text-bg-base hover:bg-accent-hover shadow-[0_0_20px_rgba(212,168,83,0.2)] hover:shadow-[0_0_25px_rgba(212,168,83,0.4)]",
    secondary: "glass-panel text-accent hover:bg-accent hover:text-bg-base hover:border-accent",
    ghost: "bg-transparent text-text-heading hover:text-accent",
  };

  const sizes = {
    sm: "h-10 px-5 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const content = (
    <>
      <span className="relative z-10 flex items-center">
        {children}
        {icon && <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
