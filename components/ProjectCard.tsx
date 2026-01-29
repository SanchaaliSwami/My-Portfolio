
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  isAdmin?: boolean;
  onEdit?: (e: React.MouseEvent, project: Project) => void;
  onDelete?: (e: React.MouseEvent, id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, isAdmin, onEdit, onDelete }) => {
  return (
    <div 
      className="group cursor-pointer overflow-hidden bg-white transition-all duration-500 hover:shadow-xl relative"
      onClick={() => onClick(project)}
    >
      {/* Admin Controls Overlay */}
      {isAdmin && (
        <div className="absolute top-4 left-4 z-30 flex gap-2 no-print">
          <button 
            onClick={(e) => onEdit?.(e, project)}
            className="p-2 bg-white/90 hover:bg-black hover:text-white rounded-full shadow-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button 
            onClick={(e) => onDelete?.(e, project.id)}
            className="p-2 bg-white/90 hover:bg-red-500 hover:text-white rounded-full shadow-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}

      {/* Media Container with Aspect Ratio */}
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-50 w-full">
        {project.mediaType === 'video' ? (
          <video 
            src={project.mediaUrl} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            muted
            loop
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
          />
        ) : (
          <img 
            src={project.mediaUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        )}
        
        {/* Hover Overlay: Increased font sizes for better impact */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center p-8 md:p-12 text-center backdrop-blur-[3px]">
          <div className="space-y-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-white text-base md:text-lg leading-relaxed font-light line-clamp-3 italic serif">
              {project.description}
            </p>
            <div className="w-8 h-[1px] bg-white/40 mx-auto"></div>
            <span className="text-[10px] md:text-[11px] text-white/90 uppercase tracking-[0.5em] font-semibold border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all">
              Explore Project
            </span>
          </div>
        </div>
      </div>

      {/* Project Info: Always shown below the media */}
      <div className="py-5 px-1 bg-white">
        <h3 className="text-xl md:text-2xl font-light text-gray-900 group-hover:text-black transition-colors serif tracking-tight">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-3 mt-0.5 italic">
            {project.subtitle}
          </p>
        )}
        <div className="flex justify-between items-center mt-2">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-semibold">
            {project.category}
          </p>
          <span className="text-[10px] text-gray-300 font-medium tabular-nums">{project.year}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
