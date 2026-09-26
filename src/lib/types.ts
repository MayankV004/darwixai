export type Employment = {
  person: string
  employer: string
  role: string
  income: number
  verified: boolean
}

export type Liability = {
  type: string
  monthlyPayment: number
}

export type Customer = {
  id: string
  name: string
  firstTimeBuyer: boolean
  employment: Employment[]
  income: number
  liabilities: Liability[]
  purchasePrice: number
  downPayment?: number
  downPaymentSource?: string
  stage?: string
}

export type InterventionType = "profiling" | "product" | "objection" | "missing_info" | "compliance" | "next_action"

export type Intervention = {
  id: string
  type: InterventionType
  severity: "low" | "medium" | "high"
  trigger: string
  message: string
  reasoning: string
  actions: string[]
  confidence: number
  requiresEscalation: boolean
  status: "suggested" | "accepted" | "dismissed" | "escalated"
}

export type TranscriptItem = {
  id: string
  speaker: "agent" | "customer"
  text: string
  timestamp: string
}

export type Action = {
  id: string
  title: string
  owner: "agent" | "customer" | "operations"
  status: "pending" | "completed"
}

export type Meeting = {
  id: string
  customerIds: string[]
  date: string
  status: "upcoming" | "live" | "completed"
  transcript: TranscriptItem[]
  interventions: Intervention[]
  actions: Action[]
}
