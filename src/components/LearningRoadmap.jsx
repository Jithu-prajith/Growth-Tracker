import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Lock, 
  Unlock, 
  ExternalLink, 
  Clock, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Mic, 
  Play, 
  Square, 
  Languages, 
  Sparkles, 
  Award, 
  HelpCircle,
  TrendingUp
} from 'lucide-react';

export default function LearningRoadmap() {
  const { 
    roadmap, 
    toggleTopicCompletion, 
    logTopicHours, 
    updateTopicNotes,
    getPhaseProgress, 
    getOverallRoadmapProgress, 
    isPhaseUnlocked,
    getJapaneseBookPagesRead
  } = useApp();

  // Active accordion phase (default to Phase 1 open)
  const [openPhaseId, setOpenPhaseId] = useState('phase-1');
  const [editingNotesTopicId, setEditingNotesTopicId] = useState(null);

  // Audio recording simulation for English speaking habit
  const [isRecordingSpeaking, setIsRecordingSpeaking] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioSaved, setAudioSaved] = useState(false);

  const startSpeakingTimer = () => {
    setIsRecordingSpeaking(true);
    setAudioSaved(false);
    setRecordingSeconds(0);
    const interval = setInterval(() => {
      setRecordingSeconds(s => {
        if (s >= 120) { // 2 minutes
          clearInterval(interval);
          setIsRecordingSpeaking(false);
          setAudioSaved(true);
          return 120;
        }
        return s + 1;
      });
    }, 1000);
  };

  const overallProgress = getOverallRoadmapProgress();
  const pagesRead = getJapaneseBookPagesRead();

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Striver-style Overview & Progress */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/80 p-4 sm:p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Placement & Mastery Curriculum
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold">
                Striver SDE Sheet Standard
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Targeted for ServiceNow, Zoho, Freshworks (12LPA+). Structured progression with beginner-friendly generous estimates. Future phases unlock as foundation benchmarks are cleared.
            </p>
          </div>

          {/* Overall percentage meter */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 shrink-0">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Overall Curriculum</div>
              <div className="text-xl font-extrabold text-white">
                {overallProgress}% <span className="text-xs font-normal text-slate-500">done</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
              <span className="text-xs font-black text-sky-400">{overallProgress}%</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2.5 mt-4 overflow-hidden border border-slate-800/60">
          <div 
            className="bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Vertical Roadmap Phases */}
      <div className="space-y-4">
        {roadmap.map((phase) => {
          const unlocked = isPhaseUnlocked(phase);
          const phaseProgress = getPhaseProgress(phase.id);
          const isOpen = openPhaseId === phase.id;

          return (
            <div 
              key={phase.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                unlocked 
                  ? 'bg-[#0f172a] border-slate-800/90 shadow-lg shadow-black/10' 
                  : 'bg-slate-950/50 border-slate-800/40 opacity-75'
              }`}
            >
              {/* Phase Accordion Header */}
              <div 
                onClick={() => unlocked && setOpenPhaseId(isOpen ? null : phase.id)}
                className={`p-4 sm:p-5 flex items-center justify-between gap-4 select-none cursor-pointer ${
                  !unlocked ? 'cursor-not-allowed' : 'hover:bg-slate-850/40'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                    !unlocked
                      ? 'bg-slate-900 border-slate-800 text-slate-500'
                      : phaseProgress === 100
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      : 'bg-sky-500/15 border-sky-500/30 text-sky-400'
                  }`}>
                    {!unlocked ? (
                      <Lock className="w-4 h-4" />
                    ) : phaseProgress === 100 ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span>P{phase.phaseNumber}</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {phase.title}
                      </h3>
                      {!unlocked && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
                          {phase.unlockRequirement?.description}
                        </span>
                      )}
                      {unlocked && phaseProgress === 100 && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right: Progress & Toggle */}
                <div className="flex items-center gap-3 shrink-0">
                  {unlocked ? (
                    <>
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-bold text-slate-200">{phaseProgress}%</span>
                        <div className="w-20 bg-slate-950 rounded-full h-1.5 mt-1 overflow-hidden border border-slate-800">
                          <div 
                            className="bg-sky-400 h-1.5 rounded-full"
                            style={{ width: `${phaseProgress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-slate-400">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>
              </div>

              {/* Phase Modules & Topics (when expanded) */}
              {isOpen && unlocked && (
                <div className="px-4 pb-5 sm:px-6 space-y-6 border-t border-slate-800/80 pt-4 animate-fadeIn">
                  
                  {/* Special Japanese Book Header for Phase 6 */}
                  {phase.id === 'phase-6' && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/20 via-slate-900 to-slate-900 border border-red-500/20 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Languages className="w-4 h-4 text-red-400" />
                          <span className="text-xs font-bold text-slate-200">
                            Book: "Japanese Hiragana & Katakana for Beginners" (Timothy G. Stout, Tuttle Publishing)
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-red-300 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
                          {pagesRead} of 226 pages read ({Math.round((pagesRead / 226) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-amber-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.round((pagesRead / 226) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Special Speaking Audio Habit for Phase 7 */}
                  {phase.id === 'phase-7' && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/30 via-slate-900 to-indigo-950/30 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
                          <Mic className="w-4 h-4 text-sky-400" />
                          <span>Weekly 2-Minute English Speaking Practice</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Pick a topic (e.g. "Explain ServiceNow ITSM" or "Why I love Harry Potter") and speak aloud for 120s.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isRecordingSpeaking ? (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500 text-rose-300 text-xs font-mono font-bold animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            <span>{Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60).toString().padStart(2, '0')} / 02:00</span>
                          </div>
                        ) : (
                          <button
                            onClick={startSpeakingTimer}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span>Start 2-Min Practice</span>
                          </button>
                        )}
                        {audioSaved && (
                          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Done!
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Modules in Phase */}
                  {phase.modules.map((mod) => (
                    <div key={mod.id} className="space-y-3">
                      {/* Module Header & Resource link */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                        <h4 className="text-xs sm:text-sm font-bold text-sky-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                          {mod.name}
                        </h4>
                        {mod.resource && (
                          <a
                            href={mod.resourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-sky-400 transition-colors font-medium"
                          >
                            <span>Resource: {mod.resource}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      {/* Topics Table / Cards */}
                      <div className="space-y-2">
                        {mod.topics.map((topic) => {
                          const isEditingNotes = editingNotesTopicId === topic.id;

                          return (
                            <div 
                              key={topic.id}
                              className={`p-3 rounded-xl border transition-all ${
                                topic.completed 
                                  ? 'bg-slate-950/40 border-slate-800/60' 
                                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                
                                {/* Checkbox & Title */}
                                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                  <button
                                    onClick={() => toggleTopicCompletion(phase.id, mod.id, topic.id)}
                                    className="mt-0.5 text-slate-500 hover:text-sky-400 transition-colors cursor-pointer shrink-0"
                                  >
                                    {topic.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-600 hover:text-sky-400" />
                                    )}
                                  </button>

                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className={`text-xs font-semibold ${topic.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                        {topic.name}
                                      </span>
                                      {topic.page && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-300 font-mono font-bold">
                                          {topic.page}
                                        </span>
                                      )}
                                    </div>
                                    {topic.notes && (
                                      <p className="text-[11px] text-slate-400 mt-1 italic">
                                        Note: {topic.notes}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Estimated Time vs Actual Logged Time */}
                                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                                  <div className="flex items-center gap-1 text-[11px] text-slate-400 bg-slate-950 px-2 py-1 rounded-md border border-slate-800/80">
                                    <Clock className="w-3 h-3 text-slate-500" />
                                    <span>Est: {topic.estTime}</span>
                                  </div>

                                  {/* Log Actual Time input */}
                                  <div className="flex items-center gap-1 text-[11px] text-slate-300 bg-slate-950 px-2 py-1 rounded-md border border-slate-800/80">
                                    <span className="text-slate-500">Logged:</span>
                                    <input
                                      type="number"
                                      step="0.5"
                                      min="0"
                                      value={topic.loggedHours || ''}
                                      placeholder="0"
                                      onChange={(e) => logTopicHours(phase.id, mod.id, topic.id, e.target.value)}
                                      className="w-10 bg-transparent text-center text-sky-400 font-bold focus:outline-none focus:underline"
                                    />
                                    <span className="text-slate-500">hrs</span>
                                  </div>

                                  {/* Notes toggle button */}
                                  <button
                                    onClick={() => setEditingNotesTopicId(isEditingNotes ? null : topic.id)}
                                    className="p-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                                    title="Add topic notes"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                              </div>

                              {/* Topic Notes Input Drawer */}
                              {isEditingNotes && (
                                <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                                  <input
                                    type="text"
                                    value={topic.notes || ''}
                                    onChange={(e) => updateTopicNotes(phase.id, mod.id, topic.id, e.target.value)}
                                    placeholder="Add personal takeaway, tricky edge case, or LeetCode question URL..."
                                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500"
                                  />
                                </div>
                              )}

                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
