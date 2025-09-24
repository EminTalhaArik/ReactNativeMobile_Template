# Integrations Overview

## Clerk
- Dashboard: https://dashboard.clerk.com/
- Required keys: `CLERK_PUBLISHABLE_KEY`
- Session strategy: Mobile tokens with secure storage cache.

## Backend API
- Base URL is configured via `API_BASE_URL`.
- Global API key is injected from `API_KEY`.
- Update shared API endpoints in `src/shared/api/endpoints.ts`.
