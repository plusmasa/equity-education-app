import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const handleResetProgress = () => {
    try {
      // Clear localStorage
      localStorage.removeItem('completedLessons');
      
      // Show immediate feedback
      const button = document.querySelector('[title="Reset lesson progress (QA only)"]') as HTMLButtonElement;
      if (button) {
        button.textContent = '✅ Reset!';
        button.disabled = true;
      }
      
      // Dispatch custom event to update components immediately
      window.dispatchEvent(new CustomEvent('lessonCompleted'));
      
      // Use a safer approach - just redirect without reload
      setTimeout(() => {
        // Use pushState to navigate without full page reload
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        
        // Re-enable button after navigation
        setTimeout(() => {
          if (button) {
            button.textContent = '🔄 Reset Progress';
            button.disabled = false;
          }
        }, 1000);
      }, 500);
      
    } catch (error) {
      console.error('Error resetting progress:', error);
      alert('Reset failed. Please try refreshing the page manually.');
    }
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
        {/* Remove problematic standalone JargonSidepanel - it's handled per page */}
      </div>
    </div>
  );
};

export default Layout;