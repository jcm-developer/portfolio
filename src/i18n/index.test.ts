import { describe, expect, it } from 'vitest';
import { getDictionary, LOCALES, pickLocale, SECTIONS } from './index';

describe('pickLocale', () => {
  it('returns Spanish for a Spanish browser', () => {
    expect(pickLocale('es-ES,es;q=0.9,en;q=0.8')).toBe('es');
  });

  it('returns Spanish for a Catalan browser', () => {
    expect(pickLocale('ca,en;q=0.8')).toBe('es');
  });

  it('follows the weights, not the order', () => {
    expect(pickLocale('es;q=0.3,en;q=0.9')).toBe('en');
  });

  it('skips a language refused with a zero weight', () => {
    expect(pickLocale('es;q=0,en;q=0.1')).toBe('en');
  });

  it('returns English when nothing matches', () => {
    for (const header of [null, '', 'fr-FR,de;q=0.8', '*']) expect(pickLocale(header)).toBe('en');
  });
});

describe('dictionaries', () => {
  it('keep the same number of entries in every locale', () => {
    const [first, ...rest] = LOCALES.map(getDictionary);
    for (const other of rest) {
      expect(other.experience.map((job) => job.bullets.length)).toEqual(
        first.experience.map((job) => job.bullets.length),
      );
      expect(other.projects).toHaveLength(first.projects.length);
      expect(other.skills).toHaveLength(first.skills.length);
      expect(other.education.studies).toHaveLength(first.education.studies.length);
      expect(other.hero.chips).toHaveLength(first.hero.chips.length);
    }
  });

  it('label every section in the navigation', () => {
    for (const locale of LOCALES) {
      for (const section of SECTIONS) expect(getDictionary(locale).nav[section]).toBeTruthy();
    }
  });
});
