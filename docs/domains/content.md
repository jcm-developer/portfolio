# Content

## Purpose

Everything the site says about its owner, kept apart from markup so it can be updated like a
CV: one place for facts that read the same in every language, one dictionary per language for
the rest.

## Key files

- `src/data/profile.ts` (`profile`, `certifications`): name, email, links, CV path and the
  certificate list.
- `src/i18n/index.ts` (`LOCALES`, `SECTIONS`, `Dictionary`, `getDictionary`, `pickLocale`,
  `isLocale`): locale plumbing and the shape every dictionary must have.
- `src/i18n/es.ts`, `src/i18n/en.ts`: the dictionaries.
- `public/Jaume-Cortes-CV-ES.pdf`: the downloadable CV.
- `src/assets/avatar.jpg`: the portrait.
- Tests: `src/i18n/index.test.ts`.

## Data

`Dictionary` groups copy by where it appears: `meta`, `nav`, `hero`, `about`, `experience`,
`projects`, `skills`, `education`, `contact`, `chat`, `footer`, `notFound`.

## Flow

1. The Spanish CV is the source. `es.ts` follows its wording; `en.ts` is its translation.
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
- There is one CV file, in Spanish. The English page says so on its download button. An
  English PDF would need a second entry in `profile` and a per-locale choice in the page.

## Related

- `docs/domains/chat.md`: how the prompt uses this content.
- `docs/domains/site.md`: where it is rendered.
