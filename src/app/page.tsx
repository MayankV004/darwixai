"use client";

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Bot, ShieldCheck, Zap, Activity, ChevronRight, Users, PlayCircle, LayoutDashboard, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { motion, type Variants } from 'framer-motion'
import ScrollTimeline from '@/components/landing/ScrollTimeline'

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
}

export default function Home() {
  return (
    <AuroraBackground className="font-sans pb-24">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full absolute top-0 z-50 flex items-center justify-between px-4 py-3.5 sm:px-6 sm:py-6 lg:px-12 border-b border-slate-200/50 bg-white/30 backdrop-blur-md"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Darwix AI Logo"
            width={140}
            height={36}
            priority
            className="h-7 sm:h-9 w-auto object-contain"
          />
          <span className="text-blue-600 font-bold text-xs bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full hidden sm:inline-block">
            Copilot
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/manager">
            <Button variant="ghost" className="text-slate-700 hover:text-slate-900 font-semibold hidden sm:inline-flex">
              Manager View
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg font-semibold text-xs sm:text-sm px-3.5 sm:px-6 h-9 sm:h-10 transition-all hover:scale-105 active:scale-95">
              Launch Prototype <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center pt-28 sm:pt-44 pb-16 px-4 overflow-hidden w-full h-full min-h-screen">
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto z-10"
        >
          <motion.div variants={fadeUp} className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/70 text-slate-800 text-[11px] sm:text-sm font-bold tracking-wide mb-6 sm:mb-8 shadow-xs text-center">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Interactive Technical Demonstration
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-blue-600 font-extrabold">Next-Gen Mortgage AI</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6 sm:mb-8 drop-shadow-xs">
            Real-Time AI Copilot <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              for Loan Officers
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
            A production-fidelity simulation demonstrating how ambient intelligence monitors live loan consultations, guards regulatory compliance, and extracts structured borrower profiles in real time.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white shadow-xl h-13 px-8 text-base font-bold rounded-2xl w-full sm:w-auto transition-all hover:scale-105 active:scale-95">
                Enter Agent Dashboard <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/manager" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="bg-white/80 hover:bg-white text-slate-700 border-slate-200/80 shadow-md h-13 px-8 text-base font-bold rounded-2xl w-full sm:w-auto transition-all">
                Explore Manager Analytics
              </Button>
            </Link>
          </motion.div>

          {/* Two Prototype Scenarios */}
          <motion.div variants={fadeUp} className="w-full max-w-3xl mx-auto text-left">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Two Scenarios Built Into Prototype
              </span>
              <span className="text-xs text-slate-400 font-medium">Select a scenario to start</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Scenario 1 */}
              <Link 
                href="/meetings/m1" 
                className="group p-5 bg-white/85 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                      Scenario 1 • Purchase
                    </span>
                    <span className="text-xs text-slate-400 font-medium">ID: #m1</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    John & Sarah Smith
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 mb-3">
                    First-Time Homebuyers • Combined W-2 Income
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      <span>Target: <strong>$450,000</strong> ($45k down payment)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      <span>Income: <strong>$177k</strong> (Tech Corp + Teacher)</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-amber-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>Tests: Missing down-payment source & income drop</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Start Pre-Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              {/* Scenario 2 */}
              <Link 
                href="/meetings/m2" 
                className="group p-5 bg-white/85 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200">
                      Scenario 2 • Refinance
                    </span>
                    <span className="text-xs text-slate-400 font-medium">ID: #m2</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    Mike Johnson
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5 mb-3">
                    Refinance • Self-Employed (1099 Consultant)
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                      <span>Loan: <strong>$300,000</strong> ($60k down from sale)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                      <span>Income: <strong>$120k</strong> (Sole Proprietor)</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-red-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      <span>Tests: Tax return skipping & rate promise</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Start Pre-Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll-Triggered Timeline Section */}
        <section className="w-full mt-24 z-10">
          <ScrollTimeline />
        </section>

        {/* Bottom CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto w-full px-4 mt-16 z-10"
        >
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 border border-slate-800">
            <div className="relative z-10 max-w-xl">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/80 inline-block mb-3">
                Experience It Live
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to explore the live simulation?
              </h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed font-medium">
                Step into the shoes of a loan officer or monitor aggregate compliance as a branch manager.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-blue-600/30 w-full sm:w-auto">
                  Launch Demo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </AuroraBackground>
  )
}
