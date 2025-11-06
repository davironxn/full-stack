# What to do after a merge request lands

When you open this project in your repo host you will see "Align hero with shared motion-driven layout" as the latest merge request. Follow the checklist below to review, validate, and iterate on it.

## 1. Review the change set
- Skim the MR summary to understand the intent: new hero, navbar, and animation utilities.
- Use the repo tree to open the touched files (`components/Hero.tsx`, `components/Navbar.tsx`, etc.) and confirm the design matches your expectations.
- Pay special attention to the new helper modules under `components/landing/` and `lib/motion/react.tsx` so you know how the animation primitives are wired.

## 2. Run the project locally
```bash
npm install
npm run dev
```
- Visit http://localhost:3000 to view the updated landing hero and navigation.
- Interact with the motion effects (badge sparkle, CTA hover states, hero image tilt) to ensure the UX feels right.

## 3. Validate quality gates
Because the automated `npm run lint` and `npm run build` commands currently error due to missing Prisma client artifacts and an ESLint config upgrade path, add these manual checks:
- `npm run lint -- --max-warnings=0` once an `eslint.config.js` is introduced.
- `npm run build` after generating the Prisma client (`npx prisma generate`).
- Consider adding Vitest coverage with `npm run test` for critical shared components.

## 4. Plan follow-up polish
- Decide whether to keep the temporary `lib/motion/react.tsx` shim or replace it with the official `framer-motion` package.
- Align the dashboard screens under `app/dashboard/` with the new visual language so front- and back-office experiences match.
- Refresh content in `data/projects.ts` and `data/testimonials.ts` if you have new case studies to highlight alongside the hero update.

## 5. Merge and iterate
- Once the above checks look good, approve and merge the MR.
- Track any follow-up tasks (lint config, Prisma generation, dashboard styling) as separate issues to keep the work organized.

Keeping this workflow handy makes it easy to move from reviewing the merge request to shipping the updated UI confidently.
