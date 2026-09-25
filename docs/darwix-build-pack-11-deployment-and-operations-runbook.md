# Darwix Build Pack 11 — Deployment and Operations Runbook

Future setup, CI, static hosting, headers, release checks, observability, reset, rollback, local fallback and teardown instructions.

## Deployment contract and prerequisites

Status: instructions for a future build. No repository, app, hosting account, deployment, paid resource or public link has been created. Do not read example commands as executed work.

Deploy the Next.js production build (or static export `out` directory when `output: 'export'` is configured), not a development server. Baseline runtime requires no credentials, backend, external API or .env. Host/repository account authorization is separate from application secrets. Select an eligible plan and confirm source-sharing permission before publishing; all bundle contents are public-inspectable.

Prerequisites: completed implementation and tests; fictional data/content review; supported Node version recorded; committed lockfile; host account and repository permissions; release owner; tested local fallback. Do not assume Vercel Hobby is eligible for employer-directed work. [Vercel Hobby policy](https://vercel.com/docs/plans/hobby)

Primary supported flow: Chrome desktop at 1280-pixel or wider viewport, keyboard-operable. Run Firefox/WebKit smoke tests as planned; broader device support is not promised without testing.

## Local setup and repeatable build

The following commands are for the future implementer's own development environment or an authorized coding session. This documentation task does not run them.

Initial scaffold, if starting a new repository:
```bash
npx create-next-app@latest mortgage-copilot-demo --typescript --eslint --app --src-dir --no-tailwind --import-alias "@/*"
```
Choose supported actual versions once, then commit package-lock.json and runtime configuration. Do not resolve new major versions on every deploy. See [Next.js documentation](https://nextjs.org/docs).

Proposed repository scripts to implement before using the release sequence:
- dev: Next.js development server (`next dev`).
- typecheck: TypeScript checks for app and domain/tests without emitting app output (`tsc --noEmit`).
- test:unit: compile isolated pure domain tests to .test-build, then run Node's test runner.
- build: typecheck and Next.js production build (`next build`).
- start: Next.js production server (`next start`), or static preview via `npx serve out`.
- test:e2e: Playwright against a locally served build.

Example repeat-build sequence after scripts/configuration exist:
```bash
npm ci
npm run typecheck
npm run test:unit
npm run build
npx playwright install --with-deps
npm run test:e2e
```

Unit-test compilation proposal: a dedicated tsconfig.test.json with rootDir src, outDir .test-build, NodeNext-compatible module resolution, and only pure domain modules plus src/tests/unit; use compatible .js import specifiers. Run compiled tests using node --test .test-build/tests/unit/*.test.js. This configuration must be authored and verified during implementation, not assumed to exist in the Next.js starter. [Node test runner](https://nodejs.org/api/test.html)

Configure Playwright webServer to start `npm run start` (or `npx serve out --port 3000`) with a known port, wait for readiness, and stop it afterward. Use test isolation and deterministic reset. [Playwright introduction](https://playwright.dev/docs/intro)

`npm run start` / local preview is for local verification, not unmonitored production hosting. [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## Cloudflare Pages deployment and security headers

Future deployment steps:
1. Connect the authorized Git repository to Vercel or Cloudflare Pages.
2. Set build command `npm run build`; output directory `.next` (for Node/Vercel) or `out` (for Cloudflare Pages static export with `output: 'export'`). Match host Node runtime to the committed supported configuration.
3. Do not configure Server Actions, Workers bindings, databases or AI secrets for the baseline.
4. Deploy a preview, run acceptance smoke checks, then promote/rebuild the tested release according to the account's supported workflow.
5. Record the actual returned deployment URL and tested commit. Never invent the URL in the deck or docs.

[Cloudflare Next.js deployment guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/) documents the build/output contract. [Pages limits](https://developers.cloudflare.com/pages/platform/limits/) require current account review.

Proposed static-response policy in public/_headers, subject to deployed compatibility testing:
```text
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Permissions-Policy: microphone=(), camera=(), geolocation=()
  X-Robots-Tag: noindex, nofollow
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'
```

This assumes all runtime assets are bundled locally, no inline scripts/styles needing exceptions, and no fetch-based dynamic fixtures. Import fixtures into the bundle. Dynamic styling must work with the policy; test rather than silently weaken it. The development server may need a different local policy for HMR. frame-ancestors 'none' means reviewers open the app directly, not embedded in another site; revisit explicitly if embedding is required. noindex is not access control.

Cloudflare's [custom headers documentation](https://developers.cloudflare.com/pages/configuration/headers/) supports _headers for static responses; these rules do not automatically apply to future Pages Functions.

No secrets in NEXT_PUBLIC_* variables: they are client-exposed. [Next.js environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## CI, deployed verification and release record

Proposed CI pipeline: clean checkout → locked dependency install → typecheck → pure unit tests → build → browser dependency install → Playwright → artifact/secret/fixture inspection → preview deployment with authorization → deployed smoke check. Do not publish a broken build merely because compilation passed.

Release record should contain commit ID, dependency/runtime versions, fixture/rule/template versions, supported browsers, test run timestamp/results, known limitations, actual deployment URL, release owner, and rollback reference. Until the app exists, all fields remain pending—not invented.

Deployed smoke checklist:
- Open direct hash links for prepare/live/review/operations/manager/customer; refresh behavior is documented.
- Complete the four-case guided journey, then test the other four presets.
- Click evidence; correct a value after approval; verify old dispatch blocked.
- Simulate unavailable and unknown delivery; verify queue state and reconciliation.
- Check keyboard focus, buttons, readable layout and no console errors.
- Verify no microphone prompts and no application runtime external API/analytics requests.
- Inspect built assets for real data/secrets and verify response headers.
- Reset during pending mock callback; confirm the new run stays clean.
- Confirm customer preview excludes internal warnings; downloads say synthetic/exported, not delivered.

The source server's own request logs and account analytics are outside browser in-memory state. Review host settings and terms; do not assert a universal zero-logging deployment.

## Operations, fallback, rollback and teardown

**Observability:** in-memory event viewer with IDs, transitions, sanitized errors, current fixture version and run sequence. UI explains failures with actions, not stack traces. Manager figures are calculated from this run or show not measured. No fake uptime, historical adoption, or accuracy dashboard.

**Reset:** require confirmation when work is in progress; cancel timers, increment run generation, clear current memory and mock receipt ledger, restore initial fixture. Previously downloaded files cannot be deleted by reset; label them fictional. Browser reload intentionally resets the baseline.

**Local fallback:** retain the tested repository, installed dependencies and built dist on the candidate's own machine. Local preview works without external runtime AI after setup. A recorded walkthrough is supporting evidence, not a replacement for the required interactive prototype. Test the local path before presentation.

**Rollback:** retain the previous known-good commit/build. Rebuild/redeploy that version through the host's permitted workflow and rerun core smoke tests. Do not assume a specific rollback button or entitlement. Disable/remove a public preview if sensitive material was accidentally published, notify the owner, and assess repository history/cache exposure; deleting one UI record is insufficient.

**Teardown:** when authorized after evaluation, remove public deployment and unused previews, revoke unnecessary repo-host access, remove unneeded hosting resources, review any billing, and preserve only the approved synthetic portfolio copy. There are no runtime application secrets in the baseline; if future credentials were introduced, rotate/revoke them through their approved controls.

Future live operations require server monitoring, backups/recovery, audited access, retention/deletion jobs, incident ownership and connector reconciliation. Those are not satisfied by this static-demo runbook.
