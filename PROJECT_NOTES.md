# PhilosophyApp — Project Notes

## Project purpose

The application is an educational reference and study guide for classical Greek and Roman philosophy. It is also an evolving software development project for learning and experimenting with Codex-assisted programming.

The working project is `/home/nick/Documents/PhilosophyApp`. Use this copy for future development; the accidental copy in the Codex folder is no longer maintained.

## Current architecture

The application is a static, browser-based site using plain HTML, CSS, and JavaScript. Application files sit together in the project root; there are no application subdirectories, framework, package manifest, third-party runtime dependencies, build tools, backend, or database.

| File | Responsibility |
| --- | --- |
| `index.html` | Timeline page shell, navigation, timeline container, and details panel. |
| `app.js` | Timeline rendering, chronological sorting, philosopher selection, and details rendering. |
| `ideas.html` | Ideas Explorer page shell, navigation, question controls, and results container. |
| `ideas.js` | Question selection and philosopher card rendering. |
| `schools.html` | School overview and comparison page shell and category dropdown. |
| `schools.js` | Overview rendering, school checkboxes, and comparison table filtering. |
| `schools-data.js` | School records, exposed as `window.PHILOSOPHICAL_SCHOOLS`. |
| `influence.html` | Influence network shell, legend, selection panel, and relationship list. |
| `influence.js` | SVG arrows, philosopher buttons, highlighting, and evidence rendering. |
| `influence-data.js` | Network roster, two additional biographies, layout, and sourced relationships. |
| `quiz.html` | Quiz page shell and centered question/results card. |
| `quiz-data.js` | Twenty questions in `window.PHILOSOPHY_QUIZ_QUESTIONS`. |
| `quiz-state.js` | DOM-independent session factory, `window.createPhilosophyQuiz`. |
| `quiz.js` | Question rendering, immediate feedback, results, and expandable review. |
| `tests/quiz-state.test.cjs` | Optional Node.js built-in tests for quiz content structure and session transitions. |
| `history.html` | Historical Context shell, category controls, combined timeline, and information panel. |
| `history-data.js` | Eighteen sourced event records in `window.HISTORICAL_EVENTS`. |
| `history-time.js` | Pure historical-date, shared-scale, overlap, and filtered selection helpers in `window.HISTORY_TIME`. |
| `history.js` | Both timeline sections, event filtering, highlighting, and detail rendering. |
| `tests/history-time.test.cjs` | Date boundaries, scale geometry, event integrity, overlap, and filter/selection tests. |
| `library.html` | Primary Sources Library shell, search/filter controls, and reading-card region. |
| `library-data.js` | Fifteen locally stored, attributed excerpts in `window.PRIMARY_SOURCES`. |
| `library-filter.js` | Pure search indexing, combined matching, and dataset-derived choices in `window.LIBRARY_FILTER`. |
| `library.js` | Reading cards, native disclosure controls, filtering, counts, and reset behavior. |
| `tests/library.test.cjs` | Content integrity, search fields, combined filters, and dataset-driven expansion checks. |
| `data.js` | Shared philosopher records, exposed as `window.PHILOSOPHERS`. |
| `ideas-data.js` | Questions and answers, exposed as `window.PHILOSOPHICAL_QUESTIONS`. |
| `styles.css` | Shared theme and all page-specific styles and responsive rules. |
| `greek_roman_philosophers_v1.xlsx` | Original source collection; not read by the application at runtime. |
| `README.md` | User-facing project documentation. |
| `PROJECT_NOTES.md` | Internal development reference. |

Each HTML page loads its data scripts before its behavior script using ordered `defer` tags. Navigation uses relative links between separate HTML documents, with `aria-current="page"` on the active link. There is no client-side router; changing pages reloads the document and resets page selection. Header, navigation, and footer markup are maintained separately in each HTML file.

## Development conventions

- Files use lowercase names, with hyphens for compound names such as `ideas-data.js`. Data and rendering behavior are separate files. Documentation uses uppercase Markdown filenames.
- Data is stored as JavaScript arrays of objects. Philosopher records contain `id`, `name`, `birth`, `death`, `dateNotes`, `culture`, `region`, `tradition`, `summary`, and `source`.
- Shared philosopher IDs currently follow `philosopher-1` through `philosopher-10`. Answers reference these through `philosopherId`; preserve those relationships when editing records. Questions have descriptive IDs such as `good-life` and an ordered `answers` array containing `philosopherId`, `tradition`, and `summary`.
- Historical years are numeric: negative for BCE, positive for CE, with no year zero. Timeline coordinates explicitly make 1 BCE and 1 CE adjacent.
- Each behavior script uses a strict-mode immediately invoked function. Scripts create DOM elements with `createElement` and `textContent`, attach event listeners, and replace displayed content with `replaceChildren`. Their small element helpers are local copies; there is no shared JavaScript component module.
- Shared CSS custom properties define colors and typography. Layout uses Grid and Flexbox, with media queries at 1100px and 650px. Explorer rules override the general timeline-oriented `main` layout.
- Accessibility patterns include native buttons, visible keyboard focus, `aria-pressed` selection, labeled regions, live results, and JavaScript-disabled notices. Timeline detail scrolling respects reduced-motion preferences.

Tests use Node.js's built-in runner: `node --test tests/*.test.cjs`. They load browser globals through VM contexts without a DOM or dependencies. Quiz coverage includes bank structure, distinct random sampling, locked answers, invalid transitions, scoring, completion, and restart. Historical Context coverage includes era conversion, date formatting, shared-scale geometry, inclusive overlap, all eight filter combinations, and selection changes. Library coverage is described below. Node.js is optional development tooling; the app still runs directly in a browser. No lint configuration or build step is present. Browser checks cover rendering, keyboard interaction, navigation, desktop/mobile layout, overflow, and console errors; the other pages do not have automated tests.

## Current pages

**Chronological timeline:** `index.html` loads `data.js` and `app.js`. Lifespans are positioned as percentages within the fixed 500 BCE–200 CE range, sorted by birth year. Selection updates a details panel. Desktop displays the panel beside the timeline; narrower screens place it below. Intermediate widths allow horizontal scrolling, while phone widths use names above bars and a compact axis. Initial details use the first shared record.

**Philosophical Ideas Explorer:** `ideas.html` loads `data.js`, `ideas-data.js`, and `ideas.js`. A `Map` resolves answer IDs to shared philosopher names. Answer traditions can override the shared record's tradition. The first question is selected on load; selecting another replaces the heading and vertical card list. Both pages share `styles.css` and the philosopher collection.

**Philosophical Schools:** `schools.html` loads `data.js`, `schools-data.js`, and `schools.js`, sharing the existing stylesheet and navigation pattern. School records have stable descriptive IDs, `name`, `founding` (display text), `philosopherIds`, `centralIdea`, `happiness`, `virtue`, `knowledge`, and `emphasis`. A `Map` resolves principal figures from shared philosopher records. Overview cards use an adaptive CSS grid. A local `Set` tracks selected schools, initially all five; native checkboxes and a category dropdown rebuild a semantic table with column and row headers. No selection hides the table and shows a friendly status message. Filters leave controls and focus intact and reset on page load.

## Architectural decisions and open questions

**Primary Sources Library:** `library.html` loads `data.js`, `library-data.js`, `library-filter.js`, then `library.js`. Records contain a stable descriptive `id`, shared `philosopherId` (the author/teacher, not the dialogue speaker), `work`, one broad primary `topic`, `description`, verbatim `passage`, precise ancient `reference`, `translator`, `edition`, `sourceUrl`, separate introductory `context`, and optional-text `attribution`. The seven author choices and six topics derive from actual records. No uncertain composition dates are displayed.

A pure index resolves names from shared biographies and performs trimmed, case-insensitive substring matching across author, work, topic, description, quotation, and attribution. Author and topic filters combine with the query using AND. Cards and controls are retained while visibility changes, preserving open passages and focus. Native `details`/`summary` provide keyboard disclosure and expanded state; a bottom Close Passage button returns focus to the summary. Multiple cards can stay open. Clear Search preserves dropdowns; Clear Filters clears query and both dropdowns. Nothing is persisted or fetched at runtime.

**Library editorial decisions:** All 15 excerpts were checked against the linked English transcriptions on 22 October 2026. Brief fragments are identified as excerpts and retain original wording; introductory context is outside the blockquote. Plato is the author and Socrates the represented speaker. Epictetus is the teacher, with Arrian identified as recorder/compiler. Epicurus’s letter and doctrines survive in Diogenes Laertius, Book X. Public-domain status is stated for the United States, not assumed worldwide (notably Ross’s 1925 translation).

Translation sources are Jowett (Plato and Politics), Ross (Nicomachean Ethics, first published 1925), Hicks (Epicurus, 1925), Long (Epictetus, 1877; Marcus Aurelius, the cited 1889 printing), Gummere (Seneca letters, cited 1925 reprint), Stewart (Seneca dialogues, 1889), and Miller (Cicero, 1913). Internet Classics Archive does not identify specific printings for Jowett/Ross; those records say so rather than assign an invented edition. Bibliographical checks used the corresponding Wikisource title pages, including [Ross](https://en.wikisource.org/wiki/Nicomachean_Ethics_(Ross)), [Gummere](https://en.wikisource.org/wiki/Moral_letters_to_Lucilius), and [Long’s Marcus Aurelius](https://en.wikisource.org/wiki/The_Thoughts_of_the_Emperor_Marcus_Aurelius_Antoninus). Online transcriptions can contain errors; source scans and critical editions remain useful editorial follow-up. No modern revised translations are silently substituted.

To add an excerpt, verify wording, ancient reference, authorship, translation rights, and bibliographic details first; then append a record with a unique ID and a valid shared author ID. Use an existing broad topic where suitable and keep context to 2–4 sentences. Search, choices, counts, and rendering require no changes. Preserve paragraph breaks with double newlines when needed. Update the displayed collection count in README and the integrity test if the curated collection changes. Optional source links are reader-initiated external navigation; there are no automatic links to other application pages or text retrieval services.

Library tests cover required metadata, unique IDs, author references, all intended search fields, case/partial matching, independent and combined filters, no results/reset inputs, nonmutating filtering, and adding data without renderer changes. Browser checks complement these pure tests for disclosures, focus, responsive layout, navigation, and regression behavior.

**Historical Context:** `history.html` loads shared `data.js`, then `history-data.js`, `history-time.js`, and `history.js`. It reuses the ten timeline biographies and their IDs without changing the original timeline. Event records have `id`, `name`, `start`, `end`, `approximate`, `category`, `description`, and editorial `source` metadata; optional `displayDate`, `dateNotes`, and `additionalSource` handle qualifications. Sources remain in data for maintenance; no external links or requests are added to this page. New events need no renderer changes unless a new category is introduced.

Date helpers accept negative BCE and positive CE years, rejecting zero and reversed intervals. `coordinate(y)` returns `y + 1` for BCE and `y` for CE, making 1 BCE and 1 CE adjacent; this coordinate is never displayed. Inclusive overlap compares both interval endpoints, supporting a point by equal endpoints or an omitted end. Approximation is a display qualification, not a probabilistic uncertainty window. All matches are year-level contemporaneity, not evidence of location, participation, or causation. Events such as the Academy represent their founding date, not the institution's entire subsequent existence.

One scale contains both sets of records, retaining at least 500 BCE–200 CE and rounding outward by decades when needed. The current 508/507 BCE reforms extend its start to 510 BCE. Both sections use the same row and coordinate functions in one scrolling container, with matching repeated date axes and sticky label columns. Ranges show their actual endpoint distance; points use centered diamonds and enlarged pointer targets without widening their chronology. Text categories and dates supplement color. The Nerva–Antonine span is corrected to 96–192 CE, the 146 BCE event avoids conflating conquest with the later province of Achaea, and the Punic Wars bar explicitly includes gaps between three wars.

Three filter groups combine political/military categories and independently toggle cultural/social and philosophical events. Rows and controls are retained while their visibility and classes change. `selectionView` derives overlaps for either direction; a hidden selected event clears selection, whereas a philosopher remains selected and lists only visible overlapping events with a hidden-event count. Clear selection leaves filters intact. Desktop uses a sticky information panel; at 1100px or below selection brings that panel into view and focuses its heading. Preferences are not persisted. The original timeline could later adopt the date helpers, but no application-wide refactor or new dependency was introduced.

**Philosophy Quiz:** `quiz.html` loads `quiz-data.js`, `quiz-state.js`, then `quiz.js`. Question records have unique `id`, display `category`, `question`, four `options` with stable `id` and `text`, `correctAnswerId`, and `explanation`. The bank uses the existing pages' introductory content, with a 6/7/7 category split. These are self-contained educational prompts, so no unused shared biography scripts are loaded. To expand the bank, append records with distinct IDs and valid option references; the core UI remains unchanged. Update the bank-size wording in the page and README if the total changes.

The session factory owns selected questions, index, recorded answers, correct count, answered flag, and completion flag. Fisher–Yates shuffles a copy of the bank and takes 10 questions without replacement; the supplied random function defaults to `Math.random` and can be seeded in tests. Starting another quiz resets all state and reshuffles; no guarantee of disjoint consecutive sessions is made. Answer and Next transitions reject invalid, repeated, or out-of-order actions. State snapshots copy the selection array and answer records.

Rendering stays separate from the model. Answer feedback updates the existing controls, uses text labels alongside color, and announces through a status region. Submitted options use `aria-disabled` plus the model guard, keeping keyboard focus stable while preventing changes. Next is natively disabled until submission; advancing or restarting focuses the new heading. Results derive the percentage from recorded correct answers and render all session answers in native expandable `details` elements. No persistence, external services, or libraries were introduced. Automated model tests complement browser checks; extending the bank does not require changing the session length or rendering code.

**Who Influenced Whom?:** `influence.html` loads `data.js`, `influence-data.js`, and `influence.js`. `window.PHILOSOPHY_NETWORK` holds `additionalPhilosophers`, `layout`, and `relationships`. Nine existing biographies are reused; Cleanthes and Chrysippus are defined only in the new data file and are not added to the timeline. Relationships use stable `id`, `source` and `target` philosopher IDs, `category` (`direct` or `intellectual`), `explanation`, `reference`, and source `url`. Direction always runs from influencing to influenced philosopher.

The network uses native SVG paths and arrowhead markers behind absolutely positioned HTML philosopher buttons, without a visualization dependency. Layout coordinates, dimensions, and optional long-arrow routes are separate from historical relationship records. Positioning is approximately chronological, not a proportional date scale. Explicit routes keep long arrows away from labels; adding nodes may require layout adjustments, though rendering and selection logic remain data-driven. Runtime checks catch invalid node references and relationship categories.

All arrow paths have broad pointer targets, keyboard activation, and a matching native button in the supplementary relationship list. Selection changes classes and ARIA state without rebuilding the graph or its controls. A live details panel renders reused biographies or two-category evidence summaries and links. Clear selection restores the overview. A horizontally scrollable region preserves readable labels on mobile; there is no zooming, dragging, or persistent selection. Historical evidence comes from linked ancient texts, including later biographical testimony in Diogenes Laertius; the page explicitly identifies its selective scope. No shared JavaScript module was introduced.

Future integration could link shared philosopher IDs to timeline entries, reuse relationship records, or connect source references to a Primary Sources Library. These are possibilities only; school filtering and extra integration are not implemented.

Network verification covered all 11 node selections and 11 relationship buttons, highlighting and source display, arrow clicking and keyboard activation, reset, evidence-panel focus, horizontal scrolling, and phone-width overflow. Regression checks covered timeline selection, all Explorer questions, and Schools filtering. Static checks verified local file references, active navigation, unique HTML IDs, network references, relationship counts, and forward arrow directions. The network currently relies on browser and static checks rather than automated tests.

- The static implementation supports the README's stated ability to run locally without installation or a build step and to use static hosting.
- Separating question content from rendering allows expansion without rewriting the layout. Shared IDs avoid duplicating philosopher names and provide a basis for future links; card-to-timeline links are not currently implemented.
- The spreadsheet is a source artifact, while `data.js` is the runtime collection. Spreadsheet edits do not synchronize automatically.
- Navigation and DOM helpers are duplicated. The code does not establish why duplication was chosen or a future component strategy.
- Schools uses a keyboard-focusable horizontal table scroller, an explicit scroll hint, and a sticky school-name column to preserve comparison context on narrow screens. A single-category view fits the available width. A local category list drives table headings and data-field selection; no shared JavaScript module was introduced. The new `.visually-hidden` CSS utility supports accessible table captions and can be reused.
- CSS contains successive overrides, particularly for mobile timeline behavior. There is no documented stylesheet organization or formatting standard beyond the existing patterns.
- Content validation is limited: scripts handle missing/empty collections, but Explorer rendering assumes every answer references an existing philosopher. No schema validation or editorial/source-review process for question summaries is documented.

Schools verification extends the manual browser checks to all five overview records, individual school toggles, an empty selection and recovery, all four categories and the full table, keyboard controls, narrow-screen table scrolling, and navigation back to the existing pages. No automated test tooling was added.

## Future development considerations — tentative

The seven-page initial development phase is complete with the Primary Sources Library. The next tentative phase is an architectural review and revision: examine duplicated navigation/DOM helpers, stylesheet organization, shared content structures, and opportunities to consolidate functionality. Subsequently expand and refine educational content, including source-scan review and fuller excerpts where useful. This is a direction for review, not a commitment to adopt a framework or to add more initial-phase pages.

## Documentation maintenance

`README.md` covers the user-facing overview, features, and setup instructions. Update it when user-facing behavior or setup changes.

`PROJECT_NOTES.md` covers architecture, established conventions, decisions, and future considerations. Update it when meaningful architectural changes occur, including new pages, shared modules, data relationships, dependencies, or verification tooling. Minor content edits generally do not require documentation changes.
