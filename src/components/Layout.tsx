import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import JargonSidepanel from './JargonSidepanel';

const Layout: React.FC = () => {
  const handleResetProgress = () => {
    localStorage.removeItem('completedLessons');
    alert('Progress reset! Page will refresh.');
    // Small delay to ensure alert is shown before reload
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* QA Debug Reset Button - Remove for production */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleResetProgress}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md shadow-lg transition-colors"
          title="Reset lesson progress (QA only)"
        >
          🔄 Reset Progress
        </button>
      </div>
      
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:pl-64">
          <Outlet />
        </main>
        <JargonSidepanel />
      </div>
    </div>
  );
};

export default Layout;