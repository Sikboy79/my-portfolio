"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ThreeDCardHolder from "./components/3dCardHolder";
import Projects from "./components/Projects";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import LaptopScreen from "./components/laptopScreen";
import CloneProjects from "./components/CloneProjects";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contrastToggle, setContrastToggle] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleContrast = () => {
    setContrastToggle(contrastToggle);
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-4 min-h-screen">
        {/* Landing Section with Background */}
        <section
          id="landing-page"
          className="
            w-full h-screen relative
            bg-[url('/assets/desk-bg.png')]
            bg-center
            bg-no-repeat
            bg-contain
          "
        >
          <div className="relative h-full flex flex-col items-center">
            <Navbar toggleModal={toggleModal} toggleContrast={toggleContrast} />

            {/* 3D Card Holder */}
            <div className="absolute top-3/4 left-[47%] transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] md:h-[500px] z-20 flex justify-center items-center">
              <ThreeDCardHolder />
            </div>

            {/* Laptop Screen Overlay */}
            <LaptopScreen
              textLines={[
                "Hello!",
                "I'm Ryan.",
                "I am a Frontend software developer, excited about turning ideas into polished, interactive software.",
              ]}
              className="
                absolute 
                md:top-[31%] 
                left-[50%] md:left-[23.3%] 
                w-[244px] lg:w-[247px] 
                h-[180px] lg:h-[180px] 
                transform rotate-[7deg]
                origin-top-left
              "
              style={{
                transform: `rotate(7deg) scale(${Math.min(1, window.innerWidth / 1920)})`,
              }}
            />
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="w-full py-16 md:py-5 bg-white dark:bg-gray-900 transition-colors duration-300"
        >
          <div className="w-full max-w-[1400px] mx-auto px-4">
            <Projects />
          </div>
        </section>
        <section
          id="Clone projects"
          className="w-full py-16 md:py-5 bg-white dark:bg-gray-900 transition-colors duration-300"
        >
          <div className="w-full max-w-[1400px] mx-auto px-4">
            <CloneProjects/>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-gray-100 dark:bg-gray-900">
          <div className="w-full max-w-[1400px] mx-auto px-4">
            <Footer />
          </div>
        </footer>

        {/* Modal */}
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} />
      </main>
    </>
  );
}