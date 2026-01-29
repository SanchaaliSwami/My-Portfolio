
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Category, Project, SubProject } from './types';
import { PROJECTS as INITIAL_PROJECTS, EXPERIENCES, SKILLS } from './constants';
import { generateArtisticBio, generateCreativePrompt } from './services/geminiService';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [view, setView] = useState<'about' | 'work' | 'contact'>('about');
  const [aboutTab, setAboutTab] = useState<'statement' | 'experience' | 'skills'>('statement');
  const [aiBio, setAiBio] = useState<string>('');
  const [creativePrompt, setCreativePrompt] = useState<string>('');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const transformCloudinaryUrl = (url: string): string => {
    if (!url || !url.includes('cloudinary.com')) return url;
    if (url.includes('/f_auto')) return url; // Already transformed
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  };

  const isVideoUrl = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.wmv', '.avi'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  // Admin and Projects State
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('portfolio_admin') === 'true');
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    const initial = saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    return initial.map((p: Project) => ({
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

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  // Category Editing State
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryDraft, setCategoryDraft] = useState("");
  
  // Form values for real-time preview
  const [formMediaUrl, setFormMediaUrl] = useState('');
  const [formMediaType, setFormMediaType] = useState<'image' | 'video'>('image');

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_profile_image', profileImage);
  }, [profileImage]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(projects.map(p => p.category)));
    
    // Explicit priority order for categories
    const priority = ['Fine Art', 'Exhibitions', 'Digital Products & Design', 'ANIMATION'];
    
    uniqueCategories.sort((a, b) => {
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

  const handleRenameCategory = (oldName: string, newName: string) => {
    if (!newName || oldName === newName || newName.toLowerCase() === 'all') {
      setEditingCategory(null);
      return;
    }
    setProjects(prev => prev.map(p => 
      p.category === oldName ? { ...p, category: newName } : p
    ));
    if (activeCategory === oldName) setActiveCategory(newName);
    setEditingCategory(null);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const transformed = transformCloudinaryUrl(url);
    setFormMediaUrl(transformed);
    // Auto-detect type
    if (isVideoUrl(url)) {
      setFormMediaType('video');
    } else {
      setFormMediaType('image');
    }
  };

  const handleUpdateProfileImage = () => {
    const newUrl = window.prompt('Paste your Cloudinary Image URL here:', profileImage);
    if (newUrl !== null && newUrl.trim() !== '') {
      setProfileImage(transformCloudinaryUrl(newUrl.trim()));
    }
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
      try { await navigator.share(shareData); } catch (err) { console.log('Share failed', err); }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
      } catch (err) { console.error('Failed to copy', err); }
    }
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
    
    const subUrls = (formData.get('subProjectUrls') as string).split(',').map(s => s.trim()).filter(s => s !== '');
    const subProjects: SubProject[] = subUrls.map((url, i) => {
      const isVideo = isVideoUrl(url);
      return {
        id: `${editingProject?.id || 'new'}-sub-${i}`,
        title: `View ${i + 1}`,
        mediaUrl: isVideo ? url : transformCloudinaryUrl(url), // Don't q_auto videos as much as images if not needed, Cloudinary handles it
        mediaType: isVideo ? 'video' : 'image'
      };
    });

    const updatedProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      category: formData.get('category') as Category,
      description: formData.get('description') as string,
      mediaUrl: formMediaUrl,
      mediaType: formMediaType,
      year: formData.get('year') as string,
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(t => t !== ''),
      subProjects: subProjects.length > 0 ? subProjects : editingProject?.subProjects
    };

    if (editingProject) {
      setProjects(prev => prev.map(p => p.id === editingProject.id ? updatedProject : p));
    } else {
      setProjects(prev => [updatedProject, ...prev]);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const generateExportCode = () => {
    const projectsCode = JSON.stringify(projects, null, 2);
    return `// Copy and paste this into constants.ts to make your changes permanent globally
export const PROJECTS: Project[] = ${projectsCode};

// Update your profile image URL in App.tsx or constants.ts with:
// "${profileImage}"`;
  };

  const handleCopyExport = () => {
    navigator.clipboard.writeText(generateExportCode());
    alert('Code copied! You can now paste this into your constants.ts file on GitHub.');
  };

  useEffect(() => {
    if (view === 'about' && !aiBio) {
      handleGenerateBio();
      handleGeneratePrompt();
    }
  }, [view, aiBio, handleGenerateBio, handleGeneratePrompt]);

  const handleNavClick = (v: 'about' | 'work' | 'contact') => {
    setView(v);
    setIsMobileMenuOpen(false);
    if (v === 'work') {
      setActiveCategory('All');
      setSelectedProject(null);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-black selection:text-white bg-[#fdfdfd]">
      
      {isAdmin && (
        <div className="fixed bottom-8 left-8 z-[100] no-print flex flex-col gap-4">
          <button 
            onClick={() => setIsExportOpen(true)}
            className="w-12 h-12 bg-white text-black border border-black rounded-full flex items-center justify-center shadow-2xl hover:bg-black hover:text-white transition-all transform hover:scale-105"
            title="Export for GitHub"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 16a2 2 0 012-2h4a2 2 0 012 2v2m-6-12l3 3m0 0l3-3m-3 3v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button 
            onClick={handleOpenNewProject}
            className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            title="Add Project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}

      {isExportOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl p-8 rounded-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light serif">Export Config for GitHub</h2>
              <button onClick={() => setIsExportOpen(false)} className="text-gray-400 hover:text-black">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Copy the code below and paste it into your <code className="bg-gray-100 px-1">constants.ts</code> file to make your current browser edits permanent for all visitors.
            </p>
            <pre className="bg-gray-50 p-6 rounded text-[10px] overflow-auto max-h-[50vh] border border-gray-100 custom-scrollbar">
              {generateExportCode()}
            </pre>
            <button 
              onClick={handleCopyExport}
              className="w-full mt-8 bg-black text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                   <h2 className="text-3xl font-light serif">{editingProject ? 'Edit Project' : 'New Project'}</h2>
                   <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Cloudinary Media Manager</p>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-black">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <form id="project-form" onSubmit={handleSaveProject} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400">Title</label>
                      <input name="title" defaultValue={editingProject?.title} required className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400">Subtitle (Optional)</label>
                      <input name="subtitle" defaultValue={editingProject?.subtitle} className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors" placeholder="e.g., Scaling Social Presence" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400">Category</label>
                      <select name="category" defaultValue={editingProject?.category} className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors bg-transparent">
                        {categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="Fine Art">Fine Art</option>
                        <option value="Exhibitions">Exhibitions</option>
                        <option value="ANIMATION">ANIMATION</option>
                        <option value="Digital Products & Design">Digital Products & Design</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400">Year</label>
                      <input name="year" defaultValue={editingProject?.year} required className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 pb-6 border-y border-gray-50 bg-gray-50/30 -mx-10 px-10">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 block">Media Hosting</label>
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
                        {formMediaUrl.toLowerCase().endsWith('.heic') && (
                          <span className="absolute -bottom-5 left-0 text-[8px] text-blue-500 uppercase tracking-widest font-bold">HEIC Detected — Auto-Optimizing...</span>
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

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Tags (comma separated)</label>
                    <input name="tags" defaultValue={editingProject?.tags.join(', ')} className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors" placeholder="tag1, tag2" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Description</label>
                    <textarea name="description" defaultValue={editingProject?.description} required rows={3} className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors resize-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400">Series Assets (comma-separated URLs)</label>
                    <textarea name="subProjectUrls" defaultValue={editingProject?.subProjects?.map(s => s.mediaUrl).join(', ')} rows={2} className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors resize-none" placeholder="https://url1, https://url2" />
                  </div>
                </form>

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
                        Link Required
                      </div>
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

      {/* Header / Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 no-print">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-start">
            <h1 
              className="text-xl md:text-3xl tracking-[0.2em] font-light uppercase cursor-pointer text-black hover:opacity-70 transition-opacity serif"
              onClick={() => handleNavClick('about')}
            >
              Sanchaali Swami
            </h1>
            <span className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-gray-400 mt-0.5">Bridging Ink & Pixel</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-12">
              {(['about', 'work', 'contact'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => handleNavClick(v)}
                  className={`text-[11px] md:text-xs uppercase tracking-[0.3em] font-medium transition-all relative py-1 ${
                    view === v 
                    ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-black' 
                    : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {v === 'work' ? 'Portfolio' : v}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-black"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
            
            <button 
              onClick={handleShare}
              className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] border border-black px-4 py-2 hover:bg-black hover:text-white transition-all font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{copyStatus === 'copied' ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-500 no-print md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-500 flex flex-col p-12 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-semibold">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-black">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="flex flex-col gap-12">
            {(['about', 'work', 'contact'] as const).map((v) => (
              <button
                key={v}
                onClick={() => handleNavClick(v)}
                className={`text-2xl uppercase tracking-[0.2em] font-light text-left transition-all serif ${
                  view === v ? 'text-black pl-4 border-l-2 border-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                {v === 'work' ? 'Portfolio' : v}
              </button>
            ))}
          </div>
          <div className="mt-auto space-y-6">
            <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300">Socials</p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/sanchaaliswami" target="_blank" className="text-gray-400 hover:text-black text-[10px] uppercase tracking-widest transition-colors font-medium">LinkedIn</a>
              <a href="mailto:swamisanchaali@gmail.com" className="text-gray-400 hover:text-black text-[10px] uppercase tracking-widest transition-colors font-medium">Email</a>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow pt-32 md:pt-40 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
        {view === 'work' && (
          <section className="animate-in fade-in duration-700">
            <div className="mb-12 md:mb-16 flex flex-wrap gap-6 md:gap-10 justify-center no-print border-b border-gray-50 pb-8">
              {categories.map((cat) => (
                <div key={cat} className="relative group flex items-center gap-2">
                  {editingCategory === cat && cat !== 'All' ? (
                    <input 
                      autoFocus
                      className="text-[10px] uppercase tracking-[0.3em] font-semibold border-b border-black outline-none w-32 bg-transparent text-black"
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
                        className={`text-[10px] uppercase tracking-[0.3em] transition-all font-medium py-1 ${
                          activeCategory === cat 
                          ? 'text-black border-b border-black' 
                          : 'text-gray-400 hover:text-black'
                        }`}
                      >
                        {cat}
                      </button>
                      {isAdmin && cat !== 'All' && (
                        <button 
                          onClick={() => {
                            setEditingCategory(cat);
                            setCategoryDraft(cat);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-blue-500"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {activeCategory !== 'All' && (
              <button 
                onClick={() => setActiveCategory('All')}
                className="mb-8 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors flex items-center gap-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Back to All Projects
              </button>
            )}

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
                <button 
                  onClick={handleOpenNewProject}
                  className="aspect-[4/5] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 hover:text-black hover:border-black transition-all group rounded-sm"
                >
                  <svg className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-[11px] uppercase tracking-widest">Link New Asset</span>
                </button>
              )}
            </div>
          </section>
        )}

        {view === 'about' && (
          <section className="max-w-5xl mx-auto py-12 animate-in slide-in-from-bottom-6 duration-700">
            <div className="flex flex-wrap gap-8 md:gap-12 justify-center mb-16 border-b border-gray-50 pb-8 no-print">
              {(['statement', 'experience', 'skills'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAboutTab(tab)}
                  className={`text-[10px] uppercase tracking-[0.3em] transition-all font-medium py-1 ${
                    aboutTab === tab 
                    ? 'text-black border-b border-black' 
                    : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {tab === 'statement' ? 'Artistic Statement' : tab === 'experience' ? 'Selected Experience' : 'Skills & Disciplines'}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
              <div className="order-2 md:order-1 space-y-12">
                {aboutTab === 'statement' && (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-12">
                    <h2 className="text-4xl md:text-6xl font-light text-gray-900 leading-[1.1] serif">
                      Bridging fine art with contemporary digital strategy.
                    </h2>
                    
                    <div className="text-gray-700 text-lg md:text-xl leading-relaxed font-light space-y-8">
                      {isGeneratingBio ? (
                        <div className="animate-pulse space-y-4 no-print">
                          <div className="h-4 bg-gray-100 rounded w-full"></div>
                          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {aiBio.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                          <button 
                            onClick={handleGenerateBio} 
                            className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors flex items-center gap-2 no-print border border-gray-100 px-4 py-2 hover:border-black"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Regenerate Artistic Statement
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {aboutTab === 'experience' && (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <h4 className="text-[11px] uppercase tracking-[0.4em] text-gray-400 mb-8 pb-3 border-b">Selected Experience</h4>
                    <div className="space-y-12">
                      {EXPERIENCES.map((exp, i) => (
                        <div key={i} className="group">
                          <div className="flex justify-between items-baseline mb-2">
                            <h5 className="text-xl md:text-2xl font-light serif text-black">{exp.role}</h5>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">{exp.period}</span>
                          </div>
                          <p className="text-gray-500 mb-3 uppercase text-[10px] tracking-[0.2em] font-medium">{exp.company} — {exp.location}</p>
                          <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {aboutTab === 'skills' && (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="mb-16 p-8 bg-gray-50/50 rounded-sm">
                      <h5 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">Multidisciplinary Focus</h5>
                      <p className="text-gray-600 font-light leading-relaxed">
                        My practice is defined by the intersection of physical artistry and digital functionality. Leveraging a deep foundation in Fine Arts to inform user-centric design and high-growth social strategy.
                      </p>
                    </div>
                    
                    <h4 className="text-[11px] uppercase tracking-[0.4em] text-gray-400 mb-8 pb-3 border-b">Skills & Disciplines</h4>
                    <div className="flex flex-wrap gap-4">
                      {SKILLS.map((skill, i) => (
                        <span key={i} className="px-6 py-3 border border-gray-100 text-[11px] uppercase tracking-[0.2em] text-gray-600 hover:border-black hover:text-black transition-all font-medium cursor-default bg-white shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="order-1 md:order-2 sticky top-48">
                <div className="aspect-[4/5] bg-gray-50 overflow-hidden rounded-sm shadow-xl no-print relative group">
                  <img 
                    src={profileImage} 
                    alt="Sanchaali Swami Portrait" 
                    className="w-full h-full object-cover grayscale brightness-[1.02] contrast-[0.98] hover:grayscale-0 transition-all duration-1000"
                  />
                  {isAdmin && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={handleUpdateProfileImage}
                        className="bg-white text-black px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all shadow-xl"
                      >
                        Replace Portrait
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'contact' && (
          <section className="max-w-2xl mx-auto py-20 text-center animate-in zoom-in-95 duration-700 no-print">
            <h2 className="text-5xl md:text-7xl font-light mb-10 serif">Let's create.</h2>
            <p className="text-xl md:text-2xl text-gray-500 mb-16 leading-relaxed font-light">
              Available for visual strategy, UX design, and interdisciplinary collaborations.
            </p>
            
            <div className="space-y-8 mb-20">
              <a href="mailto:swamisanchaali@gmail.com" className="block text-2xl md:text-4xl font-light hover:text-gray-500 transition-colors border-b border-gray-100 pb-4 inline-block serif italic">swamisanchaali@gmail.com</a>
              <div className="flex justify-center gap-12 mt-12">
                <a href="https://www.linkedin.com/in/sanchaaliswami" target="_blank" className="text-[10px] uppercase tracking-[0.3em] hover:text-black transition-colors font-medium text-gray-400">LinkedIn</a>
                <a href="https://sanchaaliswami.my.canva.site/" target="_blank" className="text-[10px] uppercase tracking-[0.3em] hover:text-black transition-colors font-medium text-gray-400">Canva Site</a>
              </div>
            </div>
            
            <form className="text-left space-y-10 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
               <div className="group border-b border-gray-200 focus-within:border-black transition-colors pb-4">
                  <input type="text" placeholder="YOUR NAME" className="w-full bg-transparent outline-none text-[11px] uppercase tracking-[0.2em] placeholder:text-gray-300 text-black font-medium" />
               </div>
               <div className="group border-b border-gray-200 focus-within:border-black transition-colors pb-4">
                  <input type="email" placeholder="YOUR EMAIL" className="w-full bg-transparent outline-none text-[11px] uppercase tracking-[0.2em] placeholder:text-gray-300 text-black font-medium" />
               </div>
               <div className="group border-b border-gray-200 focus-within:border-black transition-colors pb-4">
                  <textarea placeholder="HOW CAN WE COLLABORATE?" rows={4} className="w-full bg-transparent outline-none text-[11px] uppercase tracking-[0.2em] placeholder:text-gray-300 text-black font-medium resize-none"></textarea>
               </div>
               <button type="submit" className="w-full bg-black text-white px-12 py-5 text-[11px] uppercase tracking-[0.4em] hover:bg-gray-800 transition-all font-bold">Send Message</button>
            </form>
          </section>
        )}
      </main>

      <footer className="px-8 md:px-12 py-16 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-gray-400 border-t border-gray-100 no-print gap-10">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <p className="font-medium">&copy; 2025 Sanchaali Swami</p>
          <span className="hidden md:block opacity-30">|</span>
          <p>Leeds Arts University Alumna</p>
          <button 
            onClick={toggleAdminMode}
            className={`flex items-center gap-2 px-3 py-1 rounded-sm transition-all ${isAdmin ? 'text-black bg-gray-100 font-bold' : 'opacity-20 hover:opacity-100 text-gray-500'}`}
            title={isAdmin ? "Exit Workspace Mode" : "Enter Workspace Mode"}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isAdmin ? (
                <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
            <span className="text-[9px]">{isAdmin ? 'ADMIN ACTIVE' : 'ADMIN'}</span>
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-10 items-center font-medium">
          <button onClick={handleShare} className="hover:text-black transition-colors">Share Portfolio</button>
          <a href="mailto:swamisanchaali@gmail.com" className="hover:text-black transition-colors">Email</a>
          <a href="https://www.linkedin.com/in/sanchaaliswami" target="_blank" className="hover:text-black transition-colors">LinkedIn</a>
        </div>
      </footer>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

export default App;
