"use client";
import React from "react";

interface HeaderProps {
  toggleModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleModal }) => {
  return (
    <header
      className="relative z-10 text-center mt-32 md:mt-48 px-4"
      style={{
        backgroundColor: "transparent",
        backdropFilter: "blur(4px)", // optional blur
      }}
    >
      <h1 className="text-5xl md:text-7xl font-bold leading-snug text-black dark:text-white">
        Hey
      </h1>
      <h1 className="text-5xl md:text-7xl font-bold text-blue-500 leading-snug mt-2">
        I'm Ryan.
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        I am a <b className="text-blue-500">Frontend Simplified software student</b>. Looking forward to an exciting career in software development.
        <br />
        Here is more <b className="text-blue-500 cursor-pointer" onClick={toggleModal}>About Me</b>.
      </p>

      {/* Social Icons */}
      <div className="flex gap-4 justify-center mt-8 text-2xl text-gray-700 dark:text-gray-300 relative">
        <a href="https://github.com" target="_blank" rel="noreferrer">
          <i className="fab fa-github hover:text-blue-500"></i>
        </a>
        <a href="#"><i className="fa-solid fa-file-pdf hover:text-blue-500"></i></a>
        <a href="/assets/David Bragg Resume.pdf" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin hover:text-blue-500"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
