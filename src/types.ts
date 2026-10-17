export type PageId = 'home' | 'bouquet-studio' | 'patterns' | 'stitch-guide' | 'materials' | 'my-projects';

export interface FlowerSpecimen {
  id: string;
  name: string;
  category: 'rose' | 'wildflower' | 'foliage' | 'accent';
  colorHex: string;
  colorName: string;
  dmcCode?: string;
  sizeMm: number;
  layers: number;
  cx: number;
  cy: number;
  rotation?: number;
  scale?: number;
  type: 'ribbon-rose' | 'woven-wheel' | 'french-knots' | 'lazy-daisy' | 'lavender' | 'sage-leaf' | 'golden-bud';
  description: string;
}

export interface Pattern {
  id: string;
  specimenNumber: string;
  title: string;
  subtitle: string;
  description: string;
  category: string[];
  imageUrl: string;
  difficulty: 'Beginner' | 'Beginner Friendly' | 'Intermediate' | 'Advanced' | 'Master Class';
  estimatedHours: string;
  hoopSize: string;
  threadsCount: string;
  featured?: boolean;
  isBookmarked?: boolean;
  flossList: {
    code: string;
    name: string;
    color: string;
  }[];
  steps: {
    title: string;
    description: string;
  }[];
}

export interface StitchDictionaryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  reliefLevel: string;
  needleType: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  timestamp: string;
  tension: string;
}

export interface StudioState {
  fabric: 'raw' | 'bleached' | 'slate' | 'sage';
  zoom: number;
  rotation: number;
  showGuides: boolean;
  selectedSpecimenId: string;
  foliageDensity: number;
  flowers: FlowerSpecimen[];
}

export interface MaterialItem {
  id: string;
  name: string;
  category: 'hoops' | 'linen' | 'silk-ribbon' | 'dmc-floss' | 'needles';
  description: string;
  price: number;
  imageUrl: string;
  details: string;
  inStock: boolean;
}
