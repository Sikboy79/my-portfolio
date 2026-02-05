"use client";
import React, { useEffect, useRef } from "react";

interface ShapesBackgroundProps {
  shapes: string[]; // Array of image URLs
  scaleFactor?: number; // Mouse movement sensitivity
}

const ShapesBackground: React.FC<ShapesBackgroundProps> = ({
  shapes,
  scaleFactor = 1 / 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse movement effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const moveShapes = (event: MouseEvent) => {
      const allShapes = container.querySelectorAll<HTMLElement>(".shape");
      const x = event.clientX * scaleFactor;
      const y = event.clientY * scaleFactor;

      allShapes.forEach((shape, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        shape.style.transform = `translate(${x * direction}px, ${y * direction}px)`;
      });
    };

    window.addEventListener("mousemove", moveShapes);

    return () => window.removeEventListener("mousemove", moveShapes);
  }, [scaleFactor]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {shapes.map((src, i) => (
        <img
          key={i}
          src={src}
          className={`shape absolute w-24 h-24 md:w-32 md:h-32 ${
            i % 2 === 0 ? "top-10 left-10" : "top-20 right-10"
          }`}
          alt={`Shape ${i}`}
        />
      ))}
    </div>
  );
};

export default ShapesBackground;
