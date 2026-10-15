import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Flame, CheckCircle, Info, Calendar } from 'lucide-react';

export default function GithubHeatmap() {
  const { allSchedules, dailyCompletions, selectedDate, setSelectedDate, todayStr } = useApp();
  const [hoveredDay, setHoveredDay] = useState(null);

  // Generate 52 weeks (364 days + remainder to end on Saturday of current week)
  const { weeks, monthLabels, totalContributions } = useMemo(() => {
    const today = new Date(todayStr + 'T00:00:00');
    // Find the Saturday of the current week to align columns nicely like GitHub
    const dayOfWeek = today.getDay(); // 0 = Sun, ..., 6 = Sat
    const endSaturday = new Date(today);
    endSaturday.setDate(today.getDate() + (6 - dayOfWeek));

    const totalDays = 52 * 7;
    const startDate = new Date(endSaturday);
    startDate.setDate(endSaturday.getDate() - totalDays + 1);

    const days = [];
    let countContributions = 0;

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const isFuture = d > today;

      let level = 0;
      let totalTasks = 0;
      let completedTasks = 0;
      let allMustDone = false;

      // Check stored completion record or live schedule
      const record = dailyCompletions?.[dateStr];
      const sched = allSchedules?.[dateStr];

      if (sched && sched.length > 0) {
        totalTasks = sched.length;
        completedTasks = sched.filter(t => t.completed).length;
        const musts = sched.filter(t => t.tag === 'MUST');
        allMustDone = musts.length > 0 && musts.every(t => t.completed);
      } else if (record) {
        totalTasks = record.totalTasks || 0;
        completedTasks = record.completedTasks || 0;
        allMustDone = record.allMustDone || false;
      }

      if (!isFuture && totalTasks > 0 && completedTasks > 0) {
        const pct = completedTasks / totalTasks;
        if (allMustDone) {
          level = 4; // Darkest / most intense green
        } else if (pct >= 0.7) {
          level = 3; // Medium green
        } else if (pct >= 0.5) {
          level = 2; // Light green
        } else {
          level = 1; // Faint green
        }
        countContributions += completedTasks;
      }

      days.push({
        date: dateStr,
        dayOfWeek: d.getDay(),
        month: d.getMonth(),
        year: d.getFullYear(),
        dayNum: d.getDate(),
        level,
        totalTasks,
        completedTasks,
        allMustDone,
        isFuture,
        isToday: dateStr === todayStr,
        isSelected: dateStr === selectedDate
      });
    }

    // Group into 52 weeks (columns of 7 days: Sunday = 0 to Saturday = 6)
    const weeksList = [];
    for (let i = 0; i < days.length; i += 7) {
      weeksList.push(days.slice(i, i + 7));
    }

    // Build month labels across columns
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels = [];
    let lastMonth = -1;

    weeksList.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay && firstDay.month !== lastMonth) {
        labels.push({
          month: months[firstDay.month],
          weekIndex
        });
        lastMonth = firstDay.month;
      }
    });

    return {
      weeks: weeksList,
      monthLabels: labels,
      totalContributions: countContributions
    };
  }, [allSchedules, dailyCompletions, selectedDate, todayStr]);

  // Color classes for GitHub levels
  // 0: empty (#161b22)
  // 1: <50% faint green (#0e4429)
  // 2: 50%+ light green (#006d32)
  // 3: 70%+ medium green (#26a641)
  // 4: All MUST done (#39d353)
  const getCellColor = (level, isFuture, isSelected) => {
    if (isFuture) return 'bg-[#161b22]/40 border-transparent';
    if (isSelected) return 'ring-2 ring-sky-400 z-10';

    switch (level) {
      case 4:
        return 'bg-[#39d353] border-[#39d353]/80 hover:brightness-125 shadow-sm shadow-[#39d353]/30';
      case 3:
        return 'bg-[#26a641] border-[#26a641]/80 hover:brightness-125';
      case 2:
        return 'bg-[#006d32] border-[#006d32]/80 hover:brightness-125';
      case 1:
        return 'bg-[#0e4429] border-[#0e4429]/80 hover:brightness-125';
      default:
        return 'bg-[#161b22] border-slate-800/80 hover:border-slate-700';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="bg-[#0f172a] rounded-2xl border border-slate-800/90 p-4 sm:p-5 shadow-xl shadow-black/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {totalContributions} contributions in the last year
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              Discipline Heatmap
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            GitHub-style daily task completion & MUST-task mastery tracked in Supabase.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 self-end sm:self-auto">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-[#161b22] border border-slate-800" title="0% completed" />
          <div className="w-2.5 h-2.5 rounded-sm bg-[#0e4429]" title="<50% completed" />
          <div className="w-2.5 h-2.5 rounded-sm bg-[#006d32]" title="50%+ completed" />
          <div className="w-2.5 h-2.5 rounded-sm bg-[#26a641]" title="70%+ completed" />
          <div className="w-2.5 h-2.5 rounded-sm bg-[#39d353]" title="All MUST tasks completed" />
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Grid (Horizontal Scrollable on mobile) */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="inline-block min-w-full">
          
          {/* Months header */}
          <div className="flex text-[10px] text-slate-500 font-mono mb-1.5 pl-7">
            {weeks.map((week, idx) => {
              const label = monthLabels.find(l => l.weekIndex === idx);
              return (
                <div key={idx} className="w-[13px] shrink-0 text-left">
                  {label ? label.month : ''}
                </div>
              );
            })}
          </div>

          {/* Grid with Day of Week labels on left */}
          <div className="flex gap-1">
            {/* Days labels (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6) */}
            <div className="flex flex-col justify-between text-[9px] text-slate-500 font-mono pr-2 py-0.5 select-none w-5 text-right">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* 52 Columns */}
            <div className="flex gap-[3px]">
              {weeks.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const isSelected = day.date === selectedDate;
                    const cellColor = getCellColor(day.level, day.isFuture, isSelected);

                    return (
                      <button
                        key={day.date}
                        disabled={day.isFuture}
                        onClick={() => setSelectedDate(day.date)}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-[11px] h-[11px] rounded-[2px] border transition-all cursor-pointer ${cellColor} ${
                          day.isToday ? 'outline outline-1 outline-sky-400' : ''
                        }`}
                        aria-label={`${day.date}: ${day.completedTasks} tasks`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Active / Hover Tooltip Card */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-sky-400" />
          {hoveredDay ? (
            <span>
              <strong className="text-white">{formatDate(hoveredDay.date)}:</strong>{' '}
              {hoveredDay.isFuture ? (
                <span className="text-slate-500">Upcoming day</span>
              ) : hoveredDay.completedTasks > 0 ? (
                <span>
                  <strong className="text-emerald-400">{hoveredDay.completedTasks}</strong> of {hoveredDay.totalTasks} tasks completed
                  {hoveredDay.allMustDone && (
                    <span className="ml-2 text-emerald-300 font-bold">★ All MUST tasks mastered!</span>
                  )}
                </span>
              ) : (
                <span className="text-slate-500">No tasks completed on this day</span>
              )}
            </span>
          ) : (
            <span>
              Hover over any square to view day's performance • Click to switch active schedule view
            </span>
          )}
        </div>

        <div className="text-[11px] text-slate-500 hidden sm:block">
          All MUST tasks completed = <span className="text-[#39d353] font-semibold">Bright Green</span>
        </div>
      </div>
    </div>
  );
}
