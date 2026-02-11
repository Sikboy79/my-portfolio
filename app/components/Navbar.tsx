"use client";

import React, { useState } from "react";
import NavButton from "./UI/NavButton";
import { FaBars } from "react-icons/fa";
import { FaCircleHalfStroke } from "react-icons/fa6";

interface NavbarProps {
  toggleModal: () => void;
  toggleContrast: () => void;
  openResume: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleModal,
  toggleContrast,
  openResume,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full fixed top-5 z-50 bg-transparent">
      <div className="max-w-7xl flex items-center py-3 px-4 sm:px-6 md:px-12">
        {/* Logo */}
        <img
          src="/assets/MRCB&W.png"
          alt="Logo"
          className="h-8 md:h-14 rounded-full"
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex ml-auto items-center gap-3">
          <NavButton onClick={openResume}>Resume</NavButton>
          <NavButton onClick={toggleModal}>Contact</NavButton>

          <a href="#projects">
            <NavButton>Projects</NavButton>
          </a>
          <NavButton
            className="w-24 h-11 flex items-center justify-center"
            onClick={toggleContrast}
          >
            <FaCircleHalfStroke size={18} />
          </NavButton>
        </div>

        {/* Hamburger */}
        <button
          onClick={handleMenuToggle}
          className="md:hidden ml-auto text-2xl text-gray-800 dark:text-white"
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />

          {/* panel */}
          <div className="fixed top-4 right-4 z-50 md:hidden w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 flex flex-col gap-3">
            {/* header row */}
            <div className="flex justify-end">
              <button
                onClick={() => setMenuOpen(false)}
                className="text-xl text-gray-700 dark:text-white"
              >
                ✕
              </button>
            </div>

            {/* buttons */}
            <NavButton
              className="w-full h-11"
              onClick={() => {
                openResume();
                setMenuOpen(false);
              }}
            >
              Resume
            </NavButton>

            <a
              href="#projects"
              onClick={() => setMenuOpen(false)}
              className="w-full"
            >
              <NavButton className="w-full h-11">Projects</NavButton>
            </a>

            <NavButton
              className="w-full h-11"
              onClick={() => {
                toggleModal();
                setMenuOpen(false);
              }}
            >
              Contact
            </NavButton>

            <NavButton
              className="w-full h-11 flex items-center justify-center"
              onClick={() => {
                toggleContrast();
                setMenuOpen(false);
              }}
            >
              <FaCircleHalfStroke size={18} />
            </NavButton>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
