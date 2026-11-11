# Content

## Purpose

Everything the site says about its owner, kept apart from markup so it can be updated like a
CV: one place for facts that read the same in every language, one dictionary per language for
the rest.

## Key files

- `src/data/profile.ts` (`profile`, `certifications`, `projectMedia`): name, email, links, CV
  paths, the certificate list, and the picture (with its `kind`) and live URL of each project.
- `src/i18n/index.ts` (`LOCALES`, `SECTIONS`, `Dictionary`, `getDictionary`,
  `isLocale`): locale plumbing and the shape every dictionary must have.
- `src/i18n/es.ts`, `src/i18n/en.ts`: the dictionaries.
- `public/Jaume-Cortes-CV-ES.pdf`, `public/Jaume-Cortes-CV-EN.pdf`: the downloadable CVs, one
  per locale (`profile.cv`).
- `public/*.png`: one 16:9 picture per project, a client logo or a screenshot.
- `src/assets/avatar.jpg`, `src/assets/portrait.jpg`: the original portrait and its 4:5
  crop. Not shown on the page at the moment; the crop is the one the CV uses.
- Tests: `src/i18n/index.test.ts`.

## Data

`Dictionary` groups copy by where it appears: `meta`, `nav`, `hero`, `about`, `experience`,
`projects`, `skills`, `education`, `contact`, `chat`, `footer`, `notFound`.

## Flow

1. The CV is the source for the summary, experience, skills and education. Projects carry
   more than the CV does: a description, a paragraph of detail and a stack, written by the
   owner. A project's `slug` links its dictionary entry to `projectMedia`.
2. Pages read `getDictionary(locale)`; the assistant's prompt reads the English dictionary
   (`buildSystemPrompt` in `src/lib/chat/prompt.ts`).

## Invariants

- Both dictionaries satisfy `Dictionary`, so a missing string fails `npm run check`.
- Lists have the same length in both languages (`src/i18n/index.test.ts`).
- Nothing here is invented. A fact that is not in the CV or confirmed by the owner stays out.
- Certificate names are not translated: they are titles issued in English.

## Gotchas

- Changing a fact means editing both dictionaries. The assistant only sees the English one.
- The phone number is in the PDF but deliberately not in the pages or the prompt, to keep it
  away from scrapers.
- A project without an entry in `projectMedia` renders without a picture or link; nothing
  fails. Add both when adding a project.
- The assistant gets each project's detail paragraph, not its one-line description.

## Related

- `docs/domains/chat.md`: how the prompt uses this content.
- `docs/domains/site.md`: where it is rendered.
