
import { Project, Experience, EducationItem } from './types';

export const SKILLS = [
  'UI/UX Design',
  'Graphic Design',
  'Fine Art',
  'Digital Strategy',
  'Social Media Strategy',
  'Content Creation',
  'Client Management'
];

export const PROJECTS: Project[] = [
  {
    id: 'studio-work-01',
    title: 'Studio Work',
    subtitle: 'A Collection of Academic & Personal Studies',
    category: 'Fine Art',
    description: 'An expansive series of works produced within the Leeds Arts University studios. This collection represents a deep dive into material exploration, from tactile charcoal studies to experimental resin casting and traditional oil techniques.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690954/IMG_6462_tau83v.jpg',
    mediaType: 'image',
    year: '2022-2025',
    tags: ['Studio Practice', 'Process', 'Multidisciplinary', 'Academic'],
    subProjects: [
      {
        id: 'sw-1',
        title: 'Material Study I: Resin & Rust',
        mediaUrl: 'https://picsum.photos/seed/sw1/800/1000',
        mediaType: 'image',
        description: 'Exploring the intersection of industrial decay and modern synthetic materials.'
      },
      {
        id: 'sw-2',
        title: 'Large Format Charcoal',
        mediaUrl: 'https://picsum.photos/seed/sw2/1000/800',
        mediaType: 'image',
        description: 'Gesticular drawing focusing on the anatomical tension of the human form.'
      },
      {
        id: 'sw-3',
        title: 'Oil on Copper Study',
        mediaUrl: 'https://picsum.photos/seed/sw3/800/800',
        mediaType: 'image',
        description: 'Miniature portraits painted on reactive metal surfaces.'
      },
      {
        id: 'sw-4',
        title: 'Studio Environment',
        mediaUrl: 'https://picsum.photos/seed/sw4/1200/800',
        mediaType: 'image',
        description: 'Documentation of the creative space at Leeds Arts University.'
      },
      {
        id: 'sw-5',
        title: 'Textile Manipulation',
        mediaUrl: 'https://picsum.photos/seed/sw5/800/1000',
        mediaType: 'image',
        description: 'Deconstructing and reassembling reclaimed fabrics to create 3D forms.'
      },
      {
        id: 'sw-6',
        title: 'Abstract Ink Flow',
        mediaUrl: 'https://picsum.photos/seed/sw6/800/1200',
        mediaType: 'image',
        description: 'Studies in fluid dynamics using traditional Japanese sumi-e ink.'
      },
      {
        id: 'sw-7',
        title: 'Plaster Cast Series',
        mediaUrl: 'https://picsum.photos/seed/sw7/800/800',
        mediaType: 'image',
        description: 'Negative space captures of everyday domestic objects.'
      },
      {
        id: 'sw-8',
        title: 'Color Theory: Ochre',
        mediaUrl: 'https://picsum.photos/seed/sw8/800/1000',
        mediaType: 'image',
        description: 'A monochrome exploration of natural pigments found in local soil.'
      },
      {
        id: 'sw-9',
        title: 'Digital Intervention',
        mediaUrl: 'https://picsum.photos/seed/sw9/1200/800',
        mediaType: 'image',
        description: 'Projecting digital glitches onto physical sculpture to test visual boundaries.'
      },
      {
        id: 'sw-10',
        title: 'Final Sketchbook Entry',
        mediaUrl: 'https://picsum.photos/seed/sw10/800/1100',
        mediaType: 'image',
        description: 'A concluding thought on the relationship between memory and material.'
      }
    ]
  },
  {
    id: '5',
    title: 'Abstract Art',
    subtitle: 'Exploring Spatial Storytelling',
    category: 'Fine Art',
    description: 'Multi-sensory installations utilizing found objects and audio-visual components to explore spatial storytelling.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690061/Digi_art_m_vfjsvq.png',
    mediaType: 'image',
    year: '2024',
    tags: ['Immersive Media', 'Audio-Visual', 'Installation'],
    subProjects: [
      {
        id: '5-1',
        title: 'Sensory Nodes',
        mediaUrl: 'https://picsum.photos/seed/inst1/800/600',
        mediaType: 'image',
        description: 'Detail of interactive points within the installation.'
      },
      {
        id: '5-2',
        title: 'Found Materials',
        mediaUrl: 'https://picsum.photos/seed/inst2/800/600',
        mediaType: 'image',
        description: 'Study of objects used to build the narrative landscape.'
      },
      {
        id: '5-3',
        title: 'Shadow Play',
        mediaUrl: 'https://picsum.photos/seed/inst3/800/600',
        mediaType: 'image',
        description: 'Lighting experiments conducted for the final exhibition.'
      }
    ]
  },
  {
    id: '1',
    title: 'What Stays After Leaving',
    subtitle: 'Graduate Showcase at The Truman Brewery, London',
    category: 'Exhibitions',
    description: 'A bespoke collection of ink-on-wood exploring emotional resonance and spatial transformation through memory.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690072/sanchaali_swami__WhatStaysAfterLeaving_gvybrr.jpg',
    mediaType: 'image',
    year: '2025',
    tags: ['Graduate Showcase', 'Ink on Wood', 'London', 'Memory'],
    subProjects: [
      {
        id: '1-1',
        title: 'Ephemeral Traces',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689972/IMG_0645_c4oui2.jpg',
        mediaType: 'image',
        description: 'Detail study of ink absorption on reclaimed timber.'
      },
      {
        id: '1-2',
        title: 'Spatial Resonance',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689959/IMG_5918_v9bko7.jpg',
        mediaType: 'image',
        description: 'Installation view at The Truman Brewery.'
      },
      {
        id: '1-3',
        title: 'Material Memory',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689965/IMG_5927_phj4sc.jpg',
        mediaType: 'image',
        description: 'Close-up of wood grain textures interacting with black ink.'
      },
      {
        id: '1-4',
        title: 'Exhibition Context',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689966/IMG_5920_ctvmtw.jpg',
        mediaType: 'image',
        description: 'Wide shot of the gallery space during the private view.'
      }
    ]
  },
  {
    id: '3',
    title: 'As We See It',
    subtitle: 'Undergraduate Showcase Portfolio',
    category: 'Exhibitions',
    description: 'Undergraduate show at Leeds Arts University. Achieved 75% commercial success at The Art Market, demonstrating high market appeal.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689891/IMG_2234_ewomlx.jpg',
    mediaType: 'image',
    year: '2025',
    tags: ['Leeds Arts University', 'Commercial Success', 'Curating'],
    subProjects: [
      {
        id: '3-1',
        title: 'Market Selection A',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690059/IMG_1225_dhjkoq.jpg',
        mediaType: 'image',
        description: 'One of the primary pieces sold during the exhibition.'
      },
      {
        id: '3-2',
        title: 'Curation Logic',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689955/IMG_8173_dvknse.jpg',
        mediaType: 'image',
        description: 'Sketches and floor plans for the exhibition layout.'
      },
      {
        id: '3-3',
        title: 'Opening Night',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689872/Untitled_Artwork_5_sy2i1o.jpg',
        mediaType: 'image',
        description: 'Atmospheric shot of guests interacting with the work.'
      }
    ]
  },
  {
    id: '2',
    title: 'Social Media Growth Strategy',
    subtitle: 'Fitness With Sonali',
    category: 'Digital Products & Design',
    description: 'Multichannel promotional campaign for Fitness with Sonali. Designed and deployed assets to foster community participation in sustainable fitness growing the online community to more than 320000 followers',
    mediaUrl: 'https://picsum.photos/seed/sanchaali2/1000/800',
    mediaType: 'image',
    year: '2024',
    instagramUrl: 'https://www.instagram.com/sonali_swami',
    tags: ['Campaign', 'Social Media', 'Community', 'Branding'],
    subProjects: [
      {
        id: '2-1',
        title: '#FitFreeDumChallenge',
        mediaUrl: 'https://www.instagram.com/reel/CbKaP66AWcQ/?igsh=MzZuMW14ODR2djdr',
        mediaType: 'video',
        description: 'Set of Instagram story templates designed for user interaction.'
      },
      {
        id: '2-2',
        title: '#JoinTheMovement',
        mediaUrl: 'https://picsum.photos/seed/fit2/800/600',
        mediaType: 'image',
        description: 'Motion graphic used for the campaign launch.'
      },
      {
        id: '2-3',
        title: '#BallentineChallenge',
        mediaUrl: 'https://picsum.photos/seed/fit3/800/600',
        mediaType: 'image',
        description: 'Visual breakdown of growth metrics achieved during the movement.'
      }
    ]
  },
  {
    id: '4',
    title: 'Branding Campaigns',
    subtitle: 'Madhya Infosoft Pvt Ltd',
    category: 'Digital Products & Design',
    description: 'Orchestrated brand campaigns for clients with targeted graphics and video content to drive user-engagement and brand promotion.',
    mediaUrl: 'https://picsum.photos/seed/sanchaali4/1000/1000',
    mediaType: 'image',
    year: '2024',
    tags: ['Video Content', 'UGC', 'Digital Marketing'],
    subProjects: [
      {
        id: '4-1',
        title: 'UGC Compilation',
        mediaUrl: 'https://picsum.photos/seed/bal1/800/600',
        mediaType: 'image',
        description: 'Compilation of best user submissions during the challenge.'
      },
      {
        id: '4-2',
        title: 'Brand Assets',
        mediaUrl: 'https://picsum.photos/seed/bal2/800/600',
        mediaType: 'image',
        description: 'Logo variants and stickers created for the TikTok filter.'
      },
      {
        id: '4-3',
        title: 'Behind the Scenes',
        mediaUrl: 'https://picsum.photos/seed/bal3/800/600',
        mediaType: 'image',
        description: 'Production shots from the main campaign video shoot.'
      }
    ]
  },
  {
    id: '6',
    title: 'Animation Videos',
    subtitle: 'Animation Videos',
    category: 'ANIMATION',
    description: 'Animation Videos',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769603190/samples/landscapes/girl-urban-view.jpg',
    mediaType: 'image',
    year: '2023',
    tags: ['Branding', 'Growth', 'Reels', 'Social Media'],
    subProjects: [
      {
        id: '6-1',
        title: 'Cleopatra',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1769689891/Cleopatra_animation_ypgajd.mp4',
        mediaType: 'video',
        description: 'Core color palette and typography rules for the brand.'
      },
      {
        id: '6-2',
        title: 'Carousel Design',
        mediaUrl: 'https://picsum.photos/seed/strat2/800/600',
        mediaType: 'video',
        description: 'Educational carousel that went viral with 50k+ shares.'
      },
      {
        id: '6-3',
        title: 'Grid Planning',
        mediaUrl: 'https://picsum.photos/seed/strat3/800/600',
        mediaType: 'video',
        description: 'Strategic visual mapping for a 3-month content cycle.'
      }
    ]
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
