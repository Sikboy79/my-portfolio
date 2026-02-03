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

  // Move shapes with mouse
  const moveBackground = (event: MouseEventType) => {
    const shapes = document.querySelectorAll<HTMLElement>(".shape");
    const x = event.clientX * scaleFactor;
    const y = event.clientY * scaleFactor;
    shapes.forEach((shape, i) => {
      const boolInt = i % 2 !== 0 ? -1 : 1;
      shape.style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
    });
  };

  // Dark mode toggle
  const toggleContrast = () => {
    setContrastToggle(!contrastToggle);
    document.body.classList.toggle("dark-theme");
  };

  // Modal toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.classList.toggle("modal--open");Next
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
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                About Me
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                I am a Frontend Software Student, passionate about building
                beautiful, functional websites and apps.
              </p>
              <div className="flex gap-4 mb-4">
                {["JavaScript", "HTML", "CSS", "React"].map((lang, idx) => (
                  <div key={idx} className="text-center">
                    <img
                      src={`https://via.placeholder.com/50`}
                      alt={lang}
                      className="mx-auto mb-1"
                    />
                    <span className="text-gray-800 dark:text-gray-200">
                      {lang}
                    </span>
                  </div>
                ))}
              </div>
              <form onSubmit={contact} className="flex flex-col gap-2">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Name"
                  required
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Email"
                  required
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  required
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 transition-colors"
                >
                  Send
                </button>
              </form>
              <div className="modal__overlay modal__overlay--loading hidden">
                Loading...
              </div>
              <div className="modal__overlay modal__overlay--success hidden">
                Message sent!
              </div>
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
