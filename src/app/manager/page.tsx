import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Users, Activity, ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle, UserCheck } from 'lucide-react'

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-800 mb-4 shadow-sm">
              <Users className="mr-2 h-4 w-4" /> Manager Portal
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Team Overview</h1>
            <p className="text-lg text-slate-500 mt-2">Real-time performance and compliance monitoring</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="shadow-sm bg-white hover:bg-slate-50 border-slate-200">
              <ChevronLeft className="mr-2 w-4 h-4" /> Back to Agent View
            </Button>
          </Link>
        </header>

        {/* Top KPIs */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-md border-slate-200/60 bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
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
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Pending Follow-ups</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-slate-900">4</span>
                    <span className="text-sm font-medium text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full">On Track</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl font-bold text-indigo-600">76%</span>
                <span className="text-xs text-slate-500 font-medium">Completion Rate</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-slate-200/60 bg-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Profile Quality</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-slate-900">81%</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
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
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg border-slate-200/60 bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-bold text-slate-800">Darwix AI Interventions</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                 <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-600">Total Generated</span>
                    <span className="text-xl font-extrabold text-slate-900">37</span>
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
              <CardTitle className="text-lg font-bold text-red-800 flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2" /> Compliance Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col h-[calc(100%-65px)]">
               <div className="space-y-4 flex-1">
                 <div className="flex justify-between items-center p-4 rounded-xl border border-red-100 bg-red-50/30">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-600 mr-3 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
                      <span className="font-bold text-red-900">High Priority Alerts</span>
                    </div>
                    <span className="text-xl font-extrabold text-red-700 bg-red-100 w-8 h-8 flex items-center justify-center rounded-full">4</span>
                 </div>
                 <div className="flex justify-between items-center p-4 rounded-xl border border-amber-100 bg-amber-50/30">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-3"></div>
                      <span className="font-bold text-amber-900">Medium Priority Alerts</span>
                    </div>
                    <span className="text-xl font-extrabold text-amber-700 bg-amber-100 w-8 h-8 flex items-center justify-center rounded-full">8</span>
                 </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-sm h-12 text-base font-semibold">
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
