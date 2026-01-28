
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Category, Project } from './types';
import { PROJECTS as INITIAL_PROJECTS, EXPERIENCES, EDUCATION, SKILLS } from './constants';
import { generateArtisticBio, generateCreativePrompt } from './services/geminiService';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [view, setView] = useState<'work' | 'about' | 'contact'>('work');
  const [aiBio, setAiBio] = useState<string>('');
  const [creativePrompt, setCreativePrompt] = useState<string>('');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  // Admin and Projects State
  const [isAdmin, setIsAdmin] = useState(false);
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Category Editing State
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryDraft, setCategoryDraft] = useState("");
  
  // Form values for real-time preview
  const [formMediaUrl, setFormMediaUrl] = useState('');
  const [formMediaType, setFormMediaType] = useState<'image' | 'video'>('image');

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
    return ['All', ...uniqueCategories];
  }, [projects]);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleRenameCategory = (oldName: string, newName: string) => {
    if (!newName || oldName === newName || newName.toLowerCase() === 'all') {
      setEditingCategory(null);
      return;
    }

    setProjects(prev => prev.map(p => 
      p.category === oldName ? { ...p, category: newName } : p
    ));
    
    if (activeCategory === oldName) {
      setActiveCategory(newName);
    }
    
    setEditingCategory(null);
  };

  /**
   * Cloudinary Optimization Transformer
   */
  const transformCloudinaryUrl = (url: string): string => {
    if (!url.includes('cloudinary.com')) return url;
    if (url.includes('q_auto')) return url;
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawUrl = e.target.value;
    const transformed = transformCloudinaryUrl(rawUrl);
    setFormMediaUrl(transformed);
  };

  const handleGenerateBio = useCallback(async () => {
    setIsGeneratingBio(true);
    const bio = await generateArtisticBio(
      "Sanchaali Swami", 
      "Leeds Arts University grad, Junior Creative Designer, UX Designer in training", 
      "Interdisciplinary, bridging traditional fine art with digital growth"
    );
    setAiBio(bio || '');
    setIsGeneratingBio(false);
  }, []);

  const handleGeneratePrompt = useCallback(async () => {
    setIsGeneratingPrompt(true);
    const prompt = await generateCreativePrompt();
    setCreativePrompt(prompt || '');
    setIsGeneratingPrompt(false);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Sanchaali Swami | Creative Portfolio',
      text: 'Check out the creative portfolio of Sanchaali Swami, Fine Art graduate and Graphic Designer.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEditProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditingProject(project);
    setFormMediaUrl(project.mediaUrl);
    setFormMediaType(project.mediaType);
    setIsFormOpen(true);
  };

  const handleOpenNewProject = () => {
    setEditingProject(null);
    setFormMediaUrl('');
    setFormMediaType('image');
    setIsFormOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.get('title') as string,
      category: formData.get('category') as Category,
      description: formData.get('description') as string,
      mediaUrl: formMediaUrl,
      mediaType: formMediaType,
      year: formData.get('year') as string,
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(t => t !== ''),
    };

    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? updatedProject : p));
    } else {
      setProjects(prev => [updatedProject, ...prev]);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };

  useEffect(() => {
    if (view === 'about' && !aiBio) {
      handleGenerateBio();
      handleGeneratePrompt();
    }
  }, [view, aiBio, handleGenerateBio, handleGeneratePrompt]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
      {/* Admin UI Overlay */}
      {isAdmin && (
        <div className="fixed bottom-8 left-8 z-50 no-print">
          <button 
            onClick={handleOpenNewProject}
            className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            title="Add Project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}

      {/* Admin Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                   <h2 className="text-3xl font-light serif">{editingProject ? 'Edit Project' : 'New Project'}</h2>
                   <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Cloudinary Media Manager</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] uppercase tracking-[0.2em] font-medium border border-blue-100">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"/></svg>
                    Cloud Optimized
                  </div>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left Column: Form Fields */}
                <form id="project-form" onSubmit={handleSaveProject} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400">Title</label>
                      <input name="title" defaultValue={editingProject?.title} required className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400">Category</label>
                      <select name="category" defaultValue={editingProject?.category} className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors bg-transparent">
                        {categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="Fine Art">Fine Art (Default)</option>
                        <option value="Graphic Design">Graphic Design (Default)</option>
                        <option value="Digital Strategy">Digital Strategy (Default)</option>
                        <option value="Exhibitions">Exhibitions (Default)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 pb-6 border-y border-gray-50 bg-gray-50/30 -mx-10 px-10">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 block">Media Hosting</label>
                    <p className="text-[9px] text-gray-500 leading-relaxed">
                      Upload your high-res files to Cloudinary and paste the URL below. 
                      The portfolio will automatically apply <span className="text-blue-600 font-bold">f_auto</span> and <span className="text-blue-600 font-bold">q_auto</span> for maximum performance.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2 relative">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Cloudinary URL</label>
                        <input 
                          name="mediaUrl" 
                          value={formMediaUrl} 
                          onChange={handleUrlChange}
                          required 
                          className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors text-xs truncate pr-8" 
                          placeholder="https://res.cloudinary.com/..." 
                        />
                        {formMediaUrl.includes('cloudinary.com') && (
                           <div className="absolute right-0 bottom-2 text-blue-500" title="Auto-Optimization Enabled">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 011.512-.306c.386.039.76.147 1.101.313.342.166.656.392.926.666.27.274.49.589.65.933a2.642 2.642 0 01.312 1.12c.002.394-.078.784-.236 1.144a2.64 2.64 0 01-.652.926 2.64 2.64 0 01-.933.65 2.642 2.642 0 01-1.12.312 2.64 2.64 0 01-1.144-.236 2.64 2.64 0 01-.926-.652 2.64 2.64 0 01-.65-.933 2.642 2.642 0 01-.312-1.12c-.001-.334.053-.666.16-.981a2.64 2.64 0 01.442-.832c-.02-.347-.03-.695-.03-1.045 0-1.282.156-2.548.463-3.766.307-1.218.754-2.366 1.332-3.411.578-1.045 1.28-1.96 2.083-2.695a1 1 0 00.384-1.45z" clipRule="evenodd" /></svg>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400">Media Type</label>
                        <select 
                          name="mediaType" 
                          value={formMediaType} 
                          onChange={(e) => setFormMediaType(e.target.value as any)}
                          className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors bg-transparent"
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400">Year</label>
                      <input name="year" defaultValue={editingProject?.year} required className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400">Tags (comma separated)</label>
                      <input name="tags" defaultValue={editingProject?.tags.join(', ')} className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors" placeholder="tag1, tag2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Description</label>
                    <textarea name="description" defaultValue={editingProject?.description} required rows={3} className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors resize-none" />
                  </div>
                </form>

                {/* Right Column: Media Preview */}
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Portfolio Preview</label>
                  <div className="aspect-[4/5] bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden group relative rounded-sm shadow-inner">
                    {formMediaUrl ? (
                      formMediaType === 'video' ? (
                        <video key={formMediaUrl} src={formMediaUrl} autoPlay muted loop className="w-full h-full object-cover" />
                      ) : (
                        <img key={formMediaUrl} src={formMediaUrl} alt="Preview" className="w-full h-full object-cover" />
                      )
                    ) : (
                      <div className="text-gray-300 text-[10px] uppercase tracking-widest text-center px-8">
                        No Cloudinary link provided.
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-gray-400 font-mono">
                    <span className="truncate max-w-[200px]">{formMediaUrl ? 'Active URL' : 'Awaiting Link...'}</span>
                    {formMediaUrl.includes('cloudinary.com') && (
                       <span className="text-blue-500 font-bold uppercase tracking-widest">f_auto, q_auto</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-6 pt-12 mt-8 border-t border-gray-50">
                <button type="button" onClick={() => setIsFormOpen(false)} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Cancel</button>
                <button form="project-form" type="submit" className="bg-black text-white px-10 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-gray-800 transition-all">Save Project</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Header (Only visible in PDF) */}
      <div className="print-header px-4">
        <h1 className="text-4xl uppercase tracking-[0.3em] font-light mb-2">Sanchaali Swami</h1>
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">Fine Art Graduate & Junior Creative Designer</p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-gray-400">
          <span>swamisanchaali@gmail.com</span>
          <span>+44 7522 266132</span>
          <span>LinkedIn: sanchaaliswami</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md px-8 py-6 flex justify-between items-center border-b border-gray-100 no-print">
        <div className="flex flex-col">
          <span className="text-xl tracking-[0.2em] font-light uppercase cursor-pointer" onClick={() => {setView('work'); setActiveCategory('All'); window.scrollTo(0,0);}}>
            Sanchaali Swami
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Fine Art & Digital Design</span>
        </div>
        <div className="flex items-center space-x-12">
          <div className="hidden md:flex space-x-12">
            {['work', 'about', 'contact'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v as any)}
                className={`text-xs uppercase tracking-[0.3em] transition-all hover:opacity-100 ${view === v ? 'opacity-100 border-b border-black pb-1' : 'opacity-40'}`}
              >
                {v}
              </button>
            ))}
          </div>
          <button 
            onClick={handleShare}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] border border-black/10 px-4 py-2 hover:bg-black hover:text-white transition-all"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {copyStatus === 'copied' ? 'Link Copied' : 'Share'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-20 px-8 max-w-[1600px] mx-auto w-full">
        {view === 'work' && (
          <section className="animate-in fade-in duration-700">
            {/* Dynamic Filter Bar with Rename Ability */}
            <div className="mb-16 flex flex-wrap gap-8 justify-center no-print filter-bar">
              {categories.map((cat) => (
                <div key={cat} className="relative group flex items-center gap-2">
                  {editingCategory === cat && cat !== 'All' ? (
                    <input 
                      autoFocus
                      className="text-[10px] uppercase tracking-[0.3em] font-semibold border-b border-black outline-none w-32 bg-transparent"
                      value={categoryDraft}
                      onChange={(e) => setCategoryDraft(e.target.value)}
                      onBlur={() => handleRenameCategory(cat, categoryDraft)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameCategory(cat, categoryDraft);
                        if (e.key === 'Escape') setEditingCategory(null);
                      }}
                    />
                  ) : (
                    <>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`text-[10px] uppercase tracking-[0.3em] transition-all ${activeCategory === cat ? 'text-black font-semibold underline underline-offset-8' : 'text-gray-400 hover:text-black'}`}
                      >
                        {cat}
                      </button>
                      {isAdmin && cat !== 'All' && (
                        <button 
                          onClick={() => {
                            setEditingCategory(cat);
                            setCategoryDraft(cat);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-blue-500"
                        >
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="project-grid">
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
              {isAdmin && (
                <div 
                  onClick={handleOpenNewProject}
                  className="aspect-[4/5] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 hover:text-black hover:border-black transition-all cursor-pointer group"
                >
                  <svg className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-[10px] uppercase tracking-widest text-center px-4">Link New Cloudinary Asset</span>
                </div>
              )}
            </div>
          </section>
        )}

        {view === 'about' && (
          <section className="max-w-4xl mx-auto py-12 animate-in slide-in-from-bottom-4 duration-700">
            <div className="grid md:grid-cols-2 gap-20">
              <div className="order-2 md:order-1">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-5xl font-light text-gray-900 leading-tight">
                    Bridging fine art principles with data-driven digital solutions.
                  </h2>
                  <button 
                    onClick={handleDownloadPDF}
                    className="no-print hidden md:flex items-center gap-2 text-[10px] uppercase tracking-widest bg-black text-white px-6 py-3 hover:bg-gray-800 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    PDF Version
                  </button>
                </div>
                
                <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
                  {isGeneratingBio ? (
                    <div className="animate-pulse space-y-4 no-print">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  ) : (
                    <div className="prose prose-lg">
                      {aiBio.split('\n\n').map((para, i) => <p key={i} className="mb-6">{para}</p>)}
                      <button 
                        onClick={handleGenerateBio} 
                        className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center gap-2 no-print"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Regenerate Artistic Statement
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-20">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 pb-2 border-b">Professional Experience</h4>
                  <div className="space-y-12">
                    {EXPERIENCES.map((exp, i) => (
                      <div key={i} className="experience-item">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-xl font-medium">{exp.role}</h5>
                          <span className="text-xs text-gray-400">{exp.period}</span>
                        </div>
                        <p className="text-gray-500 mb-2 uppercase text-xs tracking-wider">{exp.company} | {exp.location}</p>
                        <p className="text-gray-600 leading-relaxed text-sm">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Prompt Section */}
                <div className="mt-20 p-8 border border-gray-100 bg-gray-50/50 rounded-sm no-print">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xs uppercase tracking-[0.3em] text-gray-400">Creative Sparks (AI Prompt)</h4>
                    <button 
                      onClick={handleGeneratePrompt}
                      disabled={isGeneratingPrompt}
                      className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors disabled:opacity-30"
                    >
                      {isGeneratingPrompt ? 'Imagining...' : 'New Idea'}
                    </button>
                  </div>
                  <div className="min-h-[80px] flex items-center justify-center">
                    {isGeneratingPrompt ? (
                      <div className="flex space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                      </div>
                    ) : (
                      <p className="serif text-2xl text-gray-800 text-center italic font-light leading-snug">
                        "{creativePrompt}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-20">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 pb-2 border-b">Expertise & Skills</h4>
                  <div className="flex flex-wrap gap-3">
                    {SKILLS.map((skill, i) => (
                      <span key={i} className="px-5 py-2 border border-gray-100 text-[10px] uppercase tracking-widest text-gray-600 hover:border-black hover:text-black transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-20">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 pb-2 border-b">Education & Certification</h4>
                  <div className="space-y-12">
                    {EDUCATION.map((edu, i) => (
                      <div key={i} className="education-item">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-xl font-medium">{edu.degree}</h5>
                          <span className="text-xs text-gray-400">{edu.year}</span>
                        </div>
                        <p className="text-gray-500 mb-2 uppercase text-xs tracking-wider">{edu.school}</p>
                        <p className="text-gray-600 leading-relaxed text-sm">{edu.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden sticky top-40 no-print">
                  <img 
                    src="https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1/sample" 
                    alt="Placeholder Portrait" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'contact' && (
          <section className="max-w-2xl mx-auto py-24 text-center animate-in zoom-in-95 duration-700 no-print">
            <h2 className="text-6xl font-light mb-8">Let's create something together.</h2>
            <p className="text-xl text-gray-500 mb-16 leading-relaxed">
              Open for collaborations, UX research projects, or creative inquiries in Leeds and beyond.
            </p>
            
            <div className="space-y-4">
              <a href="mailto:swamisanchaali@gmail.com" className="block text-3xl font-light hover:text-gray-500 transition-colors">swamisanchaali@gmail.com</a>
              <p className="text-lg text-gray-400">+44 7522 266132</p>
              <div className="flex justify-center space-x-12 mt-12">
                <a href="https://www.linkedin.com/in/sanchaaliswami" target="_blank" className="text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors">LinkedIn</a>
                <a href="https://sanchaaliswami.my.canva.site/" target="_blank" className="text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors">Original Portfolio</a>
                <a href="#" className="text-[10px] uppercase tracking-[0.3em] hover:text-gray-400 transition-colors">Behance</a>
              </div>
            </div>
            
            <form className="mt-24 text-left space-y-8 no-print" onSubmit={(e) => e.preventDefault()}>
               <div className="border-b border-gray-200 py-4">
                  <input type="text" placeholder="NAME" className="w-full bg-transparent outline-none text-xs uppercase tracking-widest placeholder:text-gray-300" />
               </div>
               <div className="border-b border-gray-200 py-4">
                  <input type="email" placeholder="EMAIL" className="w-full bg-transparent outline-none text-xs uppercase tracking-widest placeholder:text-gray-300" />
               </div>
               <div className="border-b border-gray-200 py-4">
                  <textarea placeholder="MESSAGE" rows={4} className="w-full bg-transparent outline-none text-xs uppercase tracking-widest placeholder:text-gray-300 resize-none"></textarea>
               </div>
               <button type="submit" className="bg-black text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-gray-800 transition-all">Send Inquiry</button>
            </form>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="px-8 py-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-gray-400 border-t border-gray-100 no-print">
        <div className="mb-4 md:mb-0 flex items-center gap-4">
          <p>&copy; 2025 Sanchaali Swami. Leeds Arts University Alumna.</p>
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className={`opacity-20 hover:opacity-100 transition-opacity ${isAdmin ? 'text-black opacity-100' : ''}`}
            title="Admin Mode"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className="flex gap-8 items-center">
          <button onClick={handleDownloadPDF} className="hover:text-black transition-colors flex items-center gap-1">
             <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             PDF Portfolio
          </button>
          <button onClick={handleShare} className="hover:text-black transition-colors flex items-center gap-1">
             <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
             {copyStatus === 'copied' ? 'Link Copied' : 'Share Portfolio'}
          </button>
          <a href="mailto:swamisanchaali@gmail.com" className="hover:text-black transition-colors">Contact</a>
          <a href="https://www.linkedin.com/in/sanchaaliswami" target="_blank" className="hover:text-black transition-colors">LinkedIn</a>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

export default App;
