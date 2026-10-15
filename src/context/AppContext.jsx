import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { getScheduleForDay } from '../data/scheduleTemplates';
import { INITIAL_DSA_TOPICS } from '../data/dsaRoadmapData';
import { SERVICENOW_ROADMAP_PHASES } from '../data/servicenowRoadmapData';
import { DS_ROADMAP_PHASES } from '../data/dsRoadmapData';
import { PODCAST_LIST } from '../data/podcastData';
import { WORKOUT_PLAN, VEGETARIAN_MEAL_PLAN, NUTRITION_TARGETS } from '../data/gymData';
import { getDailyQuote } from '../data/quotesData';
import { getDailyPrompt } from '../data/journalPrompts';
import { auth, db, loginWithGoogle, logoutUser, isConfigValid } from '../firebase';
import { 
  syncDailyCompletionToSupabase, 
  syncBooksToSupabase, 
  syncReadingLogToSupabase, 
  deleteBookFromSupabase,
  fetchDailyCompletionsFromSupabase,
  fetchBooksFromSupabase,
  fetchReadingLogsFromSupabase
} from '../supabase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AppContext = createContext();

const STORAGE_KEYS = {
  SCHEDULES: 'prajith_schedules_v5',
  DSA_ROADMAP: 'prajith_dsa_roadmap_v4',
  SN_ROADMAP: 'prajith_sn_phases_v4',
  DS_ROADMAP: 'prajith_ds_roadmap_v4',
  PODCASTS: 'prajith_podcasts_v2',
  WORKOUTS: 'prajith_workouts_v5',
  NUTRITION: 'prajith_nutrition_v4',
  JOURNAL: 'prajith_journal_v4',
  LINKS: 'prajith_college_links_v4',
  HOLIDAYS: 'prajith_holidays_v4',
  LEETCODE_SOLVED: 'prajith_leetcode_solved_v1',
  DAILY_COMPLETIONS: 'prajith_daily_completions_v2',
  BOOKS: 'prajith_books_v2',
  READING_LOGS: 'prajith_reading_logs_v2',
  READING_LOG_DETAILS: 'prajith_reading_details_v2',
  ACTIVE_BOOK_ID: 'prajith_active_book_id_v2'
};

export function AppProvider({ children }) {
  // 1. User State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('prajith_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return {
      uid: 'prajith_vsb_2024_2028',
      displayName: 'Shri Prajith S',
      email: 'prajith.vsb.aiml@gmail.com',
      college: 'VSB Engineering College, Karur',
      degree: 'B.E. Artificial Intelligence and Machine Learning (2024–2028)',
      goal: '12LPA+ at ServiceNow / Zoho / Freshworks',
      dream: 'House for parents & Hill farm school for tribal children'
    };
  });

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          const u = {
            uid: fbUser.uid,
            displayName: fbUser.displayName || 'Shri Prajith S',
            email: fbUser.email,
            photoURL: fbUser.photoURL,
            college: 'VSB Engineering College, Karur',
            degree: 'B.E. AIML (2024–2028)'
          };
          setUser(u);
          localStorage.setItem('prajith_user', JSON.stringify(u));
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // 2. Date State
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const [dailyQuote] = useState(getDailyQuote());
  const [currentPrompt, setCurrentPrompt] = useState(getDailyPrompt());

  // 3. Holiday Detection
  const [holidays, setHolidays] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HOLIDAYS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { [todayStr]: false };
  });

  const isHolidayToday = Boolean(holidays[selectedDate]);

  const toggleHolidayForDate = (dateStr) => {
    setHolidays(prev => {
      const next = { ...prev, [dateStr]: !prev[dateStr] };
      localStorage.setItem(STORAGE_KEYS.HOLIDAYS, JSON.stringify(next));
      return next;
    });
  };

  // College Links
  const [collegeLinks, setCollegeLinks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LINKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'cl-1',
        title: 'Smart India Hackathon (SIH 2024/2025) Internal College Round',
        url: 'https://sih.gov.in',
        deadline: '2026-09-25',
        notes: 'Team registration for AI/ML problem statements. Target ServiceNow workflow idea.'
      },
      {
        id: 'cl-2',
        title: 'ServiceNow Women Code to Win & NextGen Student Registration',
        url: 'https://developer.servicenow.com',
        deadline: '2026-10-10',
        notes: 'Register with VSB college student email for free certification exam voucher'
      }
    ];
  });

  const addCollegeLink = (link) => {
    setCollegeLinks(prev => {
      const updated = [{ ...link, id: 'link_' + Date.now() }, ...prev];
      localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteCollegeLink = (id) => {
    setCollegeLinks(prev => {
      const updated = prev.filter(l => l.id !== id);
      localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(updated));
      return updated;
    });
  };

  // 4. DSA Roadmap (18 Sequential Topics — Reset to Scratch)
  const [dsaTopics, setDsaTopics] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DSA_ROADMAP);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_DSA_TOPICS;
  });

  const toggleDsaTopicDone = (topicId) => {
    setDsaTopics(prev => {
      const next = prev.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t);
      localStorage.setItem(STORAGE_KEYS.DSA_ROADMAP, JSON.stringify(next));
      return next;
    });
  };

  const logDsaTopicHours = (topicId, hours) => {
    setDsaTopics(prev => {
      const next = prev.map(t => t.id === topicId ? { ...t, loggedHours: Math.max(0, parseFloat(hours) || 0) } : t);
      localStorage.setItem(STORAGE_KEYS.DSA_ROADMAP, JSON.stringify(next));
      return next;
    });
  };

  const updateDsaTopicNotes = (topicId, notes) => {
    setDsaTopics(prev => {
      const next = prev.map(t => t.id === topicId ? { ...t, notes } : t);
      localStorage.setItem(STORAGE_KEYS.DSA_ROADMAP, JSON.stringify(next));
      return next;
    });
  };

  // 5. ServiceNow Roadmap (4 Phases with 70% Phase Lock)
  const [servicenowPhases, setServicenowPhases] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SN_ROADMAP);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SERVICENOW_ROADMAP_PHASES;
  });

  const toggleSnTopicCompletion = (phaseId, topicId) => {
    setServicenowPhases(prev => {
      const next = prev.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          topics: phase.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t)
        };
      });
      localStorage.setItem(STORAGE_KEYS.SN_ROADMAP, JSON.stringify(next));
      return next;
    });
  };

  const logSnTopicHours = (phaseId, topicId, hours) => {
    setServicenowPhases(prev => {
      const next = prev.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          topics: phase.topics.map(t => t.id === topicId ? { ...t, loggedHours: Math.max(0, parseFloat(hours) || 0) } : t)
        };
      });
      localStorage.setItem(STORAGE_KEYS.SN_ROADMAP, JSON.stringify(next));
      return next;
    });
  };

  const updateSnTopicNotes = (phaseId, topicId, notes) => {
    setServicenowPhases(prev => {
      const next = prev.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          topics: phase.topics.map(t => t.id === topicId ? { ...t, notes } : t)
        };
      });
      localStorage.setItem(STORAGE_KEYS.SN_ROADMAP, JSON.stringify(next));
      return next;
    });
  };

  const getSnPhaseProgress = (phaseId) => {
    const phase = servicenowPhases.find(p => p.id === phaseId);
    if (!phase) return 0;
    const total = phase.topics.length;
    const completed = phase.topics.filter(t => t.completed).length;
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const getOverallSnRoadmapProgress = () => {
    let total = 0;
    let completed = 0;
    servicenowPhases.forEach(phase => {
      phase.topics.forEach(t => {
        total++;
        if (t.completed) completed++;
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const isSnPhaseUnlocked = (phase) => {
    if (!phase.unlockRequirement) return true;
    const req = phase.unlockRequirement;
    const targetProgress = getSnPhaseProgress(req.phaseId);
    return targetProgress >= req.threshold;
  };

  // 6. Data Science Roadmap (7 Phases — Starts from Phase 1 Topic 1: Python basics)
  const [dsRoadmap, setDsRoadmap] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DS_ROADMAP);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DS_ROADMAP_PHASES;
  });

  const toggleDsTopicCompletion = (phaseId, moduleId, topicId) => {
    setDsRoadmap(prev => {
      const next = prev.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          modules: phase.modules.map(mod => {
            if (mod.id !== moduleId) return mod;
            return {
              ...mod,
              topics: mod.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t)
            };
          })
        };
      });
      localStorage.setItem(STORAGE_KEYS.DS_ROADMAP, JSON.stringify(next));
      return next;
    });
  };

  const logDsTopicHours = (phaseId, moduleId, topicId, hours) => {
    setDsRoadmap(prev => {
      const next = prev.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          modules: phase.modules.map(mod => {
            if (mod.id !== moduleId) return mod;
            return {
              ...mod,
              topics: mod.topics.map(t => t.id === topicId ? { ...t, loggedHours: Math.max(0, parseFloat(hours) || 0) } : t)
            };
          })
        };
      });
      localStorage.setItem(STORAGE_KEYS.DS_ROADMAP, JSON.stringify(next));
      return next;
    });
  };

  const updateDsTopicNotes = (phaseId, moduleId, topicId, notes) => {
    setDsRoadmap(prev => {
      const next = prev.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          modules: phase.modules.map(mod => {
            if (mod.id !== moduleId) return mod;
            return {
              ...mod,
              topics: mod.topics.map(t => t.id === topicId ? { ...t, notes } : t)
            };
          })
        };
      });
      localStorage.setItem(STORAGE_KEYS.DS_ROADMAP, JSON.stringify(next));
      return next;
    });
  };

  const getDsPhaseProgress = (phaseId) => {
    const phase = dsRoadmap.find(p => p.id === phaseId);
    if (!phase) return 0;
    let total = 0;
    let completed = 0;
    phase.modules.forEach(m => {
      m.topics.forEach(t => {
        total++;
        if (t.completed) completed++;
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const getOverallDsRoadmapProgress = () => {
    let total = 0;
    let completed = 0;
    dsRoadmap.forEach(phase => {
      phase.modules.forEach(m => {
        m.topics.forEach(t => {
          total++;
          if (t.completed) completed++;
        });
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const isDsPhaseUnlocked = (phase) => {
    if (!phase.unlockRequirement) return true;
    const req = phase.unlockRequirement;
    const targetProgress = getDsPhaseProgress(req.phaseId);
    return targetProgress >= req.threshold;
  };

  // 7. Podcasts State (50 Weeks)
  const [podcasts, setPodcasts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PODCASTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return PODCAST_LIST;
  });

  const togglePodcastListened = (week) => {
    setPodcasts(prev => {
      const next = prev.map(p => p.week === week ? { ...p, listened: !p.listened } : p);
      localStorage.setItem(STORAGE_KEYS.PODCASTS, JSON.stringify(next));
      return next;
    });
  };

  const updatePodcastNotes = (week, notes) => {
    setPodcasts(prev => {
      const next = prev.map(p => p.week === week ? { ...p, notes } : p);
      localStorage.setItem(STORAGE_KEYS.PODCASTS, JSON.stringify(next));
      return next;
    });
  };

  // Current active podcast is the first unlistened one (starts from Week 1)
  const currentActivePodcast = podcasts.find(p => !p.listened) || podcasts[podcasts.length - 1];

  // 8. Auto-Topic Injection Engine
  // "DSA block → pulls from DSA roadmap, always starts from Topic 1: Learn the Basics"
  // "Data Science block → pulls from DS roadmap, always starts from Phase 1 Topic 1: Python basics"
  // "ServiceNow block → pulls from ServiceNow roadmap, always starts from Topic 1: What is ITSM"
  // "Never skip ahead automatically — user must manually mark done to advance"
  // "If all topics in a roadmap are done → show 'Roadmap complete! Start your next Kaggle project.'"
  const getAutoTopicForType = (studyType) => {
    if (!studyType) return null;

    if (studyType === 'dsa') {
      const firstIncomplete = dsaTopics.find(t => !t.completed);
      if (firstIncomplete) {
        return `Topic ${firstIncomplete.topicNumber}: ${firstIncomplete.name}`;
      }
      return 'Roadmap complete! Start your next Kaggle project.';
    }

    if (studyType === 'datascience') {
      for (const p of dsRoadmap) {
        if (!isDsPhaseUnlocked(p)) continue;
        for (const m of p.modules) {
          for (const t of m.topics) {
            if (!t.completed) {
              return `Phase ${p.phaseNumber}: ${t.name}`;
            }
          }
        }
      }
      return 'Roadmap complete! Start your next Kaggle project.';
    }

    if (studyType === 'servicenow') {
      for (const p of servicenowPhases) {
        if (!isSnPhaseUnlocked(p)) continue;
        for (const t of p.topics) {
          if (!t.completed) {
            return `Topic ${t.topicNumber}: ${t.name}`;
          }
        }
      }
      return 'Roadmap complete! Start your next Kaggle project.';
    }

    return null;
  };

  // 8b. Solved LeetCode Problems State
  const [solvedLeetCodeProblems, setSolvedLeetCodeProblems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEETCODE_SOLVED);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      'lc-1-1': true // Two sum solved
    };
  });

  const toggleLeetCodeSolved = (problemId) => {
    setSolvedLeetCodeProblems(prev => {
      const next = { ...prev, [problemId]: !prev[problemId] };
      localStorage.setItem(STORAGE_KEYS.LEETCODE_SOLVED, JSON.stringify(next));
      return next;
    });
  };

  // 8c. Daily Completions State for GitHub Heatmap (Clean - Starts at 0)
  const [dailyCompletions, setDailyCompletions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DAILY_COMPLETIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });

  // 8d. Books Reading Tracker State (Clean - Starts at 0 pages read)
  const DEFAULT_BOOKS = [
    {
      id: 'book-1',
      title: 'Japanese Hiragana & Katakana for Beginners',
      author: 'Timothy G. Stout',
      totalPages: 226,
      pagesRead: 0,
      status: 'reading',
      startDate: todayStr,
      dateFinished: null,
      daysTaken: null
    }
  ];

  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_BOOKS;
  });

  const [activeBookId, setActiveBookIdState] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_BOOK_ID) || 'book-1';
  });

  const setActiveBookId = (id) => {
    setActiveBookIdState(id);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_BOOK_ID, id);
  };

  const [readingLogDetails, setReadingLogDetails] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.READING_LOG_DETAILS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [readingLogs, setReadingLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.READING_LOGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });

  const logPagesRead = (pages, bookId) => {
    const count = Math.max(1, parseInt(pages, 10) || 0);
    const targetBookId = bookId || activeBookId;

    const newDetail = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      date: todayStr,
      pages: count,
      bookId: targetBookId
    };

    setReadingLogDetails(prev => {
      const next = [...prev, newDetail];
      localStorage.setItem(STORAGE_KEYS.READING_LOG_DETAILS, JSON.stringify(next));
      return next;
    });

    const newDayTotal = (readingLogs[todayStr] || 0) + count;
    setReadingLogs(prev => {
      const next = { ...prev, [todayStr]: newDayTotal };
      localStorage.setItem(STORAGE_KEYS.READING_LOGS, JSON.stringify(next));
      return next;
    });
    syncReadingLogToSupabase(todayStr, newDayTotal, targetBookId);

    setBooks(prev => {
      const next = prev.map(book => {
        if (book.id !== targetBookId) return book;
        const newPages = Math.min(book.totalPages, (book.pagesRead || 0) + count);
        const isDone = newPages >= book.totalPages;
        return {
          ...book,
          pagesRead: newPages,
          status: isDone ? 'completed' : book.status,
          dateFinished: isDone ? todayStr : book.dateFinished,
          daysTaken: isDone ? Math.max(1, Math.round((new Date(todayStr) - new Date(book.startDate || todayStr)) / (1000 * 60 * 60 * 24))) : book.daysTaken
        };
      });
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(next));
      syncBooksToSupabase(next);
      return next;
    });
  };

  const addBook = ({ title, author, totalPages }) => {
    const newBook = {
      id: `book-${Date.now()}`,
      title,
      author: author || 'Unknown Author',
      totalPages: parseInt(totalPages, 10) || 100,
      pagesRead: 0,
      status: 'reading',
      startDate: todayStr,
      dateFinished: null,
      daysTaken: null
    };
    setBooks(prev => {
      const next = [newBook, ...prev];
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(next));
      syncBooksToSupabase(next);
      return next;
    });
    setActiveBookId(newBook.id);
  };

  const deleteBook = (bookId) => {
    if (!bookId) return;

    const nextBooks = books.filter(b => b.id !== bookId);
    setBooks(nextBooks);
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(nextBooks));

    if (activeBookId === bookId) {
      const nextActiveId = nextBooks.length > 0 ? nextBooks[0].id : null;
      setActiveBookId(nextActiveId);
    }

    const remainingDetails = readingLogDetails.filter(d => d.bookId !== bookId);
    setReadingLogDetails(remainingDetails);
    localStorage.setItem(STORAGE_KEYS.READING_LOG_DETAILS, JSON.stringify(remainingDetails));

    const recalculatedLogs = {};
    remainingDetails.forEach(d => {
      recalculatedLogs[d.date] = (recalculatedLogs[d.date] || 0) + (d.pages || 0);
    });
    setReadingLogs(recalculatedLogs);
    localStorage.setItem(STORAGE_KEYS.READING_LOGS, JSON.stringify(recalculatedLogs));

    deleteBookFromSupabase(bookId);
    if (nextBooks.length > 0) {
      syncBooksToSupabase(nextBooks);
    }
  };

  // 9. Daily Schedule State
  const [allSchedules, setAllSchedules] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });

  const currentDayIndex = new Date(selectedDate + 'T00:00:00').getDay();
  const currentSchedule = allSchedules[selectedDate] || getScheduleForDay(currentDayIndex, isHolidayToday);

  const saveCurrentSchedule = (newTasks) => {
    setAllSchedules(prev => {
      const next = { ...prev, [selectedDate]: newTasks };
      localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(next));
      return next;
    });

    const mustTasks = newTasks.filter(t => t.tag === 'MUST');
    const hasMustDone = mustTasks.some(t => t.completed);
    const allMustDone = mustTasks.length > 0 && mustTasks.every(t => t.completed);
    const completedCount = newTasks.filter(t => t.completed).length;
    const totalCount = newTasks.length;
    const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const compRecord = {
      date: selectedDate,
      totalTasks: totalCount,
      completedTasks: completedCount,
      allMustDone,
      hasMustDone,
      percent: pct
    };

    setDailyCompletions(prev => {
      const next = { ...prev, [selectedDate]: compRecord };
      localStorage.setItem(STORAGE_KEYS.DAILY_COMPLETIONS, JSON.stringify(next));
      return next;
    });
    syncDailyCompletionToSupabase(compRecord);
  };

  const [celebrationShown, setCelebrationShown] = useState(false);

  const toggleTaskCompletion = (taskId) => {
    const updated = currentSchedule.map(task => {
      if (task.id === taskId) {
        const nextCompleted = !task.completed;
        return { ...task, completed: nextCompleted };
      }
      return task;
    });

    saveCurrentSchedule(updated);

    const mustTasks = updated.filter(t => t.tag === 'MUST');
    const allMustDone = mustTasks.length > 0 && mustTasks.every(t => t.completed);

    if (allMustDone && !celebrationShown) {
      setCelebrationShown(true);
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const updateTaskNotes = (taskId, notes) => {
    const updated = currentSchedule.map(task => 
      task.id === taskId ? { ...task, notes } : task
    );
    saveCurrentSchedule(updated);
  };

  // 11. Gym & Nutrition State (Declared early for streak computations)
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      streak: 0,
      lastWorkoutDate: null,
      history: {}
    };
  });

  // Cloud Sync on mount to populate authentic Supabase completion data
  useEffect(() => {
    async function loadCloudData() {
      try {
        const cloudCompletions = await fetchDailyCompletionsFromSupabase();
        if (cloudCompletions && Array.isArray(cloudCompletions) && cloudCompletions.length > 0) {
          setDailyCompletions(prev => {
            const merged = { ...prev };
            cloudCompletions.forEach(c => {
              if (c.date) {
                merged[c.date] = {
                  date: c.date,
                  totalTasks: c.total_tasks || 0,
                  completedTasks: c.completed_tasks || 0,
                  allMustDone: Boolean(c.all_must_done),
                  hasMustDone: Boolean(c.all_must_done || (c.completed_tasks > 0)),
                  percent: c.percent || 0
                };
              }
            });
            localStorage.setItem(STORAGE_KEYS.DAILY_COMPLETIONS, JSON.stringify(merged));
            return merged;
          });
        }

        const cloudBooks = await fetchBooksFromSupabase();
        if (cloudBooks && Array.isArray(cloudBooks) && cloudBooks.length > 0) {
          setBooks(prev => {
            const mapped = cloudBooks.map(b => ({
              id: b.id,
              title: b.title,
              author: b.author,
              totalPages: b.total_pages,
              pagesRead: b.pages_read || 0,
              status: b.status,
              startDate: b.start_date,
              dateFinished: b.date_finished,
              daysTaken: b.days_taken
            }));
            localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(mapped));
            return mapped;
          });
        }

        const cloudLogs = await fetchReadingLogsFromSupabase();
        if (cloudLogs && Array.isArray(cloudLogs) && cloudLogs.length > 0) {
          setReadingLogs(prev => {
            const merged = { ...prev };
            cloudLogs.forEach(l => {
              if (l.date && l.pages) {
                merged[l.date] = Math.max(merged[l.date] || 0, l.pages);
              }
            });
            localStorage.setItem(STORAGE_KEYS.READING_LOGS, JSON.stringify(merged));
            return merged;
          });
        }
      } catch (err) {
        console.warn('Error loading Supabase cloud data:', err);
      }
    }
    loadCloudData();
  }, []);

  // Journey Day Counter (Counts UP from the first day user actually completed a task)
  const daysOfJourney = useMemo(() => {
    const datesWithActivity = new Set();
    Object.entries(allSchedules).forEach(([date, sched]) => {
      if (Array.isArray(sched) && sched.some(t => t.completed)) {
        datesWithActivity.add(date);
      }
    });
    Object.entries(dailyCompletions).forEach(([date, comp]) => {
      if (comp && comp.completedTasks > 0) {
        datesWithActivity.add(date);
      }
    });
    Object.entries(readingLogs).forEach(([date, pages]) => {
      if (pages > 0) {
        datesWithActivity.add(date);
      }
    });
    Object.entries(workoutLogs?.history || {}).forEach(([date, w]) => {
      if (w && (w.completed || (Array.isArray(w.exercises) && w.exercises.some(e => e.completed)))) {
        datesWithActivity.add(date);
      }
    });

    if (datesWithActivity.size === 0) {
      return 0; // Day 0 before any task is ever completed
    }

    const sortedDates = Array.from(datesWithActivity).sort();
    const firstDateStr = sortedDates[0];
    try {
      const start = new Date(firstDateStr + 'T00:00:00');
      const today = new Date(todayStr + 'T00:00:00');
      const diffMs = today.getTime() - start.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      return Math.max(1, diffDays + 1);
    } catch (e) {
      return 1;
    }
  }, [allSchedules, dailyCompletions, readingLogs, workoutLogs, todayStr]);

  // Main Streak (Consecutive days where >= 1 MUST task was marked complete)
  // If today has no completed tasks yet, streak stays at yesterday's count until something is checked today
  const mustStreak = useMemo(() => {
    const isMustDoneOnDate = (ds) => {
      const sched = allSchedules[ds];
      if (sched && sched.length > 0) {
        return sched.some(t => t.tag === 'MUST' && t.completed);
      }
      const comp = dailyCompletions[ds];
      if (comp) {
        return Boolean(comp.hasMustDone || comp.allMustDone);
      }
      return false;
    };

    const todayDone = isMustDoneOnDate(todayStr);
    const today = new Date(todayStr + 'T00:00:00');
    let count = 0;

    if (todayDone) {
      count = 1;
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (isMustDoneOnDate(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    } else {
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (isMustDoneOnDate(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    }

    return count;
  }, [allSchedules, dailyCompletions, todayStr]);

  // Book Reading Streak & status
  // Starts from first day pages were actually logged; if no pages logged today yet, stays at yesterday's count
  const hasLoggedReadingToday = Boolean((readingLogs[todayStr] || 0) > 0);

  const readingStreak = useMemo(() => {
    const hasPages = (ds) => (readingLogs[ds] || 0) > 0;
    const todayDone = hasPages(todayStr);
    const today = new Date(todayStr + 'T00:00:00');
    let count = 0;

    if (todayDone) {
      count = 1;
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (hasPages(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    } else {
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (hasPages(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    }

    return count;
  }, [readingLogs, todayStr]);

  // Task streak helpers
  const calculateTaskStreak = (taskMatcher) => {
    const isDoneOnDate = (ds) => {
      const sched = allSchedules[ds];
      if (!sched) return false;
      return sched.some(t => taskMatcher(t) && t.completed);
    };

    const todayDone = isDoneOnDate(todayStr);
    const today = new Date(todayStr + 'T00:00:00');
    let count = 0;

    if (todayDone) {
      count = 1;
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (isDoneOnDate(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    } else {
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (isDoneOnDate(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    }

    return count;
  };

  const getTaskStreak = (task) => {
    if (!task) return 0;
    const targetId = task.id;
    const targetTitle = (task.title || '').toLowerCase().trim();
    return calculateTaskStreak(t => 
      t.id === targetId || (t.title || '').toLowerCase().trim() === targetTitle
    );
  };

  const gymStreak = useMemo(() => {
    const isGymDoneOnDate = (ds) => {
      const sched = allSchedules[ds];
      const schedGym = sched && sched.some(t => 
        (t.title?.toLowerCase().includes('gym') || t.id?.includes('gym')) && t.completed
      );
      const workoutDone = Boolean(workoutLogs?.history?.[ds]?.completed);
      return schedGym || workoutDone;
    };

    const todayDone = isGymDoneOnDate(todayStr);
    const today = new Date(todayStr + 'T00:00:00');
    let count = 0;

    if (todayDone) {
      count = 1;
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (isGymDoneOnDate(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    } else {
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (isGymDoneOnDate(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    }
    return count;
  }, [allSchedules, workoutLogs, todayStr]);

  const dsaStreak = useMemo(() => {
    const isDsaDoneOnDate = (ds) => {
      const sched = allSchedules[ds];
      return Boolean(sched && sched.some(t => 
        (t.title?.toLowerCase().includes('dsa') || t.studyType === 'dsa' || t.id?.includes('dsa')) && t.completed
      ));
    };

    const todayDone = isDsaDoneOnDate(todayStr);
    const today = new Date(todayStr + 'T00:00:00');
    let count = 0;

    if (todayDone) {
      count = 1;
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (isDsaDoneOnDate(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    } else {
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (isDsaDoneOnDate(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    }
    return count;
  }, [allSchedules, todayStr]);

  const japaneseStreak = useMemo(() => {
    const isJapaneseDoneOnDate = (ds) => {
      const sched = allSchedules[ds];
      const schedJap = sched && sched.some(t => 
        (t.title?.toLowerCase().includes('japanese') || t.title?.toLowerCase().includes('hiragana')) && t.completed
      );
      const readingDone = (readingLogs[ds] || 0) > 0;
      return schedJap || readingDone;
    };

    const todayDone = isJapaneseDoneOnDate(todayStr);
    const today = new Date(todayStr + 'T00:00:00');
    let count = 0;

    if (todayDone) {
      count = 1;
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (isJapaneseDoneOnDate(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    } else {
      let check = new Date(today);
      check.setDate(check.getDate() - 1);
      while (true) {
        const ds = check.toISOString().split('T')[0];
        if (isJapaneseDoneOnDate(ds)) {
          count++;
          check.setDate(check.getDate() - 1);
        } else {
          break;
        }
      }
    }
    return count;
  }, [allSchedules, readingLogs, todayStr]);

  const [workoutMode, setWorkoutMode] = useState('hostelGym');
  const currentWorkoutDay = WORKOUT_PLAN.find(w => w.dayNumber === currentDayIndex) || WORKOUT_PLAN[0];

  const currentDayWorkoutState = workoutLogs.history[selectedDate] || {
    completed: false,
    mode: 'hostelGym',
    exercises: currentWorkoutDay.gymExercises.map(e => ({ ...e })),
    notes: ''
  };

  const toggleExerciseComplete = (exerciseId) => {
    setWorkoutLogs(prev => {
      const dateLogs = prev.history[selectedDate] || {
        completed: false,
        mode: workoutMode,
        exercises: (workoutMode === 'hostelGym' ? currentWorkoutDay.gymExercises : currentWorkoutDay.homeExercises).map(e => ({ ...e })),
        notes: ''
      };

      const updatedEx = dateLogs.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      );

      const allDone = updatedEx.length > 0 && updatedEx.every(e => e.completed);

      const newHistory = {
        ...prev.history,
        [selectedDate]: {
          ...dateLogs,
          exercises: updatedEx,
          completed: allDone
        }
      };

      const nextStreak = allDone ? prev.streak + 1 : prev.streak;

      const nextState = {
        ...prev,
        streak: nextStreak,
        lastWorkoutDate: allDone ? selectedDate : prev.lastWorkoutDate,
        history: newHistory
      };

      localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(nextState));
      return nextState;
    });
  };

  const updateExerciseStats = (exerciseId, field, val) => {
    setWorkoutLogs(prev => {
      const dateLogs = prev.history[selectedDate] || {
        completed: false,
        mode: workoutMode,
        exercises: (workoutMode === 'hostelGym' ? currentWorkoutDay.gymExercises : currentWorkoutDay.homeExercises).map(e => ({ ...e })),
        notes: ''
      };

      const updatedEx = dateLogs.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, [field]: val } : ex
      );

      const nextState = {
        ...prev,
        history: {
          ...prev.history,
          [selectedDate]: {
            ...dateLogs,
            exercises: updatedEx
          }
        }
      };

      localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(nextState));
      return nextState;
    });
  };

  const isGymSkippedToday = !currentDayWorkoutState.completed && (new Date().getHours() >= 9);

  const [nutritionLogs, setNutritionLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NUTRITION);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });

  const currentNutrition = nutritionLogs[selectedDate] || {
    meals: VEGETARIAN_MEAL_PLAN.map(m => ({ ...m })),
    waterGlasses: 5
  };

  const toggleMealComplete = (mealId) => {
    setNutritionLogs(prev => {
      const dayData = prev[selectedDate] || {
        meals: VEGETARIAN_MEAL_PLAN.map(m => ({ ...m })),
        waterGlasses: 0
      };

      const updatedMeals = dayData.meals.map(m => 
        m.id === mealId ? { ...m, completed: !m.completed } : m
      );

      const next = {
        ...prev,
        [selectedDate]: {
          ...dayData,
          meals: updatedMeals
        }
      };

      localStorage.setItem(STORAGE_KEYS.NUTRITION, JSON.stringify(next));
      return next;
    });
  };

  const setWaterGlasses = (count) => {
    const clamped = Math.max(0, Math.min(16, count));
    setNutritionLogs(prev => {
      const dayData = prev[selectedDate] || {
        meals: VEGETARIAN_MEAL_PLAN.map(m => ({ ...m })),
        waterGlasses: 0
      };

      const next = {
        ...prev,
        [selectedDate]: {
          ...dayData,
          waterGlasses: clamped
        }
      };

      localStorage.setItem(STORAGE_KEYS.NUTRITION, JSON.stringify(next));
      return next;
    });
  };

  const currentProteinLogged = currentNutrition.meals
    .filter(m => m.completed)
    .reduce((sum, m) => sum + m.protein, 0);

  // 12. Daily Reflection Journal
  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      [todayStr]: {
        content: "",
        wordCount: 0,
        prompt: currentPrompt,
        updatedAt: new Date().toISOString()
      }
    };
  });

  const currentJournalEntry = journalEntries[selectedDate] || {
    content: "",
    wordCount: 0,
    prompt: currentPrompt,
    updatedAt: new Date().toISOString()
  };

  const saveJournalEntry = (content) => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const updatedEntry = {
      content,
      wordCount: words,
      prompt: currentJournalEntry.prompt || currentPrompt,
      updatedAt: new Date().toISOString()
    };

    setJournalEntries(prev => {
      const next = {
        ...prev,
        [selectedDate]: updatedEntry
      };
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(next));
      return next;
    });
  };

  // 12b. Weekly Stats for Sunday Review
  const getWeeklyStats = () => {
    const dsaDone = dsaTopics.filter(t => t.completed).length;
    let dsDone = 0;
    dsRoadmap.forEach(p => p.modules.forEach(m => m.topics.forEach(t => { if (t.completed) dsDone++; })));
    let snDone = 0;
    servicenowPhases.forEach(p => p.topics.forEach(t => { if (t.completed) snDone++; }));
    const podcastDone = podcasts.filter(p => p.listened).length;
    
    let completedTasksCount = 0;
    const base = new Date(selectedDate + 'T00:00:00');
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const sched = allSchedules[ds];
      if (sched) {
        completedTasksCount += sched.filter(t => t.completed).length;
      }
    }

    const journalCount = Object.keys(journalEntries).filter(d => journalEntries[d]?.content?.trim()).length;

    return {
      completedTasksCount,
      dsaDone,
      dsDone,
      snDone,
      podcastDone,
      gymDays: gymStreak,
      journalCount
    };
  };

  // 13. Cloud Sync to Firestore
  const syncToCloud = async () => {
    if (db && user && user.uid && !user.isLocalMock) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          updatedAt: new Date().toISOString(),
          schedules: allSchedules,
          dsaTopics,
          servicenowPhases,
          dsRoadmap,
          podcasts,
          workoutLogs,
          nutritionLogs,
          journalEntries,
          collegeLinks
        }, { merge: true });
      } catch (err) {
        console.error("Cloud sync error:", err);
      }
    }
  };

  useEffect(() => {
    syncToCloud();
  }, [allSchedules, dsaTopics, servicenowPhases, dsRoadmap, podcasts, workoutLogs, nutritionLogs, journalEntries]);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      daysOfJourney,
      dailyQuote,
      selectedDate,
      setSelectedDate,
      todayStr,
      currentDayIndex,
      isHolidayToday,
      toggleHolidayForDate,
      collegeLinks,
      addCollegeLink,
      deleteCollegeLink,
      currentSchedule,
      toggleTaskCompletion,
      updateTaskNotes,
      dsaTopics,
      toggleDsaTopicDone,
      logDsaTopicHours,
      updateDsaTopicNotes,
      servicenowPhases,
      toggleSnTopicCompletion,
      logSnTopicHours,
      updateSnTopicNotes,
      getSnPhaseProgress,
      getOverallSnRoadmapProgress,
      isSnPhaseUnlocked,
      dsRoadmap,
      toggleDsTopicCompletion,
      logDsTopicHours,
      updateDsTopicNotes,
      getDsPhaseProgress,
      getOverallDsRoadmapProgress,
      isDsPhaseUnlocked,
      podcasts,
      togglePodcastListened,
      updatePodcastNotes,
      currentActivePodcast,
      getAutoTopicForType,
      getWeeklyStats,
      workoutPlan: WORKOUT_PLAN,
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
      nutritionTargets: NUTRITION_TARGETS,
      currentPrompt,
      setCurrentPrompt,
      currentJournalEntry,
      journalEntries,
      saveJournalEntry,
      solvedLeetCodeProblems,
      toggleLeetCodeSolved,
      dailyCompletions,
      allSchedules,
      mustStreak,
      gymStreak,
      dsaStreak,
      japaneseStreak,
      getTaskStreak,
      books,
      activeBookId,
      setActiveBookId,
      readingLogs,
      readingStreak,
      hasLoggedReadingToday,
      logPagesRead,
      addBook,
      deleteBook,
      loginWithGoogle,
      logoutUser
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
