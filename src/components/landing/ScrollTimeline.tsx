"use client"

import React, { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { 
  Users, 
  PlayCircle, 
  ShieldCheck, 
  LayoutDashboard, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Bot, 
  Sparkles, 
  FileText, 
  Check, 
  Activity,
  ShieldAlert,
  Send,
  UploadCloud
} from "lucide-react"

export default function ScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const steps = [
    {
      step: "01",
      phase: "Phase 1 • Intake & Setup",
      title: "Dynamic Customer Personas",
      icon: <Users className="w-5 h-5 text-blue-600" />,
      accent: "from-blue-600 to-cyan-500",
      bgLight: "bg-blue-50/70",
      borderLight: "border-blue-200/80",
      description: "Test against diverse, real-world borrower financial profiles. The prototype includes pre-configured scenarios that dynamically exercise different AI reasoning models.",
      features: [
        "First-Time Homebuyer scenario (W-2 combined income)",
        "Self-Employed Consultant scenario (1099 refinancing)",
        "Pre-meeting debt-to-income and asset verification"
      ],
      preview: (
        <div className="bg-white/90 rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3 font-sans">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                JS
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">John & Sarah Smith</p>
                <p className="text-[10px] text-slate-500 font-medium">First-time homebuyers • $450k Target</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              W-2 Scenario
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 font-semibold block uppercase">Combined Income</span>
              <span className="font-bold text-slate-800">$177,000 / yr</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-500 font-semibold block uppercase">Target Price</span>
              <span className="font-bold text-slate-800">$450,000</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1 text-slate-600">
            <span className="flex items-center gap-1 text-amber-600 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" /> 1 missing info item
            </span>
            <span className="text-slate-400 font-medium">Pre-brief ready</span>
          </div>
        </div>
      )
    },
    {
      step: "02",
      phase: "Phase 2 • Live Simulation",
      title: "Real-Time Conversation Stream",
      icon: <PlayCircle className="w-5 h-5 text-indigo-600" />,
      accent: "from-indigo-600 to-purple-500",
      bgLight: "bg-indigo-50/70",
      borderLight: "border-indigo-200/80",
      description: "A streaming speech simulation streams customer and agent interactions turn-by-turn every 2.5 seconds, or step-by-step under manual agent control.",
      features: [
        "Automated speech playback with pause/play controls",
        "Deterministic mock transcript triggers",
        "Smooth scroll tracking with zero layout shifting"
      ],
      preview: (
        <div className="bg-white/90 rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3 font-sans">
          <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2.5">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" /> Live Stream
            </span>
            <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
              Turn 4 of 10
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex flex-col items-start">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Customer</span>
              <div className="bg-slate-100 text-slate-800 px-3 py-2 rounded-xl rounded-tl-xs max-w-[90%] leading-relaxed">
                "We make around $175,000 together."
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider mb-0.5">Agent</span>
              <div className="bg-blue-600 text-white px-3 py-2 rounded-xl rounded-tr-xs max-w-[90%] leading-relaxed shadow-xs">
                "What loans do you currently have?"
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: "03",
      phase: "Phase 3 • Compliance & Copilot",
      title: "Active Intervention Engine",
      icon: <ShieldCheck className="w-5 h-5 text-red-600" />,
      accent: "from-red-600 to-rose-500",
      bgLight: "bg-red-50/70",
      borderLight: "border-red-200/80",
      description: "The AI agent continuously evaluates the transcript stream. If a lender promises an unverified rate or overlooks required documentation, actionable guidance surfaces instantly.",
      features: [
        "Unapproved rate guarantee detection & regulatory alerts",
        "Discrepancy resolution (e.g. conflicting income statements)",
        "One-click action responses: Escalate, Ask Question, or Dismiss"
      ],
      preview: (
        <div className="bg-red-50/90 rounded-2xl border border-red-200/90 p-5 shadow-sm space-y-3 font-sans">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-red-700 font-bold text-[11px] uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-red-600" /> Compliance Warning
            </div>
            <span className="text-[10px] font-extrabold uppercase bg-red-200/80 text-red-800 px-2 py-0.5 rounded-full">
              High Severity
            </span>
          </div>

          <p className="text-xs text-slate-800 font-medium leading-relaxed bg-white/80 p-3 rounded-xl border border-red-100">
            Agent guaranteed an interest rate under 5% without underwriter rate-lock confirmation.
          </p>

          <div className="flex gap-2 pt-1">
            <button className="bg-red-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-xs hover:bg-red-700 transition-colors">
              Escalate Immediately
            </button>
            <button className="bg-white border border-slate-200 text-slate-600 text-[11px] font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
              Dismiss
            </button>
          </div>
        </div>
      )
    },
    {
      step: "04",
      phase: "Phase 4 • Wrap-Up & Action Plan",
      title: "Automated CRM & Action Plan",
      icon: <LayoutDashboard className="w-5 h-5 text-emerald-600" />,
      accent: "from-emerald-600 to-teal-500",
      bgLight: "bg-emerald-50/70",
      borderLight: "border-emerald-200/80",
      description: "When the consultation concludes, captured borrower facts are synthesized into verified profiles and auto-converted into operational action items ready for your CRM.",
      features: [
        "Executive brief & debt calculation recap",
        "Checklist of captured vs pending verification items",
        "One-click CRM update with automated task assignments"
      ],
      preview: (
        <div className="bg-white/90 rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3 font-sans">
          <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Auto-Generated Actions
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              4 Tasks
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { label: "Request 2 years W-2 tax forms", done: true },
              { label: "Verify down payment savings transfer", done: true },
              { label: "Draft formal loan application", done: false }
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${task.done ? 'bg-emerald-600 text-white' : 'border border-slate-300'}`}>
                  {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={`text-[11px] font-medium ${task.done ? 'text-slate-800' : 'text-slate-500'}`}>
                  {task.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ]

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20">
      {/* Header for the section */}
      <div className="text-center max-w-2xl mx-auto mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/60 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" /> End-to-End Workflow
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          How The Darwix AI Engine Works
        </h2>
        <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
          Follow the borrower journey step-by-step. Scroll down to see how intelligent interventions, compliance guarding, and live speech parsing orchestrate seamlessly.
        </p>
      </div>

      {/* Central Progress Track Line */}
      <div className="absolute left-5 sm:left-6 md:left-1/2 top-48 bottom-24 -translate-x-1/2 w-1 bg-slate-200/80 dark:bg-slate-800 rounded-full z-0 overflow-hidden">
        <motion.div 
          style={{ scaleY }}
          className="w-full h-full origin-top bg-gradient-to-b from-blue-600 via-indigo-600 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
        />
      </div>

      {/* Timeline Steps */}
      <div className="space-y-16 sm:space-y-32 relative z-10">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0

          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-16 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Left / Right Card: Content */}
              <div className="w-full md:w-1/2 pl-10 sm:pl-14 md:pl-0">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-8 border border-white/80 shadow-xl shadow-slate-200/40 relative group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {step.phase}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-2 sm:mb-3">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 font-medium">
                    {step.description}
                  </p>

                  <ul className="space-y-2 border-t border-slate-100 pt-3.5">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-[11px] sm:text-xs font-semibold text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Center Timeline Node Marker */}
              <div className="absolute top-6 md:top-1/2 left-5 sm:left-6 md:left-1/2 -translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center z-20">
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white border-3 sm:border-4 border-slate-100 shadow-md flex items-center justify-center group relative cursor-pointer"
                >
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br ${step.accent} text-white flex items-center justify-center font-extrabold text-[10px] sm:text-xs shadow-inner`}>
                    {step.step}
                  </div>
                </motion.div>
              </div>

              {/* Opposing Side: Live Interactive UI Preview */}
              <div className="w-full md:w-1/2 pl-10 sm:pl-14 md:pl-0">
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl p-1.5 sm:p-2 bg-gradient-to-b from-slate-200/50 to-slate-100/30 border border-white/60 shadow-lg shadow-slate-200/30"
                >
                  {step.preview}
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
