// Builds /llms.txt: a plain Markdown summary of the profile for AI assistants and crawlers,
// following the llms.txt proposal (a title, a one-line summary, then sections of facts and links).

import { certifications, profile } from '../data/profile';
import { getDictionary, LOCALES } from '../i18n';

/**
 * Builds the text of `/llms.txt` from the same data the English page renders.
 *
 * It never states anything the page does not, so it cannot drift from the site or invent a
 * fact. Links are absolute so the file still works when read on its own.
 *
 * @param site - The canonical origin of the site (`Astro.site`).
 * @return The file contents, in Markdown.
 */
export function buildLlmsTxt(site: URL): string {
  const t = getDictionary('en');
  const url = (path: string) => new URL(path, site).href;
  const list = (items: string[]) => items.map((item) => `- ${item}`).join('\n');

  const pages = LOCALES.map((locale) => {
    const name = locale === 'en' ? 'English' : 'Spanish';
    return `[Profile in ${name}](${url(`/${locale}/`)}), [CV in ${name} (PDF)](${url(profile.cv[locale])})`;
  });

  return `# ${profile.name}

> ${t.meta.description}

${t.role}, ${t.location}.

## Pages

${list(pages)}

## About

${t.about.body}

## Experience

${list(t.experience.map((job) => `${job.role}, ${job.company} (${job.period}): ${job.bullets.join(' ')}`))}

## Projects

${list(t.projects.map((project) => `${project.name} (${project.period}): ${project.body} Stack: ${project.tags.join(', ')}.`))}

## Skills

${list(t.skills)}

## Education

${list(t.education.studies.map((study) => `${study.title}, ${study.school} (${study.year})`))}

## Languages

${list(t.education.languages)}

## Certifications

${list(certifications.map((cert) => `[${cert.name}](${cert.url}): ${cert.issuer}, ${cert.year}`))}

## Contact

${list([`Email: ${profile.email}`, `[LinkedIn](${profile.linkedin})`, `[GitHub](${profile.github})`])}
`;
}
