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
    <nav className=" top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6 md:px-12">

        {/* Logo */}
        <figure className="flex items-center">
          <img
            src="/assets/MRCB&W.png"
            alt="Logo"
            className="h-10 w-10 md:h-14 md:w-14 object-cover rounded-lg shadow-sm"
          />
        </figure>

        {/* Desktop Menu */}
        <div className="flex ml-auto md:flex gap-4 lg:gap-6 items-center">
          <NavButton onClick={toggleModal} variant="primary">About</NavButton>
          <NavButton onClick={() => console.log("Projects clicked")} variant="primary">Projects</NavButton>
          <NavButton onClick={toggleModal} variant="primary">Contacts</NavButton>
          <NavButton
            onClick={toggleContrast}
            variant="icon"
            className="w-12! h-12! text-2xl rounded-full"
          >
            <i className="fa-solid fa-circle-half-stroke"></i>
          </NavButton>
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
          <NavButton onClick={toggleModal} variant="primary">About</NavButton>
          <NavButton onClick={() => console.log("Projects clicked")} variant="primary">Projects</NavButton>
          <NavButton onClick={toggleModal} variant="primary">Contacts</NavButton>
          <NavButton
            onClick={toggleContrast}
            variant="icon"
            className="w-12! h-12! text-2xl rounded-full"
          >
            <i className="fa-solid fa-circle-half-stroke"></i>
          </NavButton>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
