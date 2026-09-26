'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Customer, Intervention, TranscriptItem } from '@/lib/types'
import { demoConversations } from '@/lib/mock-data'
import { evaluateInterventions } from '@/lib/intervention-engine'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlertCircle, CheckCircle2, ShieldAlert, Bot, ChevronRight, Check, PlayCircle, PauseCircle } from 'lucide-react'

export default function LiveMeetingClient({ meetingId, initialCustomer }: { meetingId: string, initialCustomer: Customer }) {
  const [transcript, setTranscript] = useState<TranscriptItem[]>([])
  const [customer, setCustomer] = useState<Customer>(initialCustomer)
  const [demoIndex, setDemoIndex] = useState(0)
  const [interventions, setInterventions] = useState<Intervention[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversation = demoConversations[customer.id] || demoConversations["c1"]

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && demoIndex < conversation.length) {
      const timer = setTimeout(() => {
        nextConversation()
      }, 2500)
      return () => clearTimeout(timer)
    } else if (demoIndex >= conversation.length) {
      setIsPlaying(false)
    }
  }, [isPlaying, demoIndex])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 50)
    return () => clearTimeout(timeout)
  }, [transcript, interventions])

  const nextConversation = () => {
    if (demoIndex < conversation.length) {
      const nextItem = conversation[demoIndex]
      const newTranscriptItem: TranscriptItem = {
        id: `t-${Date.now()}`,
        speaker: nextItem.speaker as "agent" | "customer",
        text: nextItem.text,
        timestamp: new Date().toISOString()
      }

      const newTranscript = [...transcript, newTranscriptItem]
      setTranscript(newTranscript)
      setDemoIndex(demoIndex + 1)

      const newInterventions = evaluateInterventions(newTranscript, customer, interventions)

      if (newInterventions.length > 0) {
        setInterventions([...interventions, ...newInterventions])
      }
    } else {
      // Trigger Intervention 8 when conversation ends
      const endIntervention = evaluateInterventions(transcript, customer, interventions)
      if (!interventions.some(i => i.trigger === 'no_next_action')) {
        setInterventions([...interventions, {
          id: `int-${Date.now()}-8`,
          type: 'next_action',
          severity: 'low',
          trigger: 'no_next_action',
          message: 'The meeting is ending without a defined next step.\n\nRecommended:\n- Request required documents\n- Start formal application\n- Schedule follow-up',
          reasoning: 'NEXT ACTION RECOMMENDATION',
          actions: ['Create Actions', 'Dismiss'],
          confidence: 0.9,
          requiresEscalation: false,
          status: 'suggested'
        }])
      }
    }
  }

  const handleAction = (interventionId: string, actionName: string) => {
    setInterventions(interventions.map(i => {
      if (i.id === interventionId) {
        let newStatus = i.status
        if (actionName === 'Dismiss') newStatus = 'dismissed'
        else if (actionName === 'Escalate') newStatus = 'escalated'
        else newStatus = 'accepted'

        // Update customer profile on accept
        if (newStatus === 'accepted' && i.trigger === 'down_payment_source_missing') {
          setCustomer({ ...customer, downPaymentSource: 'Savings' })
        }
        if (newStatus === 'accepted' && i.trigger === 'conflicting_income') {
          setCustomer({ ...customer, income: 177000 })
        }

        return { ...i, status: newStatus as any }
      }
      return i
    }))
  }

  const activeIntervention = interventions.find(i => i.status === 'suggested')

  const completeness = customer.downPaymentSource ? 85 : 72

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950">
      <header className="mb-6 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-3 py-1.5 rounded-full font-medium text-xs tracking-wide shadow-sm border border-red-200 dark:border-red-800/30">
            <span className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-500 animate-pulse"></span>
            LIVE
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Meeting with {customer.name}</h1>
            <p className="text-sm text-slate-500 font-medium">Loan Application Review</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsPlaying(!isPlaying)} 
            disabled={demoIndex >= conversation.length}
            className="shadow-sm border border-slate-200 bg-white hover:bg-slate-100 text-slate-700"
          >
            {isPlaying ? (
              <><PauseCircle className="w-4 h-4 mr-2 text-slate-500" /> Pause</>
            ) : (
              <><PlayCircle className="w-4 h-4 mr-2 text-emerald-500" /> Play Simulation</>
            )}
          </Button>
          <Button 
            variant="secondary" 
            onClick={nextConversation} 
            disabled={demoIndex > conversation.length}
            className="shadow-sm border border-slate-200 bg-white hover:bg-slate-100"
          >
            {demoIndex < conversation.length ? "Next Event" : "End Demo"}
          </Button>
          <Link href={`/meetings/${meetingId}/summary`}>
            <Button className="shadow-sm bg-slate-900 hover:bg-slate-800 text-white">End Meeting</Button>
          </Link>
        </div>
      </header>

      <div className="grid md:grid-cols-12 gap-8 flex-1 overflow-hidden min-h-0">
        {/* Left Column: Live Transcript */}
        <Card className="col-span-12 md:col-span-8 flex flex-col h-full shadow-lg border-slate-200/60 min-h-0 overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="bg-white/80 border-b border-slate-100 py-4 backdrop-blur-md">
            <CardTitle className="text-base flex items-center text-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 shadow-inner">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </div>
              Live Transcription
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1 p-6 bg-slate-50/30">
            <div className="space-y-6 pr-4 pb-4">
              {transcript.map((item) => (
                <div key={item.id} className={`flex flex-col animate-in slide-in-from-bottom-2 fade-in duration-300 ${item.speaker === 'agent' ? 'items-end' : 'items-start'}`}>
                  <span className="text-xs text-slate-400 mb-1.5 font-semibold tracking-wide uppercase px-1">{item.speaker}</span>
                  <div className={`px-5 py-3 text-sm shadow-sm max-w-[85%] leading-relaxed ${
                    item.speaker === 'agent'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                      : 'bg-white border border-slate-100 text-slate-800 rounded-2xl rounded-tl-sm'
                    }`}>
                    {item.text}
                  </div>
                </div>
              ))}
              {transcript.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 mt-32 animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="font-medium">Waiting for conversation to begin...</p>
                  <Button variant="outline" onClick={nextConversation} className="mt-6 border-slate-200">Start Demo</Button>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </ScrollArea>
        </Card>

        {/* Right Column: Copilot & Profile */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-6 overflow-hidden min-h-0">
          {/* Copilot Area */}
          <Card className="flex-1 flex flex-col shadow-lg border-blue-100 overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 py-4 border-b border-blue-100">
              <CardTitle className="text-base text-blue-900 flex items-center font-bold">
                <div className="bg-blue-600 text-white p-1.5 rounded-md mr-3 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                Darwix Copilot
              </CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1 p-5">
              <div className="space-y-5">
                {activeIntervention ? (
                  <div className={`p-5 rounded-xl border shadow-sm animate-in zoom-in-95 fade-in duration-300 ${
                    activeIntervention.severity === 'high' ? 'bg-red-50/50 border-red-200' :
                      activeIntervention.severity === 'medium' ? 'bg-amber-50/50 border-amber-200' :
                        'bg-blue-50/50 border-blue-200'
                    }`}>
                    <div className="flex items-center font-bold text-[11px] tracking-widest mb-3 uppercase opacity-90">
                      {activeIntervention.severity === 'high' && <ShieldAlert className="w-4 h-4 mr-2 text-red-600" />}
                      {activeIntervention.severity === 'medium' && <AlertCircle className="w-4 h-4 mr-2 text-amber-600" />}
                      {activeIntervention.severity === 'low' && <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />}
                      <span className={
                        activeIntervention.severity === 'high' ? 'text-red-700' :
                          activeIntervention.severity === 'medium' ? 'text-amber-700' :
                            'text-blue-700'
                      }>{activeIntervention.reasoning}</span>
                    </div>
                    <div className="text-sm space-y-2 whitespace-pre-wrap font-medium text-slate-800 leading-relaxed">
                      {activeIntervention.message}
                    </div>

                    <div className="flex gap-2.5 mt-5 flex-wrap">
                      {activeIntervention.actions.map(action => (
                        <Button
                          key={action}
                          size="sm"
                          className={
                            action === 'Dismiss' ? 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200 border' : 
                            action === 'Escalate' ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm' : 
                            'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                          }
                          onClick={() => handleAction(activeIntervention.id, action)}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-slate-400 mt-12 text-sm animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    Listening for key events...
                  </div>
                )}

                {interventions.filter(i => i.status !== 'suggested').reverse().map(i => (
                  <div key={i.id} className="text-xs p-3.5 rounded-lg bg-slate-50 text-slate-500 border border-slate-100 flex items-center justify-between animate-in slide-in-from-top-2 fade-in">
                    <span className="font-medium truncate mr-2">{i.reasoning}</span>
                    <span className={`capitalize px-2 py-0.5 rounded-full font-medium ${
                      i.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' :
                      i.status === 'dismissed' ? 'bg-slate-200 text-slate-700' :
                      'bg-red-100 text-red-700'
                    }`}>{i.status}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Profile Area */}
          <Card className="shrink-0 shadow-lg border-slate-200/60 overflow-hidden">
            <CardHeader className="py-4 border-b bg-slate-50/80 backdrop-blur-sm">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center">
                <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Profile Capture
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 text-sm space-y-4 bg-white/50">
              {[
                { label: 'Income', complete: true },
                { label: 'Employment', complete: true },
                { label: 'Existing debt', complete: true },
                { label: 'Down payment src', complete: !!customer.downPaymentSource }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center group">
                  <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">{item.label}</span>
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full ${item.complete ? 'bg-emerald-100' : 'bg-amber-100'} transition-colors`}>
                    {item.complete ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-500 uppercase tracking-wider">Completeness</span>
                  <span className="font-bold text-blue-600">{completeness}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                    style={{ width: `${completeness}%` }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
