# Darwix Build Pack 09 — Metrics, AI Evaluation and QA Plan

Business/product/AI/compliance metric definitions, instrumentation, labelled scenario tests, quality gates, and a three-week pilot measurement plan.

## What is and is not measured

Status: specification only. No tests, user study, speech evaluation or pilot results have been run. Display unmeasured metrics as “not measured,” not fabricated percentages.

A deterministic fixture prototype can establish whether specified workflow behavior occurs for authored cases. It cannot establish real-world ASR accuracy, LLM reasoning quality, regulatory compliance, broad fairness, funded-loan uplift, or enterprise reliability. A mock role selector cannot pass meaningful server authorization tests.

**Primary business outcome:** time from meeting.end to operations.handoff_accepted, counting both normal-ready and explicitly review-needed handoffs separately. Measure complete task time and rework; do not optimize by omitting unresolved issues.

**Proposed pilot target:** at least 20% reduction in median handoff time versus counterbalanced manual role-play, with no decrease in required-field completeness and all hard safety gates satisfied. This is an unvalidated decision threshold to agree before testing, not a benchmark. Record baseline/assisted raw times, paired differences, distributions and sample size. Incomplete or timed-out tasks remain in completion-rate reporting rather than being silently dropped.

## Metric definitions and denominators

| Class / metric | Definition | Interpretation / gate |
|---|---|---|
| Business: handoff time | operations.handoff_accepted timestamp minus meeting.end | Median and p90; separate ready/review-needed; include rework |
| Business: rework | Returned handoffs / submitted handoffs; count edits/returns | Lower without suppressing justified review |
| Product: core completion | Runs reaching a valid accepted handoff / started eligible runs | Report abandoned/failed runs and reasons |
| Product: reviewed completeness | Required discovery fields reviewed or explicitly unknown-with-owner / applicable required fields | Different from verification completeness; unknown is not verified |
| Product: next-step quality | Completed/declined-close outcomes with action-owner-date or explicit no-follow-up preference / ended meetings | No invented consent or tasks |
| Product: nudge burden | Rendered cards / active simulated conversation minute; duplicate renders / all renders | Explain synthetic clock; tune with real role-play interruption observations |
| Product: action disposition | Acknowledged, dismissed, escalated, resolved counts / shown issues | Acceptance is not correctness or safety |
| AI: precision | TP / (TP + FP) | Only on labelled opportunities; undefined if denominator zero |
| AI: recall | TP / (TP + FN) | Per scenario/severity; ambiguity/abstention reported separately |
| AI: attribution correctness | Correct subject + value + unit/basis / labelled fact opportunities | Do not score amount-only as correct if borrower is wrong |
| AI: evidence support | Claims actually supported by source / audited claims | Citation presence alone is insufficient |
| AI: timeliness | Source finalization → warning render, p50/p95 | Separate detection and display delay; no borrowed vendor SLA |
| Safety: stale/unauthorized dispatch | Forbidden dispatch successes / challenged attempts | Zero observed successes required in release tests; not a proof of zero future risk |
| Safety: correction integrity | Correctly invalidated dependent artifacts / expected dependents | 100% of prescribed fixture dependents; any known stale send blocks release |
| Safety: blocker persistence | Unresolved high-risk issues retained after dismiss/snooze / challenged issues | All prescribed tests pass |
| Integration: disposition | delivered_mock, failed, unknown, cancelled counts / eligible actions | Unknown and downloaded exports are not delivered |
| Integration: duplicate commit | Extra mock commits for same logical approved action | Zero observed in double-click/retry tests |

No invented model precision target such as 95% is asserted. A future inference pilot must pre-register per-severity thresholds, acceptable response windows and confidence intervals with domain/risk owners.

## Instrumentation and labelling contract

**Two distinct clocks:** simulationTimeMs is deterministic for transcript order/replay and synthetic nudge timing. ObservedElapsedMs is actual monotonic elapsed time for staff task measurement, or a researcher stopwatch when tasks cross devices. Never use replay time to claim a handoff-speed improvement.

For role-play, start the observation clock at actual End meeting; stop at explicit operations AcceptHandoff. Include ordinary pauses and rework; record an externally interrupted trial separately under a predeclared rule. Record abandoned/timed-out trials in completion statistics and report duration as incomplete/censored rather than silently excluding them. Counterbalanced manual tasks use the same timing protocol. In a future server pilot, use authoritative timestamps and measured clock synchronization for multi-device events.

**Operations commands:** AcceptHandoff requires a reviewer to inspect the exact packet revision, mode and open items and confirm it is actionable. ReturnHandoff requires a reason. Both emit explicit operations.handoff_accepted/returned events. Agent approval, a download or a mock receipt alone emits neither. Local acceptance with unavailable LOS is allowed and reported separately from delivery.

Event envelope: id, seq, runId, type, simulationTimeMs, optional observedElapsedMs, actor, objectRef, revisionRefs, reasonCode and relevant fixture/rule versions. No raw transcript, names, SSNs or financial values in analytics.

Events: meeting.started/ended; source.finalized/corrected; fact.proposed/confirmed/conflicted; dependency.invalidated; rule.evaluated with fire/no_fire/abstain; nudge.rendered/dispositioned; issue.resolved; summary.reviewed; action.approved/blocked; outbox.transition; operations.handoff_accepted/returned; run.reset.

Evaluation unit: one rule × subject × field/basis × evidence-revision opportunity with a defined observation window. Gold labels: warning required / not required / ambiguous, expected rule, subject, evidence, timing and safe action. Planned domain and independent reviewers adjudicate high-risk labels before outputs are shown; candidate-authored labels are not expert-validated ground truth.

Wrong-subject alerts produce FP on the wrong opportunity and FN on the missed one. Duplicate alerts do not create additional TPs. Abstention on a required-warning case is a miss unless clarification is the specified correct result. Measure detected and timely-rendered recall separately.

Freeze tuning/held-out variants by meaningful scenario/paraphrase families. Tagged deterministic tests establish fixture conformance only; untagged real inference needs its own holdout evaluation.

## Acceptance test matrix

**24 scenario tests:** each A01–A08 gets three variants: positive trigger, benign/negated control, ambiguous/low-quality evidence. Required result matches the exact message and behavior in the UX specification. For A07/A08 ambiguity may concern prior checklist/task state rather than speech recognition.

| Test group | Acceptance / expected result | Requirements |
|---|---|---|
| T01 Context and continuity | Preparation borrower/source data persist through live/review/operations | R01,R03,R07,R11 |
| T02 Simulation honesty | Banner visible, no microphone or runtime provider requests, confidence labelled synthetic | R02,R14 |
| T03 Intervention family | All eight positive/control/ambiguous variants match specified outcomes | R04,R06 |
| T04 User authority | Acknowledge ≠ resolve; dismissal reason retained; escalation creates one task | R05 |
| T05 Borrower separation | B1 and B2 different income values do not conflict; same-subject/same-basis contradictions do | R07,R08 |
| T06 Unit normalization | $84,000/year vs $7,000/month gross salary not a contradiction; gross/net not silently normalized | R07,R08 |
| T07 Correction freshness | Correct source after approval → dependent approval stale → old send blocked | R08,R09 |
| T08 Delivered correction | Correct after delivered_mock → reconciliation task; original receipt preserved | R08,R12 |
| T09 Summary and recap | Unknown remains unknown; review-needed handoff labelled; customer view excludes internal flags | R09,R10 |
| T10 Close behavior | Missing owner/date blocks normal-ready close; draft or explicit declined follow-up allowed | R10 |
| T11 Failure and duplicate | Unavailable mock remains undelivered; double click produces one logical handoff | R12 |
| T12 Unknown receipt | Timeout after commit → delivery_unknown → reconcile same key; no blind duplicate | R12 |
| T13 Overload | Duplicate issues collapse; one primary/two secondary visible; blockers survive snooze | R13 |
| T14 Security content | Injection markup inert; transcript instruction cannot create unauthorized action | R14 |
| T15 Reset races | Reset cancels timers; late prior-run callbacks cannot alter new run | R03,R16 |
| T16 Accessibility/release | Keyboard, focus, readable viewport, direct links, primary browser + smoke browsers, console clean | R16 |
| T17 Metric integrity | Dashboard derives current-run events; no empty-denominator fake percentages | R15 |

Run pure reducer/rule tests and Playwright browser tests. A screenshot alone does not prove an action changes state. All tests currently have status NOT RUN.

Future-only tests: cross-tenant ID guessing, other-agent reads, elevated-key misuse, stale JWT/revoked membership, concurrent approval/edit race, server-side schema tampering, connector sandbox contracts, deletion/backup behavior. Mark NOT IMPLEMENTED rather than passing these in the static demo.



Additional audit-driven assertions: Accept alone cannot change participant confirmation; only a separate confirmation source/event can. ready blocks unresolved substantive conflicts; review_needed can carry them only as labelled review material with owner/action. Both modes reject stale/unapproved payloads. Editing a task owner/date or unresolved-issue source invalidates approval, not just editing a debt amount. Internal tasks cannot satisfy A08 without customer agreement; explicit no-follow-up is a valid alternative. Agent approval, export and mock receipt cannot emit operations acceptance. Actual observed task time must advance independently of paused replay. Correction inputs are preset synthetic variants, not free-text fields.

## Pilot schedule and hard exit gates

Proposed staff-role-play cohort: 6 agents, 2 processors, 1 manager; 24 paired manual/assisted tasks with matched difficulty. Use counterbalanced order to reduce learning effects, separate tuning and evaluation cases, and record familiarity with the prototype.

Week 1: SME review of scope/templates, label adjudication, instrumentation validation, manual baseline, threshold pre-registration. Week 2: paired role-play and tuning, observe interruption/repair effort, test failure modes. Week 3: freeze release, held-out cases, incident/recovery drill, cost/effort review and go/no-go.

**Hard release gates for demo:** all mandatory scenario/flow tests pass; zero observed forbidden dispatch successes; every mock dispatch has current approval; all required source dependencies invalidated on correction; no false delivery; no real records/secrets/audio; no critical blocking usability defect. These are proposed acceptance criteria—not reported outcomes.

**Stop conditions for a future live pilot:** unexpected sensitive-data transfer, missing authorization, unsupported high-risk generation, prohibited audio retention, repeated severe attribution error, stale action delivery, or an unowned legal/compliance issue. Stop the affected capability and investigate; do not average it away in aggregate metrics.

The three-week trial cannot establish long-term funded-loan causality, default risk, population fairness or legal sufficiency. [NIST AI RMF](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) informs risk ownership and measurement; [Playwright docs](https://playwright.dev/docs/intro) support the proposed browser-test approach.
