# Darwix Build Pack 01 — Research and Domain Brief

Primary-source research on the U.S. mortgage workflow, Darwix product fit, compliance boundaries, and implications for building the assignment prototype.

## Read first — recommendation and evidence status

Research checked 25–26 September 2026. This is a candidate concept for the uploaded Darwix AI assessment, not a Darwix-approved product specification or legal opinion. All implementation choices below are proposals. No app, security control, model evaluation, deployment, or pilot has been executed.

**Recommendation:** build an evidence-first meeting workspace with Next.js, React, and TypeScript. Use deterministic synthetic transcript replay and mocked integrations. Demonstrate preparation → live interventions → structured facts → reviewed summary → operations handoff in one shared state. Design all eight assignment scenarios; implement at least four in the first complete slice and target all eight for the final standout demo.

Real AI, audio capture, a database, and authenticated multi-user access are not required to satisfy the assignment. If added later, they require separate security, cost, and deployment work. The main differentiator is trustworthy interaction design, not an unsupported claim of superior AI accuracy.

**Research method:** read the assignment; consult official U.S. regulations and agency guidance; consult investor underwriting guidance separately; examine vendor-published product patterns; verify framework, hosting, and security recommendations in official documentation. No interviews or firsthand lender validation were conducted. Vendor claims are descriptions of published positioning, not independently verified performance.

## Mortgage workflow and product consequences

Assume a mainstream closed-end consumer home-purchase mortgage secured by real property. This is a design assumption, not a statement that every mortgage product is covered identically.

| Stage | Current work and friction | Copilot opportunity | Authority that remains human/system-owned |
|---|---|---|---|
| Exploration and meeting preparation | Goals, timing, contacts, existing records, competitor discussion | Display prior facts with sources and missing questions | Lender's authorized records and applicable procedures |
| Discovery | Separate incomes, liabilities, assets, property plans; incomplete notes | Propose borrower-specific facts; flag missingness and conflicts | Agent clarification; evidence verification by authorized staff |
| Product discussion | Affordability, rates, fees, documentation, timelines | Approved explanations; distinguish illustrations from commitments | Pricing desk, approved product policy, underwriter |
| Application/disclosure transition | Information may arrive across conversations and systems | Escalate possible application triggers with original receipt evidence | Creditor/broker disclosure owner and legal calendar |
| Meeting close | Tasks and expectations can be vague | Read-back, named owner, due date, customer-safe recap | Agent-approved follow-up, authorized communication tools |
| Processing/underwriting/closing | Verify documentation, reconcile debts, assess eligibility, issue disclosures, close | Preserve handoff quality; surface unresolved issues | LOS, processor, underwriter, disclosure/settlement teams |

The prototype stops at reviewed meeting handoff. It does not originate a complete loan or replace underwriting.

## Domain findings that materially change the design

### 1. No signed application does not mean no application
For covered TRID transactions, the six items are name, income, SSN to obtain a credit report, property address, estimated property value, and mortgage amount sought. A written record of an oral application can qualify. Receiving the items—not approving the AI summary—matters. [CFPB §1026.2](https://www.consumerfinance.gov/rules-policy/regulations/1026/2/)

**Build implication:** keep a separate application-review panel. The default fictional case has no property selected and no SSN collected. A stretch fixture can simulate an authorized-system “six items received” event using presence indicators, not a real SSN. Never strategically ignore received information or invent a twelve-item rule for co-borrowers.

### 2. Loan Estimate workflow is not gated by full document verification
For covered cases, the LE generally must be delivered/mailed within three business days of application. Verification documents cannot be required first. Except for a reasonable bona fide credit-report fee, fees cannot be imposed until LE receipt and intent to proceed. “Sent” does not necessarily establish receipt; silence is not intent. Different timing rules use different business-day definitions. [CFPB §1026.19(e)](https://www.consumerfinance.gov/rules-policy/regulations/1026/19/)

**Build implication:** route to a disclosure owner; do not implement a naive legal deadline calculator, payment workflow, or official LE generator. A document-request task cannot block legally required disclosure handling.

### 3. Regulation B has a different application test
An oral or written request for credit under the creditor's actual procedures may count. A CRM sales-stage label does not determine legal classification. Notification and incompleteness obligations require separate review. [CFPB §1002.2](https://www.consumerfinance.gov/rules-policy/regulations/1002/2/) · [§1002.9](https://www.consumerfinance.gov/rules-policy/regulations/1002/9/)

**Build implication:** preserve separate TRID and Regulation B review states. No automated denial, withdrawal, abandonment, or legally styled notice from meeting notes.

### 4. Rate illustration, Loan Estimate, approval, and lock are different
An LE does not itself necessarily lock the rate. Lock terms and conditions require an authoritative record. [CFPB rate-lock guidance](https://www.consumerfinance.gov/ask-cfpb/whats-a-lock-in-or-a-rate-lock-en-143/)

Personalized pre-LE written estimates can require the precise warning: “Your actual rate, payment, and costs could be higher. Get an official Loan Estimate before choosing a loan.” The provision also specifies placement/font and prohibits substantial imitation of the official forms. A generic demo disclaimer is not a substitute. [§1026.19(e)(2)(ii)](https://www.consumerfinance.gov/rules-policy/regulations/1026/19/)

**Build implication:** no customer-facing personalized loan estimate in the baseline. Show educational comparison fields and missing information; do not invent APR, current rates, savings, or approval likelihood.

### 5. Reported income is not qualifying income
Salary, variable pay, business revenue, profit, and lender-qualified income are different. Fannie Mae sets documentation and self-employment requirements with exceptions; these are investor rules, not universal law. [Employment/income documentation](https://selling-guide.fanniemae.com/sel/b3-3.2-01/standards-employment-and-income-documentation) · [Self-employed borrower](https://selling-guide.fanniemae.com/sel/b3-3.5-01/underwriting-factors-and-documentation-self-employed-borrower)

**Build implication:** capture amount, period, basis, subject, evidence, and review status. Participant confirmation never marks income independently verified. Do not divide business revenue by twelve and call it qualifying monthly income.

### 6. Permissible debt treatment is not permission to erase a debt
Liabilities require reconciliation. Investor rules provide particular exclusions with evidence and conditions. Excluding an income stream does not justify concealing a personally obligated debt. [General liabilities](https://selling-guide.fanniemae.com/sel/b3-6-01/general-information-liabilities) · [Monthly debt obligations](https://selling-guide.fanniemae.com/sel/b3-6-05/monthly-debt-obligations)

**Build implication:** preserve debt and source; use “lender review required” for treatment. Unknown payment is not zero. Track joint debts without automatically counting them twice.

### 7. No retained audio does not eliminate recording-consent questions
Federal and state rules differ, including for in-person confidential conversations. [18 USC §2511](https://uscode.house.gov/view.xhtml?req=%28title%3A18+section%3A2511+edition%3Aprelim%29) · [California Penal Code §632](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=632.&lawCode=PEN)

**Build implication:** baseline never requests a microphone. A future capture workflow needs jurisdiction-specific approval, participant consent, withdrawal/late-join behavior, and vendor processing review. A transcript is still sensitive data.

### 8. Security applicability depends on entity and regulator
FTC guidance includes covered mortgage lenders and brokers, with obligations around security programs, access, encryption, MFA, disposal, and vendors. It does not imply every lender is FTC-regulated. [FTC Safeguards guidance](https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know)

**Build implication:** no real financial records in a public static bundle and no “GLBA compliant” badge. Live-borrower use is a separate approval gate.

## Market patterns and differentiation hypothesis

| Source | Published pattern | What to learn without overclaiming |
|---|---|---|
| [Darwix](https://darwix.ai/) and [Sherpa](https://darwix.ai/sherpa) | In-person intelligence, live nudges, policy assistance, mismatch flags, CRM/LOS workflows | Fit the assignment into its meeting-to-action story. Public positioning does not establish U.S. legal readiness or access to private APIs. |
| [Microsoft Sales Copilot overview](https://learn.microsoft.com/en-us/dynamics365/sales/copilot-overview) | Meeting preparation, record summaries, assistance scoped to accessible records | Summarization is table stakes; authorization must apply to retrieval and actions. |
| [Microsoft conversation intelligence](https://learn.microsoft.com/en-us/dynamics365/sales/dynamics365-sales-insights-app) | Transcripts, suggested actions, coaching, retention considerations | Include consent, access, and retention. Do not turn uncertain coaching signals into employment rankings. |
| [Gong conversation intelligence](https://www.gong.io/conversation-intelligence) | Capture, analysis, deal-risk and follow-up automation positioning | Do not claim competitors lack real-time intelligence or integrations without evidence. |

**Differentiation hypothesis:** make evidence, uncertainty, corrections, and approval/delivery state visible in a connected mortgage workflow. Demonstrate one correction that blocks a stale write; one co-borrower conflict that is not silently overwritten; and one unavailable connector that remains visibly undelivered. These are buildable proofs of product judgement, not market-uniqueness claims.

## Assumptions and client questions

Planning assumptions: solo builder; low incremental budget; synthetic English-language cases; desktop/laptop primary; current Chrome primary browser with Firefox/WebKit smoke tests; no private Darwix integrations; no actual lender policies; assignment deadline unknown. All message templates require lender review before real deployment.

Client validation questions, in priority order:
1. Which creditor/broker, loan products, meeting jurisdictions, and application procedures apply?
2. What information already exists, who received it, and who owns disclosures and deadlines?
3. Which high-risk wording and escalation rules will compliance approve?
4. Which CRM/LOS and sandbox interfaces exist, and which is unavailable for the pilot?
5. What permissions, retention, consent, and vendor-processing policies govern transcripts and derived facts?
6. What is the manual handoff time and current error/rework rate?
7. Which devices, accessibility needs, accents/languages, and meeting conditions matter?
8. What can the pilot prove in three weeks, and who has authority to stop it?

Evidence limits: no lender interviews, contracted API schemas, observed baselines, representative speech samples, or validated product metrics. Those gaps are recorded as validation work, not filled with invented facts.
