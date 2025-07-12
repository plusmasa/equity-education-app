import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LessonPage from './pages/LessonPage';
import DebugPanel from './components/DebugPanel';
import { JargonTerm } from './types';

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

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="lesson/:lessonId" element={<LessonPage />} />
          </Route>
        </Routes>
        
        <DebugPanel 
          appState={appState}
          errors={errors}
          loadedContent={loadedContent}
        />
      </div>
    </Router>
  );
}

export default App;