import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Headphones, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  Flame, 
  Award,
  Footprints,
  Clock,
  Filter
} from 'lucide-react';

export default function PodcastTracker() {
  const { 
    podcasts, 
    togglePodcastListened, 
    updatePodcastNotes,
    currentActivePodcast 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingNotesWeek, setEditingNotesWeek] = useState(null);

  const categories = ['All', 'Mindset & Discipline', 'Tech & AI', 'Career & Product Companies', 'Data Science & ML', 'Communication & Confidence', 'Life, Money & Long Term Vision'];

  const total = podcasts.length;
  const completed = podcasts.filter(p => p.listened).length;
  const progressPercent = Math.round((completed / total) * 100);

  const filteredPodcasts = selectedCategory === 'All'
    ? podcasts
    : podcasts.filter(p => p.category === selectedCategory);

  const allDone = completed === total;

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Overview & Progress */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/80 p-4 sm:p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                50-Week Walking & Learning Audio Curriculum
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
                6:45 PM – 7:20 PM Campus Walk
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              1 high-impact podcast per week for 50 weeks. Decompress your eyes, walk the campus lawn, and absorb wisdom from world-class builders, engineers, and thinkers. Never skip ahead.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80 shrink-0">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">50-Week Progress</div>
              <div className="text-xl font-extrabold text-white">
                {completed} <span className="text-xs font-normal text-slate-500">/ 50 weeks</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
              <span className="text-xs font-black text-amber-400">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2.5 mt-4 overflow-hidden border border-slate-800/60">
          <div 
            className="bg-gradient-to-r from-amber-500 via-sky-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Completion Banner (when all 50 done) */}
      {allDone && (
        <div className="bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 border-2 border-amber-400/50 rounded-2xl p-5 text-center shadow-lg shadow-amber-500/10 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 text-amber-300 font-extrabold text-base sm:text-lg">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
            <span>"You've completed 50 weeks of learning while walking. Shri Prajith, your hill farm school needs a man who never stops learning."</span>
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          </div>
          <p className="text-xs text-slate-300 mt-2">
            50 weeks of relentless self-education. You walk with clarity, speak with confidence, and lead with vision.
          </p>
        </div>
      )}

      {/* Current Active Week Card */}
      {currentActivePodcast && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 shadow-md">
          <div className="flex items-center gap-2 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            <Footprints className="w-4 h-4" />
            <span>Current Active Walk (Week {currentActivePodcast.week})</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
            <div>
              <h3 className="text-base font-bold text-white">
                {currentActivePodcast.title}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {currentActivePodcast.show} • <span className="text-amber-400/90 font-medium">{currentActivePodcast.category}</span>
              </p>
            </div>
            <button
              onClick={() => togglePodcastListened(currentActivePodcast.week)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-colors cursor-pointer shrink-0"
            >
              Mark Week {currentActivePodcast.week} Listened
            </button>
          </div>
        </div>
      )}

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Podcast List */}
      <div className="space-y-2.5">
        {filteredPodcasts.map(podcast => {
          const isCurrent = currentActivePodcast?.week === podcast.week;
          const isEditingNotes = editingNotesWeek === podcast.week;

          return (
            <div
              key={podcast.week}
              className={`p-3.5 rounded-xl border transition-all ${
                podcast.listened
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                  : isCurrent
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Left: Checkbox & Info */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <button
                    onClick={() => togglePodcastListened(podcast.week)}
                    className="mt-0.5 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
                  >
                    {podcast.listened ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 hover:text-amber-400" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-400">
                        Week {podcast.week}
                      </span>
                      <span className={`text-xs sm:text-sm font-semibold ${podcast.listened ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {podcast.title}
                      </span>
                      {isCurrent && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
                          ACTIVE WALK
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {podcast.show} • <span className="text-slate-500">{podcast.category}</span>
                    </p>
                    {podcast.notes && (
                      <p className="text-xs text-amber-200/90 mt-1 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                        Takeaway: {podcast.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Notes button */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => setEditingNotesWeek(isEditingNotes ? null : podcast.week)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                    title="Write one key takeaway"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{podcast.notes ? 'Edit Note' : 'Add Takeaway'}</span>
                  </button>
                </div>

              </div>

              {/* Notes Drawer */}
              {isEditingNotes && (
                <div className="mt-3 pt-2.5 border-t border-slate-800">
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    What is one thing you learned or will apply from this episode?
                  </label>
                  <input
                    type="text"
                    value={podcast.notes || ''}
                    onChange={(e) => updatePodcastNotes(podcast.week, e.target.value)}
                    placeholder="Write one powerful takeaway while walking..."
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500"
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
