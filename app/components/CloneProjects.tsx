"use client";
import React from "react";
import ProjectCard from "./UI/ProjectCard";

const projectList = [
  {
    title: "MacBook Pro Clone",
    overview: "Front-end clone of MacBook Pro landing page replicating layout and responsive design.",
    tech: "HTML, CSS, JavaScript",
    imgSrc: "/assets/MacBook.png",
    link: "https://skinstric-internship-eta.vercel.app/",
    codeLink: "https://github.com/yourusername/macbook-clone",
  },
  {
    title: "Netflix Clone",
    overview: "Recreated Netflix UI with responsive grids, navigation, and media cards using React and Tailwind.",
    tech: "React, Tailwind",
    imgSrc: "/assets/netflix.png",
    link: "https://ryan-advanced-virtual-internship.vercel.app/",
    codeLink: "https://github.com/yourusername/netflix-clone",
  },
  // {
  //   title: "NFT Digital Asset Library",
  //   overview: "Next.js project showcasing NFT assets with interactive cards and API integration.",
  //   tech: "Next.js, Tailwind",
  //   imgSrc: "/assets/ultraverse.png",
  //   link: "https://ryan-internship-theta.vercel.app/",
  //   codeLink: "https://github.com/yourusername/nft-digital-library",
  // },
];


const CloneProjects: React.FC = () => {
  return (
    <section
      id="clone-projects"
      className="w-full py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Here are some of my{" "}
          <span className="text-blue-500">cloned projects</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((project, i) => (
            <ProjectCard
              key={i}
              title={project.title}
              overview={project.overview} // one-line overview
              tech={project.tech}
              imgSrc={project.imgSrc}
              link={project.link}
              codeLink={project.codeLink} // GitHub link
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CloneProjects;