"use client";
import React from "react";
import ProjectCard from "./UI/ProjectCard";

const projectList = [
  {
    title: "Mac book pro clone ",
    tech: "HTML, CSS, JavaScript",
    imgSrc: "/assets/MacBook.png",
    link: "https://skinstric-internship-eta.vercel.app/",
  },
  {
    title: "Netflix clone",
    tech: "React, Tailwind",
    imgSrc: "/assets/Summarist.png",
    link: "https://ryan-advanced-virtual-internship.vercel.app/",
  },
  {
    title: "NFT digital asset library",
    tech: "Next.js, Tailwind",
    imgSrc: "/assets/ultraverse.png",
    link: "https://ryan-internship-theta.vercel.app/",
  },
];

const CloneProjects: React.FC = () => {
  return (
    <section
      id="projects"
      className="w-full py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Here are some of my <span className="text-blue-500">cloned projects</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projectList.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CloneProjects;