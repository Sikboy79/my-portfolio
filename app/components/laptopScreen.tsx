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

  /* ---------------- typing animation ---------------- */
  useEffect(() => {
    if (lineIndex < textLines.length) {
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
        // move to next line
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }
    }
  }, [charIndex, lineIndex, textLines]);

  /* ---------------- blinking cursor ---------------- */
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((c) => !c);
    }, 400);
    return () => clearInterval(cursorInterval);
  }, []);

  /* ---------------- render line with highlight ---------------- */
  const renderLine = (line: string) => {
    const highlight = "Frontend Software Developer";

    if (!line.includes(highlight)) return line;

    const parts = line.split(highlight);

    return (
      <>
        {parts[0]}
        <span className="text-blue-400 font-semibold">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={`relative w-full max-w-md rounded overflow-hidden shadow-2xl ${className}`}
      style={{
        perspective: "1200px",
        transform:
          "rotateZ(6.8deg) rotateX(1deg) rotateY(-1.8deg) skewX(-1.6deg) skewY(1deg)",
        transformOrigin: "top left",
      }}
    >
      {/* ---------- WINDOW FRAME ---------- */}
      <div className="bg-neutral-900 border border-neutral-700">
        {/* ---------- TITLE BAR ---------- */}
        <div className="flex items-center justify-between px-3 bg-neutral-800 text-xs text-neutral-300">
          <span>portfolio-terminal</span>

          {/* window buttons */}
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="w-2 h-2 rounded-full bg-red-500" />
          </div>
        </div>

        {/* ---------- SCREEN CONTENT ---------- */}
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
              font-mono
              overflow-hidden
              relative
            "
            style={{
              fontFamily: "Consolas, 'JetBrains Mono', monospace",
              textShadow: "0 0 4px rgba(0,0,0,.6)",
            }}
          >
            {/* ---------- TEXT AREA ---------- */}
            <div
              className="flex-1 overflow-hidden break-words whitespace-pre-wrap leading-snug
                lg:text-[clamp(9px,4vw,9px)] 
                md:text-[clamp(6px,2vw,4px)] 
                sm:text-[clamp(4px,1.5vw,4px)] 
                "
            >
              {displayedText.map((line, idx) => (
                <p key={idx}>{renderLine(line)}</p>
              ))}
              {/* blinking cursor */}
              {showCursor && (
                <span className="inline-block w-[6px] sm:w-[8px] bg-white animate-pulse ml-1">
                  &nbsp;
                </span>
              )}
            </div>

            {/* ---------- WINDOWS TASKBAR ---------- */}
            <div className="fixed bottom-0 left-0 w-full flex items-center gap-2 p-1 bg-neutral-800 text-[clamp(2px,1.6vw,8px)] text-neutral-300">
              <div className="w-2 h-2 bg-blue-500 rounded-sm" />
              <div className="w-2 h-2 bg-neutral-600 rounded-sm" />
              <div className="w-2 h-2 rounded-sm ml-auto" />
              <span className="ml-2 text-neutral-400">1:15 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopScreen;
