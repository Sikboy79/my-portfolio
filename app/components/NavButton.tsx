"use client";

import React, { ReactNode } from "react";

interface NavButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "icon";
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  className = "",
}) => {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-300 transform";

  const styles =
    variant === "primary"
      ? `
        px-6 py-2 
        rounded-full 
        bg-gradient-to-br from-[#87CEFA] to-[#6495ED] 
        text-black 
        shadow-lg 
        hover:shadow-xl 
        hover:scale-105 
        active:scale-95
      `
      : `
        w-12 h-8
        rounded-full 
        bg-gray-200 dark:bg-gray-700 
        text-black 
        shadow-md 
        hover:shadow-lg 
        hover:scale-110 
        active:scale-95
      `;

  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
};

export default NavButton;
