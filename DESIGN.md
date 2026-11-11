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
- Every section is a two-column grid (`src/components/Section.astro`): the label in a `--side`
  (13rem) column and the content, under a hairline that draws itself into view. Under 52rem
  the label stacks above. This mirrors the CV's sidebar and body.
- Dated items (jobs, projects, studies) are `stage` blocks: the period in mono on top, then the
  title, the organisation in indigo and the text. Each part has its own spacing; nothing sits
  on the next line without room.
- The page is typographic: no portrait. A portrait returns only with a good photo, and then
  beside the contact heading; never in a circle, never in the hero.
- Each project shows its logo or screenshot on a white 16:9 plate to the right of the text
  (below it, at full column width, on phones). With a pointer, pictures are grey at rest and
  take their colour when the project is hovered, so client brands never compete with the page
  or with each other. Touch screens cannot hover, so there they show in colour.
- Under 52rem the top bar keeps only the name and the language switch; the section links
  return on wider screens.
- Contact sets the heading across the top, then the lead on the left beside one card per
  channel on the right: an icon in a tinted circle, the channel, its handle in mono and an arrow. Email leads,
  its circle filled indigo. Under 52rem heading, lead and cards stack. Icons come from
  `src/components/Icon.astro`, inline SVG in the text colour.
- The footer is one centred line: the copyright, in mono.
- Hero and contact are the only tinted blocks; they open and close the page.
- No visible scrollbars; the bar under the top nav shows how far the page has scrolled.

## Signature: the ribbon

A band of 48 fine lines crosses the hero behind the name and twists once, after the LinkedIn
banner. It is drawn on a canvas by `src/scripts/ribbon.ts`: it draws itself in from the left on
load, drifts very slowly and leans towards the pointer.

- The hero fills the first screen (capped at 56rem) with one column on the left: the role, the
  name on two lines with an indigo full stop (at most 7.5rem), the pitch and two buttons, in
  that order and close together. The primary button opens the assistant, the outline one
  downloads the CV. No input in the hero: the panel is where questions are typed.
- The ribbon is faint behind the copy and full on the right, where it has room.
- On phones (under 44rem) the hero still fills the screen, but the ribbon becomes a band along
  the bottom and the copy is centred in the space above it: a portrait screen has no room beside
  the copy, and a band stretched to the full height runs behind the text. The name grows with
  the width and the buttons stack at full width.
- The ribbon is the one decorative element. Nothing else on the page is ornamental.
- With `prefers-reduced-motion` it draws a single still frame.

## Motion

Few pieces, done well. Nothing tilts, spins on hover, glows or scrolls sideways.

- Page load: the two lines of the name rise from behind their own edge, then the pitch and the
  buttons fade up.
- Scroll: each section's hairline draws itself from the left, and content rises into view once
  (`data-reveal`). Large headings rise from a mask (`mask`).
- The about statement lights up word by word as it scrolls past.
- The nav underlines the section in view.
- The assistant panel eases in; the launcher mark turns 30 degrees on hover. When the
  assistant brings the visitor to a section, a short rule draws itself under that section's
  label (`is-pointed`).
- `src/scripts/motion.ts` drives the scroll motion. Without it, or with
  `prefers-reduced-motion`, everything is visible and nothing moves.

## Voice

Plain, first person on the page, third person in the assistant. Buttons say what they do
("Email me", "Download CV"). Errors say what happened and what to do next, without apology.
