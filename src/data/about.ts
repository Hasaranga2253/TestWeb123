import {
  BookOpen,
  GraduationCap,
  Network,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import aboutFallbackImage from '../assets/images/d9137cae-bb2f-4b7a-b543-5f9b612e3ac9.png';
import chairmanImage from '../assets/images/chairman.jpeg';
import hh from '../assets/images/Waidyasekara.png';
import type {
  AcademicLeaderProfile,
  AboutPageContent,
  AboutStat,
  BoardGovernanceMember,
  ExcellencePillar,
  HistoryMilestone,
} from '../types/about';

/* =========================================================
   MAIN ABOUT PAGE CONTENT
========================================================= */

export const aboutPageContent: AboutPageContent = {
  hero: {
    eyebrow: 'About AIMS Campus',
    title: 'Transforming lives through education',
    description:
      'AIMS Campus is an established higher education institution with 39 years of academic excellence, providing recognised local and international education pathways.',
    image: aboutFallbackImage,
    imageAlt: '',
  },

  vision: {
    title: 'Vision',
    description:
      'To be a leading institution of academic excellence through incremental innovation.',
  },

  mission: {
    title: 'Mission',
    description:
      'We are focused on preparing students to be responsible global citizens by instilling values of collaboration, diversity and ethical leadership. Through rigorous and innovative programmes, we foster critical thinking and ignite a lifelong passion for learning.',
  },

  chairmanMessage: {
    role: 'Chairman',
    campus: 'AIMS Campus',
    title: 'Message from the Chairman',
    name: 'Dr. Kithsiri Manchanayakke',

    paragraphs: [
      'It is with great pride and joy that I extend my heartfelt congratulations to all students and graduates of AIMS Campus. Each academic milestone marks not only the culmination of focused learning, but also the beginning of a new chapter filled with opportunities, challenges and possibilities.',

      'At AIMS Campus, we believe that education is not merely about acquiring knowledge, but about shaping character, nurturing leadership and inspiring innovation. Our students continue to demonstrate resilience, dedication and determination as they step into their professional and personal lives.',

      'Our progress is also made possible by the collective effort of faculty, staff, parents and partners whose support strengthens the student journey. I express my deepest gratitude to all who contribute to our shared success.',

      'As we continue to expand our horizons and strengthen international collaborations with prestigious institutions, we reaffirm our mission to provide world-class education that empowers students to make a meaningful global impact.',

      'To our students and graduates, embrace the future with confidence, integrity and passion. The world awaits your contribution.',
    ],

    image: chairmanImage,
    imageAlt: 'Dr. Kithsiri Manchanayakke, Chairman of AIMS Campus.',
  },

  pillars: {
    eyebrow: '',
    title: 'Five pillars of excellence',
    description:
      'These principles guide teaching quality, academic development, partnerships, student experience and institutional leadership.',
  },

  history: {
    eyebrow: 'Our history',
    title: 'A legacy shaped by growth and progression',
    description:
      'From its foundation in 1987 to its current academic network, AIMS Campus has continued to expand opportunity for students in Sri Lanka and beyond.',
    image: aboutFallbackImage,
    imageAlt:
      'AIMS Campus convocation moments with graduates and academic staff gathered together.',
  },

  academicLeadership: {
    eyebrow: 'Academic leadership',
    title: 'Meet our leadership and faculty profiles',
    description:
      'This rotating profile showcase highlights the governance and senate community represented at AIMS Campus, helping visitors quickly recognise key academic leaders.',
  },

  cta: {
    title: 'Begin your journey with AIMS Campus',
    description:
      'Explore recognised academic pathways designed to support your education, professional development and future ambitions.',

    image: aboutFallbackImage,
    imageAlt: '',

    primaryLabel: 'Explore programmes',
    primaryHref: '/programmes',

    secondaryLabel: 'Contact admissions',
    secondaryHref: '/contact',
  },
};

/* =========================================================
   ABOUT STATISTICS
========================================================= */

export const aboutStats: AboutStat[] = [
  {
    value: '1987',
    label: 'Established',
  },
  {
    value: '39',
    label: 'Years of excellence',
  },
  {
    value: '2',
    label: 'Current campus locations',
  },
  {
    value: '7+',
    label: 'International progression partners',
  },
];

/* =========================================================
   BOARD OF GOVERNANCE
========================================================= */

export const boardGovernanceMembers: BoardGovernanceMember[] = [
  {
    name: 'Dr. Kithsiri Manchanayakke',
    image: hh,
    imageAlt: 'Dr. Kithsiri Manchanayakke.',
  },

  {
    name: 'Prof. Udith Jayasinghe',
    image: aboutFallbackImage,
    imageAlt: 'Prof. Udith Jayasinghe.',
  },

  {
    name: 'Prof. Prathiba Mahanamahewa',
    image: aboutFallbackImage,
    imageAlt: 'Prof. Prathiba Mahanamahewa.',
  },

  {
    name: 'Prof. Sirimewan Waidyasekara',
    image: aboutFallbackImage,
    imageAlt: 'Prof. Sirimewan Waidyasekara.',
  },

  {
    name: 'Prof. (Dr.) Samath Darmarathne',
    image: aboutFallbackImage,
    imageAlt: 'Prof. (Dr.) Samath Darmarathne.',
  },

  {
    name: 'Prof. Jagath Edirisinghe',
    image: aboutFallbackImage,
    imageAlt: 'Prof. Jagath Edirisinghe.',
  },

  {
    name: 'Dr. Neil Bogahalande',
    image: aboutFallbackImage,
    imageAlt: 'Dr. Neil Bogahalande.',
  },

  {
    name: 'Dr. Godwin Kodituwakku',
    image: aboutFallbackImage,
    imageAlt: 'Dr. Godwin Kodituwakku.',
  },

  {
    name: 'Mr. Upul Dassanayake',
    image: aboutFallbackImage,
    imageAlt: 'Mr. Upul Dassanayake.',
  },

  {
    name: 'Dr. Sanjeewa Samarasinghe',
    image: aboutFallbackImage,
    imageAlt: 'Dr. Sanjeewa Samarasinghe.',
  },

  {
    name: 'Ms. Enakshi Manchanayake',
    image: aboutFallbackImage,
    imageAlt: 'Ms. Enakshi Manchanayake.',
  },

  {
    name: 'Mr. Kanishka Manchanayake',
    image: aboutFallbackImage,
    imageAlt: 'Mr. Kanishka Manchanayake.',
  },
];

/* =========================================================
   FIVE PILLARS OF EXCELLENCE
========================================================= */

export const excellencePillars: ExcellencePillar[] = [
  {
    title: 'Curriculum differentiation',
    description:
      'Programmes are structured to provide relevant academic knowledge, practical learning and progression opportunities.',
    icon: BookOpen,
  },

  {
    title: 'Quality of faculty',
    description:
      'Students are supported by experienced academics, lecturers and professionals from diverse fields.',
    icon: GraduationCap,
  },

  {
    title: 'Partnerships and collaborations',
    description:
      'International academic relationships create recognised pathways and wider opportunities for learners.',
    icon: Network,
  },

  {
    title: 'Holistic development',
    description:
      'Learning extends beyond academic achievement to leadership, confidence, creativity and personal growth.',
    icon: Sparkles,
  },

  {
    title: 'Strong governance practices',
    description:
      'Institutional development is supported by responsible governance, academic oversight and professional leadership.',
    icon: ShieldCheck,
  },
];

/* =========================================================
   HISTORY
========================================================= */

export const historyMilestones: HistoryMilestone[] = [
  {
    year: '1987',
    title: 'AIMS Campus established',
    description:
      "AIMS Campus began its journey as one of Sri Lanka's pioneering private higher education institutions.",
  },

  {
    year: 'Growth',
    title: 'International academic collaboration',
    description:
      'The institution expanded its educational pathways through partnerships with recognised overseas universities and awarding bodies.',
  },

  {
    year: 'Expansion',
    title: 'Broader academic opportunities',
    description:
      "Programmes grew to include foundation, diploma, bachelor's, master's, doctoral and professional qualifications.",
  },

  {
    year: 'Today',
    title: '39 years of excellence',
    description:
      'AIMS Campus continues to develop learning opportunities that respond to changing academic, professional and industry needs.',
  },
];

/* =========================================================
   ACADEMIC LEADERSHIP
========================================================= */

export const academicLeadershipProfiles: AcademicLeaderProfile[] = [
  {
    name: 'Dr. Kithsiri Manchanayakke',
    title: 'Chancellor',
    groups: ['Senate', 'Board of Governance'],
  },

  {
    name: 'Prof. Sirimewan Waidyasekara',
    title: 'Director of Studies',
    groups: ['Senate', 'Board of Governance'],
  },

  {
    name: 'Prof. Prathiba Mahanamahewa',
    title: 'Dean - Faculty of Law',
    groups: ['Senate', 'Board of Governance'],
  },

  {
    name: 'Prof. (Dr.) Samath Darmarathne',
    title: 'Dean - Faculty of Health Sciences & Nursing',
    groups: ['Senate', 'Board of Governance'],
  },

  {
    name: 'Dr. Viraj Pinto Jayawardena',
    title: 'Dean - Faculty of Business, Finance & IT',
    groups: ['Senate'],
  },

  {
    name: 'Dr. Thamara Dayanada',
    title: 'Dean - Faculty of Education & Psychology',
    groups: ['Senate'],
  },

  {
    name: 'Ms. Nilusha De Silva',
    title:
      'Dean - Faculty of Languages and Professional Studies, Senior Manager Partnerships',
    groups: ['Senate'],
  },

  {
    name: 'Ms. Chandrika Fernando',
    title: 'Head of R&D and New Partnerships',
    groups: ['Senate'],
  },

  {
    name: 'Prof. Udith Jayasinghe',
    title: 'Board of Governance member',
    groups: ['Board of Governance'],
  },

  {
    name: 'Prof. Jagath Edirisinghe',
    title: 'Board of Governance member',
    groups: ['Board of Governance'],
  },

  {
    name: 'Dr. Neil Bogahalande',
    title: 'Board of Governance member',
    groups: ['Board of Governance'],
  },

  {
    name: 'Dr. Godwin Kodituwakku',
    title: 'Board of Governance member',
    groups: ['Board of Governance'],
  },

  {
    name: 'Mr. Upul Dassanayake',
    title: 'Board of Governance member',
    groups: ['Board of Governance'],
  },

  {
    name: 'Dr. Sanjeewa Samarasinghe',
    title: 'Board of Governance member',
    groups: ['Board of Governance'],
  },

  {
    name: 'Ms. Enakshi Manchanayake',
    title: 'Board of Governance member',
    groups: ['Board of Governance'],
  },

  {
    name: 'Mr. Kanishka Manchanayake',
    title: 'Board of Governance member',
    groups: ['Board of Governance'],
  },
];