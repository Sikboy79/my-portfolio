"use client";

import React, { FormEvent, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const contact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: formData.get("user_name"),
          user_email: formData.get("user_email"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      event.currentTarget.reset();

      // close after short delay
      setTimeout(() => {
        toggleModal();
        setStatus("idle");
      }, 1200);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-2xl shadow-2xl p-8 relative animate-in fade-in zoom-in-95">

        {/* Close */}
        <button
          onClick={toggleModal}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black dark:hover:text-white"
        >
          ×
        </button>

        {/* Header */}
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Contact Me
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Have a project or opportunity? Send me a message and I’ll reply soon.
        </p>

        {/* Tech icons */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-xs hover:scale-110 transition"
              >
                <Icon size={28} className={tech.color} />
                <span className="text-gray-600 dark:text-gray-300">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={contact} className="flex flex-col gap-3">

          <input
            name="user_name"
            placeholder="Your name"
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />

          <input
            name="user_email"
            type="email"
            placeholder="Your email"
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />

          <textarea
            name="message"
            placeholder="Your message"
            rows={4}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 resize-none"
          />

          {/* Status messages */}
          {status === "success" && (
            <p className="text-green-600 text-sm text-center">
              ✅ Message sent successfully!
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 text-sm text-center">
              ❌ Failed to send. Try again.
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
