"use client";

import React, { ReactNode } from "react";
import ProjectCard from "./UI/ProjectCard";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPostman,
  SiStripe,
} from "react-icons/si";

type TechKey = "NextJS" | "Tailwind" | "Typescript" | "API" | "Stripe";

const techIconsMap: Record<TechKey, ReactNode> = {
  NextJS: <SiNextdotjs title="Next.js" className="w-5 h-5" />,
  Tailwind: <SiTailwindcss title="TailwindCSS" className="w-5 h-5" />,
  Typescript: <SiTypescript title="TypeScript" className="w-5 h-5" />,
  API: <SiPostman title="API Integration" className="w-5 h-5" />,
  Stripe: <SiStripe title="Stripe Payments" className="w-5 h-5" />,
};

const projectList = [
  {
    title: "Skinstric Internship",
    slug: "skinstric",
    overview:
      "Internship project demonstrating API integration and interactive front-end components.",
    tech: ["NextJS", "Tailwind", "Typescript", "API"] as TechKey[],
    link: "https://skinstric-internship-eta.vercel.app/",
    codeLink: "https://github.com/Sikboy79/skinstric-internship",
  },
  {
    title: "Summarist Library",
    slug: "ultraverse",
    overview:
      "A library app that summarizes content and integrates Stripe for payments.",
    tech: ["NextJS", "Tailwind", "Typescript", "API", "Stripe"] as TechKey[],
    link: "https://ryan-advanced-virtual-internship-c1c6n1qas.vercel.app/",
    codeLink: "https://github.com/Sikboy79/ryan-advanced-virtual-internship",
  },
  {
    title: "NFT Digital Asset Library",
    slug: "ultraverse",
    overview:
      "Showcases NFT collections with a dynamic front-end and API integration.",
    tech: ["NextJS", "Tailwind", "Typescript", "API"] as TechKey[],
    link: "https://ryan-internship-theta.vercel.app/",
    codeLink: "https://github.com/Sikboy79/Ryan-internship",
  },
];

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="w-full py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Here are some of my <span className="text-blue-500">projects</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              slug={project.slug} 
              overview={project.overview}
              tech={project.tech.map((t) => techIconsMap[t])}
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
