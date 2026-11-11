import { describe, expect, it } from 'vitest';
import { certifications, profile } from '../data/profile';
import { getDictionary } from '../i18n';
import { buildLlmsTxt } from './llms';

const site = new URL('https://example.com');
const text = buildLlmsTxt(site);
const t = getDictionary('en');

describe('buildLlmsTxt', () => {
  it('starts with the name as the title and the description as the summary', () => {
    expect(text.startsWith(`# ${profile.name}\n\n> ${t.meta.description}\n`)).toBe(true);
  });

  it('lists every job, project, study and certificate the page shows', () => {
    for (const job of t.experience) expect(text).toContain(`${job.role}, ${job.company} (${job.period})`);
    for (const project of t.projects) expect(text).toContain(`${project.name} (${project.period})`);
    for (const study of t.education.studies) expect(text).toContain(study.school);
    for (const cert of certifications) expect(text).toContain(`[${cert.name}](${cert.url})`);
  });

  it('links pages and CVs with absolute URLs on the given origin', () => {
    expect(text).toContain('(https://example.com/en/)');
    expect(text).toContain('(https://example.com/es/)');
    expect(text).toContain(`(https://example.com${profile.cv.es})`);
  });
});
