"use client";
import React, { ReactNode } from "react";
import ProjectCard from "./UI/ProjectCard";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiPostman, SiStripe } from "react-icons/si";

type TechKey = "NextJS" | "Tailwind" | "Typescript" | "API" | "Stripe";

const techIconsMap: Record<TechKey, ReactNode> = {
  NextJS: <SiNextdotjs title="Next.js" className="w-5 h-5 mr-1" />,
  Tailwind: <SiTailwindcss title="TailwindCSS" className="w-5 h-5 mr-1" />,
  Typescript: <SiTypescript title="TypeScript" className="w-5 h-5 mr-1" />,
  API: <SiPostman title="API" className="w-5 h-5 mr-1" />,
  Stripe: <SiStripe title="Stripe" className="w-5 h-5 mr-1" />,
};

const projectList = [
  {
    title: "Skinstric Internship",
    overview: "Internship project demonstrating API integration and interactive front-end components.",
    tech: (["NextJS", "Tailwind", "Typescript", "API"] as TechKey[]).map((t) => techIconsMap[t]),
    imgSrc: "/assets/Skinstric.png",
    link: "https://skinstric-internship-eta.vercel.app/",
    codeLink: "https://github.com/Sikboy79/skinstric-internship",
  },
  {
    title: "Summarist Library",
    overview: "A library app that summarizes content and integrates Stripe for payments.",
    tech: (["NextJS", "Tailwind", "Typescript", "API", "Stripe"] as TechKey[]).map((t) => techIconsMap[t]),
    imgSrc: "/assets/Summarist.png",
    link: "https://ryan-advanced-virtual-internship.vercel.app/",
    codeLink: "https://github.com/Sikboy79/ryan-advanced-virtual-internship",
  },
  {
    title: "NFT Digital Asset Library",
    overview: "Showcases NFT collections with a dynamic front-end and API integration.",
    tech: (["NextJS", "Tailwind", "Typescript", "API"] as TechKey[]).map((t) => techIconsMap[t]),
    imgSrc: "/assets/ultraverse.png",
    link: "https://ryan-internship-theta.vercel.app/",
    codeLink: "https://github.com/Sikboy79/Ryan-internship",
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="w-full py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Here are some of my <span className="text-blue-500">projects</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((project, i) => (
            <ProjectCard
              key={i}
              title={project.title}
              overview={project.overview}
              tech={project.tech} 
              imgSrc={project.imgSrc}
              link={project.link}
              codeLink={project.codeLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;