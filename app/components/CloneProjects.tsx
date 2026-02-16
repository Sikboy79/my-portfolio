"use client";
import React, { ReactNode } from "react";
import ProjectCard from "./UI/ProjectCard";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

type TechKey = "HTML" | "CSS" | "JavaScript" | "React" | "Tailwind";

const techIconsMap: Record<TechKey, ReactNode> = {
  HTML: <SiHtml5 title="HTML" className="w-5 h-5 mr-1" />,
  CSS: <SiCss3 title="CSS" className="w-5 h-5 mr-1" />,
  JavaScript: <SiJavascript title="JavaScript" className="w-5 h-5 mr-1" />,
  React: <SiReact title="React" className="w-5 h-5 mr-1" />,
  Tailwind: <SiTailwindcss title="TailwindCSS" className="w-5 h-5 mr-1" />,
};

const projectList = [
  {
    title: "MacBook Pro Clone",
    slug: "macbook",
    overview:
      "Front-end clone of MacBook Pro landing page replicating layout and responsive design.",
    tech: (["HTML", "CSS", "JavaScript"] as TechKey[]).map(
      (t) => techIconsMap[t],
    ),
    link: "",
    codeLink: "https://github.com/Sikboy79/macbookPro-Clone_React",
  },
  {
    title: "Netflix Clone",
    slug: "netflix",
    overview:
      "Recreated Netflix UI with responsive grids, navigation, and media cards using React and Tailwind.",
    tech: (["React", "Tailwind"] as TechKey[]).map((t) => techIconsMap[t]),
    link: "",
    codeLink: "https://github.com/Sikboy79/Netflix-clone-fullstack",
  },
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
              key={project.title}
              title={project.title}
              slug={project.slug}
              overview={project.overview}
              tech={project.tech}
              link={project.link}
              codeLink={project.codeLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CloneProjects;
