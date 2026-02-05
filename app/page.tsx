"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ThreeDCardHolder from "./components/3dCardHolder";
import Projects from "./components/Projects";
import Modal from "./components/Modal";
import Footer from "./components/Footer";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contrastToggle, setContrastToggle] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleContrast = () => {
    setContrastToggle(!contrastToggle);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar toggleModal={toggleModal} toggleContrast={toggleContrast} className="z-60" />

      <main className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">

        {/* Landing Section */}
        <section
          id="landing-page"
          className="w-full flex flex-col items-center pt-32 md:pt-40"
        >
          {/* Header */}
          <div className="relative z-10 px-4 md:px-12 text-center max-w-6xl mx-auto">
            <Header toggleModal={toggleModal} />
          </div>

          {/* 3D Card Holder */}
          <div className="w-full max-w-5xl mx-auto mt-12 md:mt-20 h-[400px] md:h-[500px]">
            <ThreeDCardHolder />
          </div>

          {/* Scroll Indicator */}
          <div className="mt-8 mb-16 md:mb-24 flex justify-center w-full z-30">
            <a href="#projects">
              <div className="w-6 h-6 border-b-2 border-r-2 border-gray-700 dark:border-white rotate-45 animate-bounce"></div>
            </a>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="w-full py-16 md:py-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <Projects />
          </div>
        </section>

        {/* Modal */}
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} />

        {/* Footer */}
        <footer className="w-full">
          <Footer />
        </footer>
      </main>
    </>
  );
}
