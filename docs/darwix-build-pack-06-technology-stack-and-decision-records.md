# Darwix Build Pack 06 — Technology Stack and Decision Records

Recommended tools, alternatives, verified hosting constraints, cost assumptions, and decisions about real AI versus reliable simulation.

## Recommended stack

Proposed as of 26 September 2026; not installed or deployed. Optimize for a solo candidate producing a connected demo, not for enterprise-scale operations.

| Layer | Choice | Why |
|---|---|---|
| UI | React + TypeScript (Next.js App Router) | Component reuse, explicit domain contracts, unified modern framework |
| Build | Next.js (App Router, TypeScript) | Standard React ecosystem, route layout system, flexible static/server deployment |
| Layout | Semantic HTML + CSS/CSS Modules, local/system fonts | Low dependency count and predictable offline/local rendering |
| Navigation | Next.js App Router paths / view perspective switching | Standard route and layout model; deep linking and clean view isolation |
| State | React Context + useReducer + pure selectors | Single source of truth; testable transitions |
| Fixtures | Typed JSON/TypeScript, versioned with repo | Repeatable synthetic scenarios, no keys |
| Intervention logic | Pure deterministic functions + fixed message library | Meets rejected-generative-warning constraint; debuggable |
| Unit tests | Node's built-in test runner over compiled pure TypeScript domain modules | Avoid extra test framework dependency; explicit compile configuration needed |
| Browser tests | Playwright | Connected journey, keyboard, cross-browser and failure tests |
| Hosting | Vercel / Cloudflare Pages / Static Export ('out'), subject to account/terms confirmation | Flexible static export or serverless deployment workflow |
| Optional future backend | Next.js Route Handlers / Supabase Auth/Postgres | Clean path to authenticated API and server boundary when approved |

Do not pin speculative version numbers in this plan. At implementation, select mutually supported current Node/Next.js/React/Playwright versions, record them, commit lockfile and runtime configuration, and use npm ci in repeatable builds. Framework docs can change.

Sources: [Next.js documentation](https://nextjs.org/docs), [React starter](https://react.dev/learn/build-a-react-app-from-scratch), [Playwright](https://playwright.dev/docs/intro), [Node test runner](https://nodejs.org/api/test.html).

## Decision records

| ADR | Decision | Alternatives and reason |
|---|---|---|
| ADR-01 | Deterministic synthetic baseline | Real STT/LLM adds retention, latency, cost and evaluation risk without being required. Add an isolated experiment later, not the main demo dependency. |
| ADR-02 | Next.js (App Router) adopted | Modern standard React framework with structured routing, shared layouts, and clean static export (`output: 'export'`) or serverless hosting. Simplifies adding server-side verification in future pilot. |
| ADR-03 | Shared reducer, not separate page mocks | Enables meaningful evidence, corrections, approval and queue propagation. Static screenshot/clickthrough fallback is weaker for branching logic. |
| ADR-04 | Memory-only initial storage | Public fictional data and short reviewer run; no false durability. Add synthetic session storage only if reload persistence becomes necessary. |
| ADR-05 | Fixed templates for high-risk messages | Explicit assignment constraint; in a real pilot compliance must approve text, scope and versions. Do not call candidate-written templates approved. |
| ADR-06 | No extra vector DB, RAG or multi-agent framework | Eight scenarios and short approved policy examples do not justify ingestion, retrieval permissions, index freshness and orchestration overhead. |
| ADR-07 | Host flexibility (Vercel, Cloudflare, or static export) | Next.js app can be deployed to Vercel, exported statically for Cloudflare Pages/Netlify, or run on Node. Keep artifact portable. |
| ADR-08 | No state-library dependency initially | Context/reducer handles one synthetic case; revisit for actual multi-user/server state. |
| ADR-09 | Explicit mock adapter contract | Demonstrates failure/retry/unknown outcomes without claiming access to lender APIs. |

If using Next.js static export, output: 'export' produces out; request-time authentication, cookies and Server Actions are not available as if it were a live server. [Next.js static export documentation](https://nextjs.org/docs/app/guides/static-exports)

## Hosting comparison and budget

Official pages checked during research; recheck before account selection or purchase. No subscription or deployment is authorized by this document.

| Host | Verified constraints / facts | Decision implication |
|---|---|---|
| [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/) | Free: 500 builds/month, one concurrent build, 20,000 files/site, 25 MiB/asset; Functions use Workers quotas | Adequate-looking capacity for small static demo; terms/organizational eligibility still need review; omit Functions |
| [Vercel Hobby](https://vercel.com/docs/plans/hobby) | Hobby restricted to non-commercial personal use | Do not assume employer-directed assignment deployment is eligible; use an approved plan/account if needed |
| [Netlify pricing](https://www.netlify.com/pricing/) | Listed Free: 300 shared credits; production deploy 15 credits; bandwidth/requests consume credits too | Do not describe 20 deploys as a standalone guaranteed allowance; set budget alerts and review current account plan |

**Planning estimate, not a quote:** baseline $0 incremental/month if eligible for a free plan and inside limits, with $0–25/month hosting contingency. Provider subdomain avoids a domain purchase. No inference/database spend is needed. Labor, tax and existing development-tool subscriptions are excluded.

Authenticated pilot infrastructure estimate: $25–100/month before AI/voice, as an unverified planning placeholder only. Actual pricing depends on plan, identity, database, monitoring, region, retention and load. Do not use this as procurement approval.

For a later speech/model experiment, estimate using selected provider's current unit rates: monthly audio minutes × per-minute price + input/output token usage × rates + host/log/storage costs. Endpoint, model, duration and concurrency are currently unspecified, so no fabricated AI bill is supplied.

## Provider and credential constraints

[Next.js environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables): NEXT_PUBLIC_* values are exposed in the client bundle. Baseline needs no .env. A prefix or hidden UI does not protect a secret. No model/STT keys, database passwords or privileged keys in browser code.

[Supabase API keys](https://supabase.com/docs/guides/api/api-keys): publishable keys may be used client-side with correct authorization controls; secret/service-role keys bypass RLS and belong only in a controlled server. API keys identify an application, not an authenticated end user. [RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security) requires policy/grant design and tests.

[OpenAI data controls](https://platform.openai.com/docs/guides/your-data): no training by default is not zero retention. Retention is endpoint/feature/account dependent; the research snapshot distinguishes audio transcription from Realtime and other endpoints. store:false is not a universal no-retention guarantee; special retention controls may require approval. Recheck exact selected endpoints and contracts before sending data.

Browser-native speech recognition is not assumed private, offline, universally supported, or retention-free. No microphone in the recommended baseline. A future approved audio path requires an end-to-end processing and retention review, not just deleting local files.

**Optional real-AI extension:** synthetic text only, isolated server endpoint, schema-validated proposals, no provider credentials in client, no write tools, hard spend/rate cap, fixed warnings, and deterministic fallback. Label live inference separately from scripted scenario results. It must not delay the core release.

## Engineering handoff decisions still open

Confirm actual deadline and skill level before committing effort. Choose host account and permitted plan; primary test device/browser; actual package versions; whether reload persistence matters; whether public sharing is desired; and whether an optional AI experiment is worth its cost. No dependency on privately available Darwix SDKs or enterprise integration access is assumed.

The recommended stack is not the only valid implementation. If the candidate already knows Next.js or another frontend, keep the same state and safety contracts rather than rewriting purely for stack conformity. Functional connected behavior matters more than technology branding.
