"use client";
import React from "react";
import ProjectCard from "./ProjectCard";

const projectList = [
  { title: "Project 1", tech: "HTML, CSS, JavaScript", imgSrc: "/assets/blinker-mockup.png" },
  { title: "Project 2", tech: "React, Tailwind", imgSrc: "/assets/blinker-mockup.png" },
  { title: "Project 3", tech: "Next.js, Tailwind", imgSrc: "/assets/blinker-mockup.png" },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="w-full py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Here are some of my <span className="text-blue-500">projects</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectList.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
