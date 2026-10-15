import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  RotateCw, 
  Save, 
  Sparkles, 
  Check, 
  Clock, 
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { JOURNAL_PROMPTS } from '../data/journalPrompts';

export default function DailyJournal() {
  const { 
    selectedDate, 
    todayStr, 
    currentPrompt, 
    setCurrentPrompt, 
    currentJournalEntry, 
    saveJournalEntry, 
    journalEntries 
  } = useApp();

  const [savedFeedback, setSavedFeedback] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleTextChange = (e) => {
    saveJournalEntry(e.target.value);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleNextPrompt = () => {
    const currentIndex = JOURNAL_PROMPTS.indexOf(currentPrompt);
    const nextIndex = (currentIndex + 1) % JOURNAL_PROMPTS.length;
    setCurrentPrompt(JOURNAL_PROMPTS[nextIndex]);
  };

  // Past journal entries list
  const pastDates = Object.keys(journalEntries)
    .filter(d => d !== selectedDate && journalEntries[d]?.content?.trim())
    .sort((a, b) => b.localeCompare(a));

  return (
    <div className="mt-8 bg-[#0f172a] rounded-2xl border border-slate-800/80 p-4 sm:p-6 shadow-xl shadow-black/30 space-y-4">
      
      {/* Header: Title, Prompt, Word Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Daily Reflection Journal
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                {selectedDate}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Hostel night wind-down (auto-saves to cloud & disk)
            </p>
          </div>
        </div>

        {/* Word count & Autosave indicator */}
        <div className="flex items-center gap-3">
          <div className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono">
            <span className="text-sky-400 font-bold">{currentJournalEntry.wordCount}</span> words
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            {savedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-500">Auto-saving</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Daily Rotating Prompt Card */}
      <div className="bg-gradient-to-r from-sky-950/40 via-slate-900/60 to-indigo-950/30 border border-sky-500/20 rounded-xl p-3.5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-sky-400">
              Today's Guided Prompt
            </span>
            <p className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5">
              "{currentPrompt}"
            </p>
          </div>
        </div>
        <button
          onClick={handleNextPrompt}
          className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
          title="Shuffle to another thoughtful prompt"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Journal Writing Box */}
      <div>
        <textarea
          value={currentJournalEntry.content}
          onChange={handleTextChange}
          placeholder="What did you do today? What did you learn? How do you feel? Write freely about your coding challenges, hostel moments, gym numbers, or your hill farm dream..."
          className="w-full h-44 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm leading-relaxed placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-sans resize-y"
        ></textarea>
        <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500">
          <span>Tip: Writing 150+ words daily builds razor-sharp clarity and communication skills.</span>
          <span>Submitted phone at 9:30 PM helps journal in peace</span>
        </div>
      </div>

      {/* Past Entries Collapsible Drawer */}
      <div className="border-t border-slate-800/80 pt-3">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors py-1 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-sky-400" />
            Browse Past Journal Entries ({pastDates.length})
          </span>
          {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showHistory && (
          <div className="mt-3 space-y-2.5 max-h-60 overflow-y-auto pr-1 animate-fadeIn">
            {pastDates.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-3">No past reflections recorded yet.</p>
            ) : (
              pastDates.map(dateKey => {
                const entry = journalEntries[dateKey];
                return (
                  <div key={dateKey} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-400 font-mono">{dateKey}</span>
                      <span className="text-[10px] text-slate-500">{entry.wordCount} words</span>
                    </div>
                    {entry.prompt && (
                      <p className="text-[11px] text-slate-400 italic">"{entry.prompt}"</p>
                    )}
                    <p className="text-xs text-slate-300 line-clamp-3 mt-1 font-sans">
                      {entry.content}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

    </div>
  );
}
