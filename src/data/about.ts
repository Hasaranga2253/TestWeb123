import {
  BookOpen,
  GraduationCap,
  Network,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import aboutFallbackImage from '../assets/images/d9137cae-bb2f-4b7a-b543-5f9b612e3ac9.png';
import chairmanImage from '../assets/images/chairman.jpeg';
import drKithsiriImage from '../assets/images/Dr.Kithsiri.png';
import profUdithImage from '../assets/images/Prof.Udith.png';
import profPrathibaImage from '../assets/images/Prof.Prathiba.png';
import profWaidyasekaraImage from '../assets/images/Waidyasekara.png';
import profSamathImage from '../assets/images/Prof.Samath.png';
import profJagathImage from '../assets/images/Prf.Jagath.png';
import drGodwinImage from '../assets/images/Dr.Godvin.png';
import mrUpulImage from '../assets/images/Mr.Upul.png';
import drSanjeewaImage from '../assets/images/Dr.Sanjeewa.png';
import msEnakshiImage from '../assets/images/Ms.Enakshi.png';
import drVirajImage from '../assets/images/Dr.Viraj.png';
import drThamaraImage from '../assets/images/Dr.Thamara.png';
import msNilushaImage from '../assets/images/Ms.Nilusha.png';
import msChandrikaImage from '../assets/images/Dr.Chandrika.png';
import mrKanishkaImage from '../assets/images/Mr.Kanishka.png';
import drNeilImage from '../assets/images/Dr.Neil.png';
import ctaImage from '../assets/images/about2.2.jpeg';
import type {
  AboutPageContent,
  AboutStat,
  BoardGovernanceMember,
  ExcellencePillar,
  HistoryMilestone,
  SenateMember,
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
    eyebrow: 'Senate',
    title: 'Senate of AIMS Campus',
    description:
      'The academic senate providing faculty leadership, programme oversight and scholarly direction at AIMS Campus.',
  },

  cta: {
    title: 'Begin your journey with AIMS Campus',
    description:
      'Explore recognised academic pathways designed to support your education, professional development and future ambitions.',

    image: ctaImage,
    imageAlt: 'Students at AIMS Campus beginning their academic journey.',

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
    value: '40',
    label: 'Years of excellence',
  },
];

/* =========================================================
   BOARD OF GOVERNANCE
========================================================= */

export const boardGovernanceMembers: BoardGovernanceMember[] = [
  {
    name: 'Dr. Kithsiri Manchanayakke',
    image: drKithsiriImage,
    imageAlt: 'Dr. Kithsiri Manchanayakke.',
  },

  {
    name: 'Prof. Udith Jayasinghe',
    image: profUdithImage,
    imageAlt: 'Prof. Udith Jayasinghe.',
  },

  {
    name: 'Prof. Prathiba Mahanamahewa',
    image: profPrathibaImage,
    imageAlt: 'Prof. Prathiba Mahanamahewa.',
  },

  {
    name: 'Prof. Sirimewan Waidyasekara',
    image: profWaidyasekaraImage,
    imageAlt: 'Prof. Sirimewan Waidyasekara.',
  },

  {
    name: 'Prof. (Dr.) Samath Darmarathne',
    image: profSamathImage,
    imageAlt: 'Prof. (Dr.) Samath Darmarathne.',
  },

  {
    name: 'Prof. Jagath Edirisinghe',
    image: profJagathImage,
    imageAlt: 'Prof. Jagath Edirisinghe.',
  },

  {
    name: 'Dr. Neil Bogahalande',
    image: drNeilImage,
    imageAlt: 'Dr. Neil Bogahalande.',
  },

  {
    name: 'Dr. Godwin Kodituwakku',
    image: drGodwinImage,
    imageAlt: 'Dr. Godwin Kodituwakku.',
  },

  {
    name: 'Mr. Upul Dassanayake',
    image: mrUpulImage,
    imageAlt: 'Mr. Upul Dassanayake.',
  },

  {
    name: 'Dr. Sanjeewa Samarasinghe',
    image: drSanjeewaImage,
    imageAlt: 'Dr. Sanjeewa Samarasinghe.',
  },

  {
    name: 'Ms. Enakshi Manchanayake',
    image: msEnakshiImage,
    imageAlt: 'Ms. Enakshi Manchanayake.',
  },

  {
    name: 'Mr. Kanishka Manchanayake',
    image: mrKanishkaImage,
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
   SENATE
========================================================= */

export const senateMembers: SenateMember[] = [
  {
    name: 'Dr. Kithsiri Manchanayakke',
    title: 'Chancellor',
    image: drKithsiriImage,
    imageAlt: 'Dr. Kithsiri Manchanayakke.',
  },

  {
    name: 'Prof. Sirimewan Waidyasekara',
    title: 'Director of Studies',
    image: profWaidyasekaraImage,
    imageAlt: 'Prof. Sirimewan Waidyasekara.',
  },

  {
    name: 'Prof. Prathiba Mahanamahewa',
    title: 'Dean - Faculty of Law',
    image: profPrathibaImage,
    imageAlt: 'Prof. Prathiba Mahanamahewa.',
  },

  {
    name: 'Prof. (Dr.) Samath Dharmarathne',
    title: 'Dean - Faculty of Health Sciences & Nursing',
    image: profSamathImage,
    imageAlt: 'Prof. (Dr.) Samath Dharmarathne.',
  },

  {
    name: 'Dr. Viraj Pinto Jayawardena',
    title: 'Dean - Faculty of Business, Finance & IT',
    image: drVirajImage,
    imageAlt: 'Dr. Viraj Pinto Jayawardena.',
  },

  {
    name: 'Dr. Thamara Dayanada',
    title: 'Dean - Faculty of Education & Psychology',
    image: drThamaraImage,
    imageAlt: 'Dr. Thamara Dayanada.',
  },

  {
    name: 'Ms. Nilusha De Silva',
    title:
      'Dean - Faculty of Languages and Professional Studies, Senior Manager Partnerships',
    image: msNilushaImage,
    imageAlt: 'Ms. Nilusha De Silva.',
  },

  {
    name: 'Ms. Chandrika Fernando',
    title: 'Head of R&D and New Partnerships',
    image: msChandrikaImage,
    imageAlt: 'Ms. Chandrika Fernando.',
  },
];
