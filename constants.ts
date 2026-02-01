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
    id: 'digital-art-01',
    title: 'Digital Art',
    subtitle: 'A collection of abstract digital art explorations',
    category: 'Fine Art',
    description: '',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690061/Digi_art_m_vfjsvq.png',
    mediaType: 'image',
    year: '2022-2025',
    tags: ['Digital Art', 'Procreate', 'Abstract'],
     subProjects: [
      {
        id: 'da-1',
        title: 'Digital illustration',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690445/IMG_7552_d6aktb.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-2',
        title: 'Digital illustration',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690443/IMG_7553_blswvb.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-3',
        title: 'Digital illustration',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690439/IMG_7550_fyrc0t.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-4',
        title: 'Digital illustration',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690438/IMG_7548_cr60zz.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-5',
        title: 'Digital illustration',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690436/IMG_7554_zfuyy2.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-6',
        title: 'Abstract Ink Flow',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690410/IMG_7155_lrmqaf.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-7',
        title: 'Digital illustration',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690432/IMG_7547_jggrmu.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-8',
        title: 'Digital illustration',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690426/IMG_7551_jnevpo.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-9',
        title: 'Digital illustration',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690424/IMG_7555_qkbvk8.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-10',
        title: 'Digital illustration',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690061/Digi_art_m_vfjsvq.png',
        mediaType: 'image',
        description: ''
      }
    ]

  },
  {
    id: 'studio-work-01',
    title: 'Sculpture and 3D Work',
    subtitle: 'A Collection of Academic & Personal Studies',
    category: 'Fine Art',
    description: 'An expansive series of works produced within the Leeds Arts University studios. This collection represents a deep dive into material exploration, from wood, fabric, metal and clay.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690954/IMG_6462_tau83v.jpg',
    mediaType: 'image',
    year: '2022-2025',
    tags: ['Studio Practice', 'Process', 'Multidisciplinary', 'Academic'],
    subProjects: [
      {
        id: 'sw-1',
        title: 'Sculpture',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689976/IMG_9787_uqpc3q.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-2',
        title: 'Sculpture',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689976/IMG_9787_uqpc3q.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-3',
        title: 'Sculpture',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690058/IMG_1217_pa87al.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-4',
        title: 'Sculpture',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862706/ARTIST_PORTFOLIO_ss4_upbpt8.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-5',
        title: 'Textile Manipulation',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690062/IMG_0860_balupg.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-6',
        title: 'Sculpture',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862697/ARTIST_PORTFOLIO_ss2_ketjkg.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-7',
        title: 'Plaster Cast Series',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690956/IMG_6461_eugs6h.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-8',
        title: 'Sculpture',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862688/ARTIST_PORTFOLIO_ss_y2jii9.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-9',
        title: 'Sculpture',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689902/IMG_2280_szlykp.jpg',
        mediaType: 'image',
        description: ''
      }
    ]
  },
  {
    id: '5',
    title: 'Drawings, Paintings & Sketches',
    subtitle: 'A collection works produced within the Leeds Arts University studios.',
    category: 'Fine Art',
    description: 'A collection works produced within the Leeds Arts University studios.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862267/ARTIST_PORTFOLIO_ss2_x8hcze.jpg',
    mediaType: 'image',
    year: '2024',
    tags: ['Sketches', 'Drawings', 'Paintings'],
    subProjects: [
      {
        id: '5-1',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862268/ARTIST_PORTFOLIO_ss1_mqfa3s.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '5-2',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862267/ARTIST_PORTFOLIO_ss2_x8hcze.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '5-3',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769863370/ARTIST_PORTFOLIO_ss1_w6bjiv.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '5-4',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769863375/ARTIST_PORTFOLIO_ss3_wbqk0r.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '5-5',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690782/IMG_7511_fvad2c.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '5-6',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769863405/tarot_cards_nh4qmd.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '5-7',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769863402/back_cover_design_tngmqt.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '5-8',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769863371/ARTIST_PORTFOLIO_ss2_ahpeaf.jpg',
        mediaType: 'image',
        description: ''
      }
    ]
  },
  {
    id: '1',
    title: 'What Stays After Leaving',
    subtitle: 'Graduate Showcase at The Truman Brewery, London',
    category: 'Exhibitions',
    description: 'A bespoke collection of ink-on-wood panels exploring emotional resonance and spatial transformation through memory.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690072/sanchaali_swami__WhatStaysAfterLeaving_gvybrr.jpg',
    mediaType: 'image',
    year: '2025',
    tags: ['Graduate Showcase', 'Ink on Wood', 'London', 'Memory'],
    subProjects: [
      {
        id: '1-1',
        title: 'Ink on wood',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689972/IMG_0645_c4oui2.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '1-2',
        title: 'Ink on wood',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689959/IMG_5918_v9bko7.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '1-3',
        title: 'Ink on wood',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689965/IMG_5927_phj4sc.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '1-4',
        title: 'Ink on wood',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689966/IMG_5920_ctvmtw.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '1-5',
        title: 'Ink on wood',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689970/IMG_2297_elpnmm.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '1-6',
        title: 'Ink on wood',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689966/IMG_5922_zzwhrn.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '1-7',
        title: 'Ink on wood',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689964/IMG_5931_sotvzg.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '1-8',
        title: 'Ink on wood',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689967/IMG_5923_p0zwck.jpg',
        mediaType: 'image',
        description: ''
      }
    ]
  },
  {
    id: '3',
    title: 'As We See It',
    subtitle: 'Undergraduate Showcase Portfolio',
    category: 'Exhibitions',
    description: 'Undergraduate show at Leeds Arts University. Achieved 75% commercial success at The Art Market, demonstrating high market appeal.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769860608/TrainOfThought_OilPainting_pwu7ri.jpg',
    mediaType: 'image',
    year: '2025',
    tags: ['Leeds Arts University', 'Commercial Success', 'Curating'],
    subProjects: [
      {
        id: '3-1',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862264/ARTIST_PORTFOLIO_ss1_cppdb8.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '3-2',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862264/ARTIST_PORTFOLIO_ss2_ds3puf.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '3-3',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862263/ARTIST_PORTFOLIO_ss3_cl52tu.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '3-4',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769860608/Abyss_OilPainting_bykxkv.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '3-5',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690406/IMG_7558_wqsdge.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '3-6',
        title: '',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690407/IMG_7557_ui3fzy.jpg',
        mediaType: 'image',
        description: ''
      }
    ]
  },
  {
    id: '2',
    title: 'Fitness Lifestyle Branding',
    subtitle: 'Fitness With Sonali',
    category: 'Social Media Content & Branding',
    description: 'Multichannel promotional campaigns for Fitness with Sonali. Designed and deployed assets to foster community participation in sustainable fit and healthy lifestyle growing the online community to more than 320000 followers',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769791440/Photo_from_S._S._dxpnev.jpg',
    mediaType: 'image',
    year: '2024',
    instagramUrl: 'https://www.instagram.com/sonali_swami',
    tags: ['Campaign', 'Social Media', 'Community', 'Branding'],
    subProjects: [
      {
        id: '2-1',
        title: 'FitJam',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769791443/Photo_from_S._S._dqjyn6.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '2-2',
        title: 'FitLive',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769791447/Photo_from_S._S._bcqfwr.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '2-3',
        title: 'DietBet',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769790197/promo_6_pfphea.jpg',
        mediaType: 'image',
        description: ''
      }
      ,
      {
        id: '2-4',
        title: 'Fitness With Sonali',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769791440/Photo_from_S._S._dxpnev.jpg',
        mediaType: 'image',
        description: ''
      }
      ,
      {
        id: '2-5',
        title: 'Fitness With Sonali',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769791442/Photo_from_S._S._udv0hy.jpg',
        mediaType: 'image',
        description: ''
      }
      ,
      {
        id: '2-6',
        title: 'Fat FreeDum Challenge',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880160/Screenshot_2026-01-31-19-01-53-96_1c337646f29875672b5a61192b9010f9_kqiao6.jpg',
        mediaType: 'image',
        description: ''
      }
      ,
      {
        id: '2-7',
        title: 'Audience Engagement',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880138/Screenshot_2026-01-31-18-58-39-41_1c337646f29875672b5a61192b9010f9_2_vyefvc.jpg',
        mediaType: 'image',
        description: ''
      }
      ,
      {
        id: '2-8',
        title: 'Fitness With Sonali',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880780/Screenshot_2026-01-31-19-07-16-12_1c337646f29875672b5a61192b9010f9_ise6dc.jpg',
        mediaType: 'image',
        description: ''
      }
      ,
      {
        id: '2-9',
        title: 'TedX Speaker',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880788/Screenshot_2026-01-31-19-12-02-90_1c337646f29875672b5a61192b9010f9_hop9tu.jpg',
        mediaType: 'image',
        description: ''
      }
      ,
      {
        id: '2-10',
        title: 'Fitness With Sonali',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880780/Screenshot_2026-01-31-19-07-45-24_1c337646f29875672b5a61192b9010f9_gmavrk.jpg',
        mediaType: 'image',
        description: ''
      }
      ,
      {
        id: '2-11',
        title: 'Fitness With Sonali',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880787/Screenshot_2026-01-31-19-10-28-37_1c337646f29875672b5a61192b9010f9_whv7jr.jpg',
        mediaType: 'image',
        description: ''
      }
      ,
      {
        id: '2-12',
        title: 'Fitness With Sonali',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880789/Screenshot_2026-01-31-19-37-53-70_1c337646f29875672b5a61192b9010f9_t3h8ox.jpg',
        mediaType: 'image',
        description: ''
      }
    ]
  },
  {
    id: '4',
    title: 'Client Branding',
    subtitle: 'Madhya Infosoft Pvt Ltd',
    category: 'Social Media Content & Branding',
    description: 'Orchestrated brand campaigns for clients with targeted graphics and video content to drive user-engagement and brand promotion.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769792660/Screenshot_2026-01-30-22-33-26-95_1c337646f29875672b5a61192b9010f9_abumlb.jpg',
    mediaType: 'image',
    year: '2024',
    tags: ['Video Content', 'UGC', 'Digital Marketing'],
    subProjects: [
      {
        id: '4-1',
        title: 'Falak Enterprise',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769792541/Screenshot_2026-01-30-22-28-20-03_1c337646f29875672b5a61192b9010f9_fjvjhq.jpg',
        mediaType: 'image',
        description: 'Solar power'
      },
      {
        id: '4-2',
        title: 'Falak Enterprise',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769792541/Screenshot_2026-01-30-22-29-04-96_1c337646f29875672b5a61192b9010f9_hxy0gn.jpg',
        mediaType: 'image',
        description: 'Solar power'
      },
      {
        id: '4-3',
        title: 'ISRO',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769793060/Screenshot_2026-01-30-22-40-15-79_1c337646f29875672b5a61192b9010f9_nttgr2.jpg',
        mediaType: 'image',
        description: 'ISRO'
      },
      {
        id: '4-4',
        title: 'Falak Enterprise',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880136/Screenshot_2026-01-31-18-56-04-78_1c337646f29875672b5a61192b9010f9_xifg8l.jpg',
        mediaType: 'image',
        description: 'community'
      },
      {
        id: '4-5',
        title: 'Madhya Infosoft Pvt Ltd',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880136/Screenshot_2026-01-31-18-49-50-12_1c337646f29875672b5a61192b9010f9_vqznvx.jpg',
        mediaType: 'image',
        description: 'community'
      },
      {
        id: '4-6',
        title: 'Madhya Infosoft Pvt Ltd',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880136/Screenshot_2026-01-31-18-48-25-37_1c337646f29875672b5a61192b9010f9_jm1ucx.jpg',
        mediaType: 'image',
        description: 'community'
      },
      {
        id: '4-7',
        title: 'Madhya Infosoft Pvt Ltd',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769792660/Screenshot_2026-01-30-22-33-26-95_1c337646f29875672b5a61192b9010f9_abumlb.jpg',
        mediaType: 'image',
        description: 'community'
      },
      {
        id: '4-8',
        title: 'Madhya Infosoft Pvt Ltd',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880136/Screenshot_2026-01-31-18-48-51-35_1c337646f29875672b5a61192b9010f9_jxxnx1.jpg',
        mediaType: 'image',
        description: 'community'
      }
    ]
  },
  {
    id: '6',
    title: 'Cleopetra',
    subtitle: '',
    category: 'Animation',
    description: '',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1769689891/Cleopatra_animation_ypgajd.mp4',
    mediaType: 'video',
    year: '2023',
    tags: ['animation', 'video'],
    subProjects: [
      
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
