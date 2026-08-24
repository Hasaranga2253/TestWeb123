import type { LucideIcon } from 'lucide-react';

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface AboutValueStatement {
  title: string;
  description: string;
}

export interface AboutIntroductionContent extends SectionIntro {
  paragraphs: string[];
  image: string;
  imageAlt: string;
  imageBadge: string;
}

export interface ChairmanMessageContent {
  role: string;
  campus: string;
  title: string;
  name: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}

export interface BoardGovernanceMember {
  name: string;
  image: string;
  imageAlt: string;
}

export interface ExcellencePillar {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface HistoryMilestone {
  year: string;
  title: string;
  description: string;
}

export interface HistorySectionContent extends SectionIntro {
  image: string;
  imageAlt: string;
}

export interface AcademicPartner {
  name: string;
  country: string;
  relationship: string;
  logo: string;
  logoAlt: string;
}

export interface AcademicPathway {
  title: string;
  description: string;
}

export interface CampusLocation {
  name: string;
  type: string;
  address: string[];
  description: string;
  image: string;
  imageAlt: string;
}

export interface LifeAtAimsItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface GalleryImage {
  title: string;
  image: string;
  alt: string;
}

export interface InstitutionalHighlight {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SenateMember {
  name: string;
  title: string;
  image: string;
  imageAlt: string;
}

export interface CtaContent {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface AboutPageContent {
  hero: AboutHeroContent;
  vision: AboutValueStatement;
  mission: AboutValueStatement;
  introduction?: AboutIntroductionContent;
  chairmanMessage: ChairmanMessageContent;
  pillars: SectionIntro;
  history: HistorySectionContent;
  partners?: SectionIntro;
  pathways?: SectionIntro;
  campuses?: SectionIntro;
  lifeAtAims?: SectionIntro;
  governance?: SectionIntro;
  academicLeadership: SectionIntro;
  research?: SectionIntro;
  cta: CtaContent;
}
