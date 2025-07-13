import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load completed lessons from localStorage on mount and listen for changes
  useEffect(() => {
    const loadCompletedLessons = () => {
      const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      setCompletedLessons(completed);
    };

    // Load initial state
    loadCompletedLessons();

    // Listen for storage changes (when lessons are completed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'completedLessons') {
        loadCompletedLessons();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const handleCustomUpdate = () => {
      loadCompletedLessons();
    };
    
    window.addEventListener('lessonCompleted', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('lessonCompleted', handleCustomUpdate);
    };
  }, []);

  // Define lesson order for progressive unlocking
  const lessonOrder = [
    'stage1-section1',
    'stage1-section2-public', // Skipping equity basics for now since it's not implemented
    'stage2-section1-lifecycle',
    'stage2-section2',
    'stage2-section3',
    'stage2-section4',
    'stage3-section1',
    'stage3-section2',
    'stage3-section3'
  ];

  // Determine which lessons are unlocked
  const getUnlockedLessons = () => {
    const unlocked = new Set(['stage1-section1']); // First lesson is always available
    
    for (let i = 0; i < lessonOrder.length - 1; i++) {
      const currentLesson = lessonOrder[i];
      const nextLesson = lessonOrder[i + 1];
      
      if (completedLessons.includes(currentLesson)) {
        unlocked.add(nextLesson);
      } else {
        break; // Stop unlocking if current lesson not completed
      }
    }
    
    return unlocked;
  };

  const unlockedLessons = getUnlockedLessons();

  // Get current lesson (next incomplete lesson)
  const getCurrentLesson = () => {
    for (const lesson of lessonOrder) {
      if (!completedLessons.includes(lesson)) {
        return lesson;
      }
    }
    return null; // All lessons completed
  };

  const currentLesson = getCurrentLesson();

  // Debug function to reset progress (can be called from browser console)
  useEffect(() => {
    (window as any).resetLessonProgress = () => {
      localStorage.removeItem('completedLessons');
      setCompletedLessons([]);
      console.log('Lesson progress reset');
    };
  }, []);

  const stages = [
    {
      id: 1,
      title: 'Foundations of Investing',
      sections: [
        { 
          id: '1.1', 
          title: 'What is Investing?', 
          path: '/lesson/stage1-section1',
          lessonId: 'stage1-section1'
        },
        { 
          id: '1.2', 
          title: 'Public vs. Private', 
          path: '/lesson/stage1-section2-public',
          lessonId: 'stage1-section2-public'
        },
      ]
    },
    {
      id: 2,
      title: 'Startup Investing',
      sections: [
        { 
          id: '2.1', 
          title: 'Startup Lifecycle', 
          path: '/lesson/stage2-section1-lifecycle',
          lessonId: 'stage2-section1-lifecycle'
        },
        { 
          id: '2.2', 
          title: 'Shares & Dilution', 
          path: '/lesson/stage2-section2',
          lessonId: 'stage2-section2'
        },
        { 
          id: '2.3', 
          title: 'Options & Vesting', 
          path: '/lesson/stage2-section3',
          lessonId: 'stage2-section3'
        },
        { 
          id: '2.4', 
          title: 'Exits & Cashing Out', 
          path: '/lesson/stage2-section4',
          lessonId: 'stage2-section4'
        },
      ]
    },
    {
      id: 3,
      title: 'Public Company Compensation',
      sections: [
        { 
          id: '3.1', 
          title: 'RSUs & Stock Grants', 
          path: '/lesson/stage3-section1',
          lessonId: 'stage3-section1'
        },
        { 
          id: '3.2', 
          title: 'Capital Gains & Taxes', 
          path: '/lesson/stage3-section2',
          lessonId: 'stage3-section2'
        },
        { 
          id: '3.3', 
          title: 'Advanced Concepts', 
          path: '/lesson/stage3-section3',
          lessonId: 'stage3-section3'
        },
      ]
    }
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-neutral-200">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-primary-700">Equity Education</h1>
          </div>
          <nav className="mt-8 flex-1 space-y-1 px-2">
            <Link
              to="/"
              className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                location.pathname === '/' 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              Dashboard
            </Link>
            
            {stages.map((stage) => (
              <div key={stage.id} className="mt-6">
                <div className="px-2 py-1">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Stage {stage.id}: {stage.title}
                  </h3>
                </div>
                <div className="mt-2 space-y-1">
                  {stage.sections.map((section) => {
                    const isUnlocked = unlockedLessons.has(section.lessonId);
                    const isCompleted = completedLessons.includes(section.lessonId);
                    const isCurrent = currentLesson === section.lessonId;
                    const isActive = location.pathname === section.path;

                    if (isUnlocked) {
                      return (
                        <Link
                          key={section.id}
                          to={section.path}
                          className={`group flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium ${
                            isActive
                              ? 'bg-primary-100 text-primary-700'
                              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                          }`}
                        >
                          <span>
                            {section.id} {section.title}
                          </span>
                          <div className="flex items-center space-x-1">
                            {isCurrent && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                            {isCompleted && !isCurrent && (
                              <span className="text-xs text-green-600 font-normal">
                                ✓
                              </span>
                            )}
                          </div>
                        </Link>
                      );
                    } else {
                      return (
                        <div
                          key={section.id}
                          className="group flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-neutral-300 cursor-not-allowed"
                        >
                          <span>
                            {section.id} {section.title}
                          </span>
                          <span className="text-xs text-neutral-300 font-normal">
                            🔒
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;