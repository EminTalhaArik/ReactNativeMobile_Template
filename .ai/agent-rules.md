You are an AI coding assistant working inside the “React Native Sustainable Template” repository. Your job is to implement features, fixes, and tests while preserving the template’s architecture, tooling, and conventions.

Core Principles
- Follow SOLID, Clean Code, and feature-based separation. Keep UI, business logic, and data layers apart.
- Avoid ad-hoc structures; place code under the correct feature or shared directory.
- Never hardcode secrets or bypass existing configuration, storage, or auth layers.

Architecture & Directories
- src/app: global app wiring (providers, navigation, theming). Update navigation only via the existing stack/tab structure and keep type definitions in `src/app/navigation/types.ts`.
- src/features/<feature>/: create feature folders with `screens/`, `components/`, `services/`, `types/`. Screens should render UI, defer business logic to services or hooks. Components must be reusable within the feature.
- src/shared/: authors reusable building blocks.
  - `components/`: Button, Text, Input, Card, ScreenContainer etc. Extend or add new components here when multiple features need them. Use styled-components and theme tokens.
  - `theme/`: keep design tokens, light/dark themes, ThemeProvider. Consume theme via styled-components; don’t inline magic colors.
  - `hooks/`: add shared hooks; e.g. theme preference toggles.
  - `api/`: use `request` helper, define endpoints in `endpoints.ts`, add types in `types.ts`. Do not create new axios instances; extend the shared client.
  - `config/`: read runtime config via `react-native-config`; add new env variables here if needed.
  - `storage/`: use AsyncStorage/EncryptedStorage wrappers instead of direct library calls.
  - `state/`: Zustand stores for global state (e.g., theme preference). Ensure stores are minimal and persist only when necessary.
- src/tests/: testing utilities, mocks. Add or reuse helpers here.

Dependencies & Tooling
- TypeScript is mandatory; respect path aliases (`@app`, `@features`, `@shared`, `@tests`).
- Navigation uses React Navigation (Stack for auth, Bottom Tab for main). Do not introduce alternative navigation stacks unless explicitly required.
- State management: Zustand. Prefer feature-local state or hooks over new global stores.
- Forms: React Hook Form + Zod. Define schemas next to the screen/service; always validate inputs.
- HTTP: axios via `request` helper. Reuse interceptors for Clerk JWT and `x-api-key`.
- Auth: Clerk (publishable key). Use `useSignIn`, `useSignUp`, `useAuth`, `useUser`. Maintain secure token cache via `secureStorage`.
- Styling: styled-components. Use theme tokens; no inline colors or ad-hoc styling beyond quick prototypes. Respect spacing/typography tokens.
- Testing: Jest + React Native Testing Library. For new code, provide service or component tests where meaningful.
- Lint/format/typecheck: keep code passing `yarn lint`, `yarn format`, `yarn typecheck`, `yarn test`. Run these before completion.

Implementation Rules
1. Create new screens/features following the folder skeleton. Each file should own a single responsibility.
2. Global logic lives in shared/; feature concerns remain within their module.
3. When adding API interactions:
   - Extend `shared/api/endpoints.ts` with a type-safe definition.
   - Implement a service in the relevant feature’s `services/` folder, calling `request`.
   - Define request/response types in `shared/api/types.ts` or feature `types/`.
4. For UI changes, consume `shared/components` or extend them. Ensure they respect theme props and accessibility.
5. Theme updates must update both light/dark modes and, if necessary, tokens.
6. Avoid direct Clerk SDK usage in random files; rely on the provider context and shared hooks.
7. Use AsyncStorage/EncryptedStorage wrappers; never call storage libraries directly.
8. For new state requirements, consider feature-level hooks before touching global stores.
9. Keep commit-ready code: no commented-out blocks, debug logs, or unused exports.

Documentation & Scripts
- Update README.md only if significant architecture changes or instructions are required. Document new env vars in `.env.example`.
- Ensure scripts remain operational (start, ios, android, clean, lint, format, test, typecheck). Add new scripts only if consistent with the tooling philosophy.

Communication & Review
- Provide minimal, clean diffs. Explain rationale in PR descriptions, referencing modules touched and tests run.
- If a requirement contradicts these standards, raise it in comments before implementation.

Your goal is to enhance apps built on this template without breaking its guardrails. Stay consistent, keep the structure clean, and validate with tests and linters before completing any task.
