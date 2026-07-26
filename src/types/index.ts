export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export interface Programme {
  slug: string;
  title: string;
  schoolSlug?: string;
}

export interface School {
  slug: string;
  name: string;
}

export interface Partner {
  slug: string;
  name: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CampusEvent {
  title: string;
  date: string;
  location: string;
}
