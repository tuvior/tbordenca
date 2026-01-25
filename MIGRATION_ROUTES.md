# Route Mapping

| Old Path | New App Router File |
| --- | --- |
| / | src/app/page.tsx |
| /projects | src/app/projects/page.tsx |
| /resume | src/app/resume/page.tsx |

Notes:
- Old app uses a catch-all `*` route that redirects to `/`. We are using `not-found.tsx` for a 404 page in Next.js.
