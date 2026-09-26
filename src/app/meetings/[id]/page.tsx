import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockMeetings, mockCustomers } from '@/lib/mock-data'
import { AlertCircle, ChevronRight, FileWarning } from 'lucide-react'

export default async function PreMeetingBrief({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const meeting = mockMeetings[resolvedParams.id]
  if (!meeting) return notFound()

  const customer = mockCustomers[meeting.customerIds[0]]

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>

      <header className="mb-8 flex justify-between items-end border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pre-Meeting Brief</h1>
          <p className="text-xl text-muted-foreground mt-1">{customer.name}</p>
        </div>
        <Link href={`/meetings/${meeting.id}/live`}>
          <Button size="lg" className="font-semibold shadow-lg">Start Meeting <ChevronRight className="w-5 h-5 ml-1" /></Button>
        </Link>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Customer Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{customer.firstTimeBuyer ? "First-time homebuyers" : "Refinancing"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Target Purchase</span>
                <span className="font-medium">${customer.purchasePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">Down Payment</span>
                <span className="font-medium">${customer.downPayment?.toLocaleString() || "TBD"}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Financials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Income</h4>
                {customer.employment.map((emp, i) => (
                  <div key={i} className="flex justify-between border-b pb-2 mb-2">
                    <span className="text-muted-foreground">{emp.person} ({emp.role})</span>
                    <span className="font-medium">${emp.income.toLocaleString()}/yr</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Existing Obligations</h4>
                {customer.liabilities.map((lib, i) => (
                  <div key={i} className="flex justify-between border-b pb-2 mb-2">
                    <span className="text-muted-foreground">{lib.type}</span>
                    <span className="font-medium">${lib.monthlyPayment}/mo</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center text-amber-800">
                <FileWarning className="w-5 h-5 mr-2" />
                Missing Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {!customer.downPaymentSource && (
                  <li className="flex items-start text-sm">
                    <AlertCircle className="w-4 h-4 mr-2 text-amber-600 mt-0.5" />
                    <span><strong>Down-payment source</strong> has not been confirmed.</span>
                  </li>
                )}
                <li className="flex items-start text-sm">
                  <AlertCircle className="w-4 h-4 mr-2 text-amber-600 mt-0.5" />
                  <span><strong>Employment history</strong> needs documentation.</span>
                </li>
                <li className="flex items-start text-sm">
                  <AlertCircle className="w-4 h-4 mr-2 text-amber-600 mt-0.5" />
                  <span><strong>Student-loan balance</strong> needs verification.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">AI Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-blue-900 mb-2">Recommended topics:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-900/80">
                <li>Confirm down-payment source</li>
                <li>Clarify existing liabilities</li>
                <li>Confirm employment history</li>
                <li>Understand competitor offer</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
