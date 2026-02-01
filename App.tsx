import React, { useState, useEffect, useMemo } from 'react';
import { Category, Project } from './types';
import { PROJECTS as INITIAL_PROJECTS, EXPERIENCES, SKILLS, EDUCATION } from './constants';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';

// Root component for the Portfolio Application
const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [view, setView] = useState<'about' | 'work' | 'contact'>('work');
  const [aboutTab, setAboutTab] = useState<'statement' | 'experience' | 'skills'>('statement');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const transformCloudinaryUrl = (url: string): string => {
    if (!url || !url.includes('cloudinary.com')) return url;
    if (url.includes('/f_auto')) return url; 
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  };

  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('portfolio_admin') === 'true');
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    let baseProjects = INITIAL_PROJECTS;
    
    if (saved) {
      try {
        const savedProjects: Project[] = JSON.parse(saved);
        // We merge: take all projects from constants.ts, and add any custom ones from localStorage
        // This ensures new hardcoded projects always appear.
        const constantIds = new Set(INITIAL_PROJECTS.map(p => p.id));
        const customProjects = savedProjects.filter(p => !constantIds.has(p.id));
        
        // Also check if existing hardcoded projects were updated (like subProjects count)
        // We favor the constants.ts version for hardcoded IDs unless they were edited? 
        // For simplicity in this dev environment, we'll sync subProjects from constants.
        baseProjects = INITIAL_PROJECTS.map(p => {
          const savedVersion = savedProjects.find(sp => sp.id === p.id);
          return savedVersion ? { ...savedVersion, subProjects: p.subProjects } : p;
        });
        
        baseProjects = [...baseProjects, ...customProjects];
      } catch (e) {
        console.error("Error parsing saved projects", e);
      }
    }

    return baseProjects.map((p: Project) => ({
      ...p,
      mediaUrl: transformCloudinaryUrl(p.mediaUrl),
      subProjects: p.subProjects?.map(s => ({ ...s, mediaUrl: transformCloudinaryUrl(s.mediaUrl) }))
    }));
  });

  const [profileImage, setProfileImage] = useState(() => {
    const saved = localStorage.getItem('portfolio_profile_image');
    const defaultUrl = 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689885/IMG_1214_wvle47.heic';
    return transformCloudinaryUrl(saved || defaultUrl);
  });

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_profile_image', profileImage);
  }, [profileImage]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
    const priority = ['Social Media Content & Branding', 'Fine Art', 'Exhibitions', 'Animation'];
    
    uniqueCategories.sort((a: string, b: string) => {
      const indexA = priority.indexOf(a);
      const indexB = priority.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    return ['All', ...uniqueCategories];
  }, [projects]);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const toggleAdminMode = () => {
    const nextState = !isAdmin;
    setIsAdmin(nextState);
    localStorage.setItem('portfolio_admin', nextState ? 'true' : 'false');
  };

  const handleUpdateProfileImage = () => {
    const newUrl = window.prompt('Paste your Cloudinary Image URL here:', profileImage);
    if (newUrl !== null && newUrl.trim() !== '') {
      setProfileImage(transformCloudinaryUrl(newUrl));
    }
  };

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Delete this project forever?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEditProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    // Logic for editing would go here
  };

  const staticStatement = "I am a multidisciplinary artist and designer bridging fine art principles with contemporary digital strategy. A graduate of Leeds Arts University, my practice explores spatial storytelling and visual communication across physical and digital mediums. With a focus on emotional resonance and tactile exploration, I strive to create immersive experiences that translate material memory into the digital landscape.";

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 selection:bg-black selection:text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => setView('work')}>
            <h1 className="text-xl font-light tracking-[0.2em] uppercase">Sanchaali Swami</h1>
            <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 font-medium">Portfolio 2025</span>
          </div>
          
          <div className="hidden md:flex items-center gap-12">
            {(['work', 'about', 'contact'] as const).map((item) => (
              <button 
                key={item}
                onClick={() => setView(item)}
                className={`text-[11px] uppercase tracking-[0.4em] font-semibold transition-all ${view === item ? 'text-black' : 'text-gray-400 hover:text-black'}`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={toggleAdminMode}
              className={`p-2 rounded-full transition-colors ${isAdmin ? 'bg-black text-white' : 'text-gray-300 hover:text-black'}`}
              title="Toggle Portfolio Admin"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16m-7 6h7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        {view === 'work' && (
          <div className="max-w-7xl mx-auto px-6 animate-in fade-in duration-500">
            <div className="flex flex-wrap gap-x-12 gap-y-6 mb-16 items-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-all ${activeCategory === cat ? 'text-black' : 'text-gray-300 hover:text-gray-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {filteredProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={setSelectedProject}
                  isAdmin={isAdmin}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'about' && (
          <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-20 items-start">
              <div className="space-y-8">
                <div className="relative group aspect-[4/5] overflow-hidden bg-gray-100 shadow-sm">
                  <img src={profileImage} alt="Portrait" className="w-full h-full object-cover" />
                  {isAdmin && (
                    <button 
                      onClick={handleUpdateProfileImage}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] uppercase tracking-widest font-bold backdrop-blur-sm"
                    >
                      Change Portrait
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-12">
                <div className="flex gap-10 border-b border-gray-100 pb-4">
                  {(['statement', 'experience', 'skills'] as const).map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setAboutTab(tab)}
                      className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${aboutTab === tab ? 'text-black' : 'text-gray-300 hover:text-black'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="min-h-[400px]">
                  {aboutTab === 'statement' && (
                    <div className="space-y-8">
                      <div className="prose prose-lg text-gray-700 font-light leading-relaxed serif">
                        <p>{staticStatement}</p>
                      </div>
                    </div>
                  )}

                  {aboutTab === 'experience' && (
                    <div className="space-y-12">
                      {EXPERIENCES.map((exp, i) => (
                        <div key={i} className="border-l border-gray-100 pl-8 relative">
                          <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-gray-200 -translate-x-1/2" />
                          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{exp.period}</p>
                          <h4 className="text-xl font-medium text-gray-900">{exp.role}</h4>
                          <p className="text-sm text-gray-500 mb-4">{exp.company} — {exp.location}</p>
                          <p className="text-sm font-light leading-relaxed text-gray-600 max-w-lg">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {aboutTab === 'skills' && (
                    <div className="grid grid-cols-1 gap-12">
                      <div className="space-y-6">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-400">Core Expertise</h4>
                        <div className="flex flex-wrap gap-3">
                          {SKILLS.map(skill => (
                            <span key={skill} className="px-5 py-2.5 bg-gray-50 border border-gray-100 text-[10px] uppercase tracking-widest font-medium text-gray-600">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-400">Academic Background</h4>
                        {EDUCATION.map((edu, i) => (
                          <div key={i} className="group">
                            <h5 className="text-sm font-semibold text-gray-800">{edu.school}</h5>
                            <p className="text-xs text-gray-500 mb-2">{edu.degree} · {edu.year}</p>
                            <p className="text-xs text-gray-400 font-light max-w-md">{edu.details}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'contact' && (
          <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-16 animate-in zoom-in-95 duration-700">
            <h2 className="text-5xl md:text-8xl font-light serif tracking-tight">Connect with the vision.</h2>
            <div className="space-y-8">
               <p className="text-gray-400 text-[10px] uppercase tracking-[0.5em]">UK · IN · Global Connectivity</p>
               <div className="flex flex-col items-center gap-12 pt-8">
                  <a href="mailto:swamisanchaali@gmail.com" className="text-2xl md:text-4xl font-light hover:text-gray-400 transition-colors border-b border-black/10 pb-4">
                    swamisanchaali@gmail.com
                  </a>
                  <div className="flex gap-12 items-center">
                    {['Instagram', 'LinkedIn', 'Portfolio'].map(social => (
                      <a key={social} href="#" className="text-[10px] uppercase tracking-[0.3em] font-bold hover:opacity-50 transition-opacity">
                        {social}
                      </a>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}
      </main>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default App;
