# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, grouped by feature: `src/modules/` for screens, `src/components/` for reusable UI, and `src/services/` for API helpers. Platform artifacts stay in `android/`, `ios/`, and `app.json`. Shared configuration such as `metro.config.js`, `babel.config.js`, and `tsconfig.json` define bundling, transpilation, and type-safety. Assets (images, fonts, lottie files) belong in `assets/` with platform-specific variants nested under `ios/` or `android/` when required. Keep environment-specific values inside `config/` files and guard secrets with `.env` (never commit).

## Build, Test, and Development Commands
Run `yarn install` to sync dependencies. Use `yarn start` to launch the Metro bundler, then `yarn ios` or `yarn android` for local simulators/emulators. Execute `yarn lint` to apply ESLint + TypeScript rules, and `yarn format` to run Prettier. `yarn test` triggers Jest unit suites; append `--watch` while iterating. Use `yarn clean` before packaging to wipe caches (Gradle, Pods, Metro).

## Coding Style & Naming Conventions
Follow TypeScript strict mode; rely on absolute imports via path aliases declared in `tsconfig.json`. Components use PascalCase (`UserProfileCard`), hooks use camelCase with `use` prefix (`useAuthSession`), and constants live in SCREAMING_SNAKE_CASE. Enforce 2-space indentation, trailing commas, and single quotes via ESLint/Prettier. Keep files focused: one React component or hook per file, colocate tests next to implementation (e.g., `Button.tsx` + `Button.test.tsx`).

## Testing Guidelines
Jest is the default test runner with React Native Testing Library for rendering checks. Name specs `<module>.test.tsx` or `<hook>.test.ts`. Mock network calls with MSW to keep runs deterministic. Target coverage ≥80% overall; run `yarn test --coverage` before pushing. Snapshot tests belong only to stable UI modules—update snapshots intentionally and describe visual changes in PRs.

## Commit & Pull Request Guidelines
Adopt Conventional Commits (`feat:`, `fix:`, `chore:`). Keep commits scoped and reversible; avoid bundling unrelated changes. Pull requests need a summary, test evidence (`yarn test`, platform screenshots when UI changes), and linked Linear/Jira issue IDs. Request review from at least one teammate, ensure CI is green, and wait for approvals before merging.

## Configuration & Environment Tips
Copy `.env.example` to `.env` for local secrets; never hardcode API keys. Update `config/index.ts` when adding a new environment. Bump native build numbers in `android/app/build.gradle` and `ios/<AppName>/Info.plist` before app store releases. Document any third-party service setup in `docs/integrations.md`.
