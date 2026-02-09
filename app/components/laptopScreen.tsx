"use client";
import { useState, useEffect } from "react";

interface LaptopScreenProps {
  textLines: string[];
  className?: string;
   style?: React.CSSProperties;
}

const LaptopScreen: React.FC<LaptopScreenProps> = ({ textLines, className }) => {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < textLines.length) {
      const line = textLines[lineIndex];
      if (charIndex < line.length) {
        const timeout = setTimeout(() => {
          if (!displayedText[lineIndex]) {
            setDisplayedText((prev) => [...prev, line[charIndex]]);
          } else {
            setDisplayedText((prev) => {
              const newText = [...prev];
              newText[lineIndex] += line[charIndex];
              return newText;
            });
          }
          setCharIndex(charIndex + 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }
    }
  }, [charIndex, lineIndex, textLines, displayedText]);

  // Function to highlight "Frontend software developer" in blue
  const renderLine = (line: string) => {
    const highlight = "Frontend software developer";
    if (line.includes(highlight)) {
      const parts = line.split(highlight);
      return (
        <>
          {parts[0]}
          <span className="text-blue-500 font-bold">{highlight}</span>
          {parts[1]}
        </>
      );
    }
    return line;
  };

  return (
    <div
      className={`
        bg-black bg-opacity-80 backdrop-blur-md p-4 shadow-lg border border-gray-700
        text-white font-mono text-sm sm:text-base md:text-sm space-y-2
        ${className}
      `}
      style={{
        transform: "rotate(8deg)",
        clipPath: "polygon(2% 6%, 100% 0%, 100% 100%, 0% 96%)", 
      }}
    >
      {displayedText.map((line, idx) => (
        <p key={idx}>{renderLine(line)}</p>
      ))}
    </div>
  );
};

export default LaptopScreen;