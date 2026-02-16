"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  slug: string;
  overview: string;
  tech: React.ReactNode[];
  link: string;
  codeLink: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  slug,
  overview,
  tech,
  link,
  codeLink,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const imgSrc = `/assets/${slug}.png`;
  const videoSrc = `/mp4/${slug}.mp4`;

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image / Video Container */}
      <div className="relative w-full h-56 overflow-hidden">

        {/* Optimized Next.js Image */}
        <Image
          src={imgSrc}
          alt={title}
          fill
          unoptimized 
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-all duration-500 ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
          priority={false}
        />

        {/* Hover Video */}
        <video
          src={isHovered ? videoSrc : undefined}
          muted
          loop
          autoPlay
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {overview}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((icon, i) => (
            <span key={i}>{icon}</span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm font-medium"
          >
            Live Demo
          </a>

          <a
            href={codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:underline text-sm font-medium"
          >
            Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
