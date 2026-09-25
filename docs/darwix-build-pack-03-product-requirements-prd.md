# Darwix Build Pack 03 — Product Requirements (PRD)

Canonical scope, requirement IDs, personas, user stories, product states, and acceptance criteria for the connected mortgage-copilot prototype.

## Product contract and release levels

Status: proposed v1, 26 September 2026. No implementation or tests completed. Working product label: “Darwix mortgage copilot — candidate concept.” Do not imply this is an official Darwix release.

**Product promise:** help an agent leave a meeting with an accurate account of what was said, what remains uncertain, what they did about risks, and who does what next.

**P0:** first complete connected prototype, including A03 liability omission, A04 unverified income, A06 conflicting borrower information, and A08 missing next action. All assignment categories and all eight cases must still be designed and documented.
**P1:** final standout build target adds A01/A02/A05/A07 plus richer negative controls and delivery-unknown demonstration. These are planned targets, not optional excuses to omit mandatory documentation.
**P2:** stretch work only after P0/P1 acceptance; not part of the fixed-launch promise.

One synthetic meeting, two named fictional co-borrowers, shared state across all views. No actual microphone, AI inference, lender API, financial identifier, email send, or mortgage decision.

## Personas, jobs, and synthetic case

| User | Job to be done | Success |
|---|---|---|
| Agent | Prepare and guide a clear meeting without losing important facts | Can find evidence, clarify issues, and approve an accurate handoff |
| Borrower | Understand what was heard, what is uncertain, and the next step | Customer-safe recap is clear; no approval or rate guarantee implied |
| Operations reviewer | Decide what to do next without replaying an entire meeting | Open questions, ownership, evidence and action state are visible |
| Manager | Spot bottlenecks and support agents | Can drill from process metric/queue into the same case |

**Fictional fixture CASE-001:** Alex Morgan (B1) and Jordan Lee (B2), first-time buyers targeting purchase within 4–6 weeks. B1 reports $84,000 annual gross salary. B2 is self-employed and mentions $90,000 annual gross business revenue; qualifying income is unknown. B1 reports a $420/month car payment. B2 later recalls B1's gross salary as $78,000/year, creating a same-subject, same-period conflict. Down-payment source is unanswered. Another lender was consulted; no verified offer uploaded. No property chosen, SSN collected, formal form completed, or underwriting approval known.

All values are invented solely for UI/tests, not market facts, customer records, affordability recommendations, or loan eligibility inputs. Names do not imply gender, relationship, citizenship, or demographic attributes. Demo timeline is relative, with deterministic timestamps.

Correction fixture CASE-002 reuses CASE-001 but changes the synthetic transcript from $420 to $240 monthly debt after review approval, so stale approval invalidation can be demonstrated. Keep these distinct revisions; do not pretend a transcript correction independently verifies the true debt.

## Canonical requirements and testable acceptance criteria

| ID / priority | User story | Acceptance criterion |
|---|---|---|
| R01 / P0 | As an agent I can prepare from prior context | Preparation shows two borrower cards, synthetic CRM source/time, missing fields, agenda, application-review caveat, and integration status. |
| R02 / P0 | As a participant I understand processing limits | Persistent simulation banner; no microphone permission; simulated consent/manual-mode explanation; no real-data entry invitation. |
| R03 / P0 | As a reviewer I can follow one connected journey | Start/pause/step/reset controls; moving among views preserves meeting, facts, issues and actions until reset. |
| R04 / P0→P1 | As an agent I receive relevant intervention examples | P0 runs A03/A04/A06/A08; P1 runs all A01–A08. Each card has exact text, trigger, source, severity, rule type, action and low-confidence branch. |
| R05 / P0 | As an agent I control the response | Accept, dismiss with reason, escalate and resolve are distinct; acceptance never automatically resolves a risk or verifies a fact. |
| R06 / P0 | As an agent I can inspect why a suggestion appeared | Evidence opens exact transcript segment and revision; unavailable/stale evidence blocks normal approval until reviewed. |
| R07 / P0 | As an agent I capture structured facts | Each proposal has subject, amount/unit/period/basis where relevant, source, confirmation and verification states. Unknown is explicit. |
| R08 / P0 | As an agent I correct conflicts safely | Preserve alternatives; require reason for resolution/correction; invalidate dependent drafts and approvals; already-delivered changes create reconciliation tasks. |
| R09 / P0 | As an agent I review a summary before handoff | Draft includes reviewed statements, unverified facts, unresolved issues, tasks; payload preview and explicit approval precede local mock dispatch. |
| R10 / P0 | As a borrower I see clear next steps | Customer-safe recap excludes internal warnings; shows specific actions, owners, due dates, and uncertainty. No real outbound send. |
| R11 / P0 | As operations/manager I see the same case | Shared queue item and evidence drill-down; task owner/status edits reflected across views; metrics computed from demo events or labelled unavailable. |
| R12 / P0→P1 | As an agent I know whether a handoff happened | Mock/live/future labels; approved is distinct from delivered; unavailable connector retains work; P1 handles delivery_unknown with reconciliation rather than blind retry. |
| R13 / P0 | As an agent I am not flooded | One primary/two secondary maximum visible cards; duplicate suppression; ordinary 30-second cooldown; unresolved high-severity issues remain in queue. These are tunable hypotheses. |
| R14 / P0 | As a lender I can review data boundaries | No raw audio, secrets or real records; all restricted actions absent; state history explicitly non-authoritative. |
| R15 / P0→P1 | As a PM I can measure and test behavior | Typed event log; deterministic expected outcomes, negatives, correction and outage tests; no fabricated accuracy or conversion numbers. |
| R16 / P0 | As a reviewer I can reliably access and reset the demo | Desktop-readable, keyboard-operable controls, clear empty/error states, deterministic reset, hash deep links, deployed smoke test and local fallback when built. |

Priority is build order, not authority to violate an invariant. Evidence, borrower separation, and honest delivery state are never traded for visual polish.

## Core states and action semantics

**Meeting:** preparation → live → review → handed_off. Saving a draft and creating a review task remain possible with missing information.

**Facts have independent dimensions:** review = proposed / agent_reviewed / participant_confirmed / superseded; verification = self_reported / document_supported / lender_verified / unknown; conflict = clear / unresolved / resolved. Participant confirmation requires a separate explicit synthetic reply and ConfirmStatement event. Accepting a nudge cannot produce it. The demo never produces lender_verified.

**Issue:** open → acknowledged / dismissed / escalated → resolved, or superseded after correction. Disposition and underlying resolution are separate. Dismissal does not remove an unresolved high-risk blocker; resolution requires an outcome and evidence/reason.

**Summary:** draft → reviewed → approved; material changes produce needs_reapproval. Handoff mode is part of the approved payload:

| Condition | ready | review_needed |
|---|---|---|
| Unresolved substantive blocker/conflict | Block normal-ready handoff | Permit only as explicit unresolved review material with owner/action; do not select one conflicted value as authoritative |
| Unknown/unverified fact | Retain labels; apply meeting-specific readiness rule | Retain labels and verification task; never label verified |
| Source/material payload changed after approval | Block until regenerated/reviewed and approved | Same; not a freshness bypass |
| Evidence unavailable | Do not assert as supported current fact | May include an explicitly unsupported/open item with owner, not a supported field write |
| Missing approval, changed target/hash or invalid template | Block | Block |

An unresolved question can be valid review material. An unknown income does not itself mean the borrower is ineligible. Merely viewing stale evidence cannot make it current. The canonical dispatch contract is in document 07, including transitive dependency binding.

**Action/outbox:** draft → awaiting_review → approved → queued → sending → delivered_mock, with blocked/failed/delivery_unknown/cancelled/needs_reapproval branches. Downloading is exported, not delivered.

**Operations acceptance:** AcceptHandoff and ReturnHandoff are explicit local reviewer commands, distinct from agent approval, export or mock receipt. Operations can accept a review-needed packet for work while LOS is unavailable; label this local review acceptance, not remote delivery or completed verification.

**A08 close readiness:** require a customer-agreed action + owner + due date + confirmation source, or an explicit declined-follow-up/no-contact outcome. Internal review tasks alone do not satisfy it.

**Completion levels:** documentation delivered now means specifications and sources only. Future assignment-minimum build requires all eight designed and at least four demonstrated plus all required flows. Standout release requires full P0/P1 implementation and tests. Synthetic trial and real-borrower pilot have separate gates; no current execution is implied.

## Functional boundaries, quality bar, and release acceptance

Customer/manager views are simulated perspective switches, not authentication. Memory-only state persists across navigation; refresh resets with notice. No real-data input: corrections apply pre-authored synthetic revisions with enumerated reasons. No unrestricted transcript interpretation, uploads or arbitrary URL fields. Known fixture metadata activates predefined rules; quality indicators are synthetic, not calibrated probabilities.

Quality targets: routine UI response below 200 ms on the selected test laptop is a proposed local usability target, not an AI SLA; essential actions keyboard-accessible; no color-only severity; readable 1280-pixel desktop; no unhandled console error on core flow. Measure after implementation.

**Completion levels:**
- Documentation delivery now: researched specifications, sources, coherent requirements and open decisions. No built app, executed tests, deployment or final presentation/video.
- Assignment-minimum future build: all eight cases designed, at least four advanced cases demonstrated, all required views/flows/constraints, P0 tests passed and simulation clearly labelled.
- Standout future release: full P0/P1 including all eight runnable, expanded controls and unknown-delivery/reconciliation tests passed on a frozen build.
- Synthetic role-play trial: recruited observers, real elapsed-time protocol, baseline and predeclared decision criteria.
- Real-borrower pilot: separate lender/legal/security/vendor approval and implemented backend access controls.

Domain guardrails: [CFPB application definitions](https://www.consumerfinance.gov/rules-policy/regulations/1026/2/), [disclosure rules](https://www.consumerfinance.gov/rules-policy/regulations/1026/19/), [Fannie Mae self-employment guidance](https://selling-guide.fanniemae.com/sel/b3-3.5-01/underwriting-factors-and-documentation-self-employed-borrower). Proposed engineering choices are not regulatory requirements.
