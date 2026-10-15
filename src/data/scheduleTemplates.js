// Fixed Schedule Timings for Shri Prajith S
// Color tags: MUST (Electric Blue), DSA (Emerald), CERT (Teal), GAME (Purple), REST (Amber), COLLEGE (Indigo)

export const TAG_COLORS = {
  MUST: {
    bg: 'bg-sky-500/15',
    text: 'text-sky-400',
    border: 'border-sky-500/30',
    badge: 'bg-sky-500 text-slate-950',
    glow: 'shadow-sky-500/10'
  },
  DSA: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    badge: 'bg-emerald-500 text-slate-950',
    glow: 'shadow-emerald-500/10'
  },
  CERT: {
    bg: 'bg-teal-500/15',
    text: 'text-teal-400',
    border: 'border-teal-500/30',
    badge: 'bg-teal-500 text-slate-950',
    glow: 'shadow-teal-500/10'
  },
  COLLEGE: {
    bg: 'bg-indigo-500/15',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
    badge: 'bg-indigo-500 text-slate-950',
    glow: 'shadow-indigo-500/10'
  },
  GAME: {
    bg: 'bg-purple-500/15',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    badge: 'bg-purple-500 text-slate-950',
    glow: 'shadow-purple-500/10'
  },
  REST: {
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    badge: 'bg-amber-500 text-slate-950',
    glow: 'shadow-amber-500/10'
  }
};

export function getScheduleForDay(dayIndex, isHoliday = false) {
  // dayIndex: 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday

  // Sunday (0)
  if (dayIndex === 0) {
    return [
      { id: 'sun-1', time: '6:30 AM', title: 'Wake up', tag: 'REST', notes: 'Rise calmly, drink water', completed: false, streak: 0 },
      { id: 'sun-2', time: '6:30 AM – 7:00 AM', title: 'Light gym / stretch', tag: 'MUST', notes: 'Joint mobility, core stability, gentle recovery', completed: false, streak: 0 },
      { id: 'sun-3', time: '7:00 AM – 8:00 AM', title: 'Harry Potter + Coffee', tag: 'MUST', notes: 'Deep immersion in wizarding world with morning coffee', completed: false, streak: 0 },
      { id: 'sun-4', time: '8:00 AM – 9:00 AM', title: 'Hostel Sunday Breakfast', tag: 'REST', mealType: 'breakfast', isMealBlock: true, notes: 'Protein meal + groundnuts', completed: false, streak: 0 },
      { id: 'sun-5', time: '9:00 AM – 9:30 AM', title: 'Weekly review + plan', tag: 'MUST', isWeeklyReview: true, notes: 'Audit weekly stats: tasks completed, topics covered, gym days, journal entries, DS topics learned', completed: false, streak: 0 },
      { id: 'sun-6', time: '10:00 AM – 12:00 PM', title: 'BGMI Gaming Session (2 hours)', tag: 'GAME', notes: 'Unwind with friends and squad matches', completed: false, streak: 0 },
      { id: 'sun-7', time: '12:30 PM – 1:30 PM', title: 'Sunday Lunch', tag: 'REST', mealType: 'lunch', isMealBlock: true, notes: 'High protein hostel lunch', completed: false, streak: 0 },
      { id: 'sun-8', time: '3:00 PM – 4:00 PM', title: 'Light DS or ServiceNow revision', tag: 'CERT', studyType: 'datascience', notes: 'Flashcard revision and notes scan', completed: false, streak: 0 },
      { id: 'sun-9', time: '6:45 PM – 7:20 PM', title: 'Walk + podcast', tag: 'REST', isWalkBlock: true, notes: 'Listen to current week podcast while walking on campus', completed: false, streak: 0 },
      { id: 'sun-10', time: '7:40 PM', title: 'Dinner', tag: 'REST', mealType: 'dinner', isMealBlock: true, notes: 'Dinner meal', completed: false, streak: 0, isDynamic: true },
      { id: 'sun-11', time: '9:20 PM', title: 'Parents call (MUST, 10 min)', tag: 'MUST', notes: 'Talk to Amma & Appa, check on family', completed: false, streak: 0 },
      { id: 'sun-12', time: '9:30 PM – 10:30 PM', title: 'BGMI (1 hr)', tag: 'GAME', notes: 'Sunday night gaming after parents call', completed: false, streak: 0 },
      { id: 'sun-13', time: '11:00 PM', title: 'Sleep', tag: 'REST', notes: 'Sleep ready for Monday 5:30 AM gym', completed: false, streak: 0 }
    ];
  }

  // Saturday (6)
  if (dayIndex === 6) {
    return [
      { id: 'sat-1', time: '5:30 AM', title: 'Wake up', tag: 'REST', notes: 'Hydrate and prep gym gear', completed: false, streak: 0 },
      { id: 'sat-2', time: '6:00 AM – 7:00 AM', title: 'Gym (MUST)', tag: 'MUST', notes: 'Saturday Legs & Core Harder Split', completed: false, streak: 0 },
      { id: 'sat-3', time: '7:00 AM – 7:45 AM', title: 'Harry Potter + Coffee (MUST)', tag: 'MUST', notes: 'Quiet morning reading session', completed: false, streak: 0 },
      { id: 'sat-4', time: '7:45 AM – 8:00 AM', title: 'Breakfast Fuel', tag: 'REST', mealType: 'breakfast', isMealBlock: true, notes: 'Oats/idli + banana + groundnuts (~18g protein)', completed: false, streak: 0 },
      { id: 'sat-5', time: '8:00 AM – 10:00 AM', title: 'ServiceNow deep session (2 hours)', tag: 'CERT', studyType: 'servicenow', notes: 'Hands-on Business rules, script includes, flow designer practice', completed: false, streak: 0 },
      { id: 'sat-6', time: '12:30 PM – 1:30 PM', title: 'Lunch', tag: 'REST', mealType: 'lunch', isMealBlock: true, notes: 'Soya chunks curry + rice/dal', completed: false, streak: 0 },
      { id: 'sat-7', time: '2:00 PM – 3:30 PM', title: 'Project / resume work (1.5 hrs)', tag: 'DSA', studyType: 'datascience', notes: 'Full stack project or ATS resume optimization', completed: false, streak: 0 },
      { id: 'sat-8', time: '6:00 PM – 6:45 PM', title: 'Data Science study', tag: 'CERT', studyType: 'datascience', notes: 'Machine learning & Python notebook study', completed: false, streak: 0 },
      { id: 'sat-9', time: '6:45 PM – 7:20 PM', title: 'Light walk + podcast', tag: 'REST', isWalkBlock: true, notes: 'Campus stroll with this week’s podcast. No phone notifications.', completed: false, streak: 0 },
      { id: 'sat-10', time: '7:40 PM', title: 'Dinner', tag: 'REST', mealType: 'dinner', isMealBlock: true, notes: 'Dinner with hostel friends', completed: false, streak: 0, isDynamic: true },
      { id: 'sat-11', time: '9:20 PM', title: 'Parents call (MUST, 10 min)', tag: 'MUST', notes: 'Call Amma & Appa', completed: false, streak: 0 },
      { id: 'sat-12', time: '9:30 PM – 10:30 PM', title: 'BGMI (1 hr)', tag: 'GAME', notes: 'Saturday night BGMI squad matches after parents call', completed: false, streak: 0 },
      { id: 'sat-13', time: '11:00 PM', title: 'Sleep', tag: 'REST', notes: 'Restorative hostel sleep', completed: false, streak: 0 }
    ];
  }

  // Monday to Friday (1, 2, 3, 4, 5) — Exact Timings
  return [
    { 
      id: 'mf-1', 
      time: '5:30 AM', 
      title: 'Wake up', 
      tag: 'REST', 
      notes: 'Rise with purpose, drink 500ml water, change into gym clothes', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-2', 
      time: '6:00 AM – 7:00 AM', 
      title: 'Gym (MUST)', 
      tag: 'MUST', 
      notes: 'Push/Pull/Legs split with disciplined focus', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-3', 
      time: '7:00 AM – 7:45 AM', 
      title: 'Harry Potter + Coffee (MUST)', 
      tag: 'MUST', 
      notes: 'Peaceful reading with hot filter coffee', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-4', 
      time: '7:45 AM – 8:15 AM', 
      title: 'Chores: bath, get ready', 
      tag: 'REST', 
      notes: 'Hostel bath, groom, get college uniform & backpack packed', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-5', 
      time: '8:15 AM – 8:45 AM', 
      title: 'Breakfast — show today\'s breakfast from diet plan', 
      tag: 'REST', 
      mealType: 'breakfast', 
      isMealBlock: true, 
      notes: 'High protein vegetarian breakfast fuel', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-6', 
      time: '8:45 AM – 9:00 AM', 
      title: 'Walk to college + this week\'s podcast playing', 
      tag: 'REST', 
      isWalkBlock: true, 
      notes: 'Campus stroll listening to this week\'s mindset / tech podcast', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-7', 
      time: '9:00 AM – 12:30 PM', 
      title: 'College — no tasks assigned, show a motivational quote instead', 
      tag: 'COLLEGE', 
      isCollegeBlock: true, 
      showMotivationalQuote: true, 
      notes: 'Morning theory & lab lectures (VSB AIML Dept)', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-8', 
      time: '12:30 PM – 1:20 PM', 
      title: 'Lunch — show today\'s lunch from diet plan, log what you ate', 
      tag: 'REST', 
      mealType: 'lunch', 
      isMealBlock: true, 
      notes: 'Soya chunks curry + chapati/rice + dal (~32g protein)', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-9', 
      time: '1:20 PM – 4:40 PM', 
      title: 'College — no tasks assigned', 
      tag: 'COLLEGE', 
      isCollegeBlock: true, 
      notes: 'Afternoon academic sessions, practicals & campus projects', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-10', 
      time: '4:40 PM – 5:15 PM', 
      title: 'Travel back + freshen up + WhatsApp 10-min countdown timer', 
      tag: 'REST', 
      hasTimer: true, 
      notes: 'College notices check only. Strictly 10 minutes.', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-11', 
      time: '5:15 PM – 6:15 PM', 
      title: 'ServiceNow study 1 hr', 
      tag: 'CERT', 
      studyType: 'servicenow', 
      notes: 'ITSM, tables, Client Scripts, Business Rules & CSA Prep', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-12', 
      time: '6:30 PM – 7:30 PM', 
      title: 'Data Science study 1 hr', 
      tag: 'CERT', 
      studyType: 'datascience', 
      notes: 'Python, statistics, machine learning and real datasets', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-13', 
      time: '7:30 PM – 8:15 PM', 
      title: 'Dinner — show today\'s dinner from diet plan, log what you ate', 
      tag: 'REST', 
      mealType: 'dinner', 
      isMealBlock: true, 
      notes: 'Rajma / chole / paneer / tofu + chapati + salad (~21g protein)', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-14', 
      time: '8:15 PM – 9:00 PM', 
      title: 'Light walk + this week\'s podcast + parents call at 9:20 PM', 
      tag: 'MUST', 
      isWalkBlock: true, 
      hasParentsCallNotice: true, 
      notes: 'Evening fresh air walk, podcast wrap-up & 9:20 PM call to Amma & Appa', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-15', 
      time: '9:00 PM – 10:30 PM', 
      title: 'DSA block: Striver\'s + LeetCode 90 min, no phone', 
      tag: 'DSA', 
      studyType: 'dsa', 
      isDsaBlock: true, 
      isStriverLeetCodeBlock: true, 
      notes: 'Deep problem solving: Striver A2Z topic & practice LeetCode set', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-16', 
      time: '10:30 PM – 11:00 PM', 
      title: 'Book reading + Journal', 
      tag: 'REST', 
      isBookJournalBlock: true, 
      notes: 'Read Japanese / non-fiction & write daily reflection', 
      completed: false, 
      streak: 0 
    },
    { 
      id: 'mf-17', 
      time: '11:00 PM', 
      title: 'Sleep', 
      tag: 'REST', 
      notes: 'Lights out for 6.5 hours of solid restorative sleep', 
      completed: false, 
      streak: 0 
    }
  ];
}
