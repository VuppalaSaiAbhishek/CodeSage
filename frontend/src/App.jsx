import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SystemPage from './components/System';
import ChatPage from './components/ChatModal';
import SessionHistoryPage from './components/HistorySection';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeProjectId, setActiveProjectId] = useState({id:"",name:""});

  const handleAnalyze = (projectId) => {
    setActiveProjectId(projectId);
    setCurrentView('chat');
  };

  const handleRevisitSession = (projectId) => {
    setActiveProjectId(projectId);
    setCurrentView('chat');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeView={currentView} setView={setCurrentView} />

      <main>
        {/* Home: Entry point for new projects */}
        {currentView === 'home' && (
          <HomePage onAnalyze={handleAnalyze} />
        )}
        
        {/* Status: System health/monitoring */}
        {currentView === 'status' && <SystemPage />}
        
        {/* Chat: The active AI interaction area */}
        {currentView === 'chat' && (
          <ChatPage projectId={activeProjectId.id} projectName={activeProjectId.name} />
        )}

        {/* History: Browsing past Q&A sessions */}
        {currentView === 'history' && (
          <SessionHistoryPage 
            projectId={activeProjectId.id} 
            onSessionSelect={handleRevisitSession} 
          />
        )}
      </main>
    </div>
  );
}