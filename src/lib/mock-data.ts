import { Customer, Meeting } from './types'

export const mockCustomers: Record<string, Customer> = {
  "c1": {
    id: "c1",
    name: "John & Sarah Smith",
    firstTimeBuyer: true,
    employment: [
      { person: "John Smith", employer: "Tech Corp", role: "Software Engineer", income: 105000, verified: false },
      { person: "Sarah Smith", employer: "City School District", role: "Teacher", income: 72000, verified: false }
    ],
    income: 177000,
    liabilities: [
      { type: "Auto Loan", monthlyPayment: 650 },
      { type: "Student Loan", monthlyPayment: 400 }
    ],
    purchasePrice: 450000,
    downPayment: 45000,
    downPaymentSource: undefined
  },
  "c2": {
    id: "c2",
    name: "Mike Johnson",
    firstTimeBuyer: false,
    employment: [
      { person: "Mike Johnson", employer: "Self Employed", role: "Consultant", income: 120000, verified: true }
    ],
    income: 120000,
    liabilities: [],
    purchasePrice: 300000,
    downPayment: 60000,
    downPaymentSource: "Home Sale Proceeds"
  }
}

export const mockMeetings: Record<string, Meeting> = {
  "m1": {
    id: "m1",
    customerIds: ["c1"],
    date: new Date().toISOString(),
    status: "upcoming",
    transcript: [],
    interventions: [],
    actions: []
  },
  "m2": {
    id: "m2",
    customerIds: ["c2"],
    date: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    status: "upcoming",
    transcript: [],
    interventions: [],
    actions: []
  }
}

export const demoConversations: Record<string, { speaker: string, text: string }[]> = {
  "c1": [
    {
      speaker: "customer",
      text: "We make around $175,000 together."
    },
    {
      speaker: "agent",
      text: "What loans do you currently have?"
    },
    {
      speaker: "customer",
      text: "I have a car loan of about $650 a month."
    },
    {
      speaker: "customer",
      text: "We have around $45,000 for the down payment."
    },
    {
      speaker: "customer",
      text: "I actually make around $95,000 now, not $105,000."
    },
    {
      speaker: "customer",
      text: "I also make some income from side work."
    },
    {
      speaker: "agent",
      text: "Great, we can probably exclude that student loan since it's deferred."
    },
    {
      speaker: "agent",
      text: "You're basically approved."
    },
    {
      speaker: "agent",
      text: "I can probably get you around 6.2%."
    },
    {
      speaker: "agent",
      text: "We will definitely beat whatever rate that other lender gave you."
    }
  ],
  "c2": [
    {
      speaker: "customer",
      text: "I'm looking to refinance my home."
    },
    {
      speaker: "agent",
      text: "How much are you looking to borrow?"
    },
    {
      speaker: "customer",
      text: "About $300,000. I have $60,000 from a previous home sale ready to put in."
    },
    {
      speaker: "agent",
      text: "What is your primary source of income?"
    },
    {
      speaker: "customer",
      text: "I'm self-employed as a consultant. I make around $120,000 a year."
    },
    {
      speaker: "agent",
      text: "Since you're self-employed, we don't necessarily need tax returns if your bank statements look good."
    },
    {
      speaker: "agent",
      text: "I guarantee you a rate under 5%."
    },
    {
      speaker: "customer",
      text: "Oh, really? That's lower than I thought."
    },
    {
      speaker: "agent",
      text: "Yeah, and don't worry about the appraisal, I can ensure it comes in where we need it to."
    }
  ]
}
