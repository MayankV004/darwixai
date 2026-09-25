# Darwix Build Pack 10 — Phased Implementation Plan

Ordered work packages, dependencies, effort estimates, acceptance gates, scope cuts, and the separate three-week pilot roadmap.

## Planning assumptions and execution order

Status: future build plan, not completed work. Actual deadline, experience, existing code and available hours are unknown. Estimate assumes a solo builder comfortable with Next.js, React, TypeScript, and AI-assisted development, with manual review and testing. Reserve roughly 40–58 focused hours including final packaging; about 7–10 six-hour workdays. A beginner may need 1.5–2 times this effort. These are planning ranges, not a commitment or measured productivity.

The assignment's three-week pilot is a product trial, not the submission deadline. Do not use it as the build deadline.

**Critical path:** domain/fixtures → one vertical slice → four core interventions → review/approval/outbox → all-eight coverage → release tests → demo/deck/video. Build the path reviewers will actually use before adding infrastructure. No backend, live speech or real model is on this critical path.

Use PRD requirement IDs R01–R16 and UX cases A01–A08 for tasks and tests. Do not substitute attractive but non-required scenarios for the assignment's eight situations.



**Contingency:** the 40–58-hour sum includes planned testing but no explicit reserve for unfamiliar tooling or major rework. Add approximately 20% contingency (8–12 hours), for a budgeting envelope of roughly 48–70 hours. Keep the original phase estimates visible; this is a separate allowance, not a claim of actual effort. Confirm skill level and deadline before committing. If time is insufficient, ship the assignment-minimum scope honestly instead of quietly claiming the standout release is complete.

## Build phases and exit gates

| Phase | Work package | Estimate | Dependency / exit gate |
|---|---|---:|---|
| 0 | Confirm scope, read pack, select runtime/host, freeze fixture and demo script | 2–3 h | Deadline/assumptions explicit; no real-data dependency |
| 1 | Scaffold Next.js (App Router, React, TypeScript), domain types, initial state, fixture versions, routing / perspective switching, reset | 5–7 h | Two borrower identities and one shared state render on every view; deterministic reset |
| 2 | One vertical slice: prepare → transcript → A03 evidence → liability proposal → summary → operations item | 7–10 h | One decision changes downstream state; mock labels visible; no hardcoded unrelated dashboard |
| 3 | Add A04/A06/A08, accept/dismiss/escalate, conflicts, next-step tasks, customer preview | 5–7 h | Four advanced cases connected; unknowns preserved; customer refusal supported |
| 4 | Review payload, dependency invalidation, approval binding, unavailable mock connector, reviewed export | 5–7 h | Post-approval correction blocks stale dispatch; export not called delivered; P0 complete |
| 5 | Add A01/A02/A05/A07, scenario controls, negatives, delivery_unknown and mock receipt reconciliation | 4–6 h | All eight positive/control/ambiguous variants specified and runnable; P1 complete |
| 6 | Unit/browser tests, accessibility, overload, security fixtures, reset races, metrics correctness | 6–9 h | QA gates pass on frozen release candidate; defects fixed, not waived invisibly |
| 7 | Deploy after authorization, deployed smoke tests, screenshot capture, six-slide deck, video and source/disclosure packaging | 6–9 h | Reviewer can open/reset; video 5–7 minutes; deck ≤6 slides; checklist complete |

Total 40–58 h. P0 through phase 4 is approximately 24–34 h; this is an estimate, not a guarantee. Do not promise a complete standout implementation in a few hours.

If phase 2 is unstable, stop adding cases and fix the shared flow. If phase 4 fails, do not spend remaining time on manager charts. If phase 6 exposes unsafe or misleading behavior, reduce optional scope before release.

## Concrete engineering work packages

**Foundation**
- Define Meeting, SourceRevision, FactAssertion, Conflict, Issue, Summary, Approval, Task, OutboxAction, Event.
- Implement pure reducer commands with invalid-transition reasons and injected clock.
- Ship CASE-001/CASE-002 and A01–A08 fixtures with stable IDs and synthetic banners.
- Build Next.js app shell (layout, route/perspective switching), reset and replay controls; pause while correcting.

**Evidence and interventions**
- Source drawer with exact quote/revision and return focus.
- Rule/template registry, subject/basis guards and quality modes.
- Separate presentation/disposition from resolution; acknowledge cannot verify a field.
- Borrower conflict resolver preserving both assertions; explicit participant confirmation and verification status.
- One-primary/two-secondary budget, dedupe and persistent blockers.

**Handoff and operations**
- Templated summary with unknowns, unresolved issues and tasks.
- Normal-ready versus review-needed handoff modes; no false “all clear.”
- Materialized old/new payload preview; canonical payload hash and dependency version map.
- Source edit invalidates dependent approvals; delivered actions create correction tasks.
- Mock adapter with unavailable, definite failure, success, timeout-after-commit and reconcile paths.
- Shared operations/manager queue and customer-safe recap; no communications API.

**Quality/release**
- Unit fixtures for state transitions and invariants; browser tests for full user paths.
- Test content injection, no external requests, no microphone, reset timer races and duplicate dispatch.
- Instrument metrics with explicit undefined/not-measured states.
- Freeze release commit/fixture/template versions; deploy only after source/account authorization; rehearse local fallback.

## Scope cuts and rejected additions

If deadline tightens, cut in this order: optional real-AI experiment → stretch six-item fixture → decorative animation/custom charts → optional session persistence → extra scenario variants beyond required conformance. Preserve all eight documented interventions and at least four demonstrated advanced cases.

Do not cut the connected journey, source evidence, borrower identity, human controls, unknown/conflict states, post-meeting actions, manager/operations visibility, mock integration honesty, or security claims discipline.

Reject for this submission: Kubernetes, microservices, multi-agent orchestration, a vector database, production SSO, a full LOS, live rates, speech-model training, real credit checks, document OCR/upload pipeline, employee leaderboards, autonomous borrower outreach, or a polished marketing homepage unrelated to the workflow.

A clickthrough can be an emergency fallback, but do not describe it as a tested stateful implementation. Tell reviewers what works and what is simulated.

## Separate three-week product pilot and validation backlog

This begins after a usable demo exists. It is not folded into the 40–58-hour assignment estimate.

**Week 1 — qualify and baseline:** lender SME, compliance, operations and security review; approve synthetic role-play scope; validate checklist/templates; label scenarios; instrument; measure manual tasks; pre-register decision thresholds. If real-data gates fail, stay synthetic.

**Week 2 — observed use and tuning:** proposed 6 agents / 2 processors / 1 manager across matched tasks; aim for 24 paired manual/assisted tasks overall; counterbalance order; tune only on designated cases; investigate burden and correction errors.

**Week 3 — freeze and decision:** held-out tasks, failure/recovery drills, review handoff speed/completeness/quality, cost and build effort; record go/no-go and next investment. A weak result may justify redesign, not additional automation.

Validation backlog: actual application process and jurisdiction, approved disclosure ownership, lender policy wording, source-system schema and sandbox, transcript retention/consent, real permissions, representative speech/extraction evaluation, operational escalation SLA, baseline task times. Each is a question, not an already-known client fact.

For AI-assisted coding, work in small modules: provide the PRD IDs, state invariants, expected tests and non-goals; inspect generated dependencies and code; run tests; document actual tools used. Do not prompt a coding tool to “make it production-ready” and accept a larger unreviewed system.
