import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Target, 
  GraduationCap, 
  Flame, 
  Settings, 
  LogOut, 
  LogIn, 
  HeartHandshake, 
  Calendar, 
  BookOpen, 
  Dumbbell, 
  Laptop, 
  MessageSquareQuote,
  Binary,
  Headphones,
  Code2,
  Server
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, openVisionModal, openSettingsModal }) {
  const { user, daysOfJourney, dailyQuote, loginWithGoogle, logoutUser } = useApp();
  const [showQuote, setShowQuote] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner: Name, College, Journey Counter & Dream Pill */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Left: User Identity */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400 p-[2px] shadow-lg shadow-sky-500/20">
                <div className="w-full h-full rounded-[10px] bg-[#0f172a] flex items-center justify-center font-black text-sky-400 text-lg">
                  SP
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#090d16] flex items-center justify-center" title="Active">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  Shri Prajith S
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-medium">
                  B.E. AIML (2024–2028)
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                VSB Engineering College, Karur
              </p>
            </div>
          </div>

          {/* Center / Right: Journey Counter, Dream Button & Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Day X of Journey to 12LPA */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <div>
                <span className="text-slate-400">Day </span>
                <span className="font-bold text-white text-sm">{daysOfJourney}</span>
                <span className="text-slate-400"> of journey to </span>
                <span className="font-bold text-sky-400">12LPA+</span>
              </div>
            </div>

            {/* Hill Farm & Parents Dream Pill */}
            <button
              onClick={openVisionModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium hover:bg-emerald-500/20 transition-all cursor-pointer shadow-sm group"
              title="Click to view full life vision"
            >
              <Target className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Hill Farm & Parents' House</span>
              <span className="sm:hidden">Vision</span>
            </button>

            {/* Quote Toggle */}
            <button
              onClick={() => setShowQuote(!showQuote)}
              className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                showQuote 
                  ? 'bg-sky-500/20 border-sky-500/40 text-sky-300' 
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Today's mindset quote"
            >
              <MessageSquareQuote className="w-4 h-4" />
            </button>

            {/* Settings */}
            <button
              onClick={openSettingsModal}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              title="Settings & Firebase Config"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Auth / Account */}
            {user?.isLocalMock ? (
              <button
                onClick={loginWithGoogle}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-600/20 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Google Sign In</span>
              </button>
            ) : (
              <button
                onClick={logoutUser}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 text-xs transition-all cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Expandable Daily Mindset Quote */}
        {showQuote && (
          <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-sky-950/40 via-slate-900/60 to-indigo-950/40 border border-sky-500/20 text-xs animate-fadeIn">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-200 italic font-medium">"{dailyQuote.quote}"</p>
                <p className="text-sky-400/80 text-[11px] mt-1 font-semibold">— {dailyQuote.author}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs (Mobile scrollable) */}
        <nav className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Daily Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('dsa')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dsa'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>DSA (Striver A2Z)</span>
          </button>

          <button
            onClick={() => setActiveTab('datascience')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'datascience'
                ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Binary className="w-3.5 h-3.5" />
            <span>Data Science</span>
          </button>

          <button
            onClick={() => setActiveTab('servicenow')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'servicenow'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>ServiceNow</span>
          </button>

          <button
            onClick={() => setActiveTab('podcasts')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'podcasts'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>50-Wk Podcasts</span>
          </button>

          <button
            onClick={() => setActiveTab('gym')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'gym'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Gym & Diet</span>
          </button>

          <button
            onClick={() => setActiveTab('books')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'books'
                ? 'bg-indigo-500 text-slate-950 font-semibold shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Books</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
