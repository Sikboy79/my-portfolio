"use client";

import { useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaCube } from "react-icons/fa";
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiFirebase, SiRedux, SiVercel, SiFigma, SiJest, SiStripe } from "react-icons/si";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b dark:border-gray-700">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
            My Resume
          </h2>
          <div className="flex gap-3">
            {/* Download PDF without icons */}
            <a
              href="/assets/Tecresume.pdf"
              download
              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
            >
              Download
            </a>
            <button
              onClick={onClose}
              className="text-2xl text-gray-700 dark:text-gray-300 hover:text-red-500"
            >
              ×
            </button>
          </div>
        </div>

        {/* Resume content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center border-b border-gray-300 dark:border-gray-600 pb-4">
            <div>
              <h1 className="text-3xl font-bold">RYAN COOK</h1>
              <h2 className="text-xl text-blue-600 dark:text-blue-400 mt-1">Frontend Developer</h2>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-3 text-sm">
              <div className="flex items-center gap-2"><FaMapMarkerAlt /> Denver, CO USA</div>
              <div className="flex items-center gap-2"><FaEnvelope /> TheSikworks@gmail.com</div>
              <div className="flex items-center gap-2"><FaLinkedin /> <a href="https://www.linkedin.com/feed/" className="underline hover:text-blue-500">LinkedIn</a></div>
              <div className="flex items-center gap-2"><FaGithub /> <a href="https://github.com/Sikboy79" className="underline hover:text-gray-500">GitHub</a></div>
            </div>
          </div>

          {/* Summary */}
          <section>
            <h3 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-600 pb-1 mb-2">Summary</h3>
            <p>
              Versatile Frontend Developer with 1+ year of experience building responsive, high-performance web applications. Skilled in Next.js, React, TypeScript, Firebase, and TailwindCSS. Passionate about creating scalable, user-friendly solutions with clean code and modern UI design. Experienced in collaborating in remote environments.
            </p>
          </section>

          {/* Professional Experience */}
          <section>
            <h3 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-600 pb-1 mb-2">Professional Experience</h3>
            <div className="mb-4">
              <h4 className="font-bold">Skinstric AI – Remote | Jan 2026 – Feb 2026</h4>
              <p className="italic text-sm mb-1">Frontend Engineer - Internship | <a href="https://skinstric-internship-eta.vercel.app" className="underline text-blue-500 hover:text-blue-400">Live Demo</a></p>
              <ul className="list-disc list-inside ml-2">
                <li>Created a real-time skin analysis platform using OpenAI Vision API and Next.js.</li>
                <li>Built responsive UI with TailwindCSS and TypeScript-powered animations for dynamic skincare recommendation.</li>
                <li>Optimized performance using Next.js Server Components, achieving sub-2-second analysis times.</li>
                <li>Developed a modular TailwindCSS component library, enabling rapid testing and scaling of layouts.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold">Frontend Simplified – Remote | June 2025 – Feb 2026</h4>
              <p className="italic text-sm">Frontend Developer (Student & Intern)</p>
              <ul className="list-disc list-inside ml-2">
                <li>Built fullstack projects with Next.js, React, CSS, JavaScript, and Firebase/Firestore.</li>
                <li>Developed responsive, interactive UIs with TailwindCSS and TypeScript.</li>
                <li>Integrated APIs, managed state, and deployed projects with Vercel.</li>
              </ul>
            </div>
          </section>

          {/* Key Projects */}
          <section>
            <h3 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-600 pb-1 mb-2">Key Projects</h3>
            {[
              {
                title: "Search API Summarist Library",
                demo: "https://ryan-advanced-virtual-internship-c1c6n1qas.vercel.app/",
                github: "https://github.com/Sikboy79/ryan-advanced-virtual-internship",
                bullets: [
                  "Engineered a fully functional book search platform supporting books, summaries, and audio.",
                  "Implemented dynamic routing, loading states, and responsive UI for seamless end-user experience."
                ]
              },
              {
                title: "Ultraverse NFT Search API Project",
                demo: "https://ryan-internship-theta.vercel.app/",
                github: "https://github.com/Sikboy79/Ryan-internship",
                bullets: [
                  "Built a searchable NFT platform with responsive UI, real-time data fetching, and dynamic content displays."
                ]
              },
              {
                title: "MacBook Pro Clone",
                demo: "#",
                github: "https://github.com/Sikboy79/macbookPro-Clone_React",
                bullets: [
                  "Recreated Apple’s MacBook Pro product page using React, ThreeJS, and TailwindCSS.",
                  "Implemented responsive layouts, interactive components, and 3D animations."
                ]
              },
              {
                title: "Netflix Clone",
                demo: "#",
                github: "https://github.com/Sikboy79/Netflix-clone-fullstack",
                bullets: [
                  "Developed a fullstack streaming platform clone with authentication, movie browsing, and responsive design.",
                  "Integrated Firebase backend and React Query for optimized data fetching and caching."
                ]
              }
            ].map((proj, idx) => (
              <div key={idx} className="mb-4 p-3 border rounded-lg border-gray-300 dark:border-gray-600 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-md">{proj.title}</h4>
                <p className="text-sm mb-1">
                  <a href={proj.demo} className="underline text-blue-500 hover:text-blue-400 mr-2">Live Demo</a>
                  <a href={proj.github} className="underline text-gray-500 hover:text-gray-400">GitHub</a>
                </p>
                <ul className="list-disc list-inside ml-2">
                  {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </section>

          {/* Technical Skills */}
          <section>
            <h3 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-600 pb-1 mb-2">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <SiTypescript />, label: "TypeScript" },
                { icon: <SiReact />, label: "React" },
                { icon: <SiNextdotjs />, label: "Next.js" },
                { icon: <SiTailwindcss />, label: "TailwindCSS" },
                { icon: <SiFirebase />, label: "Firebase" },
                { icon: <SiRedux />, label: "Redux" },
                { icon: <SiVercel />, label: "Vercel" },
                { icon: <SiFigma />, label: "Figma" },
                { icon: <SiJest />, label: "Jest" },
                { icon: <SiStripe />, label: "Stripe" },
                 { icon: <FaCube />, label: "Three.js" }
              ].map((skill, idx) => (
                <span key={idx} className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-medium">
                  {skill.icon} {skill.label}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-600 pb-1 mb-2">Education</h3>
            <p>Frontend Simplified – Certificate | June 2025 – Feb 2026</p>
          </section>

          {/* Interests */}
          <section>
            <h3 className="text-lg font-semibold border-b border-gray-300 dark:border-gray-600 pb-1 mb-2">Interests</h3>
            <p>Custom Fabrication, Competitive Shooting, Snowboarding</p>
          </section>
        </div>
      </div>
    </div>
  );
}