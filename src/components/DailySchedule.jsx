import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TAG_COLORS } from '../data/scheduleTemplates';
import DailyJournal from './DailyJournal';
import GithubHeatmap from './GithubHeatmap';
import { LEETCODE_CURATED_PROBLEMS, DIFFICULTY_BADGES } from '../data/leetcodeCuratedData';
import { 
  CheckSquare, 
  Square, 
  Flame, 
  Clock, 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  PhoneOff, 
  Utensils, 
  Heart, 
  Gamepad2, 
  ExternalLink, 
  Footprints, 
  Headphones, 
  Lightbulb, 
  Code2, 
  Wifi, 
  BarChart3, 
  CheckCircle2, 
  Circle, 
  Server,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export default function DailySchedule() {
  const { 
    selectedDate, 
    currentSchedule, 
    toggleTaskCompletion, 
    updateTaskNotes, 
    isHolidayToday, 
    getAutoTopicForType, 
    currentActivePodcast, 
    togglePodcastListened, 
    getWeeklyStats,
    dsaTopics,
    solvedLeetCodeProblems,
    toggleLeetCodeSolved,
    currentNutrition,
    toggleMealComplete,
    dailyQuote,
    books,
    activeBookId,
    getTaskStreak
  } = useApp();

  const [expandedNotes, setExpandedNotes] = useState({});

  const toggleNotes = (id) => {
    setExpandedNotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 10-Minute WhatsApp Timer state (for 5:30 PM slot)
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes = 600s
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setTimerFinished(true);
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(600);
    setTimerFinished(false);
  };

  // Check completion stats
  const totalTasks = currentSchedule.length;
  const completedTasks = currentSchedule.filter(t => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const mustTasks = currentSchedule.filter(t => t.tag === 'MUST');
  const allMustDone = mustTasks.length > 0 && mustTasks.every(t => t.completed);

  const weeklyStats = getWeeklyStats();

  return (
    <div className="space-y-6">
      
      {/* Schedule Header & Stats */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/80 p-4 sm:p-5 shadow-xl shadow-black/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                Daily Master Schedule
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {selectedDate}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Hostel calibrated timetable: 6:00 AM Gym, 7:30 AM DSA, College, 4:40 PM ServiceNow, 6:00 PM Data Science, 6:45 PM Walk+Podcast, 9:20 PM Parents Call, 9:30 PM Deep Work.
            </p>
          </div>

          {/* Progress pill */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-400">Daily Completion</div>
              <div className="text-base font-bold text-white">
                {completedTasks} / {totalTasks} <span className="text-xs font-medium text-sky-400">({progressPercent}%)</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
              <span className="text-xs font-bold text-sky-400">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2 mt-4 overflow-hidden border border-slate-800/60">
          <div 
            className="bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Celebration Banner when all MUST tasks are done */}
      {allMustDone && (
        <div className="bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-emerald-500/20 border-2 border-sky-400/50 rounded-2xl p-4 text-center shadow-lg shadow-sky-500/10 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 text-sky-300 font-extrabold text-sm sm:text-base">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
            <span>All MUSTs done. Shri Prajith, you're building the life you dreamed of.</span>
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Your hill farm, your parents' house, and your 12LPA offer letter are getting closer every single day.
          </p>
        </div>
      )}

      {/* GitHub 52-Week Contribution Streak Heatmap */}
      <GithubHeatmap />

      {/* Schedule Items List */}
      <div className="space-y-2.5">
        {currentSchedule.map((task) => {
          const tagStyle = TAG_COLORS[task.tag] || TAG_COLORS.REST;
          const isExpanded = expandedNotes[task.id];

          // Auto-injected topic for study tasks (DSA, Data Science, ServiceNow)
          const autoTopic = task.studyType ? getAutoTopicForType(task.studyType) : null;

          return (
            <div 
              key={task.id}
              className={`rounded-xl border transition-all duration-200 ${
                task.completed 
                  ? 'bg-slate-900/50 border-slate-800/60 opacity-80' 
                  : 'bg-[#0f172a] border-slate-800/90 hover:border-slate-700 shadow-md shadow-black/10'
              }`}
            >
              <div className="p-3.5 sm:p-4 flex items-start gap-3">
                
                {/* Complete Checkbox */}
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mt-0.5 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer shrink-0"
                >
                  {task.completed ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600 hover:text-sky-400" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Time */}
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {task.time}
                    </span>

                    {/* Tag Badge */}
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border} uppercase tracking-wider`}>
                      {task.tag}
                    </span>

                    {/* Streak Counter */}
                    {(() => {
                      const streakVal = getTaskStreak ? getTaskStreak(task) : (task.streak || 0);
                      if (streakVal <= 0) return null;
                      return (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400/90 bg-amber-500/10 px-1.5 py-0.5 rounded-md border border-amber-500/20">
                          <Flame className="w-3 h-3 text-amber-400" />
                          <span>{streakVal}d streak</span>
                        </span>
                      );
                    })()}

                    {/* Special Labels */}
                    {task.title.includes('Deep work block') && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded-md border border-rose-500/20">
                        <PhoneOff className="w-3 h-3 text-rose-400" />
                        <span>Zero Phone Deep Work</span>
                      </span>
                    )}

                    {task.title.includes('Parents call') && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-300 bg-sky-500/10 px-1.5 py-0.5 rounded-md border border-sky-500/20">
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                        <span>Family Priority</span>
                      </span>
                    )}

                    {task.title.includes('BGMI') && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded-md border border-purple-500/20">
                        <Gamepad2 className="w-3 h-3 text-purple-400" />
                        <span>Rest & Game</span>
                      </span>
                    )}

                    {task.title.includes('ServiceNow study at college') && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-teal-300 bg-teal-500/10 px-1.5 py-0.5 rounded-md border border-teal-500/20">
                        <Wifi className="w-3 h-3 text-teal-400" />
                        <span>Use College Wifi</span>
                      </span>
                    )}
                  </div>

                  {/* Task Title */}
                  <p className={`text-sm font-semibold mt-1 ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                    {task.title}
                  </p>

                  {/* Auto-topic injection banner */}
                  {autoTopic && (
                    <div className="mt-2 p-2.5 rounded-lg bg-slate-950/80 border border-sky-500/30 text-xs flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-400">Today's topic: </span>
                        <span className="font-bold text-sky-300">{autoTopic}</span>
                      </div>
                    </div>
                  )}

                  {/* Meal Block: Breakfast, Lunch, Dinner details from diet plan */}
                  {task.isMealBlock && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-950/90 border border-emerald-500/30">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-start gap-2.5">
                          <Utensils className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                              Diet Plan Fuel: {task.mealType === 'breakfast' ? 'Power Breakfast' : (task.mealType === 'lunch' ? 'Protein Peak Lunch' : 'Dinner Recovery')}
                            </span>
                            <p className="text-xs font-semibold text-slate-200 mt-0.5">
                              {task.mealType === 'breakfast' && 'Oats or idli/dosa + banana + groundnuts (~18g protein, 480 kcal)'}
                              {task.mealType === 'lunch' && 'Soya chunks curry 50g + chapati/rice + dal (~32g protein, 680 kcal)'}
                              {task.mealType === 'dinner' && 'Rajma / chole / paneer / tofu + chapati + salad (~21g protein, 520 kcal)'}
                            </p>
                          </div>
                        </div>

                        {/* Quick meal toggle */}
                        {(() => {
                          const mealMap = { breakfast: 'meal-1', lunch: 'meal-3', dinner: 'meal-5' };
                          const mId = mealMap[task.mealType];
                          const mealObj = currentNutrition?.meals?.find(m => m.id === mId);
                          const isMealDone = mealObj?.completed;

                          return (
                            <button
                              onClick={() => mId && toggleMealComplete(mId)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                                isMealDone 
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                                  : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-sm'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{isMealDone ? '✓ Logged & Eaten' : 'Log What You Ate'}</span>
                            </button>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* College Block: Motivational Quote Banner */}
                  {task.isCollegeBlock && task.showMotivationalQuote && (
                    <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-r from-indigo-950/60 to-slate-950/80 border border-indigo-500/30 text-xs">
                      <div className="flex items-start gap-2.5">
                        <GraduationCap className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-slate-200 italic font-medium">"{dailyQuote.quote}"</p>
                          <p className="text-indigo-400/90 text-[11px] font-semibold mt-1">— {dailyQuote.author}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Walk Block & 9:20 PM Parents Call Notice */}
                  {task.hasParentsCallNotice && (
                    <div className="mt-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 shrink-0" />
                      <span className="font-semibold">Parents Call at 9:20 PM (MUST — Non-negotiable check-in with Amma & Appa)</span>
                    </div>
                  )}

                  {/* DSA Block: Striver's Topic + Curated LeetCode Problem Practice List */}
                  {task.isDsaBlock && (
                    <div className="mt-3 space-y-3 p-3.5 rounded-xl bg-slate-950/90 border border-emerald-500/30">
                      
                      {/* Topic Header & Striver Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-800">
                        <div>
                          <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                            Current Striver Topic
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                            {(() => {
                              const currTopic = dsaTopics.find(t => !t.completed) || dsaTopics[0];
                              return `Topic ${currTopic.topicNumber}: ${currTopic.name}`;
                            })()}
                          </div>
                        </div>

                        <a
                          href="https://takeuforward.org"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          <span>Open Striver's</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                        </a>
                      </div>

                      {/* Curated LeetCode Practice List */}
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            Curated LeetCode Practice Problems
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {(() => {
                              const currTopic = dsaTopics.find(t => !t.completed) || dsaTopics[0];
                              const problems = LEETCODE_CURATED_PROBLEMS[currTopic.topicNumber] || [];
                              const solvedCount = problems.filter(p => solvedLeetCodeProblems[p.id]).length;
                              return `${solvedCount} / ${problems.length} Solved`;
                            })()}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {(() => {
                            const currTopic = dsaTopics.find(t => !t.completed) || dsaTopics[0];
                            const problems = LEETCODE_CURATED_PROBLEMS[currTopic.topicNumber] || [];

                            return problems.map(problem => {
                              const isSolved = Boolean(solvedLeetCodeProblems[problem.id]);
                              const badge = DIFFICULTY_BADGES[problem.difficulty] || DIFFICULTY_BADGES.Medium;

                              return (
                                <div
                                  key={problem.id}
                                  className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                                    isSolved 
                                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300' 
                                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <button
                                      type="button"
                                      onClick={() => toggleLeetCodeSolved(problem.id)}
                                      className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                                      title={isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
                                    >
                                      {isSolved ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                      ) : (
                                        <Circle className="w-4 h-4 text-slate-600 hover:text-emerald-400" />
                                      )}
                                    </button>

                                    <a
                                      href={problem.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={`text-xs font-semibold hover:text-sky-300 transition-colors flex items-center gap-1 truncate ${
                                        isSolved ? 'line-through text-slate-500' : ''
                                      }`}
                                    >
                                      <span>{problem.name}</span>
                                      <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                                    </a>
                                  </div>

                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${badge.bg} ${badge.text} ${badge.border}`}>
                                    {problem.difficulty}
                                  </span>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Book Reading & Reflection Block */}
                  {task.isBookJournalBlock && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-950/90 border border-indigo-500/30 text-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                        <div>
                          <span className="font-bold text-white">Japanese Hiragana & Katakana for Beginners</span>
                          <p className="text-[11px] text-slate-400">Timothy G. Stout • Log today's pages in Books tab</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ServiceNow Block: Side by Side "Now Learning" and "Developer PDI" buttons */}
                  {task.studyType === 'servicenow' && (
                    <div className="flex items-center gap-2 mt-2.5">
                      <a
                        href="https://nowlearning.servicenow.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-sm transition-all"
                      >
                        <Server className="w-3.5 h-3.5" />
                        <span>Now Learning</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                      </a>

                      <a
                        href="https://developer.servicenow.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-sm transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Developer PDI</span>
                      </a>
                    </div>
                  )}

                  {/* Walk Block: Show this week's podcast title and show name */}
                  {task.isWalkBlock && currentActivePodcast && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-950/90 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <Headphones className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                            This Week's Podcast (Week {currentActivePodcast.week})
                          </span>
                          <p className="text-xs font-bold text-slate-100 mt-0.5">
                            {currentActivePodcast.title}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {currentActivePodcast.show} • <span className="text-slate-500">{currentActivePodcast.category}</span>
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => togglePodcastListened(currentActivePodcast.week)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                          currentActivePodcast.listened
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                        }`}
                      >
                        {currentActivePodcast.listened ? '✓ Listened' : 'Mark as Listened'}
                      </button>
                    </div>
                  )}

                  {/* Sunday Weekly Review Stats Card */}
                  {task.isWeeklyReview && (
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-950 border border-sky-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                        <BarChart3 className="w-4 h-4" />
                        <span>Sunday Weekly Audit Metrics</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-center">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400">Tasks Done</div>
                          <div className="text-sm font-bold text-white">{weeklyStats.completedTasksCount}</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400">DSA Topics</div>
                          <div className="text-sm font-bold text-emerald-400">{weeklyStats.dsaDone}/18</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400">DS Topics</div>
                          <div className="text-sm font-bold text-teal-400">{weeklyStats.dsDone}</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400">Gym Streak</div>
                          <div className="text-sm font-bold text-amber-400">{weeklyStats.gymDays}d</div>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <div className="text-[10px] text-slate-400">Journal Entries</div>
                          <div className="text-sm font-bold text-sky-400">{weeklyStats.journalCount}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Early dinner reminder: "Go now — food runs out fast." */}
                  {task.reminder && (
                    <p className="text-xs text-amber-400 font-semibold mt-1.5 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>{task.reminder}</span>
                    </p>
                  )}

                  {/* Dynamic dinner mark button */}
                  {task.isDynamic && !task.completed && (
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium hover:bg-amber-500/25 transition-colors cursor-pointer"
                    >
                      <Utensils className="w-3.5 h-3.5 text-amber-400" />
                      <span>Finished Dinner? Mark Done</span>
                    </button>
                  )}

                  {/* 10-Minute WhatsApp Timer Widget (5:30 PM slot) */}
                  {task.hasTimer && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800/90 max-w-md">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-semibold text-slate-300">WhatsApp 10-Min Countdown (College Notices Only)</span>
                        </div>
                        <span className={`text-sm font-mono font-bold ${timerSeconds <= 60 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                          {formatTimer(timerSeconds)}
                        </span>
                      </div>

                      {timerFinished && (
                        <p className="text-[11px] text-rose-400 font-semibold mt-1">
                          ⏰ 10 minutes up! Put phone down and head for bath + freshen up.
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            isTimerRunning 
                              ? 'bg-amber-500 text-slate-950' 
                              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                          }`}
                        >
                          {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          <span>{isTimerRunning ? 'Pause' : 'Start 10m'}</span>
                        </button>

                        <button
                          onClick={resetTimer}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Notes snippet or toggle */}
                  {task.notes && (
                    <p className="text-xs text-slate-400 mt-1">
                      {task.notes}
                    </p>
                  )}

                  {/* Expandable custom note editor */}
                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-slate-800">
                      <textarea
                        value={task.notes || ''}
                        onChange={(e) => updateTaskNotes(task.id, e.target.value)}
                        placeholder="Add quick notes or reflection for this task..."
                        className="w-full p-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 resize-none h-16"
                      ></textarea>
                    </div>
                  )}
                </div>

                {/* Notes toggle button */}
                <button
                  onClick={() => toggleNotes(task.id)}
                  className="p-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  title="Toggle notes"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded Section 5: Daily Reflection Journal at bottom of schedule */}
      <DailyJournal />

    </div>
  );
}
