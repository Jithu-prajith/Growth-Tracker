// Supabase client and sync engine for Shri Prajith S
// Supports offline-first local storage caching with real-time cloud persistence

import { createClient } from '@supabase/supabase-js';

export function getStoredSupabaseConfig() {
  try {
    const saved = localStorage.getItem('prajith_supabase_config');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Error reading stored Supabase config:', e);
  }

  return {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  };
}

const config = getStoredSupabaseConfig();
export const isSupabaseConfigured = Boolean(config.url && config.anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(config.url, config.anonKey, {
      auth: { persistSession: true }
    })
  : null;

/**
 * Sync daily task completion data to Supabase
 * Schema: table 'daily_completions' (date TEXT primary key, total_tasks INT, completed_tasks INT, all_must_done BOOLEAN, percent INT, updated_at TIMESTAMP)
 */
export async function syncDailyCompletionToSupabase(record) {
  if (!supabase || !isSupabaseConfigured) return;
  try {
    const { error } = await supabase
      .from('daily_completions')
      .upsert({
        date: record.date,
        total_tasks: record.totalTasks,
        completed_tasks: record.completedTasks,
        all_must_done: record.allMustDone,
        percent: record.percent,
        updated_at: new Date().toISOString()
      }, { onConflict: 'date' });
    if (error) console.warn('Supabase syncDailyCompletion error:', error.message);
  } catch (err) {
    console.warn('Supabase daily completion network error:', err);
  }
}

/**
 * Fetch daily completions from Supabase
 */
export async function fetchDailyCompletionsFromSupabase() {
  if (!supabase || !isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('daily_completions').select('*');
    if (error) {
      console.warn('Supabase fetchDailyCompletions error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase fetch daily completions network error:', err);
    return null;
  }
}

/**
 * Sync books data to Supabase
 * Schema: table 'books' (id TEXT primary key, title TEXT, author TEXT, total_pages INT, pages_read INT, status TEXT, start_date TEXT, date_finished TEXT, days_taken INT, updated_at TIMESTAMP)
 */
export async function syncBooksToSupabase(books) {
  if (!supabase || !isSupabaseConfigured || !books || !books.length) return;
  try {
    const records = books.map(b => ({
      id: b.id,
      title: b.title,
      author: b.author,
      total_pages: b.totalPages,
      pages_read: b.pagesRead,
      status: b.status,
      start_date: b.startDate,
      date_finished: b.dateFinished,
      days_taken: b.daysTaken,
      updated_at: new Date().toISOString()
    }));
    const { error } = await supabase.from('books').upsert(records, { onConflict: 'id' });
    if (error) console.warn('Supabase syncBooks error:', error.message);
  } catch (err) {
    console.warn('Supabase books network error:', err);
  }
}

/**
 * Delete a book and its reading logs from Supabase
 */
export async function deleteBookFromSupabase(bookId) {
  if (!supabase || !isSupabaseConfigured || !bookId) return;
  try {
    // Delete book entry
    const { error: bookErr } = await supabase.from('books').delete().eq('id', bookId);
    if (bookErr) console.warn('Supabase deleteBook error:', bookErr.message);

    // Delete associated reading logs for this book
    const { error: logsErr } = await supabase.from('reading_logs').delete().eq('book_id', bookId);
    if (logsErr) console.warn('Supabase deleteReadingLogs error:', logsErr.message);
  } catch (err) {
    console.warn('Supabase delete book network error:', err);
  }
}

/**
 * Fetch books from Supabase
 */
export async function fetchBooksFromSupabase() {
  if (!supabase || !isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('books').select('*');
    if (error) {
      console.warn('Supabase fetchBooks error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase fetch books network error:', err);
    return null;
  }
}

/**
 * Sync daily reading log to Supabase
 * Schema: table 'reading_logs' (date TEXT, pages INT, book_id TEXT, updated_at TIMESTAMP)
 */
export async function syncReadingLogToSupabase(date, pages, bookId) {
  if (!supabase || !isSupabaseConfigured) return;
  try {
    const payload = {
      date,
      pages,
      updated_at: new Date().toISOString()
    };
    if (bookId) payload.book_id = bookId;

    const { error } = await supabase
      .from('reading_logs')
      .upsert(payload, { onConflict: 'date' });
    if (error) console.warn('Supabase syncReadingLog error:', error.message);
  } catch (err) {
    console.warn('Supabase reading log network error:', err);
  }
}

/**
 * Fetch reading logs from Supabase
 */
export async function fetchReadingLogsFromSupabase() {
  if (!supabase || !isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase.from('reading_logs').select('*');
    if (error) {
      console.warn('Supabase fetchReadingLogs error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase fetch reading logs network error:', err);
    return null;
  }
}
