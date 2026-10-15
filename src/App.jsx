import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import CalendarStrip from './components/CalendarStrip';
import DailySchedule from './components/DailySchedule';
import DsaRoadmap from './components/DsaRoadmap';
import DataScienceRoadmap from './components/DataScienceRoadmap';
import ServiceNowRoadmap from './components/ServiceNowRoadmap';
import PodcastTracker from './components/PodcastTracker';
import GymTracker from './components/GymTracker';
import BookReadingTracker from './components/BookReadingTracker';
import EyeTracker from './components/EyeTracker';
import VisionModal from './components/VisionModal';
import SettingsModal from './components/SettingsModal';
import { Target, Heart, TreePine, Sparkles, Building2 } from 'lucide-react';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [isVisionOpen, setIsVisionOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Navigation & Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        openVisionModal={() => setIsVisionOpen(true)}
        openSettingsModal={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Calendar Strip (Always accessible for quick day selection & holiday check) */}
        <CalendarStrip />

        {/* Tab Content */}
        {activeTab === 'schedule' && <DailySchedule />}
        {activeTab === 'dsa' && <DsaRoadmap />}
        {activeTab === 'datascience' && <DataScienceRoadmap />}
        {activeTab === 'servicenow' && <ServiceNowRoadmap />}
        {activeTab === 'podcasts' && <PodcastTracker />}
        {activeTab === 'gym' && <GymTracker />}
        {activeTab === 'books' && <BookReadingTracker />}

      </main>

      {/* Footer: Target Companies & Vision Anchor */}
      <footer className="border-t border-slate-800/80 bg-[#090d16] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-400">Target Companies:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">ServiceNow</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">Zoho</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">Freshworks</span>
            <span className="text-emerald-400 font-bold ml-1">12LPA+</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsVisionOpen(true)}
              className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <TreePine className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hill Farm & Tribal School Vision</span>
            </button>
            <span>•</span>
            <span className="text-slate-500">Shri Prajith S © 2024–2028</span>
          </div>

        </div>
      </footer>

      {/* Modals */}
      <VisionModal isOpen={isVisionOpen} onClose={() => setIsVisionOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Floating Cute Eye Tracker in Corner */}
      <EyeTracker />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
