import React from 'react';
import { 
  Target, 
  Home, 
  GraduationCap, 
  Sparkles, 
  Heart, 
  TreePine, 
  IndianRupee, 
  CheckCircle2, 
  X,
  Compass
} from 'lucide-react';

export default function VisionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 animate-fadeIn my-8">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Shri Prajith S — Life Compass & North Star
              </h2>
              <p className="text-xs text-slate-400">
                VSB Engineering College, Karur • AIML Department (2024–2028)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Three Pillars of Prajith's Mission */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Pillar 1: 12LPA Placement */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/20 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <IndianRupee className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">12LPA+ Placement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crack product engineering at ServiceNow, Zoho, or Freshworks within 2 years through relentless DSA & ServiceNow expertise.
            </p>
          </div>

          {/* Pillar 2: House for Parents */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-rose-500/20 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Home className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">House for Parents</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Buy an independent, serene home for Amma and Appa. Repay their quiet sacrifices with unshakeable security and pride.
            </p>
          </div>

          {/* Pillar 3: Hill Farm & Tribal School */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/20 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TreePine className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Hill Farm & School</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Retire to a lush hill farm running a free quality school for tribal children. Cultivate wisdom, nature, and human impact.
            </p>
          </div>

        </div>

        {/* Why Every Daily Slot Matters */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            The Daily Non-Negotiable Contract
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>5:30 AM Gym (Physical stamina for life)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Harry Potter + Coffee (Mindful joy)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>1 LeetCode Easy/Med Daily (Problem solving)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ServiceNow PDI (Niche enterprise edge)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>9:20 PM Call Parents (Never forget roots)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>9:30 PM Phone Submitted (Zero distraction)</span>
            </div>
          </div>
        </div>

        {/* Closing Affirmation */}
        <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
          "The hill farm already exists in your future. You are simply walking toward it one day at a time."
        </div>

      </div>
    </div>
  );
}
