# Libro-Kids

A responsive Uzbek-first children's reading and learning app, with Russian localization. Built with React 19, TypeScript, Tailwind CSS 4, and file routing through the Vinext/Next app router.

## Run

Requires Node.js 22.13 or newer and npm.

```sh
npm run install:ci
npm run dev
npm run typecheck
npm test
npm run build
```

Development opens at the URL printed by the server (normally http://127.0.0.1:5173).

## Routes

| Route         | Screen                                                       |
| ------------- | ------------------------------------------------------------ |
| / and /home   | Home with demo child profile                                 |
| /welcome      | Splash and Bilbiljon welcome                                 |
| /language     | Uzbek / Russian selection                                    |
| /account      | Demo parent registration / login                             |
| /child-setup  | Child setup; ?edit=1 edits existing profile                  |
| /library      | Search, age and category filters                             |
| /library/[id] | Page-by-page book reader                                     |
| /quizzes      | Quiz selection                                               |
| /quizzes/[id] | Five-question player, feedback and results                   |
| /nature       | Illustrated nature game selection                            |
| /nature/[id]  | Waste sorting, litter search and walking park adventure      |
| /rewards      | Seven tree stages, daily reading goal and badges             |
| /profile      | Stats, read books and best quiz results                      |
| /settings     | Language, demo account, preferences and coming-soon features |

The root displays the product immediately. Onboarding can be opened from Settings → Bilbiljon bilan tanishuv.

## Architecture

- `app/`: route entries, metadata and shared design tokens.
- `features/pages/`: page components. This avoids conflicting with Next's reserved root `pages/` router.
- `components/` and `layouts/`: reusable app UI, onboarding shell and accessible primitives.
- `data/`: local books, quizzes, wisdom, rewards and coming-soon arrays.
- `hooks/`: app state and optional browser tools.
- `lib/`: storage adapter, deterministic award rules and future integration boundaries.
- `types/`: shared domain models.

All content and authentication are mocked. Profile and progress persist in browser storage on the current device. Every book has original short Uzbek and Russian sample stories. Quiz answers give feedback; book rereads and quiz replays cannot repeatedly farm points. Settings includes all eleven requested coming-soon cards and friendly modals.

Application links use document navigation through `components/app-link.tsx`. This avoids a Vinext production RSC prefetch/navigation failure that prevented clicks from changing pages. Onboarding actions commit profile and preference changes before navigating through `lib/navigation.ts`, so device-local data survives the page load. Verify navigation against the production build, as the failure did not appear in the development server.

The Nature section contains three complete mock games: sort six objects into three bins, collect eight pieces of litter, or choose Bilbiljon, Aziz or Malika and walk around a park to collect and deliver twelve objects. The walking adventure opens at `/nature/park`: click/tap a destination or use the direction pad, arrow keys or WASD; Space/E collects nearby litter and Enter delivers a bag at the bin. Each object earns ten round points (120 total), while a complete delivery awards five profile points once. Partial deliveries are allowed; collection alone does not complete the game. Each game's five-point profile reward is idempotent, and completion persists in profile history. Older saved profiles retain their progress. There is no time limit; unfinished rounds restart when leaving the page.

Nature artwork: [asset and exact generation prompt](docs/ARTWORK_NATURE.json).
Walking game terrain and character sprites: [exact prompts and method](docs/ARTWORK_PARK.json).

## Supabase next phase

Read [the integration guide](docs/SUPABASE_INTEGRATION.md). Public configuration placeholders and async service contracts are prepared; no backend connection or SDK is active.

## Artwork and references

The illustrated purple theme follows the supplied Libro-Kids screenshot references: national clothing, a Samarqand-inspired storybook landscape, glossy purple buttons and colorful 3D learning cards. Four new assets live in `public/images/storybook/`; the six-cell atlases provide feature illustrations and story covers without embedded UI text. Exact prompts, reference and generation method: [redesign manifest](docs/ARTWORK_REDESIGN.json). The earlier mentor and reward-tree assets are documented in [the original manifest](docs/ARTWORK.json).

The historical quiz content was checked against [Samarqand regional administration](https://samarkand.uz/press/news/bugun-amir-temur-1336-1405-tavallud-topgan-kun2514) and [Youth Affairs Agency](https://gov.uz/oz/yoshlar/news/view/128016). These links also appear on quiz pages.

## Verification

`npm run typecheck` verifies all source types. `npm test` covers point idempotency, best-score awards, reading dates and streak resets. Browser checks cover routing, filters, book and quiz completion, profile editing, language switching, modals and responsive layouts. No real accounts or network databases are involved.
