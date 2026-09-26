import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockMeetings, mockCustomers } from '@/lib/mock-data'
import { CheckCircle2, AlertCircle, ListTodo, FileText, UploadCloud, Send } from 'lucide-react'

export default async function PostMeetingSummary({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const meeting = mockMeetings[resolvedParams.id]
  if (!meeting) return notFound()

  const customer = mockCustomers[meeting.customerIds[0]]

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="container max-w-4xl w-full">
        {/* Top Brand Bar */}
        <div className="mb-6 sm:mb-8 flex justify-between items-center pb-3 sm:pb-4 border-b border-slate-200/60">
          <Link href="/" title="Darwix AI Home">
            <Image src="/logo.png" alt="Darwix AI" width={120} height={28} priority className="h-6 w-auto object-contain" />
          </Link>
          <Link href="/dashboard" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            &larr; Back to Dashboard
          </Link>
        </div>

        <header className="mb-8 sm:mb-12 text-center animate-in slide-in-from-bottom-4 fade-in duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 mb-4 sm:mb-6 shadow-inner ring-4 ring-emerald-50">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Meeting Complete</h1>
          <p className="text-base sm:text-xl text-slate-500 mt-2 sm:mt-3 font-medium">Post-meeting review for <span className="text-slate-800">{customer.name}</span></p>
        </header>

        <div className="space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-150 fill-mode-both">
          <Card className="shadow-lg border-slate-200/60 bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" /> Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Target Purchase</p>
                  <p className="text-2xl font-extrabold text-slate-900">${customer.purchasePrice.toLocaleString()}</p>
                  <p className="text-sm font-medium text-slate-500 mt-1">{customer.firstTimeBuyer ? "First-time buyer" : "Refinance"}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Reported Income</p>
                  <p className="text-2xl font-extrabold text-slate-900">${customer.income.toLocaleString()}</p>
                  <p className="text-sm font-medium text-slate-500 mt-1">Annual combined</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Existing Debt</p>
                  <p className="text-2xl font-extrabold text-slate-900">${customer.liabilities.reduce((acc, l) => acc + l.monthlyPayment, 0)}</p>
                  <p className="text-sm font-medium text-slate-500 mt-1">Monthly obligations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-md border-emerald-200/60 bg-white">
              <CardHeader className="bg-emerald-50/50 border-b border-emerald-100 pb-4">
                <CardTitle className="text-lg font-bold text-emerald-800 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Captured Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {[
                    "Employment verified",
                    "Income details captured",
                    "Existing debt cataloged",
                    "Purchase target confirmed"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-700 font-medium">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mr-3 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md border-amber-200/60 bg-white">
              <CardHeader className="bg-amber-50/50 border-b border-amber-100 pb-4">
                <CardTitle className="text-lg font-bold text-amber-800 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" /> Missing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {[
                    "Down-payment documentation",
                    "2-year employment history"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-slate-700 font-medium">
                      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-xl border-blue-200/60 bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 pb-5">
              <CardTitle className="text-xl font-bold text-blue-900 flex items-center">
                <ListTodo className="w-6 h-6 mr-3 text-blue-600" /> Auto-Generated Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <ul className="divide-y divide-slate-100">
                {[
                  { task: "Request income documents", icon: <UploadCloud className="w-4 h-4" /> },
                  { task: "Request down-payment documents", icon: <UploadCloud className="w-4 h-4" /> },
                  { task: "Complete application draft", icon: <FileText className="w-4 h-4" /> },
                  { task: "Schedule follow-up call", icon: <Send className="w-4 h-4" /> }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors">
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="text-slate-400 bg-white p-1.5 rounded-md border border-slate-200 shadow-sm">{item.icon}</div>
                      <span className="text-base font-semibold text-slate-700">{item.task}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="bg-slate-50 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 p-4 sm:p-6 border-t border-slate-100">
               <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto shadow-sm border-slate-300 h-11 sm:h-12 px-6 font-semibold">Dismiss</Button>
               </Link>
               <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto shadow-md bg-blue-600 hover:bg-blue-700 text-white h-11 sm:h-12 px-6 font-semibold">
                    <Send className="w-4 h-4 mr-2" /> Update CRM & Proceed
                  </Button>
               </Link>
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>
  )
}
