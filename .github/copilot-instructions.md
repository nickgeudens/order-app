# Copilot Instructions for order-app

## Project Overview
- This is a React + Vite + TypeScript monorepo for a menu ordering web app.
- The main UI is in `src/`, with feature modules under `src/features/` (e.g., `menu`).
- UI primitives are in `src/components/ui/` (e.g., `button.tsx`, `card.tsx`).
- Menu data and logic are in `src/features/menu/service/`.
- App uses Tailwind CSS for styling (see `tailwind.config.js`).

## Architecture & Patterns
- **Component Structure:**
  - Feature components (e.g., menu grid, menu item) are in `src/features/menu/components/`.
  - Shared UI components are in `src/components/ui/`.
- **Data Flow:**
  - Menu state and actions are managed via a custom context in `src/features/menu/service/menuService.tsx`.
  - Components receive data and callbacks via props, not global state.
- **Styling:**
  - Tailwind utility classes are used throughout. Custom classes may be defined in `App.css` or `index.css`.
- **Separation of Concerns:**
  - Business logic (e.g., menu item increment/decrement) is kept in service/context files, not in UI components.

## Developer Workflows
- **Build:**
  - Use `npm run build` to build the app (Vite-based, outputs to `dist/`).
  - Docker builds use a multi-stage process; see `Dockerfile` for details.
- **Dev Server:**
  - Use `npm run dev` or `npm run host` to start the Vite dev server.
- **Linting:**
  - Run `npm run lint` (uses ESLint, config in `package.json`).
- **Preview:**
  - Use `npm run preview` to preview the production build locally.

## Conventions & Patterns
- **Component Props:**
  - Pass callbacks (e.g., `incrementItem`, `decrementItem`) explicitly to components.
  - Use TypeScript interfaces for all props (see `types.ts`).
- **File Naming:**
  - Use kebab-case for files and folders, PascalCase for components.
- **No node_modules or dist in Docker context:**
  - `.dockerignore` excludes these for faster, cleaner builds.
- **Image Assets:**
  - Static images are in `public/assets/` and referenced by relative path in components.

## Integration Points
- **Mollie API:**
  - Payment integration via `@mollie/api-client` (see `mollie.json` for config).
- **Radix UI:**
  - Uses shadcn components ( which use Radix UI primitives) for dialogs, separators, etc.
- **Nginx:**
  - Production builds are served by Nginx (see `Dockerfile`).

## Examples
- See `src/features/menu/components/menu-grid.tsx` for the main menu rendering pattern.
- See `src/features/menu/service/menuService.tsx` for context/provider usage.
- See `src/components/ui/button.tsx` for UI component conventions.

---

If you are unsure about a pattern or workflow, check the relevant feature or UI directory for examples. For new features, follow the structure and conventions of existing menu components and services.
