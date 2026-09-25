# Darwix Build Pack 08 — Security, Privacy and Compliance Design

Threat model, synthetic-demo controls, live-pilot prerequisites, consent and retention boundaries, authorization, AI risk controls, and security tests.

## Security posture and data boundary

Status: proposed controls and test plan. No controls have been implemented, audited, certified, or penetration-tested. This is not legal advice or a declaration of GLBA, SOC 2, or lending-law compliance.

**Demo boundary:** all data are invented; no microphone, external inference, uploads, identity documents, financial identifiers, real emails, lender credentials, or borrower communications. Bundle only candidate-authored demonstration policies. Public static files are inspectable. A role switch is not authentication, client state is editable, and local event history is not tamper-proof.

**Future pilot boundary:** real identity, record/tenant authorization, approved policies, secure persistence, retention, vendor agreements, incident response and lender approvals are prerequisites. Synthetic role-play may proceed without representing itself as a real-borrower deployment.

No raw audio is captured or retained by the baseline application. Do not broaden that into “no data are ever logged anywhere”: static hosting may process request/IP metadata under its own terms. Review hosting analytics/log behavior; disable optional third-party telemetry.

## Threat and control matrix

| Threat | Demo control and acceptance test | Additional live-pilot control / owner |
|---|---|---|
| Real sensitive data enter public demo | Banner, no upload/SSN/contact fields, fixture-only scenario controls; inspect exported/build content | Data classification, collection minimization, secure portals; product/security |
| Transcript/script injection | React text rendering; no dangerous HTML or executable model output; malicious markup remains inert | Input/output validation, CSP, upload scanning and URL allowlists; engineering/security |
| Prompt injection in conversation/document | No model or tool privileges in demo; fixture saying “send all records” cannot bypass commands | Treat all retrieved/spoken content as untrusted; strict schemas, server permissions, allowlisted actions; AI/security |
| Wrong borrower/value inferred | Subject/period/basis required, conflicts and unknowns explicit | Representative extraction/speaker evaluation, human review; product/SME |
| Stale data sent after correction | Invalidate approval before further dispatch; test post-approval edit | Atomic expected-version/freshness checks and transactional outbox; backend |
| False delivery or duplicate write | Mock receipt, unknown state, idempotency and reconciliation tests | Durable queue, remote status evidence, scoped credentials; integration/ops |
| Unauthorized access/approval | Explicitly unimplemented as security in static demo | Managed identity, MFA, session revocation, deny-by-default record/tenant checks; security |
| Hidden unresolved risk | Dismiss/snooze does not clear blocker; queue persists | Approved escalation SLA and human ownership; compliance/ops |
| Policy unsupported or expired | Versioned demo text, no “lender approved” claim; expired-policy fixture blocks assurance | Approved rule lifecycle, effective scope, owner and rollback; compliance |
| Excess collection/retention | Memory only; no audio; reset removes application run state | Data-specific retention/deletion, backups and legal holds; legal/security |
| Vendor compromise or over-retention | No runtime AI/audio provider | Contracted endpoint-specific retention, region, subprocessor and access review; vendor risk |
| Misleading manager inference | Process metrics only; no protected-trait/personality or employee scoring | Monitoring notice, access purpose and employment-use restrictions; HR/legal/product |

Risk ownership is a proposed RACI, not evidence these teams have approved this concept.

## Consent, data lifecycle and application workflow

Recording consent, loan application status, credit-pull authorization, electronic disclosure consent, marketing consent, and joint document access are different concepts. Do not collapse them into one checkbox.

For any later capture feature: determine relevant jurisdictions and approved wording; obtain required participant agreement before processing; pause when someone declines, withdraws, or joins without consent; provide manual mode. Federal one-party exceptions do not settle every state-law question. [18 USC §2511](https://uscode.house.gov/view.xhtml?req=%28title%3A18+section%3A2511+edition%3Aprelim%29) · [California §632](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=632.&lawCode=PEN)

| Data class | Demo | Future pilot decision |
|---|---|---|
| Raw audio | Not collected anywhere in app | Prohibited retention; capture only if permitted ephemeral processing can be substantiated end to end |
| Synthetic transcript/facts | Bundled fixtures plus memory revisions | Real transcript retention needs purpose, access, duration, deletion and legal-record review |
| Audit/action records | Non-authoritative local simulation | Server-authored, access-restricted, integrity-protected records and retention policy |
| Analytics | In-memory IDs/events; no content payload | Pseudonymous event schema; avoid raw transcript, names, SSNs, account numbers |
| Exports | Optional fictional package downloaded by reviewer | Permission, content/recipient review, secure destination, receipt tracking |
| Provider logs/backups | No runtime provider | Inventory every endpoint, buffer, logger, retry store, provider log and backup |

Deleting audio locally does not prove provider deletion. No-training and store:false do not imply zero retention. [OpenAI data controls](https://platform.openai.com/docs/guides/your-data)

Legal workflow: six-item TRID receipt can occur before a signed form, and Regulation B differs. Never reset receipt time on summary approval, defer disclosure until documents arrive, or generate official notices without authority. Retention schedules must reconcile privacy minimization with required records and legal holds; no universal transcript deletion duration is invented. [CFPB §1026.2](https://www.consumerfinance.gov/rules-policy/regulations/1026/2/) · [§1026.19](https://www.consumerfinance.gov/rules-policy/regulations/1026/19/) · [§1002.9](https://www.consumerfinance.gov/rules-policy/regulations/1002/9/)

## Future authorization and server trust boundary

| Role | Proposed permission |
|---|---|
| Assigned agent | Read assigned meetings; propose/correct facts; approve permitted handoff within scope |
| Other agent | No access unless explicitly reassigned/authorized |
| Operations reviewer | Assigned review queue and necessary evidence; return/resolve within role |
| Manager | Team process metrics and authorized case access, not unrestricted borrower documents |
| Compliance | Scoped policy/review/audit access; not automatic global admin |
| Customer | Only explicitly authorized customer-safe recap/documents, not internal notes or co-borrower's private material by default |
| Service worker | Least-privilege connector work; no unrestricted user impersonation |

Enforce access on retrieval, exports, approval and dispatch, not only UI routes. Database RLS and grants need positive and negative tests; privileged server keys can bypass RLS and therefore require their own authorization checks. Use managed identity, MFA where required, session expiration/revocation, CSRF defenses for cookie-auth writes, TLS, at-rest encryption, secret rotation and sanitized errors.

[Supabase keys](https://supabase.com/docs/guides/api/api-keys) · [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) · [OWASP authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) · [Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

Do not claim a static frontend can satisfy server authorization tests. Those remain explicitly unimplemented until the future backend exists.

## AI governance, release gates and incident response

Use [NIST AI RMF](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) as a voluntary risk-management structure: GOVERN owners/policies; MAP intended use and harms; MEASURE with labelled cases; MANAGE release/stop decisions. It is not certification.

For future real inference, [OWASP prompt-injection guidance](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) supports layered controls. RAG, a system prompt, or a detector is not sufficient. Model output may propose structured facts, never authorize a write or independently approve credit. High-risk warning text stays in a reviewed template library. No autonomous protected-trait inference, suitability/creditworthiness scoring, employee ranking, or manipulative selling.

**Demo hard gates:** no microphone call; no external runtime API; no secret/real-record artifact; injected markup inert; stale/unapproved dispatch blocked; low-quality evidence cannot become a verified fact; failed/unknown adapter result cannot become delivered; reset cancels stale callbacks. Every result is “not run” until implemented and tested.

**Before real borrowers:** named legal/compliance/security owners approve scope, jurisdiction, application handling, consent, retention, providers, access controls and incident plan; backend negative authorization tests pass; unresolved critical security issues block launch; staff trained; fallback and stop owner assigned.

**Incident response proposal:** stop affected capture/dispatch, disable relevant connector or release, preserve permitted minimal evidence, notify designated security/compliance owner, identify affected revisions/recipients, reconcile prior writes, and restore only after documented remediation. Notification duties and timing are entity/jurisdiction specific and must be set by counsel, not invented in this prototype.

[FTC Safeguards guidance](https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know) informs covered-entity security and vendor review. Applicability, bank regulator requirements and any exemptions require actual lender assessment.
