import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Users, Activity, ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle, UserCheck } from 'lucide-react'

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Top Brand Bar */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-slate-200/60">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="Darwix AI" 
              width={130} 
              height={32} 
              priority 
              className="h-6 sm:h-7 w-auto object-contain" 
            />
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="shadow-xs bg-white hover:bg-slate-50 border-slate-200 text-xs font-semibold px-2.5 sm:px-3">
              <ChevronLeft className="mr-1 sm:mr-1.5 w-3.5 h-3.5" /> <span className="hidden sm:inline">Back to </span>Agent View
            </Button>
          </Link>
        </div>

        <header className="mb-8 sm:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs sm:text-sm font-medium text-indigo-800 mb-3 sm:mb-4 shadow-sm">
              <Users className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Manager Portal
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Team Overview</h1>
            <p className="text-sm sm:text-lg text-slate-500 mt-1 sm:mt-2">Real-time performance and compliance monitoring</p>
          </div>
        </header>

        {/* Top KPIs */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="shadow-md border-slate-200/60 bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Meetings Today</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-slate-900">18</span>
                    <span className="text-sm font-medium text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full"><TrendingUp className="w-3 h-3 mr-1" /> +12%</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '77%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">14 of 18 completed</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-slate-200/60 bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Pending Follow-ups</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">4</span>
                    <span className="text-xs sm:text-sm font-medium text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full">On Track</span>
                  </div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-indigo-600">76%</span>
                <span className="text-xs text-slate-500 font-medium">Completion Rate</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-slate-200/60 bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Profile Quality</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">81%</span>
                  </div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '81%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">Average across team</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Card className="shadow-lg border-slate-200/60 bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-base sm:text-lg font-bold text-slate-800">Darwix AI Interventions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-6">
                 <div className="flex justify-between items-center bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-600 text-sm sm:text-base">Total Generated</span>
                    <span className="text-lg sm:text-xl font-extrabold text-slate-900">37</span>
                 </div>
                 
                 <div className="space-y-3">
                   <div className="flex justify-between items-center group cursor-default">
                      <span className="font-medium text-emerald-600 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2" /> Accepted</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full" style={{width: '67%'}}></div></div>
                        <span className="font-bold w-6 text-right">25</span>
                      </div>
                   </div>
                   <div className="flex justify-between items-center group cursor-default">
                      <span className="font-medium text-amber-600 flex items-center"><AlertTriangle className="w-4 h-4 mr-2" /> Dismissed</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-amber-500 h-full" style={{width: '24%'}}></div></div>
                        <span className="font-bold w-6 text-right">9</span>
                      </div>
                   </div>
                   <div className="flex justify-between items-center group cursor-default">
                      <span className="font-medium text-red-600 flex items-center"><ShieldAlert className="w-4 h-4 mr-2" /> Escalated</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-red-500 h-full" style={{width: '8%'}}></div></div>
                        <span className="font-bold w-6 text-right">3</span>
                      </div>
                   </div>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-red-200/60 bg-white overflow-hidden">
            <CardHeader className="bg-red-50/50 border-b border-red-100 pb-4">
              <CardTitle className="text-base sm:text-lg font-bold text-red-800 flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2" /> Compliance Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 flex flex-col h-[calc(100%-65px)]">
               <div className="space-y-4 flex-1">
                 <div className="flex justify-between items-center p-3 sm:p-4 rounded-xl border border-red-100 bg-red-50/30">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 mr-2.5 sm:mr-3 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
                      <span className="font-bold text-sm sm:text-base text-red-900">High Priority Alerts</span>
                    </div>
                    <span className="text-lg sm:text-xl font-extrabold text-red-700 bg-red-100 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full">4</span>
                 </div>
                 <div className="flex justify-between items-center p-3 sm:p-4 rounded-xl border border-amber-100 bg-amber-50/30">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2.5 sm:mr-3"></div>
                      <span className="font-bold text-sm sm:text-base text-amber-900">Medium Priority Alerts</span>
                    </div>
                    <span className="text-lg sm:text-xl font-extrabold text-amber-700 bg-amber-100 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full">8</span>
                 </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-sm h-11 sm:h-12 text-sm sm:text-base font-semibold">
                  Review 3 Escalations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
