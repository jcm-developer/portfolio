# Design

The visual system of the site. It follows two existing artefacts so the three read as one
identity: the CV (lavender header, heavy geometric name, spaced indigo block labels, label
column beside a content column) and the LinkedIn banner (a ribbon of fine lines and an asterisk
mark on an off-white ground).

Tokens live in `src/styles/global.css`; this file explains the choices behind them.

## Palette

| Token | Value | Use |
|---|---|---|
| `--paper` | `#fcfcfe` | Page background |
| `--tint` | `#f2f1fa` | Hero, contact block, top bar, assistant bubbles (the CV header lavender) |
| `--ink` | `#16151f` | Text and headings |
| `--ink-soft` | `#55546a` | Secondary text |
| `--indigo` | `#5548e0` | Labels, primary buttons, the ribbon, the mark |
| `--indigo-deep` | `#3d32b5` | Hover states and small indigo text that needs more contrast |
| `--rule` | `#dddbee` | Hairlines and borders |

One accent only. Indigo marks what the CV marks: block labels and the things you can act on.
There is no dark theme: both source artefacts are light.

## Type

| Role | Face | Where |
|---|---|---|
| Display | League Spartan (700, 800) | Name, section labels, entry titles, the about statement |
| Body | Roboto (400, 500) | Paragraphs, lists, buttons |
| Utility | Roboto Mono (400) | Dates, tags, the assistant's navigation note |

- The name is set very large and tight (`letter-spacing: -0.045em`, `line-height: 0.86`), on
  two lines, as on the CV.
- Section labels are uppercase with `0.34em` tracking, the CV's most recognisable device. Use
  the `label` class; do not restyle it per section.
- Fonts are self-hosted (Fontsource, Latin subsets). No third-party font host.

## Layout

- One column of content, `--wrap` (70rem) wide.
- Every section is a two-column grid (`src/components/Section.astro`): a 13rem label column and
  the content. Under 52rem the label stacks above. This mirrors the CV's sidebar and body.
- Dated items (jobs, projects, studies) use the shared `entry` classes: title left, period
  right in mono, organisation below in indigo, then text.
- Hero and contact are the only tinted blocks; they open and close the page.

## Signature: the ribbon

A band of 44 fine lines crosses the hero and twists once, after the LinkedIn banner. It is
drawn on a canvas by `src/scripts/ribbon.ts` and drifts very slowly.

- It sits on the right 60% of the hero, fading in from the left, so lines never run through
  the copy. On narrow screens it is a short band behind the portrait.
- It is the one decorative element. Nothing else on the page is ornamental.
- With `prefers-reduced-motion` it draws a single still frame.

## Motion

- Page load: the hero copy rises in sequence, once.
- The assistant panel eases in; the launcher mark turns 30 degrees on hover.
- When the assistant brings the visitor to a section, a short rule draws itself under that
  section's label (`is-pointed`).
- No scroll-triggered reveals.

## Voice

Plain, first person on the page, third person in the assistant. Buttons say what they do
("Email me", "Download CV"). Errors say what happened and what to do next, without apology.
