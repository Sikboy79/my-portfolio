"use client";
import { useState, useEffect } from "react";

interface LaptopScreenProps {
  textLines?: string[];
  className?: string;
  style?: React.CSSProperties;
}

const defaultText = [
  "Hello!",
  "I'm Ryan.",
  "I'm a Frontend Software Developer.",
  "I love turning ideas into interactive, polished software.",
  "If you have a project or idea, I would be thrilled to collaborate and make it come to life!",
];

const LaptopScreen: React.FC<LaptopScreenProps> = ({
  textLines = defaultText,
  className,
  style,
}) => {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation
  useEffect(() => {
    if (lineIndex >= textLines.length) return;

    const line = textLines[lineIndex];
    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => {
          const copy = [...prev];
          copy[lineIndex] = (copy[lineIndex] || "") + line[charIndex];
          return copy;
        });
        setCharIndex((c) => c + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }
  }, [charIndex, lineIndex, textLines]);

  const renderLine = (line: string) => {
    const highlight = "Frontend Software Developer";
    if (!line.includes(highlight)) return line;

    const [before, after] = line.split(highlight);
    return (
      <>
        {before}
        <span className="text-blue-400 font-semibold">{highlight}</span>
        {after}
      </>
    );
  };

  return (
    <div
      className={`relative w-full max-w-md rounded overflow-hidden shadow-2xl ${className}`}
      style={{
        perspective: "1200px",
        transform: "rotateZ(6.5deg) rotateX(-1.1deg) rotateY(-1.5deg)",
        transformOrigin: "top left",
      }}
    >
      <div className="fixed w-full">
        <div
          className="
            bg-black
            w-full
            aspect-[4/3]
            flex
            flex-col
            px-3 py-3
            text-white
            overflow-hidden
            relative
          "
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            textShadow: "0 0 4px rgba(0,0,0,.6)",
          }}
        >
          <div
            className="
              flex-1
              overflow-hidden
              break-words
              whitespace-pre-wrap
              leading-snug
              lg:text-[clamp(9px,4vw,13px)] 
              md:text-[clamp(6px,2vw,4px)] 
              sm:text-[clamp(6px,1.5vw,6px)] 
              text-[clamp(2px,1.5vw,2px)]
            "
          >
            {displayedText.map((line, idx) => (
              <p key={idx}>{renderLine(line)}</p>
            ))}
            {showCursor && (
              <span className="inline-block w-[1px] sm:w-[1px] bg-white animate-pulse">
                &nbsp;
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopScreen;
