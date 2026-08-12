import {
  Award,
  BookOpen,
  Building2,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

import aboutFallbackImage from '../assets/images/d9137cae-bb2f-4b7a-b543-5f9b612e3ac9.png';
import type {
  AcademicLeaderProfile,
  AboutPageContent,
  AboutStat,
  AcademicPartner,
  AcademicPathway,
  CampusLocation,
  ExcellencePillar,
  GalleryImage,
  HistoryMilestone,
  InstitutionalHighlight,
  LifeAtAimsItem,
} from '../types/about';

export const aboutPageContent: AboutPageContent = {
  hero: {
    eyebrow: 'About AIMS Campus',
    title: 'Transforming lives through education',
    description:
      'AIMS Campus is an established higher education institution with 39 years of academic excellence, providing recognised local and international education pathways.',
    // TODO: replace with src/assets/images/about/hero-graduation.webp
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
  introduction: {
    eyebrow: 'Who we are',
    title: 'Your gateway to educational excellence',
    description:
      'AIMS Campus supports students through recognised partnerships, modern learning spaces and academic guidance aligned with future progression.',
    paragraphs: [
      'At AIMS Campus, education is viewed as a transformative journey. For more than three decades, the institution has supported students in developing academic knowledge, professional capabilities, confidence and a strong sense of social responsibility.',
      'Through recognised academic partnerships, modern learning environments and career-focused programmes, AIMS Campus provides students with opportunities to begin their studies in Sri Lanka and progress towards internationally recognised qualifications.',
      'AIMS Campus is committed not only to helping students earn qualifications, but also to preparing them to become ethical, innovative and responsible global citizens.',
    ],
    // TODO: replace with src/assets/images/about/about-graduate.webp
    image: aboutFallbackImage,
    imageAlt: 'An AIMS Campus graduate in formal academic attire during a graduation celebration.',
    imageBadge: '39 Years of excellence',
  },
  pillars: {
    eyebrow: 'Five pillars',
    title: 'Five pillars of excellence',
    description:
      'These principles guide teaching quality, academic development, partnerships, student experience and institutional leadership.',
  },
  history: {
    eyebrow: 'Our history',
    title: 'A legacy shaped by growth and progression',
    description:
      'From its foundation in 1987 to its current academic network, AIMS Campus has continued to expand opportunity for students in Sri Lanka and beyond.',
    // TODO: replace with src/assets/images/about/history-convocation.webp
    image: aboutFallbackImage,
    imageAlt: 'AIMS Campus convocation moments with graduates and academic staff gathered together.',
  },
  partners: {
    eyebrow: 'International academic partners',
    title: 'Global pathways with recognised institutions',
    description:
      'AIMS Campus works with universities and awarding bodies that support local study, transfer options and international progression.',
  },
  pathways: {
    eyebrow: 'Academic pathways',
    title: 'Flexible study routes for every stage',
    description:
      'Students can begin with foundation study and progress through diploma, undergraduate, postgraduate and professional pathways.',
  },
  campuses: {
    eyebrow: 'Campus locations',
    title: 'Learning spaces built for present and future growth',
    description:
      'AIMS Campus offers current learning centres in Negombo and Colombo while planning a future residential and academic environment.',
  },
  lifeAtAims: {
    eyebrow: 'Life at AIMS',
    title: 'A campus experience beyond the classroom',
    description:
      'Students are encouraged to build community, explore ideas, develop professionally and participate in a supportive learning environment.',
  },
  governance: {
    eyebrow: 'Institutional highlights',
    title: 'Governance and institutional strengths',
    description:
      'AIMS Campus combines academic leadership, research culture and international engagement to support sustainable institutional development.',
  },
  academicLeadership: {
    eyebrow: 'Academic leadership',
    title: 'Meet our leadership and faculty profiles',
    description:
      'This rotating profile showcase highlights the governance and senate community represented in the materials you shared, helping visitors quickly recognise key academic leaders at AIMS Campus.',
  },
  research: {
    eyebrow: 'Research community',
    title: 'Research, collaboration and professional exchange',
    description:
      'AIMS Campus encourages scholarly collaboration, doctoral networking and professional knowledge exchange through research-focused events and academic communities.',
  },
  cta: {
    title: 'Begin your journey with AIMS Campus',
    description:
      'Explore recognised academic pathways designed to support your education, professional development and future ambitions.',
    // TODO: replace with src/assets/images/about/cta-graduation.webp
    image: aboutFallbackImage,
    imageAlt: '',
    primaryLabel: 'Explore programmes',
    primaryHref: '/programmes',
    secondaryLabel: 'Contact admissions',
    secondaryHref: '/contact',
  },
};

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

export const academicPartners: AcademicPartner[] = [
  {
    name: 'University of East London',
    country: 'United Kingdom',
    relationship: 'Academic partner',
    // TODO: replace with src/assets/images/about/uel-logo.png
    logo: aboutFallbackImage,
    logoAlt: 'University of East London logo',
  },
  {
    name: 'Charisma University',
    country: 'United States',
    relationship: 'Academic partner',
    // TODO: replace with src/assets/images/about/charisma-logo.png
    logo: aboutFallbackImage,
    logoAlt: 'Charisma University logo',
  },
  {
    name: 'International American University',
    country: 'United States',
    relationship: 'Study centre and progression partner',
    // TODO: replace with src/assets/images/about/iau-logo.png
    logo: aboutFallbackImage,
    logoAlt: 'International American University logo',
  },
  {
    name: 'NCC Education',
    country: 'United Kingdom',
    relationship: 'British foundation and diploma pathway',
    // TODO: replace with src/assets/images/about/ncc-logo.png
    logo: aboutFallbackImage,
    logoAlt: 'NCC Education logo',
  },
  {
    name: 'International Business School',
    country: 'Hungary',
    relationship: 'Study abroad and progression pathway',
    // TODO: replace with src/assets/images/about/ibs-logo.png
    logo: aboutFallbackImage,
    logoAlt: 'International Business School logo',
  },
  {
    name: 'University of New Haven',
    country: 'United States',
    relationship: 'Study abroad and progression pathway',
    // TODO: replace with src/assets/images/about/new-haven-logo.png
    logo: aboutFallbackImage,
    logoAlt: 'University of New Haven logo',
  },
  {
    name: 'University of Sopron',
    country: 'Hungary',
    relationship: 'Study abroad and progression pathway',
    // TODO: replace with src/assets/images/about/sopron-logo.png
    logo: aboutFallbackImage,
    logoAlt: 'University of Sopron logo',
  },
];

export const academicPathways: AcademicPathway[] = [
  {
    title: 'Foundation',
    description:
      'A preparatory route that builds academic confidence and readiness for higher study.',
  },
  {
    title: 'Diploma',
    description:
      'Structured programmes that develop practical knowledge for academic or career progression.',
  },
  {
    title: 'Advanced Diploma',
    description:
      'Higher-level diploma study designed to deepen specialist understanding and transferable skills.',
  },
  {
    title: "Bachelor's Degrees",
    description:
      'Undergraduate pathways leading to recognised degree outcomes through local and international study options.',
  },
  {
    title: "Master's Degrees",
    description:
      'Postgraduate study for professionals seeking advanced expertise, strategic insight and leadership growth.',
  },
  {
    title: 'Doctoral Programmes',
    description:
      'Research-focused pathways for advanced academic inquiry, professional contribution and scholarly development.',
  },
  {
    title: 'Professional Qualifications',
    description:
      'Career-oriented qualifications that support industry advancement and specialist capability building.',
  },
  {
    title: 'English Qualifications',
    description:
      'Language pathways that strengthen academic communication, progression readiness and global mobility.',
  },
];

export const campusLocations: CampusLocation[] = [
  {
    name: 'Negombo Campus',
    type: 'Main Campus',
    address: ['349/2, Main Street', 'Negombo', 'Sri Lanka'],
    description:
      'A modern learning centre with dedicated faculties, classrooms and an international academic environment.',
    // TODO: replace with src/assets/images/about/campus-negombo.webp
    image: aboutFallbackImage,
    imageAlt: 'Exterior view of the AIMS Campus Negombo learning environment.',
  },
  {
    name: 'Colombo Campus',
    type: 'Colombo Branch',
    address: ['7, Rajakeeya Mawatha', 'Colombo 07', 'Sri Lanka'],
    description:
      'A centrally located campus offering students access to academic resources, professional networks and opportunities in the capital city.',
    // TODO: replace with src/assets/images/about/campus-colombo.webp
    image: aboutFallbackImage,
    imageAlt: 'AIMS Campus Colombo branch space prepared for students and academic activity.',
  },
  {
    name: 'The Hamlet',
    type: 'Future Campus Development',
    address: ['Future residential and academic development'],
    description:
      'A proposed campus environment designed around learning, creativity, wellbeing and community life.',
    // TODO: replace with src/assets/images/about/campus-hamlet.webp
    image: aboutFallbackImage,
    imageAlt: 'Conceptual campus environment representing The Hamlet future development.',
  },
];

export const lifeAtAimsItems: LifeAtAimsItem[] = [
  {
    title: 'Student community',
    description:
      'A supportive environment where students form connections, collaborate and grow with confidence.',
    icon: Users,
  },
  {
    title: 'Clubs and activities',
    description:
      'Opportunities to participate in student-led initiatives, cultural experiences and extracurricular engagement.',
    icon: HeartHandshake,
  },
  {
    title: 'Entrepreneurship support',
    description:
      'Guidance that encourages innovation, enterprise thinking and practical pathways for new ideas.',
    icon: Lightbulb,
  },
  {
    title: 'Career development',
    description:
      'Academic and professional support designed to strengthen employability, planning and workplace readiness.',
    icon: Target,
  },
];

export const studentLifeGallery: GalleryImage[] = [
  {
    title: 'Collaborative learning',
    // TODO: replace with src/assets/images/about/student-life-1.webp
    image: aboutFallbackImage,
    alt: 'Students collaborating during a discussion session at AIMS Campus.',
  },
  {
    title: 'Student activities',
    // TODO: replace with src/assets/images/about/student-life-2.webp
    image: aboutFallbackImage,
    alt: 'AIMS Campus students participating in a social and co-curricular activity.',
  },
  {
    title: 'Creative engagement',
    // TODO: replace with src/assets/images/about/student-life-3.webp
    image: aboutFallbackImage,
    alt: 'Learners sharing ideas in a collaborative student-life setting at AIMS Campus.',
  },
  {
    title: 'Campus milestones',
    // TODO: replace with src/assets/images/about/student-life-4.webp
    image: aboutFallbackImage,
    alt: 'Students celebrating a campus achievement together at AIMS Campus.',
  },
];

export const institutionalHighlights: InstitutionalHighlight[] = [
  {
    title: 'Academic governance',
    description:
      'AIMS Campus is guided by a Board of Governance and an Academic Senate comprising experienced leaders from education, business, law, health sciences, finance, information technology and professional practice.',
    icon: Building2,
  },
  {
    title: 'Research community',
    description:
      'The institution encourages scholarly collaboration, doctoral networking, professional exchange and research-focused academic events.',
    icon: Award,
  },
  {
    title: 'International outlook',
    description:
      'Students can access international academic pathways and progression opportunities through a growing global partnership network.',
    icon: Globe2,
  },
];

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
    title: 'Dean - Faculty of Languages and Professional Studies, Senior Manager Partnerships',
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

export const researchGallery: GalleryImage[] = [
  {
    title: 'Research forum',
    // TODO: replace with src/assets/images/about/research-1.webp
    image: aboutFallbackImage,
    alt: 'Researchers and academics networking during an AIMS Campus research event.',
  },
  {
    title: 'Professional exchange',
    // TODO: replace with src/assets/images/about/research-2.webp
    image: aboutFallbackImage,
    alt: 'Participants engaged in professional discussion during a research-focused academic session.',
  },
  {
    title: 'Academic presentation',
    // TODO: replace with src/assets/images/about/research-3.webp
    image: aboutFallbackImage,
    alt: 'A speaker presenting at an AIMS Campus research and academic exchange event.',
  },
];
