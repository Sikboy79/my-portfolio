"use client";

import React, { useState } from "react";
import NavButton from "./NavButton";

interface NavbarProps {
  toggleModal: () => void;
  toggleContrast: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ toggleModal, toggleContrast }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full fixed top-5 z-50 bg-transparent">
      <div className="max-w-7xl flex items-center py-3 px-4 sm:px-6 md:px-12">
        {/* Logo */}
        <figure className=" ">
          <img
            src="/assets/MRCB&W.png"
            alt="Logo"
            className=" md:h-14 md:w-14 object-cover rounded-full shadow-sm"
          />
        </figure>

        {/* Desktop Menu */}
        <div className="flex w-full justify-end">
          <div className="flex gap-2 shrink-0">
            <NavButton onClick={toggleModal}>About</NavButton>
            <NavButton onClick={() => console.log("Projects clicked")}>
              Projects
            </NavButton>
            <NavButton onClick={toggleModal}>Contacts</NavButton>
            <NavButton onClick={toggleContrast} variant="icon">
              <i className="fa-solid fa-circle-half-stroke text-2xl"></i>
            </NavButton>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={handleMenuToggle}
            className="text-gray-800 dark:text-white focus:outline-none text-2xl"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 w-full px-4 pb-4 flex flex-col gap-3 z-40">
          <div className="button pr-12">
            <NavButton onClick={toggleModal} variant="primary">
              About
            </NavButton>
          </div>
          <div className="button">
            <NavButton
              onClick={() => console.log("Projects clicked")}
              variant="primary"
            >
              Projects
            </NavButton>
          </div>
          <div className="button">
            <NavButton onClick={toggleModal} variant="primary">
              Contacts
            </NavButton>
          </div>
          <div className="button">
            <NavButton
              onClick={toggleContrast}
              variant="icon"
              className="w-12! h-12! text-2xl rounded-full"
            >
              <i className="fa-solid fa-circle-half-stroke"></i>
            </NavButton>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
