# Darwix Build Pack 02 — Business Requirements (BRD)

Business case, stakeholders, boundaries, pilot scope, trade-offs, and proposed success criteria for the mortgage-meeting copilot.

## Business case and outcome

Status: proposed requirements, 26 September 2026. Not an approved lender business case. Source of assignment requirements: uploaded Product Manager Assessment — AI Copilot for U.S. Mortgage Sales.

**Problem:** meeting quality depends on the agent. Missing or conflicting borrower information, inconsistent explanations, unsupported commitments, weak follow-ups, and limited management visibility create rework and customer confusion.

**Opportunity:** improve the quality and speed of the transition from a discovery meeting to a reviewed, actionable handoff. Assist the agent without making credit decisions or bypassing lender systems.

**Primary business outcome:** reduce time from meeting end to an operations-accepted handoff while preserving completeness and safety. “Accepted” means the designated reviewer can act on it, including a clearly labelled review-needed handoff; it does not mean loan approval or all financial facts verified.

Proposed pilot hypothesis: at least 20% lower median handoff time in counterbalanced staff role-play than the manual baseline, with no reduction in required-field completeness and no unresolved critical release-gate failure. This is an initial decision hypothesis to agree before testing, not a research benchmark or expected result. Report raw times, sample size, paired differences, and limitations. Funded-loan conversion is a longer-term outcome, not a credible three-week causal claim.

## Stakeholders and responsibilities

| Role | Need | Decision responsibility |
|---|---|---|
| Borrowers A and B | Understand next steps, costs and uncertainty; correct attributed facts | Their own statements and authorizations; not interchangeable identities |
| Agent | Prepare, ask useful questions, explain accurately, finish efficiently | Review statements, act on prompts, approve permitted handoff |
| Processor / operations | Actionable facts, open questions, owners and evidence | Accept/return handoff; assign verification work |
| Manager | Queue health and coaching opportunities | Priorities and workload, not AI-derived employment decisions |
| Compliance / mortgage SME | Approved rules, escalation and legal workflow | Policy scope, wording, disclosure/application ownership |
| IT/security | Access, vendor and data lifecycle controls | Live-pilot security readiness and incident response |
| Product owner | Scope, usability, measurable learning | Release acceptance and trade-offs with risk owners |
| Underwriter / pricing desk | Reliable source records and controlled decisions | Eligibility, conditions, authoritative pricing/locks |

In a solo assignment, one candidate authors the artifacts. The named roles above describe pilot ownership, not fictitious teammates or approvals already obtained.

## Business requirements and non-goals

| ID | Requirement | Evidence of value |
|---|---|---|
| B01 | Preserve one connected pre/live/post workflow | Facts and actions carry across screens without re-entry |
| B02 | Make risky/missing information actionable | Exact prompt, supporting quote, owner, outcome |
| B03 | Preserve borrower identity and data integrity | Conflicts and correction history, no silent overwrite |
| B04 | Respect human authority | No autonomous approval, pricing commitment, credit pull or regulated notice |
| B05 | Reduce administrative rework | Reviewed summary, specific tasks, visible handoff state |
| B06 | Survive unavailable systems | Honest local/mock outbox and controlled manual fallback |
| B07 | Make uncertainty visible | Low-quality text produces clarification, not fabricated facts |
| B08 | Minimize sensitive data | Synthetic-only demo; no microphone or raw audio |
| B09 | Support operations and management | Shared queue with evidence drill-down and process metrics |
| B10 | Enable a bounded pilot decision | Defined baseline, evaluation, exit gates and stop conditions |

Non-goals: full mortgage origination; automated underwriting; affordability or approval scoring; personalized product suitability advice; live rates; rate locks; document verification; fee collection; credit bureau calls; official disclosure generation; sales outreach; production authentication in the static demo; sentiment/personality or protected-trait inference.

Do not hide liabilities, fabricate income, suppress legally required workflows, or use the model as an authority. These are product constraints; this document does not claim all automation in lending is universally prohibited.

## Scope ladder and fixed-launch decisions

| Level | Scope | Purpose |
|---|---|---|
| Minimum connected demo | Preparation, replay, four advanced cases A03/A04/A06/A08, agent controls, structured fields, review, customer recap, operations/manager, mock handoff | First end-to-end acceptance gate |
| Standout final target | All eight assignment cases; source evidence; correction invalidation; payload-bound approval; failed/unknown mock delivery; negative controls; visible test/metric definitions | Demonstrate product judgement through behavior |
| Stretch only after acceptance | Additional scenario variations, six-item disclosure trigger fixture, richer accessibility, isolated real-model experiment on synthetic text | Add learning without risking the main demonstration |
| Future gated pilot | Authenticated backend, approved policies, permission enforcement, approved vendors, sandbox integration | Not required for submission; separate implementation work |

| Constraint | Launch / simplify / defer / reject decision |
|---|---|
| Key integration absent | Launch reviewed manual export and local mock outbox; defer live connector; never label exported as synced |
| ASR inconsistent | Launch deterministic text replay and manual correction; defer live speech; retain uncertainty handling |
| Excessive nudges | One primary card, two secondary cards at most, duplicates collapsed; critical unresolved issues persist |
| Generative high-risk warnings rejected | Versioned prewritten templates; no custom high-risk generation; real use needs compliance approval |
| Raw audio forbidden | No audio capture in baseline; no replay audio, logs, uploads, or audio backups |
| Additional manager dashboard requested | One operational queue and a few process metrics; defer advanced analytics and rankings |
| Launch fixed | Freeze core scope and data contracts early; trim stretch, not evidence, review, and failure handling |

Build first: the shared case state, evidence references, and one complete meeting-to-handoff slice. A polished live screen without downstream consequences is not the core product.

## Three-week pilot and go/no-go

**Default pilot design:** staff role-play with synthetic cases; 6 agents, 2 processors, and 1 manager are proposed recruitment targets, not confirmed participants. Aim for 24 paired manual/assisted handoff tasks with matched case difficulty and counterbalanced order. This small convenience sample is directional, not statistically representative.

Week 1: lender/SME walkthrough, rule and label review, manual baseline, instrumented rehearsal, pre-register thresholds and stop conditions. Week 2: assisted role-play, tuning on designated cases, record corrections and interruptions. Week 3: freeze build, run held-out scenarios, test outage/recovery, assess feasibility and decide next investment.

Functional: connected workflow, corrections, review, tasks, mock adapter states. Simulated: conversations, policy approval status, financial data, roles, CRM/LOS and manager event data. Deferred: live borrower data, real capture, production access control, lender writes, real model-quality claims.

A real-customer pilot may replace role-play only after separate lender, legal, security, data, and operational gates. If those are unmet, launch the synthetic/manual validation scope on time rather than silently exposing customer data.

**Stop or no-go:** a stale/unapproved change is dispatched; a correction silently disappears; borrower facts are conflated; real data enter the public demo; a high-risk warning is generated outside the approved template library; simulated delivery is misrepresented as real; a critical user journey fails. Pause and fix, then rerun the relevant gate.

A business hypothesis failure is also a valid result: if handoff time does not improve without lost quality, do not expand just because users clicked “accept” frequently.

## Dependencies, assumptions, and authoritative boundaries

Open dependencies: deadline, builder experience, hosting account eligibility, lender systems, approved policy wording, application procedures, jurisdiction, consent and retention rules, reviewer availability, baseline operations data.

Source boundaries: [CFPB §1026.19](https://www.consumerfinance.gov/rules-policy/regulations/1026/19/) informs disclosure and fee workflow; [Fannie Mae liabilities guidance](https://selling-guide.fanniemae.com/sel/b3-6-01/general-information-liabilities) is investor-specific; [FTC Safeguards guidance](https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know) requires applicability review. Vendor product pages do not certify this concept.

Business sign-off for a future pilot: product owner accepts scope and learning goals; operations accepts handoff definition; compliance owns policy/application handling; security owns real-data gate. All are currently unapproved.
