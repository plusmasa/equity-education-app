import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import JargonSidepanel from '../components/JargonSidepanel';
import Quiz from '../components/Quiz';
import { JargonTerm } from '../types';
import { JARGON_TERMS } from '../utils/jargonTerms';
import { parseQuizFromMarkdown, getSampleQuiz } from '../utils/quizParser';
import { getLessonStructure, type LessonSubsection } from '../utils/lessonParser';

// Map lesson IDs to curriculum files
const LESSON_FILE_MAP: Record<string, string> = {
  'stage1-section1': 'Stage1_Section1_WhatIsInvesting.md',
  'stage1-section2-equity': 'Stage1_Section2_EquityBasics.md',
  'stage1-section2-public': 'Stage1_Section2_PublicVsPrivate.md',
  'stage2-section1-lifecycle': 'Stage2_Section1_StartupLifecycle.md',
  'stage2-section2': 'Stage2_Section2_SharesAndDilution.md',
  'stage2-section3': 'Stage2_Section3_OptionsAndVesting.md',
  'stage2-section4': 'Stage2_Section4_ExitsAndCashingOut.md',
  'stage3-section1': 'Stage3_Section1_RSUsAndStockGrants.md',
  'stage3-section2': 'Stage3_Section2_CapitalGainsAndTaxes.md',
  'stage3-section3': 'Stage3_Section3_AdvancedConcepts.md',
};

// Map lesson IDs to titles
const LESSON_TITLES: Record<string, string> = {
  'stage1-section1': 'What is Investing?',
  'stage1-section2-equity': 'Equity Basics',
  'stage1-section2-public': 'Public vs. Private Companies',
  'stage2-section1-lifecycle': 'Startup Lifecycle',
  'stage2-section2': 'Shares & Dilution',
  'stage2-section3': 'Options & Vesting',
  'stage2-section4': 'Exits & Cashing Out',
  'stage3-section1': 'RSUs & Stock Grants',
  'stage3-section2': 'Capital Gains & Taxes',
  'stage3-section3': 'Advanced Concepts',
};

// Ordered lesson sequence for navigation (must match Sidebar lessonOrder)
const LESSON_SEQUENCE = [
  'stage1-section1',
  'stage1-section2-public', // Skipping equity basics since it's not implemented
  'stage2-section1-lifecycle',
  'stage2-section2',
  'stage2-section3',
  'stage2-section4',
  'stage3-section1',
  'stage3-section2',
  'stage3-section3'
];

interface LessonPageProps {}

const LessonPage: React.FC<LessonPageProps> = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [jargonSidepanelOpen, setJargonSidepanelOpen] = useState(false);
  const [selectedJargonTerm, setSelectedJargonTerm] = useState<JargonTerm | undefined>();
  
  // Subsection navigation state
  const [lessonSubsections, setLessonSubsections] = useState<LessonSubsection[]>([]);
  const [currentSubsectionIndex, setCurrentSubsectionIndex] = useState(0);

  // Navigation helpers
  const currentIndex = LESSON_SEQUENCE.indexOf(lessonId || '');
  const previousLesson = currentIndex > 0 ? LESSON_SEQUENCE[currentIndex - 1] : null;
  const nextLesson = currentIndex < LESSON_SEQUENCE.length - 1 ? LESSON_SEQUENCE[currentIndex + 1] : null;
  const lessonTitle = lessonId ? LESSON_TITLES[lessonId] : 'Unknown Lesson';
  
  // Subsection navigation helpers
  const currentSubsection = lessonSubsections[currentSubsectionIndex];
  const isFirstSubsection = currentSubsectionIndex === 0;
  const isLastSubsection = currentSubsectionIndex === lessonSubsections.length - 1;
  const isQuizSection = currentSubsection?.type === 'quiz';

  // Subsection navigation functions
  const goToNextSubsection = () => {
    if (!isLastSubsection) {
      setCurrentSubsectionIndex(currentSubsectionIndex + 1);
    }
  };

  const goToPreviousSubsection = () => {
    if (!isFirstSubsection) {
      setCurrentSubsectionIndex(currentSubsectionIndex - 1);
    }
  };

  const goToSubsection = (index: number) => {
    if (index >= 0 && index < lessonSubsections.length) {
      setCurrentSubsectionIndex(index);
    }
  };

  // Handle jargon term clicks
  const handleJargonTermClick = (term: JargonTerm) => {
    setSelectedJargonTerm(term);
    setJargonSidepanelOpen(true);
  };

  // Handle quiz completion
  const handleQuizComplete = (score: number) => {
    // Store completion in localStorage
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
      
      // Dispatch custom event to update sidebar
      window.dispatchEvent(new CustomEvent('lessonCompleted'));
    }
  };

  // Get quiz questions for current lesson
  const getQuizQuestions = () => {
    // First try to parse from markdown content
    const parsedQuestions = parseQuizFromMarkdown(content);
    if (parsedQuestions.length > 0) {
      return parsedQuestions;
    }
    // Fall back to sample quiz
    return getSampleQuiz(lessonId || '');
  };

  // Setup jargon term click handlers after content loads
  useEffect(() => {
    const currentContentRef = contentRef.current; // Capture ref value for cleanup
    
    const setupJargonHandlers = () => {
      if (!currentContentRef) return;

      // Clear existing handlers first
      const existingElements = currentContentRef.querySelectorAll('.jargon-term');
      existingElements.forEach((element) => {
        if ((element as any).__clickHandler) {
          element.removeEventListener('click', (element as any).__clickHandler);
          delete (element as any).__clickHandler;
        }
      });

      // Add new handlers
      const jargonElements = currentContentRef.querySelectorAll('.jargon-term');
      jargonElements.forEach((element) => {
        const termKey = element.getAttribute('data-term');
        if (termKey && JARGON_TERMS[termKey]) {
          const clickHandler = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            handleJargonTermClick(JARGON_TERMS[termKey]);
          };
          element.addEventListener('click', clickHandler);
          
          // Store the handler so we can remove it later
          (element as any).__clickHandler = clickHandler;
        }
      });
    };

    // Set up handlers with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(setupJargonHandlers, 100);

    // Cleanup function - only clean up when content actually changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentSubsection?.content, currentSubsection?.id]); // Don't trigger on sidepanel state changes

  // Separate effect to ensure handlers are always present after sidepanel closes
  useEffect(() => {
    if (!jargonSidepanelOpen && contentRef.current) {
      // Re-setup handlers after sidepanel closes, in case they got removed
      const timeoutId = setTimeout(() => {
        const jargonElements = contentRef.current?.querySelectorAll('.jargon-term');
        jargonElements?.forEach((element) => {
          const termKey = element.getAttribute('data-term');
          if (termKey && JARGON_TERMS[termKey] && !(element as any).__clickHandler) {
            const clickHandler = (e: Event) => {
              e.preventDefault();
              e.stopPropagation();
              handleJargonTermClick(JARGON_TERMS[termKey]);
            };
            element.addEventListener('click', clickHandler);
            (element as any).__clickHandler = clickHandler;
          }
        });
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [jargonSidepanelOpen]); // Re-setup handlers when sidepanel closes

  // Custom markdown components
  const markdownComponents = {
    // Make jargon terms clickable
    p: ({ children, ...props }: any) => {
      if (typeof children === 'string') {
        const processedText = wrapJargonTerms(children);
        return <p {...props} dangerouslySetInnerHTML={{ __html: processedText }} />;
      }
      return <p {...props}>{children}</p>;
    },
    // Also handle text in other elements
    li: ({ children, ...props }: any) => {
      if (typeof children === 'string') {
        const processedText = wrapJargonTerms(children);
        return <li {...props} dangerouslySetInnerHTML={{ __html: processedText }} />;
      }
      return <li {...props}>{children}</li>;
    },
    // Style lists better
    ul: ({ children, ...props }: any) => (
      <ul {...props} className="list-disc list-inside space-y-2 ml-4">
        {children}
      </ul>
    ),
    // Style code blocks
    code: ({ children, ...props }: any) => (
      <code {...props} className="bg-neutral-100 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    // Style blockquotes
    blockquote: ({ children, ...props }: any) => (
      <blockquote {...props} className="border-l-4 border-primary-500 pl-4 italic text-neutral-700">
        {children}
      </blockquote>
    ),
  };

  // Function to wrap jargon terms with proper word boundary handling
  const wrapJargonTerms = (text: string): string => {
    let processedText = text;
    
    // Sort terms by length (longest first) to avoid partial matches
    const sortedTerms = Object.entries(JARGON_TERMS).sort(([a], [b]) => b.length - a.length);
    
    sortedTerms.forEach(([key, data]) => {
      // Use word boundaries for single words, but allow phrase matching for multi-word terms
      const regex = key.includes(' ') 
        ? new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
        : new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      
      processedText = processedText.replace(regex, (match) => {
        return `<span class="jargon-term cursor-pointer text-primary-600 hover:text-primary-800 hover:underline font-medium" data-term="${key}">${match}</span>`;
      });
    });
    
    return processedText;
  };

  useEffect(() => {
    const loadLesson = async () => {
      if (!lessonId) return;
      
      setLoading(true);
      setCurrentSubsectionIndex(0); // Reset to first subsection
      
      try {
        // Load lesson structure
        const subsections = getLessonStructure(lessonId);
        setLessonSubsections(subsections);
        
        // For lessons with predefined structure, we're done
        if (subsections.length > 2) { // More than just overview + quiz
          setLoading(false);
          return;
        }
        
        // For other lessons, try to load from file
        const fileName = LESSON_FILE_MAP[lessonId];
        if (fileName) {
          const response = await fetch(`/curriculum/${fileName}`);
          if (response.ok) {
            const text = await response.text();
            setContent(text);
            // Could parse this into subsections if needed
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded mb-4"></div>
            <div className="h-4 bg-neutral-200 rounded mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-900 mb-2">Error Loading Lesson</h2>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Lesson Header */}
          <div className="mb-6">
            <nav className="text-sm text-neutral-500 mb-2">
              <button 
                onClick={() => navigate('/')}
                className="hover:text-neutral-700 transition-colors"
              >
                Dashboard
              </button>
              <span className="mx-2">→</span>
              <span>{lessonTitle}</span>
              {currentSubsection && (
                <>
                  <span className="mx-2">→</span>
                  <span className="text-neutral-700">{currentSubsection.title}</span>
                </>
              )}
            </nav>
            <h1 className="text-3xl font-bold text-neutral-900">{lessonTitle}</h1>
            {currentSubsection && (
              <h2 className="text-xl text-neutral-600 mt-2">{currentSubsection.title}</h2>
            )}
          </div>

          {/* Subsection Progress Breadcrumbs */}
          {lessonSubsections.length > 0 && (
            <div className="mb-6 bg-white rounded-lg shadow-soft p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-wrap">
                  {lessonSubsections.map((subsection, index) => (
                    <React.Fragment key={subsection.id}>
                      <button
                        onClick={() => goToSubsection(index)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          index === currentSubsectionIndex
                            ? 'bg-primary-500 text-white'
                            : index < currentSubsectionIndex
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                        }`}
                      >
                        {index + 1}. {subsection.title}
                      </button>
                      {index < lessonSubsections.length - 1 && (
                        <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="text-sm text-neutral-500">
                  {currentSubsectionIndex + 1} of {lessonSubsections.length}
                </div>
              </div>
            </div>
          )}

          {/* Current Subsection Content */}
          <div className="bg-white rounded-lg shadow-soft p-8">
            {isQuizSection ? (
              /* Quiz Section */
              <div>
                <div className="mb-6 text-center">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">Knowledge Check</h3>
                  <p className="text-neutral-600">Test your understanding of the concepts in this lesson.</p>
                </div>
                <Quiz
                  questions={getQuizQuestions()}
                  onComplete={handleQuizComplete}
                />
              </div>
            ) : (
              /* Content Section */
              <article 
                ref={contentRef}
                className="prose prose-lg prose-neutral max-w-none
                           prose-headings:text-neutral-900 prose-headings:font-semibold
                           prose-p:text-neutral-700 prose-p:leading-relaxed
                           prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                           prose-strong:text-neutral-900 prose-strong:font-semibold
                           prose-code:bg-neutral-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                           prose-hr:border-neutral-200"
              >
                <ReactMarkdown components={markdownComponents}>
                  {currentSubsection?.content || content}
                </ReactMarkdown>
              </article>
            )}
            
            {/* Subsection Navigation */}
            <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-between items-center">
              <div>
                {!isFirstSubsection ? (
                  <button 
                    onClick={goToPreviousSubsection}
                    className="flex items-center px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous: {lessonSubsections[currentSubsectionIndex - 1]?.title}
                  </button>
                ) : previousLesson ? (
                  <button 
                    onClick={() => navigate(`/lesson/${previousLesson}`)}
                    className="flex items-center px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous Lesson: {LESSON_TITLES[previousLesson]}
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
              
              
              <div>
                {!isLastSubsection ? (
                  <button 
                    onClick={goToNextSubsection}
                    className="flex items-center px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                  >
                    Next: {lessonSubsections[currentSubsectionIndex + 1]?.title}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : nextLesson ? (
                  <button 
                    onClick={() => navigate(`/lesson/${nextLesson}`)}
                    className="flex items-center px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                  >
                    Next Lesson: {LESSON_TITLES[nextLesson]}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors"
                  >
                    Complete! Return to Dashboard
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jargon Sidepanel */}
      <JargonSidepanel
        isOpen={jargonSidepanelOpen}
        onClose={() => setJargonSidepanelOpen(false)}
        term={selectedJargonTerm}
        currentLessonId={lessonId}
      />
    </>
  );
};

export default LessonPage;