export interface CampusLocation {
  name: string;
  addressLines: string[];
}

export interface CampusContact {
  label: string;
  value: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface Accreditation {
  title: string;
  description: string;
}

export interface CampusData {
  officialName: string;
  shortDescription: string;
  about: string;
  mission: string;
  vision: string;
  history: string;
  locations: CampusLocation[];
  phones: CampusContact[];
  emails: CampusContact[];
  whatsapp: CampusContact;
  socialLinks: SocialLink[];
  openingHours: string;
  accreditations: Accreditation[];
}