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
    id: '2',
    title: 'THE GLOBAL ATHLETE BRAND | Fitness with Sonali',
    subtitle: 'Social Media & Visual Strategy Portfolio',
    category: 'Social Media Content & Branding',
    description: 'This collection showcases my work as the Social Media Co-ordinator for Fitness with Sonali, where I transformed a personal fitness brand into a globally recognized digital community. By blending my Fine Art-based aesthetics with data-driven strategy, I curated a high-impact visual identity that resonated with diverse demographics across the world growing the online community to more than 320000 followers',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769791440/Photo_from_S._S._dxpnev.jpg',
    mediaType: 'image',
    year: '2021-2024',
    instagramUrl: 'https://www.instagram.com/sonali_swami',
    tags: ['Campaign', 'Social Media', 'Community', 'Branding'],
    subProjects: [
    
      {
        id: '2-6',
        title: '#FATFREEDUMCHALLENGE LAUNCH |  A National Moment in Fitness',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770898921/FatFreeDum_Challenge_Launch_cvx0tj.mp4',
        mediaType: 'video',
        description: 'Seasonal Campaign Strategy & Community Activation: This collection features a high-impact digital campaign I conceptualized and executed for Fitness with Sonali during Indias Independence Day (15th August). The #FatFreeDumChallenge was designed to leverage a major national celebration to drive brand visibility and deep audience engagement. By blending thematic visual storytelling with a rigorous three-pillar content structure, I transformed a national holiday into a massive community participation event that scaled the brands global reach'
      }
      ,
      {
        id: '2-13',
        title: '#FATFREEDUMCHALLENGE | REEL',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770899930/FatFreeDum_Challenge_Day5_yskpr8.mp4',
        mediaType: 'video',
        description: 'To maximize value and interaction, I engineered every reels caption to include a Tip of the Day for lifestyle education, a Question of the Day to spark comment-section dialogue, and a Workout of the Day to drive user-generated content. By requiring the audience to perform exercises and tag Sonali on their own pages, I created a viral loop that expanded the brand’s footprint across thousands of unique profiles'
      }
      ,
     
      {
        id: '2-11',
        title: 'SWEAT IN STYLE | KICA x Fitness with Sonali',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770899931/kica_qu48ap.mp4',
        mediaType: 'video',
        description: 'This collaboration represents a sophisticated intersection of athletic utility and high-end fashion, created for the premium athleisure brand KICA. I conceptualized and produced the "Sweat in Style" campaign to demonstrate that high-intensity performance does not require a compromise on aesthetic elegance.'
      }
      ,
      {
        id: '2-12',
        title: '#JOINTHEMOVEMENT | MyProtein x Fitness with Sonali | Brand Partnership & Short-Form Video Strategy',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770897993/JoinTheMovement_p4ciuj.mp4',
        mediaType: 'video',
        description: 'This series represents a high-level creative collaboration with global supplement leader MyProtein. I conceptualized and executed a strategic "Wednesday Series" of Instagram Reels designed to build audience anticipation and drive consistent brand visibility for both MyProtein and Fitness with Sonali. I served as the primary creative lead, translating MyProteins global brand identity into organic, high-energy video content that felt authentic to Sonalis personal brand'
      },
      {
        id: '2-14',
        title: 'THE #BALENTINECHALLENGE | Balzano x Fitness with Sonali',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770902629/Balentine_p8poeb.mp4',
        mediaType: 'video',
        description: 'This three-day high-engagement series was a strategic collaboration with the premium home and kitchen appliance brand Balzano. Launched during the Valentine’s Day period, the #BalentineChallenge utilized a "stealth marketing" approach—promoting the brand as a prestigious prize sponsor rather than through direct sales pitches. By integrating the brand into a high-energy community challenge, I successfully increased Balzanos cultural relevance within the fitness space while driving massive user participation'
      },
      {
        id: '2-15',
        title: 'PERSONAL BRANDING | Narrative Storytelling & Community Engagement',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770902244/Sonali_story_hxyvwh.mp4',
        mediaType: 'video',
        description: 'Using a mix of archival personal footage and professional athletic videos, I developed a cohesive narrative arc that highlighted the intersection of personal life and professional discipline. These narrative pieces became the platforms highest-performing content, sparking widespread conversation in the comments and significantly contributing to the milestone of over 320,000 followers'
      },
        
     {
        id: '2-7',
        title: 'STORIES | Building Authority Through Real-Time Engagement',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880138/Screenshot_2026-01-31-18-58-39-41_1c337646f29875672b5a61192b9010f9_2_vyefvc.jpg',
        mediaType: 'image',
        description: 'This interactive series utilized daily polls, expert Q&A sessions, and audience quizzes to transform passive viewers into an engaged, educated community. This strategy successfully reinforced brand authority and drove consistent audience participation. '
      }
      ,
      {
        id: '2-8',
        title: 'CAROUSEL POST | Expert Advocacy for Women 50+',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880780/Screenshot_2026-01-31-19-07-16-12_1c337646f29875672b5a61192b9010f9_ise6dc.jpg',
        mediaType: 'image',
        description: 'I conceptualized these carousels to serve as "mini-masterclasses," using structured information hierarchy to establish Sonali as a leading voice in specialized health and fitness-conscious women'
      }
      ,
      {
        id: '2-9',
        title: 'POSTER | TEDx SPEAKER',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769880788/Screenshot_2026-01-31-19-12-02-90_1c337646f29875672b5a61192b9010f9_hop9tu.jpg',
        mediaType: 'image',
        description: 'This post involved the design of the official announcement poster for Sonalis invitation as a TEDx Speaker. Blending Fine Art-inspired composition with clean, professional graphic design, I created a visual that transitioned the brand from "fitness influencer" to "authoritative thought leader." The goal was to capture the prestige of the TEDx platform while maintaining the recognizable aesthetic of the Fitness with Sonali brand'
      },
      {
        id: '2-1',
        title: 'POSTER#1 | CONRAD LIVE BOOTCAMP',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769791443/Photo_from_S._S._dqjyn6.jpg',
        mediaType: 'image',
        description: 'High-impact event poster blending luxury hospitality with athletic energy to drive ticket sales and brand prestige.'
      },
      
      {
        id: '2-2',
        title: 'POSTER#2 | CONRAD LIVE BOOTCAMP',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769791447/Photo_from_S._S._bcqfwr.jpg',
        mediaType: 'image',
        description: 'A alternative minimalist design highlighting the fusion of luxury hospitality and high-intensity training to drive event registrations.'
      },
      {
        id: '2-3',
        title: 'POST | ONLINE DIET CHALLENGE',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769790197/promo_6_pfphea.jpg',
        mediaType: 'image',
        description: 'Inclusive, accessible design bridging the gap between high-performance nutrition and everyday healthy living for diverse female demographics.'
      }
      ,
      {
        id: '2-4',
        title: 'POSTER | IIT BOMBAY x NCC KEYNOTE',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769791440/Photo_from_S._S._dxpnev.jpg',
        mediaType: 'image',
        description: 'A high-impact visual combining military discipline with athletic motivation to inspire the next generation of NCC leaders.'
      }
      ,
      {
        id: '2-5',
        title: 'POSTER | JW MARRIOTT ZUMBA FUSION WORKSHOP',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769791442/Photo_from_S._S._udv0hy.jpg',
        mediaType: 'image',
        description: 'Vibrant, high-energy design merging luxury hospitality with rhythmic fitness to drive mass participation and community engagement.'
      }
     
    ]
  },

 {
    id: '4',
    title: 'THE SOLAR EMPOWERMENT SERIES | Falak Enterprise',
    subtitle: 'Regional Market Strategy & Digital Brand Management',
    category: 'Social Media Content & Branding',
    description: 'As the primary social media strategist for Falak Enterprise, I lead the digital narrative for one of Indias emerging solar manufacturers. Understanding the unique landscape of Tier 2 and Tier 3 cities, I conceptualize and design bilingual content (Hindi & English) to bridge the gap between complex renewable technology and local consumer needs. Utilizing Canva, Adobe Creative Suite, and Meta Business Suite, I manage the full content lifecycle—from stakeholder communication to data-driven scheduling—ensuring consistent brand growth and regional market penetration.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1770907858/falak_post_1_nkpgps.jpg',
    mediaType: 'image',
    year: '2024',
    instagramUrl: 'https://www.instagram.com/falak_enterprise6',
    tags: ['Social Media Content', 'Client Account', 'Digital Marketing'],
    subProjects: [
       {
        id: '4-1',
        title: 'Solar Chapter 1: Smart Savings',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770907864/Falak_reel1_mbgob2.mp4',
        mediaType: 'video',
        description: 'A Hindi-English breakdown of how solar panels slash monthly electricity bills for small businesses and homes.'
      },
      {
        id: '4-2',
        title: 'Solar Chapter 2: Reliable Support',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770907867/Falak_reel2_jpts8s.mp4',
        mediaType: 'video',
        description: 'Bilingual Reel showcasing Falaks dedicated post-installation service, ensuring long-term solar efficiency and customer peace of mind across India.'
      },
      {
        id: '4-3',
        title: 'Solar Chapter 3: Installation Ease',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770907862/Falak_reel_3_f2bjyc.mp4',
        mediaType: 'video',
        description: 'A step-by-step Reel showing our seamless setup process, tailored for regional language speakers.'
      },
      {
        id: '4-4',
        title: 'Solar Chapter 4: Seamless Maintenance',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770907860/Falak_reel_4_rogwgv.mp4',
        mediaType: 'video',
        description: 'Expert-led O&M services ensuring peak panel performance with bilingual guides for hassle-free solar upkeep in Tier 2/3 cities.'
      },
      {
        id: '4-5',
        title: 'Solar Chapter 5: Freedom From Bills',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1770907860/Falak_reel_5_b5yzvr.mp4',
        mediaType: 'video',
        description: 'Celebrating Independence Day by empowering Indian homes with financial freedom through zero electricity bills and sustainable solar energy.'
      },
      {
        id: '4-6',
        title: 'Solar Chapter 6: Choosing the Right Partner',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1770907858/falak_post_1_nkpgps.jpg',
        mediaType: 'image',
        description: 'Expert guide on selecting a trusted solar partner, highlighting Falaks commitment to quality and local reliability for Indian homes.'
      },
      {
        id: '4-7',
        title: 'Solar Chapter 7: Smart Design',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1770907858/falak_post_2_fowhtf.jpg',
        mediaType: 'image',
        description: 'showcase of space-efficient, high-yield solar layouts engineered for maximum performance on any roof type across India.'
      },
      {
        id: '4-8',
        title: 'Solar Chapter 8: Common Pitfalls To Avoid',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1770907858/falak_post_3_ghcjb6.jpg',
        mediaType: 'image',
        description: 'community'
      },
      {
        id: '4-9',
        title: 'Solar Chapter 9: Republic Day Greetings',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1770907858/falak_post_4_sfqcz6.jpg',
        mediaType: 'image',
        description: 'Honoring India’s progress with a commitment to sustainable energy, celebrating national unity and a brighter, self-reliant future for all.'
      }
    ]
  },

 {
    id: 'digital-art-01',
    title: 'THE VIRTUAL CANVAS | Leeds Arts University',
    subtitle: 'A Collection of Digital Art & Illustration | Adobe Creative Suite & Procreate',
    category: 'Fine Art',
    description: 'This collection represents the evolution of my practice from traditional mediums into the digital landscape, produced within the professional-grade studios at Leeds Arts University. These works demonstrate my technical proficiency in Adobe Photoshop, Illustrator, and After Effects, alongside Procreate, to create high-fidelity illustrations and motion graphics. By blending my BA (Hons) Fine Art training with modern digital tools, I explore how digital "brushwork" can maintain the emotional depth of traditional painting while offering the versatility required for modern, platform-specific content',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690061/Digi_art_m_vfjsvq.png',
    mediaType: 'image',
    year: '2022-2025',
    tags: ['Digital Art', 'Adobe Creative Suite', 'Procreate', 'Animation'],
     subProjects: [
      {
        id: 'da-1',
        title: 'DIGITAL ILLUSTRATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690445/IMG_7552_d6aktb.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-2',
        title: 'DIGITAL ILLUSTRATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690443/IMG_7553_blswvb.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-3',
        title: 'DIGITAL ILLUSTRATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690439/IMG_7550_fyrc0t.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-4',
        title: 'DIGITAL ILLUSTRATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690438/IMG_7548_cr60zz.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-5',
        title: 'DIGITAL ILLUSTRATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690436/IMG_7554_zfuyy2.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-6',
        title: 'DIGITAL ILLUSTRATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690410/IMG_7155_lrmqaf.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-7',
        title: 'DIGITAL ILLUSTRATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690432/IMG_7547_jggrmu.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-8',
        title: 'DIGITAL ILLUSTRATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690426/IMG_7551_jnevpo.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-9',
        title: 'DIGITAL ILLUSTRATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690424/IMG_7555_qkbvk8.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-10',
        title: 'DIGITAL ILLUSTRATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690061/Digi_art_m_vfjsvq.png',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'da-11',
        title: 'CLEOPETRA | ANIMATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/video/upload/v1769689891/Cleopatra_animation_ypgajd.mp4',
        mediaType: 'video',
        description: ''
      }
    ]

  },
  {
    id: 'studio-work-01',
    title: 'THE STUDIO CHRONICLES | Leeds Arts University',
    subtitle: 'A Collection of Traditional Mixed Media & Material Exploration',
    category: 'Fine Art',
    description: 'This curated selection represents the core of my technical training within the Leeds Arts University studios. It serves as a visual record of my foundation in traditional fine arts, showcasing a versatile mastery over diverse mediums including wood, fabric, metal, clay, oil paints, charcoal, pencil, and mixed-media sketching. These works are not merely exercises in technique; they represent my ability to observe, deconstruct, and re-interpret complex subjects—a skill that now informs my high-level digital design and visual strategy.',
    mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690954/IMG_6462_tau83v.jpg',
    mediaType: 'image',
    year: '2022-2025',
    tags: ['Studio Practice', 'Process', 'Multidisciplinary', 'Academic'],
    subProjects: [
      {
        id: 'sw-1',
        title: 'SCULPTURE | CLAY',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689976/IMG_9787_uqpc3q.jpg',
        mediaType: 'image',
        description: ''
      },
    
      {
        id: 'sw-3',
        title: 'SCULPTURE | MIXED MEDIA',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690058/IMG_1217_pa87al.jpg',
        mediaType: 'image',
        description: ''
      },
      
      {
        id: 'sw-5',
        title: 'TEXTILE MANIPULATION',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690062/IMG_0860_balupg.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-6',
        title: 'SCULPTURE',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862697/ARTIST_PORTFOLIO_ss2_ketjkg.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-7',
        title: 'SCULPTURE | PLASTER CAST',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769690956/IMG_6461_eugs6h.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-8',
        title: 'SCULPTURE',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862688/ARTIST_PORTFOLIO_ss_y2jii9.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: 'sw-9',
        title: 'SCULPTURE',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769689902/IMG_2280_szlykp.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '5-1',
        title: 'LEVIATHON',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862268/ARTIST_PORTFOLIO_ss1_mqfa3s.jpg',
        mediaType: 'image',
        description: ''
      },
      {
        id: '5-2',
        title: 'THE SHAMAN',
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
        title: 'VISIONS OF THE ARCANA | 22 PIECE TAROT CARDS',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769863405/tarot_cards_nh4qmd.jpg',
        mediaType: 'image',
        description: 'Designed a complete set of Tarot cards to translate complex, abstract archetypes into clear, high-impact visual narratives.'
      },
      {
        id: '5-7',
        title: 'TAROT CARD BACK COVER DESIGN - Digital',
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
    title: 'WHAT STAYS AFTER LEAVING | "Free Range" Graduate Showcase',
    subtitle: 'The Truman Brewery | London, UK | July 2025',
    category: 'Exhibitions',
    description: 'This bespoke collection of ink-on-wood serves as an immersive exploration into the emotional resonance of physical environments. By using the natural grain and texture of wood as a canvas for intricate ink work, I investigated the transformation of space through the lens of human memory—capturing the tension between permanence and absence.',
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
    title: 'MADE IT | Undergraduate Year End Show',
    subtitle: 'The Art Market, Blenheim',
    category: 'Exhibitions',
    description: 'This collection represents my final undergraduate thesis, originally curated for the "Made It" year-end show. These works explore the intersection of traditional medium and contemporary visual language. By managing the end-to-end logistics and public engagement for this exhibition, I successfully sold 75% of the exhibited works to private collectors. This series demonstrates my ability to create "high-concept" visuals that resonate with a wide public demographic.',
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
        title: 'METAL & MEADOW',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769862264/ARTIST_PORTFOLIO_ss2_ds3puf.jpg',
        mediaType: 'image',
        description: 'Oil Painting'
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
        title: 'ABYSS',
        mediaUrl: 'https://res.cloudinary.com/def5zeuw2/image/upload/v1769860608/Abyss_OilPainting_bykxkv.jpg',
        mediaType: 'image',
        description: 'Oil Painting'
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
    role: 'Assistant Tattoo Artist - Intern',
    company: 'Skin Deep Tattoo Design Studio',
    period: 'June 2023 – Aug 2023',
    location: 'Bangalore, India',
    description: 'Collaborated with senior artists to refine custom concepts using Adobe Photoshop and Procreate. Translated abstract client ideas into digital mock-ups.'
  },
  {
    role: 'Social Media Co-ordinator - Part Time',
    company: 'Fitness with Sonali',
    period: '2021 – 2024',
    location: 'Bangalore, India',
    description: 'Spearheaded visual strategy scaling Instagram to over 320k followers. Led creative direction for major fitness initiatives like #JoinTheMovement, #FatFreeDumChallenge.'
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
    year: 'Expected Completion - June 2026',
    details: 'Focus on interdisciplinary design integration, bridging fine art principles with data-driven digital solutions.'
  }
];
