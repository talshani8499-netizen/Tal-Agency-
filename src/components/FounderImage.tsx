import { useState } from "react";

interface FounderImageProps {
  size?: "sm" | "lg";
  className?: string;
}

export function FounderImage({ size = "sm", className = "" }: FounderImageProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const sizeClass =
    size === "lg"
      ? "w-60 h-80 md:w-72 md:h-96 rounded-2xl"
      : "w-24 h-24 md:w-28 md:h-28 rounded-xl";

  return (
    <div
      className={`${sizeClass} overflow-hidden border border-slate-200 shadow-md bg-slate-100 shrink-0 ${className}`}
    >
      {imgFailed ? (
        <div className="w-full h-full flex items-center justify-center bg-blue-50">
          <span className="text-4xl font-bold text-blue-600">T</span>
        </div>
      ) : (
        <img
          src="/images/tal-founder.jpg"
          alt="Tal Shani, Founder of Elevate Digital"
          className="w-full h-full object-cover object-[center_8%]"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      )}
    </div>
  );
}
