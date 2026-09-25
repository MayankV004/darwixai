# Darwix Build Pack 04 — UX and Eight AI Intervention Specifications

Screen-by-screen interaction design, all eight mandatory advanced scenarios, exact messages, evidence, actions, low-confidence behavior, and demo walkthrough.

## Screen map and interaction contract

Status: proposed, not built. These are design-ready wireframe specifications, not completed visual wireframe images. Every screen carries “Simulation — fictional borrowers, no microphone, no live integrations.” Templates are candidate-authored demonstration text, not compliance-approved Darwix or lender policy.

| View | Layout / content | Main action and observable result |
|---|---|---|
| S01 Prepare | Case header; two borrower cards; agenda; prior mock CRM facts; unknowns; application-review caveat; source freshness | Start guided simulation; freeze fixture configuration until reset |
| S02 Live | Left: attributed transcript; center: borrower fact cards; right: one primary nudge and pending tray | Step/replay; inspect source; accept/dismiss/escalate; proposals update without silent confirmation |
| S03 Evidence and conflict drawer | Original and alternative quotes, borrower subject, period/basis, revision; neutral clarification question | Confirm source/subject or correct with reason; dependent draft/approval visibly becomes stale |
| S04 Review | Reviewed statements; unverified information; unresolved issues; task table; old/new payload diff | Approve exact revision, or send review-needed handoff; no normal-ready label with unresolved blockers |
| S05 Customer recap | Customer-safe explanation, acknowledged facts, missing documents/questions, specific next steps | Preview only; no email/SMS send; internal compliance commentary excluded |
| S06 Operations | Linked review and mock outbox queues, owner, status, next action, receipt/error state | Assign/return/resolve; retry only safe failed mock actions; reconcile unknown outcomes |
| S07 Manager | Open issues, accepted handoffs, backlog and review time from this demo run; case drill-down | Inspect the same record; no fabricated fleet analytics or agent rankings |
| S08 Scenario lab | A01–A08 presets, benign/ambiguous variants, connector failure and correction toggles | Reset and replay; visibly distinguish scripted expected output from real inference |

Evidence drawer returns keyboard focus to its launching control. Pause replay while editing. Severity uses words and icons, not color alone. Do not auto-open a modal for every warning.

**Common card fields:** observed issue, exact message, evidence quote/revision, demo rule/template version, priority, reason, next step, actions and unresolved status. Accept acknowledges only. Dismiss requires a reason and does not remove a high-risk blocker. Escalate creates one linked operations item. Resolve records the outcome and evidence. A future model could propose structured candidates; high-risk wording remains deterministic and approved by the lender.

## A01 — Informal approval statement

**Category:** compliance / expectation setting. **Trigger:** agent says “You are definitely approved” while authoritative approval is absent. **Detection:** assertion of approval plus pending/unknown lender status. Demo uses a tagged final transcript event and deterministic status guard; future candidate extraction could be hybrid, with lender-owned decision status and fixed wording.

**Exact message:** “Approval is not confirmed in this case. Clarify that the lender must review the application and supporting information before any approval can be confirmed.”

**Severity:** high; interrupt ordinary coaching, preserve a review item until clarification is recorded. **Evidence:** exact agent quote, timestamp/revision, mock LOS “no confirmed approval,” template APPR-01 v1. Explain that missing approval evidence is not proof the loan was denied.

**Available agent responses:** Accept → suggested clarification; Dismiss → reason and review flag retained; Escalate → supervisor/compliance queue; Resolve → record clarification and its source. **Generated information/action:** issue, clarification task/outcome, reviewed customer-expectation note; never a loan status of approved or denied.

**Escalation:** unresolved assurance or disagreement routes to the designated supervisor/compliance owner. **Low confidence:** “Check the statement: was approval confirmed, conditional, or only being discussed?” No allegation based on ambiguous/partial text.

**Risk if wrong:** unnecessary interruption or contradiction of an authorized approval. Mitigation: show the underlying status/time and allow verified authoritative evidence, not an AI conclusion. **Negative control:** “Approval is subject to underwriting” does not trigger the unconditional-approval warning.

## A02 — Indicative interest rate

**Category:** product explanation / compliance. **Trigger:** agent says “The illustrative rate is 6.5%; that is what you will get,” with no confirmed lock or approved live quote. The number is synthetic, not a current market rate. **Detection:** unsupported certainty around an illustration; indicative discussion alone is not inherently improper. Demo rule-based from scenario metadata and mock lock status; future hybrid extraction plus deterministic approved message.

**Exact message:** “This rate is illustrative, not a confirmed rate lock. Explain the assumptions and that pricing may change. Check an authorized quote or lock record before making a commitment.”

**Severity:** medium for missing explanation; high for explicit guarantee without supporting record. **Evidence:** quote, “lock not confirmed,” any fixture assumptions, RATE-01 v1. Do not infer an APR or total payment.

**Agent response/actions:** Accept → explain illustration versus lock; inspect mock record; record clarification; dismiss with reason; escalate unsupported commitment. **Generated information/action:** rate-discussion status and clarification task, not a personalized quote/LE or lock.

**Escalation:** pricing/lock desk for requested authoritative pricing; compliance/supervisor if assurance remains unresolved. **Low confidence:** ask whether the speaker meant an example or a confirmed lock; withhold certainty.

**Risk if wrong:** confuse a customer about a legitimate lock or incorrectly flag normal education. Validate source/record freshness. **Negative control:** “This is an example only; we have not locked a rate” yields no unsupported-guarantee warning.

If a future UI produces personalized pre-LE written estimates, comply with the exact warning/format requirements in [CFPB §1026.19(e)(2)(ii)](https://www.consumerfinance.gov/rules-policy/regulations/1026/19/); the baseline deliberately does not generate those estimates.

## A03 — Suggesting a liability be excluded

**Category:** profiling / compliance. **Trigger:** agent says “Leave the car loan out so the numbers look better,” after B1 reports a $420 monthly car payment. **Detection:** instruction to omit a known obligation without an authorized treatment basis. Demo deterministic; future hybrid extraction with fixed rule/template.

**Exact message:** “A car-loan obligation was mentioned. Keep it in the record and confirm its owner and monthly payment. Any qualifying exclusion needs documented lender review; do not remove it to improve eligibility.”

**Severity:** high; blocks a normal-ready handoff that silently omits the issue. **Evidence:** borrower debt quote and agent omission quote, revisions, liability register, DEBT-01 v1. Do not label anyone fraudulent.

**Agent response sequence:** Accept only acknowledges and opens clarification. Then the agent asks whose loan it is and the monthly payment. The fixture supplies a separate B1 reply: “It is my car loan, and the required payment is $420 a month.” Only an explicit ConfirmStatement command referencing that reply changes the assertion to participant_confirmed; it remains self_reported, not independently verified. Accept alone leaves confirmation and verification unchanged.

Other actions: dismiss with reason without deleting the debt; escalate possible treatment to lender review; resolve the omission issue by recording that the obligation is retained and the agent corrected the suggestion. Verification/treatment work may remain open independently.

**Generated information/action:** preserved liability assertion with confirmation source, omission issue outcome, and separate treatment-review task. No DTI score or eligibility decision. **Escalation:** processor/underwriter for treatment; supervisor/compliance for an unresolved omission direction.

**Low confidence:** “Please confirm whether a car-loan obligation was mentioned and whose it is.” Keep unresolved; never assume zero. **Risk if wrong:** double-count shared debt or misread a paid-off loan. Preserve evidence and allow a documented synthetic correction. **Negative control:** “Record the loan, then ask underwriting whether its payment has an allowed exclusion” is not concealment.

Investor guidance permits particular evidence-based treatments; [Fannie Mae debt rules](https://selling-guide.fanniemae.com/sel/b3-6-05/monthly-debt-obligations) are not universal law.

## A04 — Income that may not be verifiable

**Category:** profiling / missing information. **Trigger:** B2 says “My business takes in $90,000 a year; I do not have the tax documents here,” and agent proposes using it as qualifying income. **Detection:** revenue conflated with qualifying income and verification not established. Demo deterministic; future hybrid extraction with distinct amount/basis fields.

**Exact message:** “Business revenue is not verified qualifying income. Record the amount as self-reported revenue, clarify business expenses and income available to the borrower, and request the lender-approved verification review.”

**Severity:** high if used as verified qualifying income; medium when simply missing evidence. **Evidence:** quote and period, income-source card, no verification record, INCOME-01 v1.

**Agent response/actions:** Accept → clarify income basis and business history; mark qualifying income unknown; draft an appropriate evidence-review task; dismiss with reason; escalate to processor/underwriter. **Generated information/action:** self-reported revenue assertion, missing-information task, no qualifying-income number or approval score.

**Escalation:** processor/underwriter owns acceptable evidence and calculation; unresolved pressure to use unsupported income goes to supervisor. **Low confidence:** ask whether the amount means sales, profit, personal pay, or something else; do not choose silently.

**Risk if wrong:** impose unnecessary documentation or mishandle a legitimate income source/exception. Use lender-approved conditional checklists, not a universal “two years of tax returns” claim. **Negative control:** “Record revenue separately; qualifying income will be reviewed” is appropriate.

The checklist must not delay legally required LE handling. [Fannie Mae self-employment guidance](https://selling-guide.fanniemae.com/sel/b3-3.5-01/underwriting-factors-and-documentation-self-employed-borrower) is investor-specific.

## A05 — Promise to beat a competitor

**Category:** objections / product explanation. **Trigger:** agent says “We will beat their offer” when only a borrower recollection of the competitor's rate exists. **Detection:** unconditional competitive pricing commitment without comparable documented terms or pricing authority. Demo deterministic; future hybrid with approved comparison schema.

**Exact message:** “Do not promise a better offer before comparing equivalent terms. Ask for the competitor's written offer and review rate, points, fees, loan assumptions, and lock status with the authorized pricing team.”

**Severity:** medium; high if repeated as a guarantee despite absent authority. **Evidence:** exact promise, competitor source marked unverified, missing comparison fields, COMP-01 v1.

**Agent response/actions:** Accept → acknowledge customer concern and ask permission to review offer; create comparison checklist; dismiss with reason; escalate pricing exception request. **Generated information/action:** competitor-offer follow-up task with missing fields, no fabricated savings or match commitment.

**Escalation:** pricing team handles a request, not an automatically granted concession. **Low confidence:** distinguish “we can compare” from “we will beat”; request clarification rather than a high-risk assertion.

**Risk if wrong:** interrupt reasonable sales discussion or mishandle noncomparable products. Show what is missing and avoid judging the competitor. **Negative control:** “We can review whether our offer is competitive once we compare the fees and terms” does not trigger the guarantee warning.

## A06 — Conflicting information from co-borrowers

**Category:** profiling / information integrity. **Trigger:** B1 reports $84,000 annual gross salary; B2 later says “Alex's gross salary is $78,000 per year.” **Detection:** same subject, currency, gross basis and period; different active values. Different borrowers' own incomes are not a conflict. Demo deterministic field comparison; future AI may propose subject/basis but cannot resolve ambiguity autonomously.

**Exact message:** “Two annual gross salary amounts were stated for Alex: $84,000 and $78,000. Ask Alex which amount is current and whether either includes variable pay. Keep both statements visible until clarified.”

**Severity:** high for external fact readiness, not an accusation. **Evidence:** both quotes and attributed speakers/subject, periods and revisions, CONFLICT-01 v1.

**Agent response/actions:** Open side-by-side evidence; ask clarification; choose corrected value with source/reason; leave unresolved and escalate; dismiss notification without silently choosing a value. **Generated information/action:** conflict object; separate assertions; selected participant-confirmed statement only after clarification. Verification remains self-reported.

**Escalation:** processor if unresolved; no normal approved fact write for the conflicted field. A review-needed handoff may carry both values. **Low confidence:** resolve subject, amount, gross/net and period first; no automated average, maximum, or last-write-wins.

**Risk if wrong:** flag salary vs bonus or annual vs monthly as a contradiction; attach B2's income to B1. **Negative controls:** B1 $84,000 yearly and B1 $7,000 monthly gross are consistent after normalization; B1 $84,000 and B2 $78,000 are separate incomes.

## A07 — Important profiling question missed

**Category:** profiling / missing information. **Trigger:** discussion moves to recap with down-payment source unanswered in the reviewed checklist. **Detection:** required-for-this-meeting discovery field not observed, not proof it was never discussed anywhere. Rule-based missing-field checkpoint; future extraction may be hybrid but missingness logic remains deterministic.

**Exact message:** “The source of down-payment funds is not recorded. Ask whether the funds are savings, a gift, a loan, or another source, and record what still needs lender review.”

**Severity:** low coaching during the meeting; medium readiness issue if omitted at close. **Evidence:** checklist row “not recorded,” existing source state, PROFILE-01 v1. No invented transcript quote for an absence.

**Agent response/actions:** Ask now; mark previously discussed with a source note; defer with owner/date; record unknown; dismiss not-applicable with reason where policy allows. **Generated information/action:** a sourced fund-origin assertion or explicitly owned open question.

**Escalation:** processor for evidence/treatment questions; supervisor escalation not automatic for every missing question. **Low confidence:** “I could not confirm this in the notes—please check.” Do not claim the agent failed a legal requirement.

**Risk if wrong:** repetitive or irrelevant questions and inappropriate collection. Use an approved scope-specific checklist, deduplicate, and allow sourced corrections. **Negative control:** a reviewed fund-source statement already exists → no duplicate prompt.

## A08 — Closing without a clear next action

**Category:** next-best action / operations. **Trigger:** agent selects End meeting and neither (a) a customer-agreed next action with action + owner + due date + confirmation source nor (b) an explicit declined-follow-up/no-contact outcome is recorded. Internal compliance/verification tasks alone do not satisfy this predicate. Detection is rule-based.

**Exact message:** “Before closing, agree one concrete next step: what will happen, who owns it, and by when. If the customer is not ready, record that choice and an appropriate follow-up or no-contact preference.”

**Severity:** medium; blocks normal-ready completion, not saving a draft or respecting refusal. **Evidence:** customer-next-step panel identifies missing action/owner/date/confirmation; NEXT-01 v1. No fabricated agreement.

**Agent response/actions:** propose a task; obtain the separate scripted customer confirmation; record owner/due date and source; alternatively record declined follow-up/no contact. Internal review tasks may be assigned separately. Save draft is always available. Dismissing the card does not manufacture a commitment.

**Generated information/action:** agreed customer task or explicit preference/outcome; customer recap updates. **Escalation:** operations only if a genuine unresolved item needs an owner; never automatic sales outreach. **Low confidence:** show draft for confirmation, never infer consent from silence.

**Risk if wrong:** pressure the customer or assign an unagreed deadline. Require explicit confirmation and allow no-follow-up. **Negative control:** a complete customer-agreed task or explicit no-follow-up outcome already exists → no missing-next-action warning.

## Connected demo script and standout branches

**Core four, approximately 2½ minutes of a six-minute video:**
1. S01: show the two borrowers, unknown qualifying income and unavailable mock LOS (15 seconds).
2. S02 A03: agent omission statement → evidence card → acknowledge → preserve liability and route treatment review (25 seconds).
3. A04: business revenue → qualifying income remains unknown; create verification-review task (25 seconds).
4. A06: two salary assertions → compare → record clarification without claiming underwriting verification (30 seconds).
5. A08: End meeting reveals missing next step → agree owner/date → customer preview (20 seconds).
6. S04/S06: approve a review-needed handoff with unresolved verification clearly visible → unavailable connector → reviewed export/mock pending queue; manager sees same item (35 seconds).

For a longer reviewer exploration, Scenario Lab loads A01/A02/A05/A07 independently. Do not attempt to narrate every detail of all eight in a short video.

**Signature branch:** approve a payload, then correct the car payment from $420 to $240 in CASE-002. Show source revision, affected fields and approval changing to needs_reapproval. An old dispatch attempt is blocked. If delivery was already simulated, create a correction/reconciliation task instead of pretending it was undone.

**Reliability branch:** simulate timeout after remote mock commit. State becomes delivery_unknown. Reconcile mock receipt using action/idempotency key; do not blindly create a duplicate handoff.

**Nudge-overload branch:** repeat the same issue three times; show one active issue with repeat count, not three independent high-risk alerts. Quiet mode delays ordinary coaching only; blockers remain visible.

**Implementation note:** these behaviors are deterministic scenario handling, not general speech/language understanding. Exact fixture labels and synthetic quality modes must remain visible.



### Frozen core fixture sequence
These are scripted fictional source IDs, not recorded audio. Replay ordering is fixed; user decisions pause progression where needed.

| Step / source | Exact fixture event | Required state / result |
|---|---|---|
| 1 / seg-01 | B1: “My current gross salary is $84,000 per year.” | Proposed B1 annual-gross salary; self-reported |
| 2 / seg-03 | B1: “I have a car payment of $420 each month.” | Proposed B1 debt; no independent verification |
| 3 / seg-03-agent | Agent: “Leave the car loan out so the numbers look better.” | A03 high-priority issue |
| 4 / seg-03-confirm | B1, after clarification: “It is my car loan, and the required payment is $420 a month.” | Separate ConfirmStatement records ownership/payment; agent correction of omission recorded separately |
| 5 / seg-04 | B2: “My business takes in $90,000 a year; I do not have the tax documents here.” | Revenue self-reported; qualifying income unknown; A04 when agent proposes using revenue to qualify |
| 6 / seg-04-agent | Agent: “We can use that $90,000 as your qualifying income.” | A04 fixed warning; create internal processor review task only |
| 7 / seg-06 | B2: “Alex's gross salary is $78,000 per year.” | A06 same-subject conflict, preserve both amounts |
| 8 / seg-06-confirm | B1: “It was $78,000 before my raise. My current base salary is $84,000 gross per year.” | Resolve current-versus-prior period explicitly; retain original statements and self-reported status |
| 9 / close-attempt | Agent selects End meeting | Only internal review tasks exist; no customer-agreed next step; A08 fires |
| 10 / seg-08-confirm | B1 and B2 each select the synthetic confirmation for a follow-up call in two business days | Task = follow-up clarification call; owner = agent; due = two business days in demo calendar; both confirmation sources retained |
| 11 / review | Agent approves review_needed packet | Income-verification work still open and labelled; not falsely ready/verified |
| 12 / mock-outage | Mock LOS unavailable | Undelivered queue; reviewed synthetic export optional; local ops may explicitly accept packet for review |

CASE-002 correction preset: replace seg-03 with a new synthetic revision saying $240/month; prior $420 confirmation becomes stale rather than silently changed. Require a new preset confirmation source before participant_confirmed is restored. Any dependent summary/approval is invalidated immediately. Corrections and reason fields are pre-authored choices in the baseline, not unrestricted text entry.

Operations screen includes explicit Accept handoff and Return with reason controls. Acceptance means the packet is actionable for the stated mode; it is independent of remote delivery. The human observer's elapsed-time clock continues while replay is paused.
