import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Code2, 
  CheckCircle2, 
  Circle, 
  Lock, 
  Unlock, 
  ExternalLink, 
  Clock, 
  FileText, 
  Sparkles, 
  Award,
  BookOpen
} from 'lucide-react';

export default function DsaRoadmap() {
  const { 
    dsaTopics, 
    toggleDsaTopicDone, 
    logDsaTopicHours, 
    updateDsaTopicNotes 
  } = useApp();

  const [editingNotesId, setEditingNotesId] = useState(null);

  const total = dsaTopics.length;
  const completed = dsaTopics.filter(t => t.completed).length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Striver's A2Z DSA Sheet Overview */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/80 p-4 sm:p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Striver's A2Z DSA Master Roadmap
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                Sequential Unlock (1 → 18)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Strict step-by-step progression. Next topic unlocks only when the current is marked Done. Every single morning at 7:30 AM starts from the first incomplete topic.
            </p>
          </div>

          {/* Overall percentage meter */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 shrink-0">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">DSA Curriculum</div>
              <div className="text-xl font-extrabold text-white">
                {completed} <span className="text-xs font-normal text-slate-500">of {total} done</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
              <span className="text-xs font-black text-emerald-400">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2.5 mt-4 overflow-hidden border border-slate-800/60">
          <div 
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* 18 Sequential Topics List */}
      <div className="space-y-3">
        {dsaTopics.map((topic, index) => {
          // Sequential Lock rule:
          // Topic 1 is always unlocked.
          // Topic N unlocks only when Topic N-1 is completed!
          const isUnlocked = index === 0 || dsaTopics[index - 1].completed;
          const isEditingNotes = editingNotesId === topic.id;

          let statusText = 'Not Started';
          let statusStyle = 'bg-slate-800 text-slate-400 border-slate-700';

          if (topic.completed) {
            statusText = 'Done';
            statusStyle = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold';
          } else if (topic.loggedHours > 0) {
            statusText = 'In Progress';
            statusStyle = 'bg-sky-500/20 text-sky-400 border-sky-500/40 font-bold';
          }

          return (
            <div
              key={topic.id}
              className={`p-4 rounded-xl border transition-all ${
                !isUnlocked
                  ? 'bg-slate-950/40 border-slate-800/40 opacity-60'
                  : topic.completed
                  ? 'bg-slate-950/50 border-slate-800/70'
                  : 'bg-[#0f172a] border-slate-800 hover:border-slate-700 shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Left: Checkbox + Topic Details */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {isUnlocked ? (
                    <button
                      onClick={() => toggleDsaTopicDone(topic.id)}
                      className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                    >
                      {topic.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-emerald-400" />
                      )}
                    </button>
                  ) : (
                    <div className="mt-1 p-1 text-slate-600 shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        Topic {topic.topicNumber}
                      </span>
                      <h3 className={`text-sm font-bold ${topic.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                        {topic.name}
                      </h3>
                      {/* Status Pill */}
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${statusStyle}`}>
                        {statusText}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-0.5">
                      {topic.description}
                    </p>

                    {topic.notes && (
                      <p className="text-xs text-sky-300/90 mt-1 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                        Takeaway: {topic.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Est Time, Logged Hours, Striver Button */}
                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>Est: {topic.estTime}</span>
                  </div>

                  {isUnlocked && (
                    <>
                      {/* Log Hours */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-300 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                        <span className="text-slate-500">Logged:</span>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          value={topic.loggedHours || ''}
                          placeholder="0"
                          onChange={(e) => logDsaTopicHours(topic.id, e.target.value)}
                          className="w-10 bg-transparent text-center text-emerald-400 font-bold focus:outline-none focus:underline"
                        />
                        <span className="text-slate-500">hrs</span>
                      </div>

                      {/* Open Striver's Button */}
                      <a
                        href={topic.striverUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold transition-all shadow-sm"
                      >
                        <span>Open Striver's</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* Notes Button */}
                      <button
                        onClick={() => setEditingNotesId(isEditingNotes ? null : topic.id)}
                        className="p-1.5 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                        title="Add notes"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>

              </div>

              {/* Notes Drawer */}
              {isEditingNotes && (
                <div className="mt-3 pt-2.5 border-t border-slate-800">
                  <input
                    type="text"
                    value={topic.notes || ''}
                    onChange={(e) => updateDsaTopicNotes(topic.id, e.target.value)}
                    placeholder="Add key patterns, tricky LeetCode URLs, or mistakes to avoid..."
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
