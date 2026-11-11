// Language-neutral facts about the site owner. Translatable copy lives in src/i18n.

import type { ImageMetadata } from 'astro';

import automation from '../assets/projects/automation.png';
import bosch from '../assets/projects/bosch.png';
import elecnor from '../assets/projects/elecnor.png';
import itacaSabien from '../assets/projects/itaca-sabien.png';
import scalextric from '../assets/projects/scalextric.png';
import vestor from '../assets/projects/vestor.png';
import yara from '../assets/projects/yara.png';

/** A certificate with a public credential link. */
export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url: string;
}

/** Contact details and links that read the same in every language. */
export const profile = {
  name: 'Jaume Cortés',
  email: 'jaumecortesmonzon@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jaume-cortes-monzon-developer/',
  github: 'https://github.com/jcm-developer',
  /** The CV for each locale, served from `public/`. */
  cv: { en: '/Jaume-Cortes-CV-EN.pdf', es: '/Jaume-Cortes-CV-ES.pdf' },
} as const;

/** The picture and, when it is public, the live URL of a project. */
export interface ProjectMedia {
  /** A client logo or a screenshot, 16:9, optimized by Astro at build time. */
  image: ImageMetadata;
  /** How the picture sits on its plate: a logo gets padding, a screenshot fills it. Default logo. */
  kind?: 'logo' | 'screenshot';
  url?: string;
}

/** Media for each project, keyed by the `slug` of its dictionary entry. */
export const projectMedia: Record<string, ProjectMedia> = {
  elecnor: { image: elecnor },
  vestor: { image: vestor, kind: 'screenshot', url: 'https://vestor-max.pages.dev' },
  scalextric: { image: scalextric },
  automation: { image: automation },
  yara: { image: yara },
  bosch: { image: bosch },
  'itaca-sabien': { image: itacaSabien },
};

/** Certificates, newest and most relevant first. Names stay in their original English. */
export const certifications: Certification[] = [
  { name: 'Google AI', issuer: 'Google', year: '2026', url: 'https://www.coursera.org/account/accomplishments/specialization/9XS1I3K8D98L' },
  { name: 'Building with the Claude API', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/z7tacg5vi9mh' },
  { name: 'Claude Code in Action', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/qgj5eyfg83xo' },
  { name: 'Introduction to Model Context Protocol', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/hd359tt7mt6y' },
  { name: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/3i9ttdxjvbpe' },
  { name: 'Claude 101', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/oy3bq6i4riau' },
  { name: 'Machine Learning & Deep Learning', issuer: 'Zero To Mastery Academy', year: '2025', url: 'https://www.udemy.com/certificate/UC-a1a2a7e4-0149-474a-88db-f7ae7617f30a/' },
  { name: 'AI Fundamentals', issuer: 'Google', year: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/AVBND0P6UGWU' },
  { name: 'AI for App Building', issuer: 'Google', year: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/6AYAHK62N507' },
  { name: 'AI for Data Analysis', issuer: 'Google', year: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/H1DUAVZ9I3ML' },
  { name: 'AI for Research and Insights', issuer: 'Google', year: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/YXEPFNFO03A0' },
  { name: 'AI for Content Creation', issuer: 'Google', year: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/MUSRDYCVBI5V' },
  { name: 'AI for Writing and Communicating', issuer: 'Google', year: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/ZOAHOPT3GBZR' },
  { name: 'AI for Brainstorming and Planning', issuer: 'Google', year: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/0ROW74MEWVJU' },
];
