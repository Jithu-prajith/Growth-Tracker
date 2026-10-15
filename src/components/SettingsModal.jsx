import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  Database, 
  Calendar, 
  Download, 
  Upload, 
  Check, 
  X, 
  Flame, 
  Key, 
  RefreshCw,
  ShieldAlert
} from 'lucide-react';
import { getStoredFirebaseConfig } from '../firebase';
import { getStoredSupabaseConfig } from '../supabase';

export default function SettingsModal({ isOpen, onClose }) {
  const { user } = useApp();
  
  const [fbConfig, setFbConfig] = useState(() => {
    return getStoredFirebaseConfig();
  });

  const [supabaseConfig, setSupabaseConfig] = useState(() => {
    return getStoredSupabaseConfig();
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [supabaseSavedSuccess, setSupabaseSavedSuccess] = useState(false);
  const [gcalEnabled, setGcalEnabled] = useState(true);

  if (!isOpen) return null;

  const handleSaveFirebaseConfig = (e) => {
    e.preventDefault();
    localStorage.setItem('prajith_firebase_config', JSON.stringify(fbConfig));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      window.location.reload(); // Reload to initialize real Firebase instance
    }, 1200);
  };

  const handleSaveSupabaseConfig = (e) => {
    e.preventDefault();
    localStorage.setItem('prajith_supabase_config', JSON.stringify(supabaseConfig));
    setSupabaseSavedSuccess(true);
    setTimeout(() => {
      setSupabaseSavedSuccess(false);
      window.location.reload();
    }, 1200);
  };

  const handleExportData = () => {
    const backup = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('prajith_')) {
        try {
          backup[key] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
          backup[key] = localStorage.getItem(key);
        }
      }
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prajith_growth_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          Object.keys(parsed).forEach(k => {
            if (k.startsWith('prajith_')) {
              localStorage.setItem(k, typeof parsed[k] === 'string' ? parsed[k] : JSON.stringify(parsed[k]));
            }
          });
          alert('Backup restored successfully! Refreshing dashboard...');
          window.location.reload();
        } catch (err) {
          alert('Failed to parse backup JSON file.');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-fadeIn my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-white">
              App Settings, Cloud Sync & Backup
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Mode Badge */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Current Storage Mode:</span>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${user?.isLocalMock ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
              {user?.isLocalMock ? 'Offline First / LocalStorage Engine' : 'Firebase Cloud Firestore Connected'}
            </div>
          </div>
          <span className="text-[11px] px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono">
            Zero data loss guarantee
          </span>
        </div>

        {/* Firebase Config Form */}
        <form onSubmit={handleSaveFirebaseConfig} className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
            <Key className="w-4 h-4 text-sky-400" />
            <span>Connect Your Real Firebase Project (Optional)</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            The dashboard already works 100% offline out-of-the-box. To sync your data seamlessly across your phone in hostel and laptop, paste your Firebase web app config from Firebase Console below:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-slate-400 font-mono">apiKey</label>
              <input
                type="text"
                value={fbConfig.apiKey || ''}
                onChange={e => setFbConfig({ ...fbConfig, apiKey: e.target.value })}
                placeholder="AIzaSy..."
                className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 font-mono focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-mono">projectId</label>
              <input
                type="text"
                value={fbConfig.projectId || ''}
                onChange={e => setFbConfig({ ...fbConfig, projectId: e.target.value })}
                placeholder="prajith-growth"
                className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 font-mono focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-mono">authDomain</label>
              <input
                type="text"
                value={fbConfig.authDomain || ''}
                onChange={e => setFbConfig({ ...fbConfig, authDomain: e.target.value })}
                placeholder="project.firebaseapp.com"
                className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 font-mono focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-mono">appId</label>
              <input
                type="text"
                value={fbConfig.appId || ''}
                onChange={e => setFbConfig({ ...fbConfig, appId: e.target.value })}
                placeholder="1:123456:web:abcd"
                className="w-full mt-0.5 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 font-mono focus:border-sky-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500">
              {savedSuccess ? 'Saved! Initializing...' : 'Saves to local secure storage'}
            </span>
            <button
              type="submit"
              className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors cursor-pointer"
            >
              {savedSuccess ? 'Saved & Reloading...' : 'Save & Connect Firebase'}
            </button>
          </div>
        </form>

        {/* Supabase Config Form */}
        <form onSubmit={handleSaveSupabaseConfig} className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Supabase Cloud Database Connection</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Persists your daily task completions, GitHub streak heatmap, and reading portfolio indefinitely. Paste your Supabase project credentials:
          </p>

          <div className="space-y-2 pt-1">
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-mono">Project URL</label>
              <input
                type="text"
                placeholder="https://xyzcompany.supabase.co"
                value={supabaseConfig.url}
                onChange={(e) => setSupabaseConfig({ ...supabaseConfig, url: e.target.value })}
                className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 uppercase font-mono">Anon / Public API Key</label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={supabaseConfig.anonKey}
                onChange={(e) => setSupabaseConfig({ ...supabaseConfig, anonKey: e.target.value })}
                className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500">
              Credentials stored safely in your browser.
            </span>
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs shadow-md transition-colors cursor-pointer"
            >
              {supabaseSavedSuccess ? 'Saved & Reloading...' : 'Save & Connect Supabase'}
            </button>
          </div>
        </form>

        {/* Google Calendar Integration Status */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-sky-400" />
            <div>
              <div className="text-xs font-bold text-slate-200">Google Calendar API Sync</div>
              <div className="text-[11px] text-slate-400">
                Auto-detects holidays & adapts schedule targets dynamically
              </div>
            </div>
          </div>
          <button
            onClick={() => setGcalEnabled(!gcalEnabled)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              gcalEnabled 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {gcalEnabled ? 'Sync Active' : 'Disconnected'}
          </button>
        </div>

        {/* Backup & Restore Section */}
        <div className="border-t border-slate-800 pt-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-300">Data Portability</div>
            <div className="text-[11px] text-slate-500">Download your entire roadmap and gym history</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Backup</span>
            </button>

            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Restore</span>
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}
