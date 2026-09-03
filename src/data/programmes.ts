import AppliedComputing from '../assets/images/AppC123.jpeg';
import IBM from '../assets/images/ibm123.jpeg';
import foundationProgrammeImage from '../assets/images/found.jpeg';
import EduStudy from '../assets/images/edu.jpeg';
import languageProfessionalImage from '../assets/images/LanguageProfessionalStudiesPortrait.png';

export type ProgrammeSlug =
  | 'foundation'
  | 'applied-computing'
  | 'education'
  | 'international-business-management'
  | 'language-professional-studies';

export type ProgrammeModuleGroup = {
  title: string;
  items: string[];
};

export type ProgrammeFee = {
  label: string;
  value: string;
  note?: string;
};

export type ProgrammeSubCategory = {
  title: string;
  eyebrow: string;
  summary: string;
  highlights: string[];
  outcome: string;
};

export type ProgrammeRecord = {
  slug: ProgrammeSlug;
  navLabel: string;
  title: string;
  eyebrow: string;
  summary: string;
  focus: string;
  image: string;
  accentClass: string;
  highlights: string[];
  routeSteps: string[];
  moduleGroups: ProgrammeModuleGroup[];
  careers: string[];
  fees: ProgrammeFee[];
  subCategories?: ProgrammeSubCategory[];
};

const degreeFees: ProgrammeFee[] = [
  { label: 'Registration fee', value: 'LKR 10,000' },
  { label: 'Foundation', value: 'LKR 80,000', note: 'Installments 20,000 x 4' },
  { label: '1st Year Level 4 Diploma', value: 'LKR 200,000', note: 'Installments 20,000 x 10' },
  { label: '2nd Year Level 5 Diploma', value: 'LKR 200,000', note: 'Installments 20,000 x 10' },
  { label: 'Degree final year', value: 'LKR 350,000', note: 'Installments 35,000 x 10' },
  { label: 'UEL university fee', value: 'GBP 800' },
];

const foundationFees: ProgrammeFee[] = [
  { label: 'Registration fee', value: 'LKR 10,000' },
  { label: 'Foundation fee', value: 'LKR 80,000', note: 'Installments 20,000 x 4' },
];

const pathwayFees: ProgrammeFee[] = [
  { label: 'Programme fees', value: 'Contact admissions', note: 'Fees vary by selected pathway' },
];

export const programmes: ProgrammeRecord[] = [
  {
    slug: 'foundation',
    navLabel: 'Foundation',
    title: 'Foundation',
    eyebrow: 'Entry pathway',
    summary:
      'A supportive higher-education bridge that builds study skills, mathematics, digital literacy and subject foundations for degree entry.',
    focus: 'Progression route',
    image: foundationProgrammeImage,
    accentClass: 'from-emerald-500 via-teal-500 to-cyan-500',
    highlights: ['Digital World', 'Study and presentation skills', 'Foundation mathematics'],
    routeSteps: ['After O/L: Foundation', 'Then progress into Computing, Business or Education degrees'],
    moduleGroups: [
      {
        title: 'Computing track',
        items: [
          'Digital World',
          'Study and Presentation Skills',
          'Foundation Mathematics',
          'Cultural Studies',
          'Introduction to Computer Science',
          'Introduction to Programming with Python',
        ],
      },
      {
        title: 'Business track',
        items: [
          'Digital World',
          'Study and Presentation Skills',
          'Foundation Mathematics',
          'Cultural Studies',
          'Introduction to Business',
          'Introduction to Accounting and Economics',
        ],
      },
      {
        title: 'Education track',
        items: [
          'Digital World',
          'Study and Presentation Skills',
          'Foundation Mathematics',
          'Cultural Studies',
          'Understanding Roles, Responsibilities and Relationships in Education and Training',
          'Facilitate Learning and Development for Individuals & Group',
          'Understanding and Using Inclusive Teaching and Learning Approaches in Education and Training',
          'Understanding Assessment in Education and Training',
        ],
      },
    ],
    careers: ['Academic progression into degree study', 'Preparation for specialist study routes'],
    fees: foundationFees,
  },
  {
    slug: 'applied-computing',
    navLabel: 'Applied Computing',
    title: 'BSc (Hons) Applied Computing',
    eyebrow: 'Undergraduate route',
    summary:
      'A practical computing degree focused on software development, web and mobile apps, cybersecurity, cloud and project work.',
    focus: 'Computing degree',
    image: AppliedComputing,
    accentClass: 'from-blue-600 via-indigo-600 to-violet-600',
    highlights: ['Software and web development', 'Security and cloud', 'Project-based learning'],
    routeSteps: [
      'After O/L & A/L: 3 year degree',
      'After A/L: 3 year degree',
      'After HND / Adv.Dip: 1 year top-up degree',
      'Optional final year transfer to UEL, UK',
    ],
    moduleGroups: [
      {
        title: 'Year 1 - NCC UK / AIMS Level 4 Diploma',
        items: [
          'Algorithms and Mathematical Concepts for Computing',
          'Computer Networks',
          'Computer Systems',
          'Databases',
          'Front End Web Development',
          'Object-Oriented System Analysis and Design',
          'Software Engineering',
          'Designing and Developing Object-Oriented Computer Programs',
        ],
      },
      {
        title: 'Year 2 - NCC UK / AIMS Level 5 Diploma',
        items: [
          'Networking Security and Cryptography',
          'Computing Project',
          'Agile Development',
          'Mobile App Development',
          'Back End Web Development',
          'Artificial Intelligence',
        ],
      },
      {
        title: 'Final year - University of East London',
        items: [
          'Mental Wealth Professional Life 3 (Project)',
          'Computer and Network Security',
          'Enterprise Architecture and Cloud Computing',
          'Project Management',
          'Work Based Learning',
        ],
      },
    ],
    careers: [
      'Software Developer',
      'Full-Stack Developer',
      'Web Developer',
      'Mobile App Developer',
      'Cybersecurity Analyst',
      'Cloud Engineer',
      'Data Analyst',
      'Systems Analyst',
      'Business Analyst - IT',
      'Quality Assurance Engineer',
      'IT Project Manager',
      'Technical Consultant',
    ],
    fees: degreeFees,
  },
  {
    slug: 'education',
    navLabel: 'Education',
    title: 'BA (Hons) Education',
    eyebrow: 'Undergraduate route',
    summary:
      'An education and training pathway that develops teaching, assessment, curriculum design, inclusive practice and research skills.',
    focus: 'Education degree',
    image: EduStudy,
    accentClass: 'from-emerald-600 via-lime-500 to-amber-400',
    highlights: ['Teaching and assessment', 'Inclusive learning', 'Research and pedagogy'],
    routeSteps: [
      'After O/L & A/L: 3 year degree',
      'After A/L: 3 year degree',
      'After HND / Adv.Dip: 1 year top-up degree',
      'Optional final year transfer to UEL, UK',
    ],
    moduleGroups: [
      {
        title: 'Year 1 - AIMS Level 4 Diploma',
        items: [
          'Understanding Roles, Responsibilities and Relationships in Education and Training',
          'Planning to Meet the Needs of Learners in Education and Training',
          'Delivering Education and Training',
          'Assessing Learners in Education and Training',
          'Using Resources for Education and Training',
          'Teaching in a Specialist Area',
        ],
      },
      {
        title: 'Year 2 - AIMS Level 5 Diploma',
        items: [
          'Developing Teaching, Learning and Assessment in Education and Training',
          'Teaching, Learning and Assessment in Education and Training',
          'Theories, Principles and Models in Education and Training',
          'Wider Professional Practice and Development in Education and Training',
          'Action Learning to Support Development of Subject Specific Pedagogy',
          'Developing, Using and Organizing Resources in a Specialist Area',
          'Action Research',
        ],
      },
      {
        title: 'Final year - University of East London',
        items: [
          'Mental Wealth Academic and Professional Skills for Life 3',
          'Critical and global perspectives on education',
          'Language, Pedagogy and Cultural Diversity',
          'Volunteering',
          'Independent Research Project',
        ],
      },
    ],
    careers: [
      'Teacher / Educator',
      'Education Coordinator',
      'Academic Administrator',
      'Curriculum Development Assistant',
      'Educational Consultant',
      'Learning Support Officer',
      'Training & Development Executive',
      'Student Counselor / Academic Advisor',
      'Education Program Coordinator',
      'Early Childhood Education Practitioner',
      'Education Research Assistant',
      'Community Education Officer',
    ],
    fees: degreeFees,
  },
  {
    slug: 'international-business-management',
    navLabel: 'International Business Management',
    title: 'BSc (Hons) International Business Management',
    eyebrow: 'Undergraduate route',
    summary:
      'A business degree that strengthens leadership, finance, marketing, entrepreneurship and global management thinking.',
    focus: 'Business degree',
    image: IBM,
    accentClass: 'from-orange-500 via-amber-500 to-yellow-400',
    highlights: ['Leadership and entrepreneurship', 'Finance and marketing', 'Global business strategy'],
    routeSteps: [
      'After O/L & A/L: 3 year degree',
      'After A/L: 3 year degree',
      'After HND / Adv.Dip: 1 year top-up degree',
      'Optional final year transfer to UEL, UK',
    ],
    moduleGroups: [
      {
        title: 'Year 1 - NCC UK / AIMS Level 4 Diploma',
        items: [
          'Leadership & Entrepreneurship',
          'Project Management',
          'Corporate Responsibility within Sustainable Business Law',
          'Understanding Business Finance',
          'Organisational Culture & Collaboration',
          'International Business',
          'Applying Marketing',
        ],
      },
      {
        title: 'Year 2 - NCC UK / AIMS Level 5 Diploma',
        items: [
          'Start-up Business',
          'Innovation & Growth',
          'Raising Finance Capital: Process and Law',
          'Agile and Responsive Leadership',
          'Ethics in Business',
          'Global Business: The Impact of Policy',
        ],
      },
      {
        title: 'Final year - University of East London',
        items: [
          'Global Enterprise and Consultancy Practice (Mental Wealth 3)',
          'Corporate Social Responsibility and Ethics',
          'Contemporary Issues in Marketing',
          'Leadership in a Global Context',
          'Intrapreneurship and Entrepreneurship in Practice',
          'International Economics and Finance',
        ],
      },
    ],
    careers: [
      'International Business Manager',
      'Business Development Executive',
      'Marketing Manager',
      'Human Resource Executive / Manager',
      'Operations Manager',
      'International Trade Executive',
      'Supply Chain & Logistics Coordinator',
      'Business Analyst',
      'Project Coordinator / Project Manager',
      'Entrepreneur / Business Owner',
      'Financial Analyst',
    ],
    fees: degreeFees,
  },
  {
    slug: 'language-professional-studies',
    navLabel: 'Language & Professional Studies',
    title: 'School of Language & Professional Studies',
    eyebrow: 'Professional route',
    summary:
      'A professional study route for students and working learners who want stronger language ability, recognised credentials and practical workplace-ready skills.',
    focus: 'Language & professional credentials',
    image: languageProfessionalImage,
    accentClass: 'from-cyan-600 via-blue-600 to-emerald-500',
    highlights: [
      'Cambridge English preparation',
      'CIPM professional development',
      'TESOL-focused education pathway',
    ],
    routeSteps: [
      'Choose Cambridge Department, CIPM or MA in Education with TESOL Emphasis',
      'Build practical communication, professional or TESOL teaching capability',
      'Progress towards academic, teaching or workplace opportunities',
    ],
    subCategories: [
      {
        title: 'Cambridge Department',
        eyebrow: 'English language pathway',
        summary:
          'Structured English language learning and assessment preparation for students who want stronger academic, professional and everyday communication.',
        highlights: [
          'Speaking and listening confidence',
          'Reading and writing development',
          'Exam-focused preparation',
        ],
        outcome: 'For learners preparing for recognised English language progress.',
      },
      {
        title: 'CIPM',
        eyebrow: 'Professional studies pathway',
        summary:
          'A practical route for learners interested in people management, workplace communication and professional HR development.',
        highlights: [
          'Human resource fundamentals',
          'People and workplace practice',
          'Professional progression support',
        ],
        outcome: 'For learners building confidence for HR and management-related roles.',
      },
      {
        title: 'MA in Education with TESOL Emphasis',
        eyebrow: 'Postgraduate education pathway',
        summary:
          'A postgraduate-focused education route for teachers and education professionals who want to deepen TESOL knowledge and language pedagogy.',
        highlights: [
          'TESOL theory and practice',
          'Language teaching methods',
          'Education-focused research skills',
        ],
        outcome: 'For educators aiming to strengthen English language teaching expertise.',
      },
    ],
    moduleGroups: [
      {
        title: 'Cambridge Department',
        items: [
          'English language skills development',
          'Speaking, listening, reading and writing practice',
          'Grammar, vocabulary and communication confidence',
          'Cambridge English assessment preparation',
          'Academic and professional communication support',
        ],
      },
      {
        title: 'CIPM',
        items: [
          'Professional workplace communication',
          'Human resource management foundations',
          'People management and administration practice',
          'Leadership and organisational behaviour basics',
          'Professional examination preparation support',
        ],
      },
      {
        title: 'MA in Education with TESOL Emphasis',
        items: [
          'TESOL principles and language pedagogy',
          'Teaching English to speakers of other languages',
          'Curriculum, assessment and classroom practice',
          'Language, culture and learner diversity',
          'Education research and academic writing',
        ],
      },
    ],
    careers: [
      'English Language Teacher',
      'TESOL Practitioner',
      'Academic Coordinator',
      'Language Programme Coordinator',
      'Training & Development Executive',
      'Human Resource Assistant',
      'People Operations Coordinator',
      'Professional Development Officer',
    ],
    fees: pathwayFees,
  },
];

export const programmeNavLinks = programmes.map(({ slug, navLabel, title }) => ({
  slug,
  label: navLabel,
  title,
  to: slug === 'foundation' ? '/programmes/foundation' : `/programmes/${slug}`,
}));

export function getProgrammeBySlug(slug?: string) {
  return programmes.find((programme) => programme.slug === slug);
}
