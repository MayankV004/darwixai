import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockCustomers, mockMeetings } from '@/lib/mock-data'
import { AlertCircle, CheckCircle2, Calendar, Clock, ChevronRight, Briefcase } from 'lucide-react'

export default function Dashboard() {
  const upcomingMeetings = Object.values(mockMeetings).filter(m => m.status === 'upcoming')

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
              <Briefcase className="mr-2 h-4 w-4" /> Agent Portal
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Welcome back, Alex.</h1>
            <p className="text-lg text-slate-500 mt-2">You have <span className="font-semibold text-slate-700">{upcomingMeetings.length} meetings</span> scheduled for today.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/manager">
              <Button variant="outline" className="shadow-sm bg-white hover:bg-slate-50 border-slate-200">
                Switch to Manager View <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </header>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" /> Today's Schedule
              </h2>
            </div>
            
            <div className="space-y-4">
              {upcomingMeetings.map(meeting => {
                const customer = mockCustomers[meeting.customerIds[0]]
                const isReady = customer.downPaymentSource !== undefined
                const missingFields = !isReady ? 3 : 0 

                return (
                  <Card key={meeting.id} className="shadow-md border-slate-200/60 hover:shadow-lg transition-all duration-300 bg-white group overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <CardTitle className="text-xl text-slate-900 group-hover:text-blue-700 transition-colors">{customer.name}</CardTitle>
                            <CardDescription className="text-sm font-medium text-slate-500 mt-1">
                              {customer.firstTimeBuyer ? "First-time homebuyer" : "Refinancing"}
                            </CardDescription>
                          </div>
                          <div className="flex items-center text-sm font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">
                            <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
                            {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Amount</p>
                            <p className="font-bold text-slate-800">${customer.purchasePrice.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Profile Status</p>
                            {isReady ? (
                              <div className="flex items-center text-emerald-600 text-sm font-bold">
                                <CheckCircle2 className="w-4 h-4 mr-1.5" /> Ready
                              </div>
                            ) : (
                              <div className="flex items-center text-amber-600 text-sm font-bold">
                                <AlertCircle className="w-4 h-4 mr-1.5" /> {missingFields} missing fields
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-50 border-t sm:border-t-0 sm:border-l border-slate-100 p-6 flex flex-col justify-center items-center sm:w-48 shrink-0">
                        <Link href={`/meetings/${meeting.id}/live`} className="w-full">
                          <Button className={`w-full shadow-sm transition-all ${isReady ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                            {isReady ? "Start Meeting" : "Prepare"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Action Items</h2>
            <Card className="shadow-lg border-slate-200/60 bg-gradient-to-b from-white to-slate-50/50">
              <CardHeader className="border-b border-slate-100 bg-white/50 backdrop-blur-sm pb-4">
                <CardTitle className="text-base text-slate-800 font-bold">Follow-ups</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y divide-slate-100">
                  <li className="p-4 hover:bg-white transition-colors flex justify-between items-center group cursor-pointer">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Send pre-approval to Emily</span>
                    <span className="text-red-600 font-bold text-[10px] uppercase tracking-wider bg-red-100 px-2 py-1 rounded-full shadow-sm">Overdue</span>
                  </li>
                  <li className="p-4 hover:bg-white transition-colors flex justify-between items-center group cursor-pointer">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Call back Mark regarding rates</span>
                    <span className="text-blue-600 font-bold text-[10px] uppercase tracking-wider bg-blue-100 px-2 py-1 rounded-full">Today</span>
                  </li>
                  <li className="p-4 hover:bg-white transition-colors flex justify-between items-center group cursor-pointer">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Upload W2 for Sarah</span>
                    <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-full">Tomorrow</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
