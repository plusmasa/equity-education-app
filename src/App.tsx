import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LessonPage from './pages/LessonPage';
import DebugPanel from './components/DebugPanel';
import { JargonTerm } from './types';

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
  </div>
);

function App() {
  const [jargonSidepanelOpen, setJargonSidepanelOpen] = useState(false);
  const [selectedJargonTerm, setSelectedJargonTerm] = useState<JargonTerm | undefined>();
  const [errors] = useState<string[]>([]);

  // Suppress unused variable warnings for future implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openJargonTerm = (term: JargonTerm) => {
    setSelectedJargonTerm(term);
    setJargonSidepanelOpen(true);
  };

  // Sample app state for debug panel
  const appState = {
    currentUser: null,
    progress: {
      completedLessons: [],
      currentLesson: null,
      totalPoints: 0,
      streakDays: 0
    },
    ui: {
      jargonSidepanelOpen,
      selectedJargonTerm: selectedJargonTerm?.term
    }
  };

  // Sample loaded content for debug panel
  const loadedContent = {
    lessonsLoaded: 0,
    minigamesLoaded: 0,
    jargonTermsLoaded: 0
  };

  try {
    return (
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="lesson/:lessonId" element={<LessonPage />} />
                <Route path="*" element={<Dashboard />} /> {/* Catch-all route */}
              </Route>
            </Routes>
          </Suspense>
          
          <DebugPanel 
            appState={appState}
            errors={errors}
            loadedContent={loadedContent}
          />
        </div>
      </Router>
    );
  } catch (error) {
    console.error('App render error:', error);
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-neutral-900 mb-4">App Error</h1>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-500 text-white rounded-md"
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }
}

export default App;