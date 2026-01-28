
import React from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-black transition-colors z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/5 bg-gray-50 flex items-center justify-center">
            {project.mediaType === 'video' ? (
              <video 
                src={project.mediaUrl} 
                controls 
                autoPlay 
                className="w-full h-auto max-h-[80vh]"
              />
            ) : (
              <img src={project.mediaUrl} alt={project.title} className="w-full h-auto object-contain" />
            )}
          </div>
          <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">{project.category}</p>
              <h2 className="text-4xl font-light mb-6 text-gray-900">{project.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">{project.description}</p>
              
              <div className="mb-8">
                <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">Project Details</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-[10px] uppercase tracking-wider text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-100">
              <p className="text-sm italic text-gray-400">Created in {project.year}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
