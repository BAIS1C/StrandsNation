# StrandsNation codebase wiki

## Shared page shell and response headers

- `src/app/layout.tsx` is the Next.js App Router root layout. Its `<head>` is shared by the public pages and currently holds the EWDS boot script and structured data.
- `next.config.mjs` sets response headers for `/(.*)`. Its Content Security Policy controls external scripts and beacon requests for the site.
- The site is deployed on Vercel at `strandsnation.xyz`. A Cloudflare Web Analytics site using JS Snippet installation needs its beacon in the root layout, `https://static.cloudflareinsights.com` in `script-src`, and `https://cloudflareinsights.com` in `connect-src`.
- Keep analytics in the shared shell so page routes are counted consistently. Verify the rendered script, response CSP, and browser request on the live Vercel deployment after release.

Source checked against Git commit `d1eab77b801216854b392bb044d37a880fe97012` on 2026-09-27 SGT. `ARCHITECTURE.md` describes the root layout but its route inventory is stale; this section covers only the shared shell and response headers.
