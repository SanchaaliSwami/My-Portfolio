
export type Category = string;

export interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  year: string;
  tags: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  location?: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  year: string;
  details: string;
}
