import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JargonTerm } from '../types';

interface JargonSidepanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  term?: JargonTerm;
  currentLessonId?: string;
}

const JargonSidepanel: React.FC<JargonSidepanelProps> = ({ 
  isOpen = false, 
  onClose = () => {}, 
  term,
  currentLessonId 
}) => {
  // Determine if we should show the "learn more" section
  const shouldShowLearnMore = term?.learnMoreLesson && 
                             term.learnMoreLesson !== currentLessonId;
  return (
    <AnimatePresence>
      {isOpen && term && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-600 bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Sidepanel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  {term.term}
                </h3>
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Definition */}
              <div className="mb-6">
                <p className="text-neutral-700 leading-relaxed">
                  {term.definition}
                </p>
              </div>
              
              {/* Learn More - only show if term is covered in a different lesson */}
              {shouldShowLearnMore && (
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-primary-900 mb-1">
                        You'll learn more about this in:
                      </h4>
                      <p className="text-sm text-primary-700">
                        {term.learnMoreLessonTitle}
                      </p>
                      <p className="text-xs text-primary-600 mt-2">
                        Complete your current lesson first to unlock this content.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JargonSidepanel;