"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
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
      <main
        className="
          max-w-full
          w-full
          min-h-screen
          bg-[url('/assets/desk-bg.png')]
          bg-cover
          bg-center
          bg-no-repeat
          bg-fixed
        "
      >
        {/* Landing Section */}
        <section
          id="landing-page"
          className="w-full flex flex-col items-center pt-32 md:pt-40"
        >
          <Navbar toggleModal={toggleModal} toggleContrast={toggleContrast} />
          <div className="w-full max-w-5xl mx-auto h-[400px] md:h-[500px] z-20 fixed top-72 left-50 flex justify-center items-center">
            <ThreeDCardHolder />
          </div>

          {/* Header positioned over laptop screen */}
          <div className="fixed top-[35%] md:top-[25%] left-[28.57%] transform -translate-x-1/2 z-50 text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-black dark:text-white">
              Hello!
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-blue-500 mt-2">
              I'm Ryan.
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-1/3 mx-auto wrap-break-word">
              I am a{" "}
              <b className="text-blue-500">
                Frontend Simplified software student
              </b>
              . Looking forward to an exciting career in software development.
              <br />
              More{" "}
              <b className="text-blue-500 cursor-pointer" onClick={toggleModal}>
                About Me
              </b>
              .
            </p>
          </div>


          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-100 flex justify-center w-full">
            <a href="#projects">
              <div className="w-6 h-6 border-b-2 border-r-2 border-gray-700 dark:border-white rotate-45 animate-bounce"></div>
            </a>
          </div>
        </section>

        {/* Projects Section
        <section
          id="projects"
          className="w-full py-16 md:py-24 bg-transparent transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <Projects />
          </div>
        </section> */}

        {/* Modal */}
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} />

        {/* Footer */}
        {/* <footer className="w-full">
          <Footer />
        </footer> */}
      </main>
    </>
  );
}
