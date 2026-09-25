# Darwix Build Pack 07 — Data Model, API and Integration Contracts

Canonical entities, example payloads, event contracts, approval and outbox semantics, integration permissions, and future API design.

## Contract scope and invariants

Status: proposed engineering contract. The demo will implement local TypeScript interfaces and fixtures, not HTTP endpoints or actual lender schemas. Future endpoint names are our application design, not Darwix/CRM/LOS API claims.

Canonical identifiers: CASE-001/CASE-002; B1/B2; A01–A08; R01–R16. Money uses integer minor units, explicit currency and period. Unknown is not zero. All examples are fictional.

Invariants: facts have subject and provenance; reviewed is not verified; different borrowers' incomes are not conflicts; sources immutable by revision; accepting a nudge does not confirm or resolve; every handoff binds the materialized payload and transitive dependencies; unknown delivery is not success; reset isolates a new run.

**Canonical mode-specific approval gate:**
- ready: no unresolved substantive blocker/conflict; known uncertainty remains labelled and must meet the meeting-readiness policy.
- review_needed: unresolved facts/issues may be included only as review material with owner/action. Conflicted alternatives are preserved; neither becomes an authoritative selected field. Unsupported items explicitly say evidence unavailable.
- Both modes: current dependency revisions, valid template versions, permitted action/target, exact payload hash and fresh explicit approval required. Source revision changes, invalid policy or absent approval block both modes. Reviewing a stale item does not make it fresh.
- A review-needed packet may describe an absent source; it must not contain a dangling reference represented as valid evidence. Changing the absent-source status is itself a material revision.

The reducer derives blockers from issue resolution and field semantics, not whether a card was dismissed. A high-risk unresolved direction cannot disappear from a normal-ready handoff.

Operations acceptance is a separate local reviewer decision and can occur while the external connector is unavailable. It never establishes remote delivery, verified income or loan approval. The future server must enforce equivalent gates atomically; client-only logic is a demonstration, not a trusted security control.

## Entity model

| Entity | Key fields | Ownership / relation |
|---|---|---|
| Meeting | id, caseVersion, runId, stage, participantIds, demoTime, revision | Aggregate root for one run |
| Borrower | id, fictionalDisplayName, role | Stable subject identity; no real SSN/DOB/contact needed |
| SourceRevision | sourceId, revision, speakerId, subjectHint, text, relativeTime, qualityFlag, finalized, supersedes | Immutable synthetic transcript/CRM evidence |
| FactAssertion | id, subjectId, field, value, currency, period, basis, evidenceRefs, reviewState, verificationState, revision | Multiple assertions may coexist |
| Conflict | id, subjectId, field, assertionIds, status, resolutionReason, resolutionEvidence | Never silently last-write-wins |
| RuleTemplate | ruleId, templateId, version, scope, priority, approvedForDemo, effectiveMetadata | Candidate-authored, not lender-approved |
| Issue | id, scenarioId, ruleVersion, evidenceRefs, subjectId, priority, disposition, resolution, isBlocker | Separate presentation from resolution |
| Summary | id, revision, factRefs, issueRefs, taskRefs, reviewStatus, handoffMode | ready or review_needed mode |
| Task | id, action, ownerRole, dueAtRelative, status, sourceRefs, customerAgreed | Customer refusal/no-contact is explicit alternative |
| Approval | id, actionId, target, payloadHash, summaryRevision, dependencies, approverDemoId, status | Invalidated by material edits |
| OutboxAction | id, type, target, payload, approvalId, idempotencyKey, state, attemptCount, receipt | Local simulated queue only |
| Event | id, seq, runId, time, type, actor, objectRef, revisionRefs, reasonCode | In-memory simulation history |

Future database mapping adds tenant_id, authenticated actor, server timestamps, foreign keys and optimistic versions to applicable rows. Server access policies, retention and migration design are additional work. The public static demo does not implement database RLS.

## Example fact, event, and handoff payload

Example after a separate explicit borrower-confirmation step:
```json
{
  "id":"fact-car-b1-r1","subjectId":"B1",
  "field":"liability.monthlyPayment","valueMinor":42000,
  "currency":"USD","period":"month",
  "basis":"required_payment_self_reported",
  "evidenceRefs":[
    {"sourceId":"seg-03","revision":1},
    {"sourceId":"seg-03-confirm","revision":1}
  ],
  "confirmationEventId":"evt-confirm-debt",
  "reviewState":"participant_confirmed",
  "verificationState":"self_reported","revision":1
}
```
seg-03-confirm contains B1's explicit reply about ownership/payment. Accepting the warning does not create this reply or event.

```json
{
  "id":"evt-0021","seq":21,"runId":"run-1",
  "type":"source.corrected","simulationTimeMs":95000,
  "observedElapsedMs":142000,
  "actor":{"role":"agent","demoId":"agent-demo"},
  "objectRef":"seg-03",
  "revisionRefs":{"previous":1,"current":2},
  "reasonCode":"amount_corrected"
}
```
Simulation time orders the fixture; optional observedElapsedMs measures actual role-play work. Do not use synthetic replay time for the business-speed metric. Analytics omit text and financial values.

**Deliberately abbreviated handoff shape; not a complete approval fingerprint or vendor payload:**
```json
{
  "actionId":"handoff-001","actionType":"meeting_handoff",
  "target":{"system":"mock_los","recordId":"CASE-001"},
  "mode":"review_needed","summaryRevision":3,
  "factRefs":[{"id":"fact-car-b1-r1","revision":1}],
  "unresolvedIssueRefs":[{"id":"income-review-b2","revision":1}],
  "taskRefs":[{"id":"task-income-review","revision":1}],
  "templateVersions":["DEBT-01@1","INCOME-01@1"],
  "idempotencyKey":"run-1:handoff-001:rev-3"
}
```
Before approval, materialize the full values and recursively collect the version of every referenced assertion, confirmation, source, issue, task, policy/template and target. Canonicalize that full dependency graph and payload for hashing. Include owner, due date, customer-agreement state, handoff mode and unresolved-status labels. Never hash only the shortened example above.

Changing an income issue's evidence, a task owner/date, the selected target or any material source invalidates approval in both modes. A resolved source revision can explicitly supersede earlier evidence; retain prior confirmation as historical/stale and obtain fresh confirmation when needed. Local hashes demonstrate consistency, not protection against browser tampering.

## Commands, events and state transitions

Local commands: StartMeeting, AdvanceReplay, ProposeFact, ConfirmStatement, DismissIssue, EscalateIssue, ResolveIssue, CorrectSource, ResolveConflict, BuildSummary, ApproveHandoff, DispatchMock, ReconcileMock, ExportReviewedPackage, ResetRun.

Validation precedes mutation. Each accepted command produces typed events and one consistent next state. Invalid commands return a reason code without partial state mutation. Suggested codes: SOURCE_STALE, CONFLICT_UNRESOLVED, APPROVAL_REQUIRED, PAYLOAD_CHANGED, BLOCKER_OPEN, CONNECTOR_UNAVAILABLE, DELIVERY_UNKNOWN, RUN_EXPIRED, INVALID_TRANSITION.

Outbox transitions:
- draft → awaiting_review → approved → queued → sending → delivered_mock.
- Rule/source failure → blocked or needs_reapproval.
- Connector definitely did not send → failed; bounded retry may be allowed.
- Remote commit uncertain → delivery_unknown; status reconciliation required.
- Cancelled before dispatch → cancelled. Cancellation after dispatch is not assumed successful.

Mock adapter port:
```ts
interface HandoffPort {
  dispatch(action: ApprovedHandoff): Promise<MockOutcome>;
  reconcile(idempotencyKey: string): Promise<MockReceiptStatus>;
}
```

Mock outcomes: delivered with receipt; unavailable before send; validation/version conflict; timeout_before_commit; timeout_after_commit. The last returns unknown initially; reconcile finds a stored mock receipt. Duplicate same key/same payload returns the same receipt; same key/different payload is rejected. Keep mock remote receipts separate from UI outbox to make the reconciliation demonstration meaningful.

Future retry policy is proposed, not vendor-specific: exponential backoff with jitter for confirmed retryable failures, bounded attempts, respect Retry-After, no retries for validation/auth failures until corrected. Unknown outcomes reconcile before resend; do not claim exactly-once network delivery.



Additional explicit commands: AcceptHandoff(packetId, expectedRevision, mode, reviewerDemoId) and ReturnHandoff(packetId, expectedRevision, reasonCode). A reviewer must inspect the current packet and open items; acceptance means actionable for ready/review_needed mode, not remotely delivered or independently verified. In the demo these are labelled local role-play actions. They emit operations.handoff_accepted/returned with actual observation timing if enabled. Agent approval, download and adapter receipt do not emit these events.

Apply the mode-specific gate from Contract scope and invariants to every approve/dispatch path. Even review_needed requires current approval and material dependencies. Preset source corrections, issue-source updates and changes to task owner/due date all trigger freshness invalidation. The baseline correction command accepts only defined fixture revision IDs/reason codes; arbitrary uploaded or pasted transcript text is out of scope.

## Enterprise system permissions and automation

| System | Read | Proposed write/action | Approval boundary | Demo / future |
|---|---|---|---|---|
| CRM | Prior contact/meeting facts, owner, tasks | Reviewed meeting recap and follow-up tasks | Agent reviews exact payload; no silent overwrite | Mock now; vendor-specific adapter later |
| LOS | Application stage, recorded facts, disclosure/approval status | Reviewed meeting handoff and unresolved review items | Agent/authorized operations; no application/approval state invented | Mock unavailable now; future sandbox |
| Policy content | Versioned approved explanations/rules | No agent editing of production policy | Compliance publishing/version control | Fictional demo templates; approved registry future |
| Pricing/lock system | Authorized quote/lock evidence | Request review only, not lock or concession | Pricing authority | Future; no live price feed |
| Secure document portal | Document checklist/status | Draft request for later underwriting evidence | Agent approval; secure channel | Checklist mock; no real uploads |
| Communications | Approved contact preferences | Draft customer recap | Review recipient/content; human send in authorized system | Preview only; no outbound send |
| Manager/ops workspace | Same case/issues/tasks/outbox | Ownership/status updates | Authorized role in future | Local perspective switch now |

May automate in demo: fixture replay, candidate proposals, rule evaluation, dedupe, draft summary, metric calculation, source-staleness invalidation. Human approval required: confirm facts, resolve conflicts, finalize recap, approve handoff/export. Never automate in this product scope: credit approval/denial, hidden debt removal, qualifying-income certification, binding rate/competitor commitments, credit pull, fee charge, regulated notice, or customer communication without review.

Unavailable-connector fallback: preview permitted fields → approve reviewed package → download synthetic export → display “Exported, not delivered.” Future manual operator records target, payload revision, destination evidence and receipt; exporting alone cannot count as system update.

## Future API sketch and concurrency

Not implemented. Proposed application API after a real-auth backend is authorized:

| Endpoint | Purpose | Critical checks |
|---|---|---|
| GET /v1/meetings/{id} | Authorized meeting state | Tenant membership and record access |
| POST /v1/meetings/{id}/commands | Typed business command | Schema, actor permission, expectedVersion, permitted transition |
| POST /v1/handoffs/{id}/approve | Bind reviewed payload | Current sources, blockers, exact target/hash, human authorization |
| POST /v1/handoffs/{id}/dispatch | Enqueue permitted action | Approval freshness, idempotency and transaction |
| GET /v1/handoffs/{id}/status | Delivery/reconciliation state | Record authorization; sanitized errors |
| POST /v1/handoffs/{id}/reconcile | Resolve unknown outcome | Connector permission; receipt validation |

Mutations carry expectedVersion and idempotency key. Version conflict returns 409 and a refresh/review path; authorization failure never reveals another tenant's object. Server transaction checks approval, source version and enqueue together; outbox worker rechecks freshness before transport. If source changes after transport begins, reconcile and issue correction rather than assuming rollback.

Sources: [Supabase keys](https://supabase.com/docs/guides/api/api-keys), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). Schema and endpoints here are authored product contracts, not verified lender API specifications.
