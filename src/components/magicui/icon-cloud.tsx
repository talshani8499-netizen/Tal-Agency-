import { Cloud, ICloud } from "react-icon-cloud";

const cloudProps: Omit<ICloud, "children"> = {
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "none",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

interface IconCloudProps {
  images: string[];
}

export function IconCloud({ images }: IconCloudProps) {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <Cloud {...cloudProps}>
        {images.map((img) => (
          <a key={img} href="#" onClick={(e) => e.preventDefault()}>
            <img height="40" width="40" alt="" src={img} />
          </a>
        ))}
      </Cloud>
    </div>
  );
}
