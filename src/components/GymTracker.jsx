import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Dumbbell, 
  Flame, 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  Apple, 
  Droplet, 
  Home, 
  Sparkles, 
  TrendingUp, 
  CheckSquare, 
  Square,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

export default function GymTracker() {
  const { 
    workoutPlan, 
    currentWorkoutDay, 
    workoutLogs, 
    workoutMode, 
    setWorkoutMode,
    currentDayWorkoutState,
    toggleExerciseComplete,
    updateExerciseStats,
    isGymSkippedToday,
    currentNutrition,
    toggleMealComplete,
    setWaterGlasses,
    currentProteinLogged,
    nutritionTargets,
    selectedDate
  } = useApp();

  const [activeDayTab, setActiveDayTab] = useState(currentWorkoutDay.dayNumber);

  // Active workout day being viewed
  const displayWorkoutDay = workoutPlan.find(w => w.dayNumber === activeDayTab) || currentWorkoutDay;
  const exercisesToDisplay = workoutMode === 'hostelGym' 
    ? displayWorkoutDay.gymExercises 
    : displayWorkoutDay.homeExercises;

  // Weekly consistency data for Recharts
  const weeklyData = [
    { day: 'Mon', completed: 1, label: 'Push' },
    { day: 'Tue', completed: 1, label: 'Pull' },
    { day: 'Wed', completed: 1, label: 'Legs' },
    { day: 'Thu', completed: 1, label: 'Push+' },
    { day: 'Fri', completed: 1, label: 'Pull+' },
    { day: 'Sat', completed: 1, label: 'Legs+' },
    { day: 'Sun', completed: 0, label: 'Rest' },
  ];

  const proteinProgress = Math.min(100, Math.round((currentProteinLogged / nutritionTargets.proteinGoal) * 100));

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Gym Streak & Dream Nudge */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/80 p-4 sm:p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Physical Foundation & Nutrition Engine
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                6-Day PPL + Veg Fuel
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Strong body, unbreakable coding stamina. 5:30 AM college gym split + hostel room resistance band backup.
            </p>
          </div>

          {/* Streak Counter & Mode Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
              <div>
                <div className="text-[10px] text-amber-400/80 uppercase font-bold tracking-wider">Gym Streak</div>
                <div className="text-base font-extrabold text-white leading-none">{workoutLogs.streak} Days</div>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setWorkoutMode('hostelGym')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  workoutMode === 'hostelGym'
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hostel Gym
              </button>
              <button
                onClick={() => setWorkoutMode('homeBand')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  workoutMode === 'homeBand'
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Room / Band</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skip Warning Nudge (Triggered if workout isn't marked and morning has passed) */}
      {isGymSkippedToday && (
        <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/20 border-l-4 border-rose-500 rounded-xl p-4 flex items-start gap-3 shadow-md animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-rose-300">
              "You skipped gym today. Your hill farm and tribal school need a healthy you."
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              If the college gym was locked or crowded, switch to <span className="text-sky-400 font-semibold">Room / Band Backup Mode</span> and finish 20 minutes of push-ups and bands before dinner.
            </p>
          </div>
        </div>
      )}

      {/* 6-Day Workout Tabs */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/80 p-4 sm:p-5 shadow-lg space-y-4">
        
        {/* Day selection tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {workoutPlan.map((plan) => {
            const isSelected = activeDayTab === plan.dayNumber;
            return (
              <button
                key={plan.dayNumber}
                onClick={() => setActiveDayTab(plan.dayNumber)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                  isSelected
                    ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{plan.dayName.substring(0, 3)}: {plan.type}</span>
              </button>
            );
          })}
        </div>

        {/* Workout Plan Details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              {displayWorkoutDay.title}
              <span className="text-xs font-normal text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                {workoutMode === 'hostelGym' ? 'Gym Dumbbells & Barbells' : 'Hostel Room & Bands'}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Focus: {displayWorkoutDay.focus}
            </p>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {exercisesToDisplay.length} targeted movements
          </span>
        </div>

        {/* Exercises List */}
        <div className="space-y-2.5">
          {exercisesToDisplay.map((ex, idx) => {
            return (
              <div 
                key={ex.id}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => toggleExerciseComplete(ex.id)}
                    className="text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                  >
                    {ex.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 hover:text-emerald-400" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <span className={`text-sm font-semibold ${ex.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                      {ex.name}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                      <span>{ex.sets} sets × {ex.reps} reps</span>
                      <span>•</span>
                      <span className="text-amber-400 font-medium">{ex.weight}</span>
                    </div>
                  </div>
                </div>

                {/* Weight / Reps Quick Adjuster */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-500">Weight:</span>
                    <input
                      type="text"
                      value={ex.weight}
                      onChange={(e) => updateExerciseStats(ex.id, 'weight', e.target.value)}
                      className="w-16 bg-transparent text-center text-slate-200 font-mono font-bold focus:outline-none focus:text-sky-400"
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Section: Vegetarian Diet & Water Intake Engine */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/80 p-4 sm:p-6 shadow-xl space-y-5">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Apple className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                Vegetarian High-Protein Meal Plan
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
                95g Goal / 2300 kcal
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Hostel meal timing: Soya chunks, peanut butter, roasted chana, rajma/paneer & 3L water.
            </p>
          </div>

          {/* Water Tracker */}
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
            <Droplet className="w-4 h-4 text-sky-400 fill-sky-400/30" />
            <span className="text-xs font-semibold text-slate-300">Water:</span>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setWaterGlasses(currentNutrition.waterGlasses - 1)}
                className="w-5 h-5 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-bold text-sky-400 font-mono w-8 text-center">
                {currentNutrition.waterGlasses}/8
              </span>
              <button 
                onClick={() => setWaterGlasses(currentNutrition.waterGlasses + 1)}
                className="w-5 h-5 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>
            <span className="text-[11px] text-slate-500">
              (~{(currentNutrition.waterGlasses * 0.375).toFixed(1)}L / 3L)
            </span>
          </div>
        </div>

        {/* Protein Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Daily Protein Fuel</span>
            <span className="font-bold text-emerald-400 font-mono">
              {currentProteinLogged}g / 95g target ({proteinProgress}%)
            </span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${proteinProgress}%` }}
            ></div>
          </div>
        </div>

        {/* 5 Hardcoded Vegetarian Meals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentNutrition.meals.map((meal) => (
            <div 
              key={meal.id}
              className={`p-3.5 rounded-xl border transition-all ${
                meal.completed 
                  ? 'bg-emerald-950/20 border-emerald-500/30 opacity-90' 
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleMealComplete(meal.id)}
                  className="mt-0.5 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                >
                  {meal.completed ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600 hover:text-emerald-400" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-200">{meal.time} — {meal.title}</span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      +{meal.protein}g protein
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {meal.items}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
