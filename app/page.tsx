"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ThreeDCardHolder from "./components/3dCardHolder";
import Projects from "./components/Projects";
import Modal from "./components/UI/ContactModal";
import Footer from "./components/Footer";
import LaptopScreen from "./components/laptopScreen";
import CloneProjects from "./components/CloneProjects";
import ResumeModal from "./components/UI/ResumeModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [contrastToggle, setContrastToggle] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <main className="max-w-[1400px] mx-auto px-4 min-h-screen">
        <div className="relative h-full flex flex-col items-center">
          <Navbar
            toggleModal={toggleModal}
            toggleContrast={toggleDarkMode}
            openResume={() => setResumeOpen(true)}
          />

          <div className="absolute top-[85%] lg:top-[70%] left-[55%] lg:left-[49%] sm:left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-full z-20 flex justify-center items-center scale-50 sm:scale-75 md:scale-75 lg:scale-100">
            <ThreeDCardHolder />
          </div>

          {/* Laptop Screen Overlay */}
          <div className="relative w-full max-w-[1200px] mx-auto">
            <img src="/assets/desk-bg.png" className="w-full h-auto" />
            <div
              className="absolute top-[31.2%] left-[15%] w-[22%] h-[26%] sm:w-[21.5%] sm:h-[25.7%] lg:w-[20.7%]"
              style={{
                perspective: "90px",
                transformOrigin: "left center",
                transform: "rotateY(1deg) scaleX(1.1)",
              }}
            >
              <LaptopScreen className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <section
          id="projects"
          className="w-full py-16 md:py-5 bg-white dark:bg-gray-900 transition-colors duration-300 scroll-mt-24"
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
            <CloneProjects />
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-gray-100 dark:bg-gray-900">
          <div className="w-full max-w-[1400px] mx-auto px-4">
            <Footer />
          </div>
        </footer>

        <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

        {/* Modal */}
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} />
      </main>
    </>
  );
}
