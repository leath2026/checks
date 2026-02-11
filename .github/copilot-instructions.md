# Copilot instructions

## Project overview
- Vue 3 + Vite app; entry is main.ts, root layout is App.vue with tabbed RouterLink navigation.
- Routes: / (HomeView) renders CheckPrinter, /history (HistoryView) lazy-loads for history table.
- State: Pinia store keeps a single transient `check` used to pass a selected history item back to HomeView.
- Persistence: check history lives in localStorage under `checkList`.
- Printing: CheckPrinter builds an on-screen check and injects print-only CSS before calling window.print.

## Key files and patterns
- App shell and routes: src/App.vue, src/router/index.ts.
- Home flow: src/views/HomeView.vue -> src/components/CheckPrinter.vue.
- History flow: src/views/HistoryView.vue reads localStorage, sets store check, and routes to /.
- Shared helpers: src/utilities.ts provides `formatMoney` used in CheckPrinter and HistoryView.
- Styling: CheckPrinter is largely inline-positioned; background image + MICR font live in src/assets.

## Data flow details
- Creating a new check uses recent history to seed defaults; see `genNewCheck` in CheckPrinter.
- Saving to history pushes the current reactive check into `checkList` in localStorage.
- Viewing history sets Pinia `state.check`, then HomeView reads it on mount to populate fields.

## Developer workflows
- Dev server: `npm run dev` (Vite).
- Build: `npm run build` (type-check + Vite build).
- Type-check only: `npm run type-check`.
- Lint: `npm run lint` (fixes in place).
- Format: `npm run format` (prettier on src/).

## Conventions to follow
- Keep the check layout positioning consistent with the background image; avoid refactoring inline positioning unless updating assets and print CSS together.
- When adding fields to a check, update both the form bindings in CheckPrinter and the history table columns.
- If history behavior changes, ensure localStorage key `checkList` and Pinia `state.check` handoff still match.
