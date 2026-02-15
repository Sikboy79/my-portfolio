"use client";
import React, { ReactNode } from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  overview: string;
  tech: ReactNode | ReactNode[]; // accept a single icon or array of icons
  imgSrc: string;
  link?: string;
  codeLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  overview,
  tech,
  imgSrc,
  link,
  codeLink,
}) => {
  // ensure tech is always an array
  const techArray = Array.isArray(tech) ? tech : [tech];

  const cardContent = (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:border-blue-400 border-2 border-transparent overflow-hidden transform transition duration-300 cursor-pointer flex flex-col">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <Image
          src={imgSrc}
          alt={`Screenshot of ${title} project`}
          fill
          className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          placeholder="blur"
          blurDataURL="/assets/placeholder.png"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">{overview}</p>

          {/* Tech icons */}
          <div className="flex flex-wrap gap-2 mt-2">
            {techArray.map((icon, i) => (
              <span key={i} className="flex items-center" title={(icon as any)?.props?.title}>
                {icon}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition"
            >
              Live Demo
            </a>
          )}
          {codeLink && (
            <a
              href={codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-full transition"
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (link && !codeLink) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
};

export default ProjectCard;