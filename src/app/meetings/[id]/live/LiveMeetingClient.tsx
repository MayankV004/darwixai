'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Customer, Intervention, TranscriptItem } from '@/lib/types'
import { demoConversations } from '@/lib/mock-data'
import { evaluateInterventions } from '@/lib/intervention-engine'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlertCircle, CheckCircle2, ShieldAlert, Bot, ChevronRight, ChevronLeft, Check, PlayCircle, PauseCircle, Activity } from 'lucide-react'

export default function LiveMeetingClient({ meetingId, initialCustomer }: { meetingId: string, initialCustomer: Customer }) {
  const [transcript, setTranscript] = useState<TranscriptItem[]>([])
  const [customer, setCustomer] = useState<Customer>(initialCustomer)
  const [demoIndex, setDemoIndex] = useState(0)
  const [interventions, setInterventions] = useState<Intervention[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [mobileTab, setMobileTab] = useState<'transcript' | 'copilot'>('transcript')

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
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }, 50)
    return () => clearTimeout(timeout)
  }, [transcript, interventions])

  // Automatically scroll carousel to the latest intervention
  useEffect(() => {
    if (interventions.length > 0) {
      setCarouselIndex(interventions.length - 1)
    }
  }, [interventions.length])

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
        else if (actionName === 'Escalate' || actionName === 'Escalate immediately') newStatus = 'escalated'
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

  const currentIntervention = interventions[carouselIndex]
  const completeness = customer.downPaymentSource ? 85 : 72
  const conversationProgress = Math.min(100, Math.round((demoIndex / Math.max(conversation.length, 1)) * 100))

  return (
    <div className="container mx-auto p-2.5 sm:p-6 md:p-8 max-w-7xl h-[100dvh] flex flex-col bg-slate-50/50 dark:bg-slate-950 overflow-hidden">
      {/* Stages Progress Bar & Controls */}
      <header className="mb-2 sm:mb-6 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm p-2.5 sm:p-3.5 px-3 sm:px-5 flex flex-col lg:flex-row justify-between items-center gap-2.5 sm:gap-4 shrink-0">
        {/* Left: Brand, Back & Customer Info */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" title="Darwix AI Home" className="shrink-0 flex items-center">
              <Image 
                src="/logo.png" 
                alt="Darwix AI" 
                width={100} 
                height={24} 
                priority 
                className="h-5 sm:h-6 w-auto object-contain" 
              />
            </Link>
            <div className="h-4 w-px bg-slate-200"></div>
            <Link 
              href="/dashboard" 
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors text-xs font-semibold group py-1 px-1.5 rounded-lg hover:bg-slate-100"
              title="Return to Dashboard"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-800 truncate max-w-[120px] sm:max-w-none">{customer.name}</span>
            <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded-full">#{meetingId}</span>
          </div>
        </div>

        {/* Center: Conversation & Meeting Stages Progress Bar */}
        <div className="flex items-center gap-2 sm:gap-3 justify-center w-full lg:w-auto overflow-x-auto py-1 hide-scrollbar">
          {/* Stage 1: Prepare */}
          <Link
            href={`/meetings/${meetingId}`}
            className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer transition-opacity hover:opacity-80 shrink-0"
            title="Pre-Meeting Brief"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 block leading-tight">Prepare</span>
              <span className="text-[10px] text-emerald-600 font-medium leading-none hidden sm:block">Completed</span>
            </div>
          </Link>

          {/* Connector 1: Complete */}
          <div className="w-4 sm:w-10 h-0.5 bg-emerald-400 rounded-full shrink-0"></div>

          {/* Stage 2: Meeting (Active) */}
          <div className="flex items-center gap-2 bg-blue-50/90 border border-blue-200 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-xs shrink-0">
            <div className="relative flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-600 text-white text-[9px] sm:text-[10px] font-bold">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
              <span className="relative">2</span>
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-blue-900 block leading-tight">Meeting</span>
              <span className="text-[9px] sm:text-[10px] text-blue-600 font-medium leading-none">
                {demoIndex >= conversation.length ? "Done" : `${conversationProgress}%`}
              </span>
            </div>
          </div>

          {/* Connector 2: Dynamic Progress to End */}
          <div className="w-6 sm:w-12 h-1 bg-slate-200 rounded-full relative overflow-hidden shrink-0">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${conversationProgress}%` }}
            />
          </div>

          {/* Stage 3: End of Meeting */}
          <Link
            href={`/meetings/${meetingId}/summary`}
            className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer text-slate-400 hover:text-slate-700 transition-colors shrink-0"
            title="Post-Meeting Summary"
          >
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-transform group-hover:scale-105 ${
              demoIndex >= conversation.length 
                ? 'bg-blue-100 text-blue-700 border border-blue-300 ring-2 ring-blue-400/20' 
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}>
              3
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 block leading-tight">End</span>
              <span className="text-[10px] text-slate-400 font-medium leading-none hidden sm:block">Summary</span>
            </div>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full lg:w-auto shrink-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)} 
            disabled={demoIndex >= conversation.length}
            className="shadow-sm border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 h-8 text-xs font-medium px-2 sm:px-3 justify-center"
          >
            {isPlaying ? (
              <><PauseCircle className="w-3.5 h-3.5 mr-1 text-slate-500" /> Pause</>
            ) : (
              <><PlayCircle className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Play</>
            )}
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={nextConversation} 
            disabled={demoIndex > conversation.length}
            className="shadow-sm border border-slate-200 bg-white hover:bg-slate-100 h-8 text-xs font-medium px-2 sm:px-3 whitespace-nowrap justify-center"
          >
            {demoIndex < conversation.length ? "Next" : "Done"}
          </Button>
          <Link href={`/meetings/${meetingId}/summary`} className="w-full sm:w-auto">
            <Button size="sm" className="w-full shadow-sm bg-slate-900 hover:bg-slate-800 text-white h-8 text-xs font-medium px-2 sm:px-3 whitespace-nowrap justify-center">
              End Meeting
            </Button>
          </Link>
        </div>
      </header>

      {/* Mobile Segmented View Switcher */}
      <div className="flex md:hidden items-center p-1 bg-slate-200/80 rounded-xl mb-3 shrink-0">
        <button
          type="button"
          onClick={() => setMobileTab('transcript')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
            mobileTab === 'transcript' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Transcript</span>
          {transcript.length > 0 && (
            <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded-full font-semibold">
              {transcript.length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('copilot')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
            mobileTab === 'copilot' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-blue-600" />
          <span>AI Copilot</span>
          {interventions.length > 0 && (
            <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded-full font-bold">
              {interventions.length}
            </span>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-4 md:gap-8 flex-1 overflow-hidden min-h-0">
        {/* Left Column: Live Transcript */}
        <Card className={`col-span-12 md:col-span-8 flex-col h-full shadow-lg border-slate-200/60 min-h-0 overflow-hidden bg-white/50 backdrop-blur-sm ${
          mobileTab === 'transcript' ? 'flex' : 'hidden md:flex'
        }`}>
          <CardHeader className="bg-white/80 border-b border-slate-100 py-3 sm:py-4 backdrop-blur-md">
            <CardTitle className="text-sm sm:text-base flex items-center text-slate-800">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2.5 sm:mr-3 shadow-inner">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </div>
              Live Transcription
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1 p-4 sm:p-6 bg-slate-50/30">
            <div className="space-y-4 sm:space-y-6 pr-2 sm:pr-4 pb-4">
              {transcript.map((item) => (
                <div key={item.id} className={`flex flex-col animate-in slide-in-from-bottom-2 fade-in duration-300 ${item.speaker === 'agent' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] sm:text-xs text-slate-400 mb-1 font-semibold tracking-wide uppercase px-1">{item.speaker}</span>
                  <div className={`px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm shadow-sm max-w-[90%] sm:max-w-[85%] leading-relaxed ${
                    item.speaker === 'agent'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                      : 'bg-white border border-slate-100 text-slate-800 rounded-2xl rounded-tl-sm'
                    }`}>
                    {item.text}
                  </div>
                </div>
              ))}
              {transcript.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 mt-20 sm:mt-32 animate-in fade-in duration-500">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300" />
                  </div>
                  <p className="font-medium text-xs sm:text-sm">Waiting for conversation to begin...</p>
                  <Button variant="outline" size="sm" onClick={nextConversation} className="mt-4 sm:mt-6 border-slate-200">Start Demo</Button>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </ScrollArea>
        </Card>

        {/* Right Column: Copilot & Profile */}
        <div className={`col-span-12 md:col-span-4 flex-col gap-4 md:gap-6 overflow-y-auto md:overflow-hidden min-h-0 ${
          mobileTab === 'copilot' ? 'flex' : 'hidden md:flex'
        }`}>
          {/* Copilot Area */}
          <Card className="flex-1 flex flex-col shadow-lg border-blue-100 overflow-hidden bg-white/80 backdrop-blur-sm relative">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 py-4 border-b border-blue-100">
              <CardTitle className="text-base text-blue-900 flex items-center justify-between font-bold">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white p-1.5 rounded-md mr-3 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  Darwix Copilot
                </div>
                {interventions.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full border-blue-200 hover:bg-blue-100 text-blue-700 disabled:opacity-50"
                      disabled={carouselIndex === 0}
                      onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-xs text-blue-700 font-medium w-8 text-center">
                      {carouselIndex + 1} / {interventions.length}
                    </span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full border-blue-200 hover:bg-blue-100 text-blue-700 disabled:opacity-50"
                      disabled={carouselIndex === interventions.length - 1}
                      onClick={() => setCarouselIndex(Math.min(interventions.length - 1, carouselIndex + 1))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <div className="flex-1 p-5 flex flex-col relative overflow-y-auto hide-scrollbar">
              {interventions.length > 0 && currentIntervention ? (
                <div key={currentIntervention.id} className={`w-full p-5 rounded-xl border shadow-sm transition-all duration-300 animate-in slide-in-from-right-4 fade-in ${
                  currentIntervention.status === 'suggested' ? 
                    (currentIntervention.severity === 'high' ? 'bg-red-50/50 border-red-200' :
                    currentIntervention.severity === 'medium' ? 'bg-amber-50/50 border-amber-200' :
                    'bg-blue-50/50 border-blue-200') :
                  currentIntervention.status === 'accepted' ? 'bg-emerald-50/50 border-emerald-200' :
                  currentIntervention.status === 'escalated' ? 'bg-red-100/50 border-red-300' :
                  'bg-slate-100/50 border-slate-200 opacity-70'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center font-bold text-[11px] tracking-widest uppercase opacity-90">
                      {currentIntervention.severity === 'high' && <ShieldAlert className="w-4 h-4 mr-2 text-red-600" />}
                      {currentIntervention.severity === 'medium' && <AlertCircle className="w-4 h-4 mr-2 text-amber-600" />}
                      {currentIntervention.severity === 'low' && <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />}
                      <span className={
                        currentIntervention.severity === 'high' ? 'text-red-700' :
                        currentIntervention.severity === 'medium' ? 'text-amber-700' :
                        'text-blue-700'
                      }>{currentIntervention.reasoning}</span>
                    </div>
                    {currentIntervention.status !== 'suggested' && (
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        currentIntervention.status === 'accepted' ? 'bg-emerald-200 text-emerald-800' :
                        currentIntervention.status === 'escalated' ? 'bg-red-200 text-red-800' :
                        'bg-slate-200 text-slate-600'
                      }`}>
                        {currentIntervention.status}
                      </span>
                    )}
                  </div>
                  <div className={`text-sm space-y-2 whitespace-pre-wrap font-medium leading-relaxed ${currentIntervention.status !== 'suggested' ? 'text-slate-600' : 'text-slate-800'}`}>
                    {currentIntervention.message}
                  </div>

                  {currentIntervention.status === 'suggested' && (
                    <div className="flex gap-2.5 mt-5 flex-wrap">
                      {currentIntervention.actions.map(action => (
                        <Button
                          key={action}
                          size="sm"
                          className={
                            action === 'Dismiss' ? 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200 border' : 
                            action.includes('Escalate') ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm' : 
                            'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                          }
                          onClick={() => handleAction(currentIntervention.id, action)}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center text-slate-400 text-sm animate-pulse w-full h-full">
                  <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  Listening for key events...
                </div>
              )}
            </div>
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
