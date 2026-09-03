export type NewsUpdateId =
  | 'uel'
  | 'orientation'
  | 'graduation'
  | 'phd-evening'
  | 'edex-edu'
  | 'aims-new-year';

export type GalleryImage = {
  src: string;
  alt: string;
  fileName: string;
};

export type NewsUpdate = {
  id: NewsUpdateId;
  category: string;
  title: string;
  summary: string;
  dateLabel: string;
  location: string;
  tag: string;
  folder: string;
  images: GalleryImage[];
};

const imageModules = import.meta.glob(
  [
    '../assets/UEL/*.{jpg,jpeg,png,webp}',
    '../assets/Meeting/*.{jpg,jpeg,png,webp}',
    "../assets/Graduation '25/*.{jpg,jpeg,png,webp}",
    '../assets/PhD Evening/*.{jpg,jpeg,png,webp}',
    '../assets/Edex edu/*.{jpg,jpeg,png,webp}',
    '../assets/AIMS සූර්ය මංගල්‍යය 2024/*.{jpg,jpeg,png,webp}',
  ],
  {
    eager: true,
    import: 'default',
  },
) as Record<string, string>;

function fileNameFromPath(path: string) {
  return path.split('/').at(-1) ?? path;
}

function sortByFileNumber([leftPath]: [string, string], [rightPath]: [string, string]) {
  const leftNumber = Number(fileNameFromPath(leftPath).match(/\d+/)?.[0] ?? 0);
  const rightNumber = Number(fileNameFromPath(rightPath).match(/\d+/)?.[0] ?? 0);

  if (leftNumber !== rightNumber) {
    return leftNumber - rightNumber;
  }

  return leftPath.localeCompare(rightPath);
}

function imagesFromFolder(folder: string, albumTitle: string): GalleryImage[] {
  const folderPrefix = `../assets/${folder}/`;

  return Object.entries(imageModules)
    .filter(([path]) => path.startsWith(folderPrefix))
    .sort(sortByFileNumber)
    .map(([path, src], index) => ({
      src,
      fileName: fileNameFromPath(path),
      alt: `${albumTitle} gallery image ${index + 1}`,
    }));
}

export const newsUpdates: NewsUpdate[] = [
  {
    id: 'uel',
    category: 'UEL',
    title: 'University of East London Partnership Highlights',
    summary:
      'AIMS Campus moments connected to our international academic pathway with the University of East London.',
    dateLabel: 'Partnership updates',
    location: 'AIMS Campus',
    tag: 'Academic partner',
    folder: 'UEL',
    images: imagesFromFolder('UEL', 'University of East London Partnership Highlights'),
  },
  {
    id: 'orientation',
    category: 'Orientation',
    title: 'Student Orientation & Welcome Sessions',
    summary:
      'New students beginning their academic journey through briefing sessions, campus introductions and programme guidance.',
    dateLabel: 'Student life',
    location: 'AIMS Campus',
    tag: 'Orientation',
    folder: 'Meeting',
    images: imagesFromFolder('Meeting', 'Student Orientation and Welcome Sessions'),
  },
  {
    id: 'graduation',
    category: 'Graduation',
    title: 'Graduation Ceremony 2025',
    summary:
      'Celebrating graduates, families and academic achievement across the AIMS Campus community.',
    dateLabel: 'Graduation 2025',
    location: 'Sri Lanka',
    tag: 'Ceremony',
    folder: "Graduation '25",
    images: imagesFromFolder("Graduation '25", 'Graduation Ceremony 2025'),
  },
  {
    id: 'phd-evening',
    category: 'PhD Events',
    title: 'PhD Evening',
    summary:
      'Research-focused evening sessions for doctoral learners, academics and invited guests.',
    dateLabel: 'Doctoral studies',
    location: 'AIMS Campus',
    tag: 'Research',
    folder: 'PhD Evening',
    images: imagesFromFolder('PhD Evening', 'PhD Evening'),
  },
  {
    id: 'edex-edu',
    category: 'EDEX Edu',
    title: 'EDEX Education Expo',
    summary:
      'AIMS Campus engagement with students and parents at education exhibitions and admissions events.',
    dateLabel: 'Education expo',
    location: 'EDEX Expo',
    tag: 'Outreach',
    folder: 'Edex edu',
    images: imagesFromFolder('Edex edu', 'EDEX Education Expo'),
  },
  {
    id: 'aims-new-year',
    category: 'AIMS New Year Festival',
    title: 'AIMS New Year Festival 2024',
    summary:
      'Campus community celebrations featuring traditional games, cultural activities and student participation.',
    dateLabel: 'Festival 2024',
    location: 'AIMS Campus',
    tag: 'Campus culture',
    folder: 'AIMS සූර්ය මංගල්‍යය 2024',
    images: imagesFromFolder('AIMS සූර්ය මංගල්‍යය 2024', 'AIMS New Year Festival 2024'),
  },
];

export const newsUpdateCategories = [
  { id: 'all', label: 'All Updates' },
  ...newsUpdates.map((update) => ({
    id: update.id,
    label: update.category,
  })),
] as const;
