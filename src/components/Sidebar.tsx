import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [visitedLessons, setVisitedLessons] = useState<string[]>([]);

  // Load both completed and visited lessons from localStorage
  useEffect(() => {
    const loadCompletedLessons = () => {
      try {
        const rawData = localStorage.getItem('completedLessons');
        const completed = rawData ? JSON.parse(rawData) : [];
        
        // Ensure it's an array
        if (Array.isArray(completed)) {
          setCompletedLessons(completed);
        } else {
          console.warn('Invalid completedLessons data, resetting to empty array');
          setCompletedLessons([]);
          localStorage.setItem('completedLessons', '[]');
        }
      } catch (error) {
        console.error('Error loading completed lessons:', error);
        setCompletedLessons([]);
        localStorage.setItem('completedLessons', '[]');
      }
    };

    const loadVisitedLessons = () => {
      try {
        const rawData = localStorage.getItem('visitedLessons');
        const visited = rawData ? JSON.parse(rawData) : [];
        
        if (Array.isArray(visited)) {
          setVisitedLessons(visited);
        } else {
          setVisitedLessons([]);
          localStorage.setItem('visitedLessons', '[]');
        }
      } catch (error) {
        console.error('Error loading visited lessons:', error);
        setVisitedLessons([]);
        localStorage.setItem('visitedLessons', '[]');
      }
    };

    // Load initial state
    loadCompletedLessons();
    loadVisitedLessons();

    // Listen for storage changes (when lessons are completed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'completedLessons') {
        loadCompletedLessons();
      }
      if (e.key === 'visitedLessons') {
        loadVisitedLessons();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const handleCustomUpdate = () => {
      loadCompletedLessons();
      loadVisitedLessons();
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

  // Update visited lessons when location changes
  useEffect(() => {
    const currentLessonId = location.pathname.replace('/lesson/', '');
    if (currentLessonId && lessonOrder.includes(currentLessonId)) {
      if (!visitedLessons.includes(currentLessonId)) {
        const newVisited = [...visitedLessons, currentLessonId];
        setVisitedLessons(newVisited);
        localStorage.setItem('visitedLessons', JSON.stringify(newVisited));
        
        // Dispatch custom event to update other components if needed
        window.dispatchEvent(new CustomEvent('lessonVisited', { detail: currentLessonId }));
      }
    }
  }, [location.pathname, lessonOrder, visitedLessons]);

  // Determine which lessons are unlocked (allow browsing to visited lessons)
  const getUnlockedLessons = () => {
    const unlocked = new Set(['stage1-section1']); // First lesson is always available
    
    // Unlock based on completion (traditional progression)
    for (let i = 0; i < lessonOrder.length - 1; i++) {
      const currentLesson = lessonOrder[i];
      const nextLesson = lessonOrder[i + 1];
      
      if (completedLessons.includes(currentLesson)) {
        unlocked.add(nextLesson);
      } else {
        break;
      }
    }
    
    // Also unlock any lesson the user has visited (allow browsing)
    visitedLessons.forEach(lesson => unlocked.add(lesson));
    
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
  
  // Clean navigation state tracking

  // Debug function to reset progress (can be called from browser console)
  useEffect(() => {
    (window as any).resetLessonProgress = () => {
      localStorage.removeItem('completedLessons');
      localStorage.removeItem('visitedLessons');
      setCompletedLessons([]);
      setVisitedLessons([]);
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
                    const isNext = currentLesson === section.lessonId; // Next lesson to complete
                    const isActive = location.pathname === section.path; // Currently viewing
                    
                    // Navigation state logic

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
                            {isActive && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-200" title="You are here"></div>
                            )}
                            {isCompleted && !isActive && (
                              <span className="text-sm text-green-600 font-semibold" title="Completed">
                                ✓
                              </span>
                            )}
                            {isNext && !isActive && !isCompleted && (
                              <div className="w-2 h-2 bg-amber-400 rounded-full" title="Recommended next"></div>
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