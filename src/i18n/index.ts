import { en } from './en';
import { es } from './es';

/** Locales the site is published in. Each one is a route prefix (`/en/`, `/es/`). */
export const LOCALES = ['en', 'es'] as const;

/** A supported locale code. */
export type Locale = (typeof LOCALES)[number];

/** Section anchors on the home page. Fixed across locales so links and the assistant agree. */
export const SECTIONS = ['about', 'experience', 'projects', 'skills', 'education', 'contact'] as const;

/** A home page section id. */
export type SectionId = (typeof SECTIONS)[number];

/** A job, with its achievements as short bullets. */
export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

/** A project: a one-line description, a longer account and the technologies involved. */
export interface ProjectEntry {
  /** Key into `projectMedia` in `src/data/profile.ts`. The same in every locale. */
  slug: string;
  name: string;
  period: string;
  description: string;
  body: string;
  tags: string[];
}

/** A degree or course. */
export interface EducationEntry {
  title: string;
  school: string;
  year: string;
}

/** Every translatable string of the site, for one locale. */
export interface Dictionary {
  meta: { title: string; description: string };
  role: string;
  location: string;
  nav: Record<SectionId, string> & { skipToContent: string; switchLanguage: string; menu: string };
  hero: {
    lead: string;
    askLabel: string;
    askPlaceholder: string;
    askSubmit: string;
    cv: string;
  };
  about: { body: string };
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  projectsUi: { more: string; visit: string };
  skills: string[];
  education: {
    studies: EducationEntry[];
    languagesLabel: string;
    languages: string[];
    certificationsLabel: string;
    certificationsHint: string;
  };
  contact: {
    heading: string;
    lead: string;
    email: string;
  };
  chat: {
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    send: string;
    open: string;
    close: string;
    goingTo: string;
    wentThere: string;
    errorBusy: string;
    errorOffline: string;
    errorGeneric: string;
    disclaimer: string;
  };
  footer: { source: string };
  notFound: { title: string; body: string; home: string };
}

const DICTIONARIES: Record<Locale, Dictionary> = { en, es };

/**
 * Checks whether a value is a supported locale code.
 *
 * @param value - Any value, typically a route param or a request field.
 * @return True when the value is one of `LOCALES`.
 */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Returns the dictionary for a locale.
 *
 * @param locale - The locale to read.
 * @return Every translatable string of the site in that locale.
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
