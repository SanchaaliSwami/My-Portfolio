
import React, { useState, useEffect, useRef } from 'react';
import { Project, SubProject } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [featuredMedia, setFeaturedMedia] = useState<{
    url: string, 
    type: 'image' | 'video', 
    title?: string, 
    description?: string,
    instagramUrl?: string
  } | null>(null);
  const [fullScreenAsset, setFullScreenAsset] = useState<{url: string, type: 'image' | 'video', title?: string} | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Initialize/Reset featured media when project changes
  useEffect(() => {
    if (project) {
      setFeaturedMedia({
        url: project.mediaUrl,
        type: project.mediaType,
        title: project.title,
        description: project.description,
        instagramUrl: project.instagramUrl
      });
    } else {
      setFeaturedMedia(null);
      setFullScreenAsset(null);
    }
  }, [project]);

  // Handle Escape key for both lightbox and modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullScreenAsset) {
          setFullScreenAsset(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullScreenAsset, onClose]);

  if (!project || !featuredMedia) return null;

  const handleSubProjectClick = (sub: SubProject) => {
    // Update main featured area for context
    setFeaturedMedia({
      url: sub.mediaUrl,
      type: sub.mediaType,
      title: sub.title,
      description: sub.description,
      instagramUrl: sub.instagramUrl
    });
    
    // Open in separate fullscreen viewer
    setFullScreenAsset({
      url: sub.mediaUrl,
      type: sub.mediaType,
      title: sub.title
    });
    
    // Smooth scroll back to top of the main modal content
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isMainFeatured = featuredMedia.url === project.mediaUrl;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-all overflow-y-auto custom-scrollbar">
      
      {/* High-End Fullscreen Lightbox Overlay */}
      {fullScreenAsset && (
        <div 
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setFullScreenAsset(null)}
        >
          <div className="absolute top-8 right-8 z-[210] flex gap-8 items-center">
            {fullScreenAsset.title && (
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 hidden md:block">{fullScreenAsset.title}</span>
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); setFullScreenAsset(null); }}
              className="text-white/60 hover:text-white transition-colors p-2"
              aria-label="Close Fullscreen"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {fullScreenAsset.type === 'video' ? (
              <video 
                src={fullScreenAsset.url} 
                controls 
                autoPlay 
                className="max-w-full max-h-full object-contain shadow-2xl"
              />
            ) : (
              <img 
                src={fullScreenAsset.url} 
                alt={fullScreenAsset.title || "Gallery View"} 
                className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-500" 
              />
            )}
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
             <p className="text-[9px] uppercase tracking-[0.5em] text-white/30">Scroll or Click Outside to Dismiss</p>
          </div>
        </div>
      )}

      <div 
        ref={modalContentRef}
        className="bg-white w-full max-w-6xl my-8 overflow-hidden rounded-sm relative shadow-2xl animate-in zoom-in-95 fade-in duration-300"
      >
        <div ref={topRef} className="absolute top-0 left-0 w-px h-px" />
        
        {/* Navigation / Header */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-white/90 backdrop-blur-sm md:bg-transparent">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all group font-semibold"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Portfolio</span>
          </button>
          
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col pt-20 md:pt-0">
          {/* Main Visual and Info Section */}
          <div className="flex flex-col md:flex-row border-b border-gray-50">
            <div 
              className="md:w-3/5 bg-gray-50 flex items-center justify-center min-h-[400px] relative overflow-hidden cursor-zoom-in group"
              onClick={() => setFullScreenAsset({ url: featuredMedia.url, type: featuredMedia.type, title: featuredMedia.title })}
            >
              {featuredMedia.type === 'video' ? (
                <video 
                  key={featuredMedia.url}
                  src={featuredMedia.url} 
                  controls 
                  autoPlay 
                  className="w-full h-auto max-h-[75vh] object-contain"
                />
              ) : (
                <img 
                  key={featuredMedia.url}
                  src={featuredMedia.url} 
                  alt={featuredMedia.title || project.title} 
                  className="w-full h-auto max-h-[75vh] object-contain animate-in fade-in duration-700" 
                />
              )}
              
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="bg-white/90 px-4 py-2 text-[8px] uppercase tracking-widest font-bold shadow-sm">Expand Fullscreen</div>
              </div>

              {!isMainFeatured && (
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 border border-black/5 shadow-sm animate-in slide-in-from-bottom-2">
                   <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-black">Detail View</p>
                </div>
              )}
            </div>

            <div className="md:w-2/5 p-8 md:p-16 flex flex-col justify-between bg-white">
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-4">{project.category}</p>
                  <h2 className="text-4xl md:text-5xl font-light text-gray-900 serif leading-tight">
                    {featuredMedia.title || project.title}
                  </h2>
                  {isMainFeatured && project.subtitle && (
                    <p className="text-lg md:text-xl text-gray-400 font-light mt-2 italic serif">{project.subtitle}</p>
                  )}
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg font-light">
                    {featuredMedia.description || project.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6">
                    {featuredMedia.instagramUrl && (
                      <a 
                        href={featuredMedia.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white bg-black hover:bg-gray-800 transition-all px-8 py-4 shadow-xl"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        View on Instagram
                      </a>
                    )}

                    {!isMainFeatured && (
                      <button 
                        onClick={() => setFeaturedMedia({ url: project.mediaUrl, type: project.mediaType, title: project.title, description: project.description, instagramUrl: project.instagramUrl })}
                        className="text-[9px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors flex items-center gap-2 group"
                      >
                        <svg className="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Back to Overview
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6 pt-6">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 border-b pb-2">Disciplines & Reach</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-50 border border-gray-100 text-[9px] uppercase tracking-wider text-gray-500 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-12 border-t border-gray-50 mt-12 flex justify-between items-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300">Project Year: {project.year}</p>
              </div>
            </div>
          </div>

          {/* Sub-Projects / Series Components Section */}
          {project.subProjects && project.subProjects.length > 0 && (
            <div className="p-8 md:p-16 bg-[#fafafa]">
              <div className="max-w-4xl mx-auto mb-16 text-center">
                <h3 className="text-[11px] uppercase tracking-[0.6em] text-gray-400 mb-4">Series Components</h3>
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-300 mb-8">Select a piece to view in fullscreen detail</p>
                <div className="w-12 h-[1px] bg-gray-200 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
                {project.subProjects.map((sub) => {
                  const isActive = featuredMedia.url === sub.mediaUrl;
                  
                  return (
                    <div 
                      key={sub.id} 
                      className={`group flex flex-col cursor-pointer transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                      onClick={() => handleSubProjectClick(sub)}
                    >
                      <div className={`aspect-[4/3] overflow-hidden bg-white mb-6 shadow-sm group-hover:shadow-xl transition-all duration-700 relative ${isActive ? 'ring-2 ring-black ring-offset-4' : ''}`}>
                        {sub.mediaType === 'video' ? (
                          <video 
                            src={sub.mediaUrl} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                            muted 
                            loop 
                            onMouseEnter={e => e.currentTarget.play()} 
                            onMouseLeave={e => {
                                if (!isActive) e.currentTarget.pause();
                            }} 
                          />
                        ) : (
                          <img 
                            src={sub.mediaUrl} 
                            alt={sub.title} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                          />
                        )}
                        
                        {/* Interactive Overlay Indicator */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <span className="bg-white/90 text-[8px] uppercase tracking-widest px-4 py-2 font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                             Open Fullscreen
                           </span>
                        </div>

                        {isActive && (
                          <div className="absolute top-4 right-4 bg-black text-white text-[8px] uppercase tracking-[0.3em] px-3 py-1.5 font-bold shadow-lg">
                            Active
                          </div>
                        )}

                        {sub.instagramUrl && (
                          <div className="absolute bottom-4 right-4 bg-white/90 p-1.5 shadow-md">
                            <svg className="w-3.5 h-3.5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="px-2">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className={`text-xl font-light serif transition-colors ${isActive ? 'text-black' : 'text-gray-800 group-hover:text-black'}`}>
                            {sub.title}
                          </h4>
                          {sub.instagramUrl && (
                            <a 
                              href={sub.instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-black border-b border-transparent hover:border-black transition-all pb-1"
                            >
                              Live Asset
                            </a>
                          )}
                        </div>
                        {sub.description && (
                          <p className="text-sm text-gray-500 font-light leading-relaxed max-w-sm">
                            {sub.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="p-12 border-t border-gray-50 flex justify-center bg-white">
            <button 
              onClick={onClose}
              className="px-12 py-4 border border-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black hover:text-white transition-all shadow-sm"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
