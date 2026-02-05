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
  let baseClasses =
    "transition-transform duration-300 shadow-sm font-medium flex items-center justify-center ";

  if (variant === "primary") {
    baseClasses +=
      "px-6 py-2 rounded-full bg-[#6495ED] text-black hover:bg-blue-500 hover:text-white hover:scale-105";
  } else if (variant === "icon") {
    baseClasses +=
      "w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 text-black hover:bg-blue-500 hover:text-white hover:scale-110";
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
};

export default NavButton;
