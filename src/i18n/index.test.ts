import { describe, expect, it } from 'vitest';
import { getDictionary, LOCALES, SECTIONS } from './index';

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
    }
  });

  it('label every section in the navigation', () => {
    for (const locale of LOCALES) {
      for (const section of SECTIONS) expect(getDictionary(locale).nav[section]).toBeTruthy();
    }
  });
});
