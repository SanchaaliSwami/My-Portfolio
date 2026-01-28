
import { Project, Experience, EducationItem } from './types';

export const SKILLS = [
  'UI/UX Design',
  'Graphic Design',
  'Fine Art',
  'Digital Strategy',
  'Content Creation',
  'Project Management'
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'What Stays After Leaving',
    category: 'Exhibitions',
    description: 'Solo Showcase at The Truman Brewery, London. A bespoke collection of ink-on-wood exploring emotional resonance and spatial transformation through memory.',
    mediaUrl: 'https://picsum.photos/seed/sanchaali1/1000/1200',
    mediaType: 'image',
    year: '2025',
    tags: ['Solo Showcase', 'Ink on Wood', 'London', 'Memory']
  },
  {
    id: '2',
    title: '#JoinTheMovement',
    category: 'Digital Strategy',
    description: 'Multichannel promotional campaign for Fitness with Sonali. Designed and deployed assets to foster community participation in sustainable fitness.',
    mediaUrl: 'https://picsum.photos/seed/sanchaali2/1000/800',
    mediaType: 'image',
    year: '2024',
    tags: ['Campaign', 'Social Media', 'Community', 'Branding']
  },
  {
    id: '3',
    title: 'As We See It',
    category: 'Exhibitions',
    description: 'Undergraduate show at Leeds Arts University. Achieved 75% commercial success at The Art Market, demonstrating high market appeal.',
    mediaUrl: 'https://picsum.photos/seed/sanchaali3/1000/1300',
    mediaType: 'image',
    year: '2025',
    tags: ['Leeds Arts University', 'Commercial Success', 'Curating']
  },
  {
    id: '4',
    title: '#BalentineChallenge',
    category: 'Digital Strategy',
    description: 'Orchestrated a commercial campaign with targeted graphics and video content to drive user-generated content and brand interaction.',
    mediaUrl: 'https://picsum.photos/seed/sanchaali4/1000/1000',
    mediaType: 'image',
    year: '2024',
    tags: ['Video Content', 'UGC', 'Digital Marketing']
  },
  {
    id: '5',
    title: 'Conceptual Installation Practice',
    category: 'Fine Art',
    description: 'Multi-sensory installations utilizing found objects and audio-visual components to explore spatial storytelling.',
    mediaUrl: 'https://picsum.photos/seed/sanchaali5/1000/1100',
    mediaType: 'image',
    year: '2024',
    tags: ['Immersive Media', 'Audio-Visual', 'Installation']
  },
  {
    id: '6',
    title: 'Visual Identity & Content Strategy',
    category: 'Graphic Design',
    description: 'Curated consistent aesthetic for Fitness with Sonali, scaling Instagram to 325,000+ followers through high-impact reels and carousels.',
    mediaUrl: 'https://picsum.photos/seed/sanchaali6/1000/900',
    mediaType: 'image',
    year: '2023',
    tags: ['Branding', 'Growth', 'Reels', 'Social Media']
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Junior Creative Designer',
    company: 'MADHYA INFOSOFT PVT LTD',
    period: 'July 2025 – Present',
    location: 'Remote, UK',
    description: 'Orchestrating end-to-end marketing and promotional campaigns for diverse clients. Managing multi-client project timelines and stakeholder communication.'
  },
  {
    role: 'Assistant Tattoo Artist',
    company: 'Skin Deep Tattoo Design Studio',
    period: 'June 2023 – Aug 2023',
    location: 'Bangalore, India',
    description: 'Collaborated with senior artists to refine custom concepts using Adobe Photoshop and Procreate. Translated abstract client ideas into digital mock-ups.'
  },
  {
    role: 'Digital Brand Co-ordinator',
    company: 'Fitness with Sonali',
    period: '2021 – 2024',
    location: 'Bangalore, India',
    description: 'Spearheaded visual strategy scaling Instagram to over 325k followers. Led creative direction for major fitness initiatives like #JoinTheMovement.'
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'BA (Hons) Fine Art',
    school: 'Leeds Arts University',
    year: 'July 2025',
    details: 'Grade: 2:1 (Upper Second-Class Honors). Focus on Visual Communication, Conceptual Development, and Digital/Analog Media Integration.'
  },
  {
    degree: 'Google UX Design Professional Certificate',
    school: 'Online',
    year: 'Exp. April 2026',
    details: 'Focus on interdisciplinary design integration, bridging fine art principles with data-driven digital solutions.'
  }
];
