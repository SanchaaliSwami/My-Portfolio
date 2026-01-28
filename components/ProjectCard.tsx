
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
      className="group cursor-pointer overflow-hidden bg-white transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-transparent hover:border-gray-100 relative"
      onClick={() => onClick(project)}
    >
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

      <div className="relative overflow-hidden aspect-[4/5] bg-gray-50">
        {project.mediaType === 'video' ? (
          <video 
            src={project.mediaUrl} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            muted
            loop
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
          />
        ) : (
          <img 
            src={project.mediaUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white border border-white px-4 py-2 uppercase text-xs tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {project.mediaType === 'video' ? 'Play' : 'View Project'}
          </span>
        </div>
      </div>
      <div className="py-6 px-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">{project.category} / {project.year}</p>
        <h3 className="text-2xl font-light text-gray-900 group-hover:text-black transition-colors">{project.title}</h3>
      </div>
    </div>
  );
};

export default ProjectCard;
