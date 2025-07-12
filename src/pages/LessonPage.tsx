import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

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

interface LessonPageProps {}

const LessonPage: React.FC<LessonPageProps> = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadLesson = async () => {
      if (!lessonId) return;
      
      const fileName = LESSON_FILE_MAP[lessonId];
      if (!fileName) {
        setError('Lesson not found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/curriculum/${fileName}`);
        if (!response.ok) {
          throw new Error(`Failed to load lesson: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
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
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-soft p-8">
          <article className="prose prose-neutral max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
          
          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-between">
            <button className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors">
              ← Previous Lesson
            </button>
            <button className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
              Next Lesson →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;