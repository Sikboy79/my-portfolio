import React, { FormEvent, useState } from "react";

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
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">

        {/* Close */}
        <button
          onClick={toggleModal}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black dark:hover:text-white"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Contact Me
        </h2>

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
              ❌ Something went wrong. Try again.
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
