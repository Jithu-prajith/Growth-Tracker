import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Plus, 
  Flame, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Award, 
  Bookmark, 
  Languages, 
  ChevronRight,
  Sparkles,
  Library,
  Trash2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';

export default function BookReadingTracker() {
  const { 
    books, 
    activeBookId, 
    setActiveBookId, 
    readingLogs, 
    logPagesRead, 
    addBook, 
    deleteBook,
    readingStreak,
    hasLoggedReadingToday,
    todayStr 
  } = useApp();

  const [inputPages, setInputPages] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newTotalPages, setNewTotalPages] = useState('');
  const [logSuccessMessage, setLogSuccessMessage] = useState('');

  const handleDeleteBook = (book) => {
    if (!book) return;
    const confirmed = window.confirm(`Are you sure you want to delete ${book.title}? This will remove all reading logs for this book.`);
    if (confirmed) {
      deleteBook(book.id);
    }
  };

  // Find currently active reading book
  const activeBook = books.find(b => b.id === activeBookId) || books.find(b => b.status === 'reading') || books[0];
  const percentComplete = activeBook 
    ? Math.min(100, Math.round(((activeBook.pagesRead || 0) / (activeBook.totalPages || 1)) * 100))
    : 0;

  const handleSaveDailyPages = (e) => {
    e.preventDefault();
    const count = parseInt(inputPages, 10);
    if (isNaN(count) || count <= 0) return;

    logPagesRead(count, activeBook?.id);
    setInputPages('');
    setLogSuccessMessage(`Logged ${count} pages for today! Keep up the momentum.`);
    setTimeout(() => setLogSuccessMessage(''), 3000);
  };

  const handleCreateBook = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTotalPages) return;
    const pages = parseInt(newTotalPages, 10);
    if (isNaN(pages) || pages <= 0) return;

    addBook({
      title: newTitle.trim(),
      author: newAuthor.trim() || 'Unknown Author',
      totalPages: pages
    });

    setNewTitle('');
    setNewAuthor('');
    setNewTotalPages('');
    setIsAddModalOpen(false);
  };

  // Build weekly chart data (Mon through Sun of current week)
  const weeklyChartData = React.useMemo(() => {
    const today = new Date(todayStr + 'T00:00:00');
    const day = today.getDay(); // 0 is Sun, 1 is Mon...
    // Calculate Monday of current week
    const diffToMon = day === 0 ? -6 : 1 - day;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMon);

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const ds = d.toISOString().split('T')[0];
      const pages = readingLogs?.[ds] || 0;
      data.push({
        day: daysOfWeek[i],
        date: ds,
        pages,
        isToday: ds === todayStr
      });
    }

    return data;
  }, [readingLogs, todayStr]);

  const completedBooks = books.filter(b => b.status === 'completed');
  const readingBooks = books.filter(b => b.status === 'reading');

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/90 p-5 sm:p-6 shadow-xl shadow-black/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Reading Mastery Tracker
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-semibold">
                Mindset & Languages
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Building Shri Prajith's lifelong intellect: from Japanese Hiragana & Katakana foundations to deep technical literature and self-mastery.
            </p>
          </div>

          {/* Quick Streak & Stats Pills */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30">
              <Flame className={`w-5 h-5 text-amber-400 ${readingStreak > 0 ? 'animate-bounce' : ''}`} />
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-400/90 tracking-wider">Reading Streak</div>
                <div className="text-base font-extrabold text-white">{readingStreak} Consecutive Days</div>
                <div className="text-[10px] mt-0.5 font-medium">
                  {hasLoggedReadingToday ? (
                    <span className="text-emerald-400 font-semibold">✓ Today's pages logged</span>
                  ) : readingStreak > 0 ? (
                    <span className="text-amber-400 animate-pulse">log today's pages to keep streak alive</span>
                  ) : (
                    <span className="text-slate-400">log today's pages to start streak</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Book</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Currently Reading (Left) & Daily Log + Chart (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Currently Reading Card */}
        <div className="lg:col-span-7 bg-[#0f172a] rounded-2xl border border-slate-800/90 p-5 sm:p-6 shadow-xl shadow-black/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                Currently Reading
              </span>

              <div className="flex items-center gap-2">
                {readingBooks.length > 1 && (
                  <select
                    value={activeBook?.id}
                    onChange={(e) => setActiveBookId(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1 outline-none"
                  >
                    {readingBooks.map(b => (
                      <option key={b.id} value={b.id}>{b.title}</option>
                    ))}
                  </select>
                )}
                {activeBook && (
                  <button
                    onClick={() => handleDeleteBook(activeBook)}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                    title={`Delete ${activeBook.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {activeBook ? (
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                
                {/* Book Cover Placeholder */}
                <div className="w-36 h-52 rounded-xl bg-gradient-to-br from-indigo-900 via-slate-900 to-amber-900 p-4 border border-slate-700/80 shadow-2xl shadow-indigo-950/40 flex flex-col justify-between relative overflow-hidden shrink-0 group">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                      Japanese
                    </span>
                    <h3 className="text-xs font-black text-white mt-2 leading-tight">
                      {activeBook.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-300 font-medium">{activeBook.author}</p>
                    <div className="mt-2 text-[9px] font-mono text-slate-400 flex items-center justify-between">
                      <span>{activeBook.totalPages} pp.</span>
                      <Languages className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  </div>
                </div>

                {/* Book Info & Progress */}
                <div className="flex-1 w-full space-y-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-white">
                      {activeBook.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      by <span className="text-slate-200 font-medium">{activeBook.author}</span>
                    </p>
                  </div>

                  {/* Progress Stats */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="text-[10px] font-semibold text-slate-400">Pages Read</div>
                      <div className="text-base sm:text-lg font-black text-white mt-0.5">
                        {activeBook.pagesRead || 0}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="text-[10px] font-semibold text-slate-400">Total Pages</div>
                      <div className="text-base sm:text-lg font-black text-slate-200 mt-0.5">
                        {activeBook.totalPages}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                      <div className="text-[10px] font-semibold text-slate-400">Remaining</div>
                      <div className="text-base sm:text-lg font-black text-amber-400 mt-0.5">
                        {Math.max(0, activeBook.totalPages - (activeBook.pagesRead || 0))}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Completion Progress</span>
                      <span className="font-extrabold text-sky-400">{percentComplete}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 transition-all duration-500 shadow-sm shadow-sky-500/30"
                        style={{ width: `${percentComplete}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 italic pt-1">
                    "Every page read is a brick laid for the school at the hill farm."
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p>No active book currently reading.</p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-3 text-xs text-sky-400 hover:underline"
                >
                  Add a new book now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Daily Log Input & Weekly Momentum Chart (Right Column) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Daily Log Card */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800/90 p-5 shadow-xl shadow-black/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-3">
              <Clock className="w-3.5 h-3.5" />
              Daily Reading Log
            </h3>
            
            <form onSubmit={handleSaveDailyPages} className="space-y-3">
              <label className="text-xs text-slate-300 font-medium block">
                How many pages did you read today?
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={inputPages}
                  onChange={(e) => setInputPages(e.target.value)}
                  placeholder="e.g. 15"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-sky-500 outline-none transition-colors"
                />

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
                >
                  Save Log
                </button>
              </div>

              {logSuccessMessage && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{logSuccessMessage}</span>
                </div>
              )}
            </form>
          </div>

          {/* Weekly Bar Chart */}
          <div className="bg-[#0f172a] rounded-2xl border border-slate-800/90 p-5 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" />
                This Week's Reading Activity
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Pages / Day</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="day" 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={{ stroke: '#334155' }} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={{ stroke: '#334155' }} 
                    allowDecimals={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs shadow-xl">
                            <p className="font-bold text-white">{data.day} ({data.date})</p>
                            <p className="text-sky-400 font-semibold mt-0.5">{data.pages} pages read</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="pages" radius={[4, 4, 0, 0]}>
                    {weeklyChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.pages > 0 ? (entry.isToday ? '#38bdf8' : '#6366f1') : '#1e293b'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

      {/* Completed Books / All Books List */}
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800/90 p-5 sm:p-6 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Library className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              All Books & Finished Library
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
              {books.length} Books
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map(book => {
            const isDone = book.status === 'completed';
            const pct = Math.min(100, Math.round(((book.pagesRead || 0) / (book.totalPages || 1)) * 100));

            return (
              <div 
                key={book.id}
                className={`p-4 rounded-xl border transition-all ${
                  book.id === activeBook?.id
                    ? 'bg-slate-900/90 border-sky-500/40 shadow-lg shadow-sky-500/5'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{book.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{book.author}</p>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                    isDone 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                  }`}>
                    {isDone ? 'Completed' : `${pct}% Done`}
                  </span>
                </div>

                <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
                  <span>{book.pagesRead || 0} / {book.totalPages} pages</span>
                  <div className="flex items-center gap-2">
                    {isDone ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <Award className="w-3.5 h-3.5" />
                        Finished {book.dateFinished || 'Recently'} ({book.daysTaken || 1}d)
                      </span>
                    ) : (
                      <button
                        onClick={() => setActiveBookId(book.id)}
                        className="text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                      >
                        Set Active →
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteBook(book)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title={`Delete ${book.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Mini progress bar */}
                <div className="mt-2.5 w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div 
                    className={`h-full ${isDone ? 'bg-emerald-400' : 'bg-sky-500'}`} 
                    style={{ width: `${pct}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Book Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0f172a] rounded-2xl border border-slate-700 w-full max-w-md p-6 shadow-2xl relative">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              Add a New Book to Library
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Expand Shri Prajith's reading portfolio.
            </p>

            <form onSubmit={handleCreateBook} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Book Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Atomic Habits"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:border-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Author</label>
                <input
                  type="text"
                  placeholder="e.g. James Clear"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:border-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Total Pages *</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 320"
                  value={newTotalPages}
                  onChange={(e) => setNewTotalPages(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:border-sky-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-md shadow-sky-500/20 cursor-pointer"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
