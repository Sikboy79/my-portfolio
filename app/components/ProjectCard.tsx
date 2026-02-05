"use client";
import React from "react";

interface ProjectCardProps {
  title: string;
  tech: string;
  imgSrc: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, tech, imgSrc }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm">{tech}</p>
        <div className="flex gap-2 mt-2">
          <a href="#" className="hover:text-blue-500"><i className="fab fa-github"></i></a>
          <a href="#" className="hover:text-blue-500"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
