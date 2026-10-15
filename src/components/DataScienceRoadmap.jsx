import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Binary, 
  CheckCircle2, 
  Circle, 
  Lock, 
  Unlock, 
  ExternalLink, 
  Clock, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  TrendingUp,
  Sparkles,
  Database,
  BarChart3
} from 'lucide-react';

export default function DataScienceRoadmap() {
  const { 
    dsRoadmap, 
    toggleDsTopicCompletion, 
    logDsTopicHours, 
    updateDsTopicNotes,
    getDsPhaseProgress, 
    getOverallDsRoadmapProgress, 
    isDsPhaseUnlocked 
  } = useApp();

  // Active accordion phase (default to Phase 1 open)
  const [openPhaseId, setOpenPhaseId] = useState('ds-phase-1');
  const [editingNotesTopicId, setEditingNotesTopicId] = useState(null);

  const overallProgress = getOverallDsRoadmapProgress();

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Data Science & AI Overview */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/80 p-4 sm:p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Binary className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Data Science & Machine Learning Roadmap
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-semibold">
                AIML B.E. Core (2024–2028)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              From Python, pandas & stats to production scikit-learn, XGBoost, deep learning, and Kaggle deployments. Phase unlocks automatically when 70% of previous phase is mastered.
            </p>
          </div>

          {/* Overall percentage meter */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 shrink-0">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">DS Curriculum Progress</div>
              <div className="text-xl font-extrabold text-white">
                {overallProgress}% <span className="text-xs font-normal text-slate-500">mastered</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
              <span className="text-xs font-black text-teal-400">{overallProgress}%</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2.5 mt-4 overflow-hidden border border-slate-800/60">
          <div 
            className="bg-gradient-to-r from-teal-500 via-sky-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Vertical Roadmap Phases */}
      <div className="space-y-4">
        {dsRoadmap.map((phase) => {
          const unlocked = isDsPhaseUnlocked(phase);
          const phaseProgress = getDsPhaseProgress(phase.id);
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
                      : 'bg-teal-500/15 border-teal-500/30 text-teal-400'
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
                            className="bg-teal-400 h-1.5 rounded-full"
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
                      <Lock className="w-3.5 h-3.5" /> Locked (70% required)
                    </span>
                  )}
                </div>
              </div>

              {/* Phase Modules & Topics (when expanded) */}
              {isOpen && unlocked && (
                <div className="px-4 pb-5 sm:px-6 space-y-6 border-t border-slate-800/80 pt-4 animate-fadeIn">
                  {phase.modules.map((mod) => (
                    <div key={mod.id} className="space-y-3">
                      {/* Module Header & Resource link */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                        <h4 className="text-xs sm:text-sm font-bold text-teal-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                          {mod.name}
                        </h4>
                        {mod.resource && (
                          <a
                            href={mod.resourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-teal-400 transition-colors font-medium"
                          >
                            <span>Resource: {mod.resource}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      {/* Topics Cards */}
                      <div className="space-y-2">
                        {mod.topics.map((topic) => {
                          const isEditingNotes = editingNotesTopicId === topic.id;
                          const isInProgress = !topic.completed && topic.loggedHours > 0;

                          return (
                            <div 
                              key={topic.id}
                              className={`p-3 rounded-xl border transition-all ${
                                topic.completed 
                                  ? 'bg-slate-950/40 border-slate-800/60' 
                                  : isInProgress
                                  ? 'bg-teal-950/20 border-teal-500/40'
                                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                
                                {/* Checkbox & Title */}
                                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                  <button
                                    onClick={() => toggleDsTopicCompletion(phase.id, mod.id, topic.id)}
                                    className="mt-0.5 text-slate-500 hover:text-teal-400 transition-colors cursor-pointer shrink-0"
                                  >
                                    {topic.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-600 hover:text-teal-400" />
                                    )}
                                  </button>

                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className={`text-xs font-semibold ${topic.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                        {topic.name}
                                      </span>
                                      {isInProgress && (
                                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">
                                          In Progress
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
                                      onChange={(e) => logDsTopicHours(phase.id, mod.id, topic.id, e.target.value)}
                                      className="w-10 bg-transparent text-center text-teal-400 font-bold focus:outline-none focus:underline"
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
                                    onChange={(e) => updateDsTopicNotes(phase.id, mod.id, topic.id, e.target.value)}
                                    placeholder="Add key insights, Kaggle notebook link, or math formula reminder..."
                                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500"
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
