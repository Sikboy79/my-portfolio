"use client";

import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggleModal }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const contact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = event.currentTarget;

    // Safely get values
    const user_name = form.user_name?.value?.toString().trim();
    const user_email = form.user_email?.value?.toString().trim();
    const message = form.message?.value?.toString().trim();

    if (!user_name || !user_email || !message) {
      console.log("Form validation failed", { user_name, user_email, message });
      setStatus("error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name, user_email, message }),
      });

      console.log("Fetch response", res.status);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      console.log("Data received from API", data);

      if (!data.success) throw new Error("API returned false");

      setStatus("success");
      form.reset();

      setTimeout(() => {
        toggleModal();
      }, 1200);
    } catch (err) {
      console.error("Contact error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={toggleModal}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black dark:hover:text-white"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Contact Me</h2>

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

          {status === "success" && (
            <p className="text-green-600 text-sm text-center">
              ✅ Message sent!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm text-center">
              ❌ Something went wrong again. Try again.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
