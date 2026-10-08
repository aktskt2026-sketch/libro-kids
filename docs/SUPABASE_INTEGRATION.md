# Supabase integration preparation

The UI runs entirely on local mock data. No Supabase client, account, database, migration, or network integration is enabled.

## Boundaries already prepared

- `types/index.ts`: domain types for books, quizzes, child profiles, preferences and progress.
- `lib/repository.ts`: asynchronous `LearningRepository` and its device-local mock implementation. `learningRepository` is the single selection point consumed by the app provider.
- `lib/supabase/contracts.ts`: separate parent-auth, content, child-profile and progress contracts.
- `lib/supabase/config.ts`: optional public configuration, returns null without valid values and never contacts Supabase.
- `.env.example`: public URL and publishable-key placeholders. Real env files remain ignored.
- `features/pages/account.tsx`: signup, login, recovery, family overview and completion UI. `FamilyAuthShell` shares the illustrated form layout. The current form actions update mock parent details only; no password storage or real identity check occurs.
- `ParentAuthService` includes display-name signup, sign-in, password-reset requests and sign-out. No adapter is active.

## Integration sequence for the next phase

1. Install `@supabase/supabase-js` and `@supabase/ssr` when backend work is authorized.
2. Create a Supabase project; copy public config into `.env.local`. Use a browser publishable key, following [Supabase API-key documentation](https://supabase.com/docs/guides/getting-started/api-keys).
3. Create parent-owned child profiles, localized books and book pages, quizzes and question records, read completions, quiz attempts, nature-game completions, preferences, and an append-only reward ledger. Use UUID record IDs; preserve mock slugs for routing.
4. Enable row-level security before exposing tables. Authenticated parents can manage only their children's profiles, preferences and progress; catalog content can be readable by the intended audience.
5. Implement parent auth with server-aware sessions. Children use parent-owned profiles rather than separate email accounts. Wire `/register` and `/login` to `ParentAuthService`, handle email verification before child setup, and wire `/forgot-password` to `requestPasswordReset`. Add a real reset callback and password-update form with configured redirect URLs. Show remote errors and pending states; remove demo copy only when real requests and session verification work. The UI's local `parentEmail` flag is not authentication or authorization. Preserve device progress during sign-out and explicitly handle migration to a parent-owned profile.
6. Implement the service contracts and replace `learningRepository` with the Supabase adapter. Fetch content through `ContentService` and pass domain objects to the existing card, reader and quiz components.
7. Award points through a server transaction or database function: one reward per completed book, only score improvement for quiz replays, and one five-point reward per completed nature game. Derive score from stored question answers; validate ownership and book/quiz/game IDs. For nature games, validate the action list against the game catalog before recording completion. Use a uniqueness constraint for reward-event idempotency.
   The `park` game requires all twelve catalog items to be both collected and delivered; validate collect proximity and bin proximity for deliveries using authoritative round state. Its 120 round points are separate from the five-point profile award. The `NatureGameAction` contract includes batch delivery actions for the future adapter; no network call is currently made.
8. Add loading and failure recovery for remote operations, then test ownership isolation and concurrent award requests.
9. Replace locally computed streaks with calendar-day reading events in the child's selected timezone.

The mock app currently keeps profile, progress, language and notification preferences on this device. Passwords are never persisted. The notification toggle saves a preference; actual notification delivery is a coming-soon feature. The current demo points are illustrative and must not be migrated as real awards.

The published Site's owner access and future Supabase parent authentication are separate layers.
