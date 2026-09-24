export interface Profile {
  fullName: string;
  professionalTitle: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl?: string;
  availability: 'Available for Contracts' | 'Open for Full-Time' | 'Selective Advisory';
  availabilityNote: string;
  yearsOfExperience: number;
  completedProjects: number;
  certificationsCount: number;
  clientSatisfaction: string;
}

export type CertificateCategory = 'Course Training' | 'Frontend Engineering' | 'Databases & SQL' | 'Cloud & DevOps' | 'Software Architecture' | 'Backend Systems' | 'Security & Agile';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerCode: 'AWS' | 'GCP' | 'CNCF' | 'META' | 'HASHICORP' | 'HACKERRANK' | 'ROADMAP' | 'CODESQUADZ' | 'OTHER';
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl: string;
  category: CertificateCategory;
  description: string;
  verifiedSkills: string[];
  scoreOrDistinction?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'System Architecture' | 'Databases & Tools';
  level: number; // 1-100
  years: number;
  highlight?: boolean;
  tags: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: 'Full-time' | 'Contract / Advisory' | 'Staff Engineer';
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  summary: string;
  achievements: string[];
  technologies: string[];
  keyMetric?: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  honors?: string;
  gpa?: string;
  description: string;
  coursework: string[];
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  metrics: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  timestamp: string;
}

export interface PortfolioData {
  profile: Profile;
  certificates: Certificate[];
  skills: SkillItem[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
}
