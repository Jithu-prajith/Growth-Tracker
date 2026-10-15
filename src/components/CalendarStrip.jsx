import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  ExternalLink, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  GraduationCap, 
  Palmtree, 
  ChevronRight, 
  Clock, 
  CheckCircle2,
  CalendarDays
} from 'lucide-react';

export default function CalendarStrip() {
  const { 
    selectedDate, 
    setSelectedDate, 
    todayStr, 
    isHolidayToday, 
    toggleHolidayForDate,
    collegeLinks,
    addCollegeLink,
    deleteCollegeLink
  } = useApp();

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Generate 7 days centered on today (3 days before, today, 3 days after)
  const days = [];
  const baseDate = new Date();
  for (let i = -3; i <= 3; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    const dateString = d.toISOString().split('T')[0];
    days.push({
      dateStr: dateString,
      dayNumber: d.getDate(),
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      isToday: dateString === todayStr,
      isWeekend: d.getDay() === 0 || d.getDay() === 6
    });
  }

  const handleSaveLink = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;
    addCollegeLink({
      title: newTitle.trim(),
      url: newUrl.trim().startsWith('http') ? newUrl.trim() : 'https://' + newUrl.trim(),
      deadline: newDeadline || todayStr,
      notes: newNotes.trim()
    });
    setNewTitle('');
    setNewUrl('');
    setNewDeadline('');
    setNewNotes('');
    setShowLinkModal(false);
  };

  return (
    <div className="space-y-3 mb-6">
      
      {/* 7-Day Calendar Strip */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/80 p-3 sm:p-4 shadow-lg shadow-black/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs sm:text-sm font-semibold text-slate-200">
              Schedule & Calendar Strip
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">
              (Karur College Timings)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Holiday / College Day for currently selected date */}
            <button
              onClick={() => toggleHolidayForDate(selectedDate)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isHolidayToday
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Holiday status for selected day"
            >
              <Palmtree className="w-3.5 h-3.5" />
              <span>{isHolidayToday ? 'Holiday Active' : 'Mark as Holiday'}</span>
            </button>

            {/* Quick College Link Saver Trigger */}
            <button
              onClick={() => setShowLinkModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">College Link Saver</span>
              <span className="sm:hidden">Links</span>
              {collegeLinks.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-sky-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {collegeLinks.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 7 Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {days.map((d) => {
            const isSelected = selectedDate === d.dateStr;
            return (
              <button
                key={d.dateStr}
                onClick={() => setSelectedDate(d.dateStr)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-md shadow-sky-500/25 scale-[1.02]'
                    : d.isToday
                    ? 'bg-sky-950/40 border-sky-500/50 text-sky-300'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className={`text-[10px] font-semibold uppercase ${
                  isSelected ? 'text-slate-950' : d.isToday ? 'text-sky-400' : 'text-slate-500'
                }`}>
                  {d.dayName}
                </span>
                <span className="text-sm sm:text-base font-bold my-0.5">
                  {d.dayNumber}
                </span>
                {d.isToday && (
                  <span className={`text-[9px] font-extrabold px-1 rounded-sm ${
                    isSelected ? 'bg-slate-950 text-sky-300' : 'bg-sky-500/20 text-sky-300'
                  }`}>
                    TODAY
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prominent Holiday Target Increase Banner */}
      {isHolidayToday && (
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-transparent border-l-4 border-amber-500 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-amber-200 flex items-start sm:items-center justify-between gap-3 shadow-md animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
              <Palmtree className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-amber-300 flex items-center gap-2">
                Holiday detected — targets increased!
              </p>
              <p className="text-amber-200/80 text-xs mt-0.5">
                College is off. Bonus study block activated: <span className="font-semibold text-white">45 min roadmap topic</span> instead of 30 min.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
            +1 Study Block
          </span>
        </div>
      )}

      {/* College Links Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-white text-base">
                  College Registration Links & Hackathons
                </h3>
              </div>
              <button 
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Link submission form */}
            <form onSubmit={handleSaveLink} className="space-y-3 bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
              <p className="text-xs font-semibold text-slate-300">Add New Registration / Exam Link</p>
              <input
                type="text"
                placeholder="Title (e.g. Smart India Hackathon / ServiceNow Voucher)"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-sky-500"
                required
              />
              <input
                type="text"
                placeholder="URL (e.g. https://forms.gle/... or portal link)"
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-sky-500"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="date"
                  value={newDeadline}
                  onChange={e => setNewDeadline(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Notes / instructions"
                  value={newNotes}
                  onChange={e => setNewNotes(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors cursor-pointer"
              >
                Save College Link with Reminder
              </button>
            </form>

            {/* List of saved college links */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              <p className="text-xs font-semibold text-slate-400">Saved Links ({collegeLinks.length})</p>
              {collegeLinks.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No registration links saved yet.</p>
              ) : (
                collegeLinks.map(link => (
                  <div key={link.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-200">{link.title}</span>
                        {link.deadline && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                            Due: {link.deadline}
                          </span>
                        )}
                      </div>
                      {link.notes && <p className="text-[11px] text-slate-400">{link.notes}</p>}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:underline font-mono"
                      >
                        <span>{link.url.length > 40 ? link.url.substring(0, 40) + '...' : link.url}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <button
                      onClick={() => deleteCollegeLink(link.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                      title="Delete link"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
