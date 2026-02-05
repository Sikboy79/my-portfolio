"use client";

import { useState } from "react";
import Head from "next/head";
import ThreeDCardHolder from "./components/3dCardHolder";

type MouseEventType = React.MouseEvent<HTMLElement>;
type FormEventType = React.FormEvent<HTMLFormElement>;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contrastToggle, setContrastToggle] = useState<boolean>(false);
  const scaleFactor: number = 1 / 20;

  // Shapes images
  // const shapes = [
  //   "/assets/png-test1.jpg",
  //   "/assets/imgshapeblue1.jpg",
  //   "/assets/imgred1.jpg",
  //   "/assets/imgshapeblue1.jpg",
  //   "/assets/imgyellow.jpg",
  //   "/assets/png-test1.jpg",
  //   "/assets/imgred1.jpg",
  //   "/assets/png-test1.jpg",
  //   "/assets/imgshapeblue1.jpg",
  // ];

  // // Move shapes with mouse
  // const moveBackground = (event: MouseEventType) => {
  //   const allShapes = document.querySelectorAll<HTMLElement>(".shape");
  //   const x = event.clientX * scaleFactor;
  //   const y = event.clientY * scaleFactor;
  //   allShapes.forEach((shape, i) => {
  //     const boolInt = i % 2 !== 0 ? -1 : 1;
  //     shape.style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  //   });
  // };

  // Dark mode toggle
  const toggleContrast = () => {
    setContrastToggle(!contrastToggle);
    document.body.classList.toggle("dark-theme");
  };

  // Modal toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.classList.toggle("modal--open");
  };

  // Contact form (placeholder)
  const contact = (event: FormEventType) => {
    event.preventDefault();
    alert("Contact form submitted!");
  };

  return (
    <>
      <Head>
        <title>AdvancedPortfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://kit.fontawesome.com/1e4cf527a0.js" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
      </Head>

      <main className="relative w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Landing Page */}
        <section
          id="landing-page"
          // onMouseMove={moveBackground}
          className="relative w-full min-h-screen overflow-hidden"
        >
          {/* Navbar */}
          <nav className="absolute top-0 left-0 w-full flex justify-between items-center py-4 px-6 md:px-12 z-20">
            <figure>
              <img id="personal-logo" src="/assets/MRCB&W.png" alt="Logo" className="h-12 md:h-16" />
            </figure>
            <ul className="flex gap-6 text-gray-800 dark:text-white font-medium">
              <li onClick={toggleModal} className="hover:text-blue-500 cursor-pointer">About</li>
              <li className="hover:text-blue-500 cursor-pointer">Projects</li>
              <li onClick={toggleModal} className="hover:text-blue-500 cursor-pointer">Contacts</li>
              <li onClick={toggleContrast} className="cursor-pointer text-xl">
                <i className="fa-solid fa-circle-half-stroke"></i>
              </li>
            </ul>
          </nav>

          {/* Header */}
          <header className="relative z-10 text-center mt-32 md:mt-48 px-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-snug">Hey</h1>
            <h1 className="text-5xl md:text-7xl font-bold text-blue-500 leading-snug mt-2">I'm Ryan.</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              I am a <b className="text-blue-500">Frontend Simplified software student</b>. Looking forward to an exciting career in software development.
              <br />
              Here is more <b className="text-blue-500 cursor-pointer" onClick={toggleModal}>About Me</b>.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 justify-center mt-8 text-2xl text-gray-700 dark:text-gray-300 relative">
              <a href="https://github.com" target="_blank" rel="noreferrer"><i className="fab fa-github hover:text-blue-500"></i></a>
              <a href="#"><i className="fa-solid fa-file-pdf hover:text-blue-500"></i></a>
              <a href="/assets/David Bragg Resume.pdf" target="_blank" rel="noreferrer"><i className="fab fa-linkedin hover:text-blue-500"></i></a>
            </div>
          </header>
          {/* 3D Card Holder */}
        <ThreeDCardHolder />

          {/* Shapes */}
          {/* {shapes.map((src, i) => (
            <img
              key={i}
              src={src}
              className={`shape absolute w-24 h-24 md:w-32 md:h-32 ${i % 2 === 0 ? "top-10 left-10" : "top-20 right-10"}`}
              alt={`Shape ${i}`}
            />
          ))} */}

          {/* Scroll button */}
          <a href="#projects" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20">
            <div className="w-6 h-6 border-b-2 border-r-2 border-gray-700 dark:border-white rotate-45 animate-bounce"></div>
          </a>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              Here are some of my <span className="text-blue-500">projects</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <img
                    src="/assets/blinker-mockup.png"
                    alt={`Project ${i + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <h3 className="font-bold text-lg">Project {i + 1}</h3>
                    <p className="text-sm">HTML, CSS, JavaScript</p>
                    <div className="flex gap-2 mt-2">
                      <a href="#" className="hover:text-blue-500"><i className="fab fa-github"></i></a>
                      <a href="#" className="hover:text-blue-500"><i className="fab fa-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Modal */}
        {isModalOpen && (
          <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg relative w-11/12 max-w-xl shadow-lg transition-colors duration-300">
              <button
                className="absolute top-2 right-2 text-black dark:text-white text-2xl"
                onClick={toggleModal}
              >
                ×
              </button>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">About Me</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                I am a Frontend Software Student, passionate about building beautiful, functional websites and apps.
              </p>
              <div className="flex gap-4 mb-4">
                {["JavaScript", "HTML", "CSS", "React"].map((lang, idx) => (
                  <div key={idx} className="text-center">
                    <img src={`https://via.placeholder.com/50`} alt={lang} className="mx-auto mb-1" />
                    <span className="text-gray-800 dark:text-gray-200">{lang}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={contact} className="flex flex-col gap-2">
                <input type="text" name="user_name" placeholder="Name" required className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"/>
                <input type="email" name="user_email" placeholder="Email" required className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"/>
                <textarea name="message" placeholder="Message" required className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"/>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 transition-colors">Send</button>
              </form>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="w-full py-8 bg-gray-800 dark:bg-gray-900 text-white text-center">
          <p>© 2026 Ryan Cook</p>
        </footer>
      </main>
    </>
  );
}