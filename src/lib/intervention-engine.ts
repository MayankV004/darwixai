import { Intervention, TranscriptItem, Customer } from './types'

export function evaluateInterventions(
  transcript: TranscriptItem[],
  customer: Customer,
  existingInterventions: Intervention[]
): Intervention[] {
  const newInterventions: Intervention[] = []

  // Intervention 1 — Missing Information
  if (customer.downPayment && !customer.downPaymentSource) {
    const hasMissingInfo = existingInterventions.some(i => i.trigger === 'down_payment_source_missing')
    if (!hasMissingInfo) {
      newInterventions.push({
        id: `int-${Date.now()}-1`,
        type: 'missing_info',
        severity: 'low',
        trigger: 'down_payment_source_missing',
        message: 'Down-payment source hasn\'t been confirmed.\n\nSuggested question:\n"Can you tell me where the down-payment funds will come from?"',
        reasoning: 'MISSING INFORMATION',
        actions: ['Ask Question', 'Dismiss'],
        confidence: 0.9,
        requiresEscalation: false,
        status: 'suggested'
      })
    }
  }

  const recentTranscript = transcript.slice(-3)
  for (const item of recentTranscript) {
    if (item.speaker === 'agent') {
      const text = item.text.toLowerCase()
      
      // Intervention 3 — Informal Approval
      if (text.includes("approved") && !existingInterventions.some(i => i.trigger === 'informal_approval')) {
        newInterventions.push({
          id: `int-${Date.now()}-3`,
          type: 'compliance',
          severity: 'high',
          trigger: 'informal_approval',
          message: 'Potential approval statement detected.\n\nFormal approval has not been established from the information available.\n\nSuggested response:\n"Based on what we\'ve discussed, we can explore your potential eligibility. Formal approval requires the appropriate process and verification."',
          reasoning: 'HIGH PRIORITY — COMPLIANCE',
          actions: ['Use Response', 'Escalate'],
          confidence: 0.95,
          requiresEscalation: true,
          status: 'suggested'
        })
      }

      // Intervention 4 — Interest Rate
      if (text.includes("rate") || text.includes("%")) {
        if (!existingInterventions.some(i => i.trigger === 'indicative_rate')) {
          newInterventions.push({
            id: `int-${Date.now()}-4`,
            type: 'compliance',
            severity: 'medium',
            trigger: 'indicative_rate',
            message: 'An indicative rate was mentioned.\n\nVerify applicable pricing before presenting a rate as available to the customer.',
            reasoning: 'RATE DISCUSSION',
            actions: ['View Rate', 'Continue'],
            confidence: 0.8,
            requiresEscalation: false,
            status: 'suggested'
          })
        }
      }

      // Intervention 6 — Liability Exclusion
      if (text.includes("exclude") && text.includes("loan")) {
        if (!existingInterventions.some(i => i.trigger === 'liability_exclusion')) {
          newInterventions.push({
            id: `int-${Date.now()}-6`,
            type: 'compliance',
            severity: 'high',
            trigger: 'liability_exclusion',
            message: 'Potential omission of an existing liability detected.\n\nExisting financial obligations should be captured accurately.',
            reasoning: 'HIGH PRIORITY',
            actions: ['Correct Record', 'Escalate'],
            confidence: 0.9,
            requiresEscalation: true,
            status: 'suggested'
          })
        }
      }
      
      // Intervention 7 — Competitor Offer
      if (text.includes("beat") && (text.includes("lender") || text.includes("rate") || text.includes("whatever"))) {
        if (!existingInterventions.some(i => i.trigger === 'competitor_promise')) {
          newInterventions.push({
            id: `int-${Date.now()}-7`,
            type: 'compliance',
            severity: 'medium',
            trigger: 'competitor_promise',
            message: 'Avoid making an unsupported promise.\n\nSuggested action:\nCapture the competitor\'s actual offer and compare applicable terms.',
            reasoning: 'COMPETITOR OFFER',
            actions: ['Ask for Details', 'Dismiss'],
            confidence: 0.85,
            requiresEscalation: false,
            status: 'suggested'
          })
        }
      }
    } else {
      const text = item.text.toLowerCase()

      // Intervention 2 — Conflicting Information
      if (text.includes("95,000") && customer.income === 177000) {
        if (!existingInterventions.some(i => i.trigger === 'conflicting_income')) {
          newInterventions.push({
            id: `int-${Date.now()}-2`,
            type: 'profiling',
            severity: 'medium',
            trigger: 'conflicting_income',
            message: 'Two income figures were mentioned.\n\n$105,000 vs $95,000\n\nPlease confirm before continuing.',
            reasoning: 'CONFLICTING INFORMATION',
            actions: ['Ask for clarification', 'Dismiss'],
            confidence: 0.88,
            requiresEscalation: false,
            status: 'suggested'
          })
        }
      }

      // Intervention 5 — Unverifiable Income
      if (text.includes("side work") || text.includes("cash")) {
        if (!existingInterventions.some(i => i.trigger === 'unverifiable_income')) {
          newInterventions.push({
            id: `int-${Date.now()}-5`,
            type: 'profiling',
            severity: 'medium',
            trigger: 'unverifiable_income',
            message: 'This income source may require additional documentation or verification.\n\nDo not treat it as verified income.',
            reasoning: 'VERIFICATION REQUIRED',
            actions: ['Request Documentation', 'Flag for Review'],
            confidence: 0.85,
            requiresEscalation: false,
            status: 'suggested'
          })
        }
      }
    }
  }

  // Intervention 8 — No Next Action (Triggered by meeting end)
  // We can trigger this manually when agent ends meeting.

  return newInterventions
}
