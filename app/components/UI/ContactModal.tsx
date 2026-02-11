"use client";
import React, { FormEvent } from "react";
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const techStack = [
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "HTML", icon: SiHtml5, color: "text-orange-500" },
  { name: "CSS", icon: SiCss3, color: "text-blue-500" },
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "NextJS", icon: SiNextdotjs, color: "text-black dark:text-white" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-sky-400" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
];

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggleModal }) => {
  const contact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Contact form submitted!");
  };

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg relative w-11/12 max-w-xl shadow-lg transition-colors duration-300">
        <button
          className="absolute top-2 right-2 text-black dark:text-white text-2xl"
          onClick={toggleModal}
        >
          ×
        </button>
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Contact Me:
        </h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          I am a Frontend Software Developer, passionate about building
          beautiful, functional, performant websites and apps.
        </p>
        <div className="flex flex-wrap gap-5 mb-4 justify-center">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
              >
                <Icon size={36} className={tech.color} />
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  {tech.name}
                </span>
              </div>
            );
          })}
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
            className=" m-auto bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
