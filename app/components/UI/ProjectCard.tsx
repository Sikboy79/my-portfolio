"use client";
import React from "react";

interface ProjectCardProps {
  title: string;
  tech: string;
  imgSrc: string;
  link?: string; // optional link
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, tech, imgSrc, link }) => {
  const cardContent = (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-300 cursor-pointer">
      <img src={imgSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300">{tech}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
};

export default ProjectCard;
