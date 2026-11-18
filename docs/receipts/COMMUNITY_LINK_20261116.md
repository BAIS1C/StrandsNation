# Strands Nation Community link preparation

Agent: Codex desktop. Model: GPT-6 (gpt-6).
Date: 2026-11-16 SGT.

Prepared on branch `forum/community-link-20261116` from production source `6cc22bb1cc100431c364248f0d96492c75d4d686`. Worktree: `E:\Projects\Project Websites\worktrees\strands-community-link-20261116`. Original checkout's uncommitted August relocation changes were preserved.

Added COMMUNITY to shared Nav and COMMUNITY FORUM to shared Footer, both using `https://community.strandsnation.xyz` and the site's external-link treatment. Footer uses existing colour/font tokens and a keyboard focus outline. The existing mobile menu clipped its upper destinations because its filtered navigation ancestor constrained fixed-position height; the menu now has an explicit viewport-based height and switches on below 1024px so the added link remains usable.

Wiki gate: WIKI.md Shared page shell and response headers; ARCHITECTURE.md Directory Structure and Component API Principles. Added the Nav/Footer module contract and dependency diagram before editing, then appended the measured outcome. Drift: old main checkout predates production and its uncommitted architecture uses stale D: paths; current remote wiki covers only shared shell analytics. This change did not reconcile unrelated route history or product copy.

Verification:
- `npm ci --no-audit --no-fund`: added 44 packages in 1m.
- `npm run build`: exit 0, compiled successfully, types checked, 17/17 static pages generated. Existing warnings: outdated Browserslist data and useSearchParams client-rendering deoptimisations.
- `git diff --check`: passed.
- Production build served locally at http://127.0.0.1:3043.
- Playwright page identity: StrandsNation: Ready Player You. Meaningful home content, no framework overlay.
- Desktop 1440x900 and 1024x768: Community remains within viewport; page width equals viewport width.
- Tablet 820x900 and mobile 390x844: opened responsive menu; every destination remains inside viewport. At 390px, Community bounds x146.86 to243.14, y619.5 to640.5. Page width390.
- Footer href resolves exactly to https://community.strandsnation.xyz/.
- Browser console: zero errors; one pre-existing Windows WebGPU powerPreference warning.
- Screenshots inspected: `E:\Projects\Project Websites\StrandsNation\output\playwright\community-link-desktop-final-20261116.png`, `community-link-mobile-fixed-20261116.png`, `community-link-footer-20261116.png`.

Publication remains held until forum DNS and hosting are reachable. No push, production deployment, auth or forum permission changes performed. The standard build regenerated src/constants/playlist.ts; that generated change is deliberately not in this commit and remains uncommitted in this isolated worktree. Its generator was read before running the build.

Production route confirmed read-only: GitHub BAIS1C/StrandsNation, default branch main; production deployment 6688415514 succeeded at commit6cc22bb, environment URL https://strandsnation-feceo9tkb-bais1cs-projects.vercel.app. Parent independently confirmed Vercel team team_fGXkhEcC24JpIoqII5PZ1K2M, project prj_B7trlguMhB1fHIMEBxaY4cshyBxc.

Vault-consulted: everywear/ship/2026-07-01_flarum_community_forum_web_property.md; everywear/2026-06-02_flarum_oracle_always_free_deployment_path.md.
