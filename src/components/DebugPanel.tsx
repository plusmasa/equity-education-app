import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DebugPanelProps {
  appState?: any;
  errors?: string[];
  loadedContent?: any;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ 
  appState = {}, 
  errors = [], 
  loadedContent = {} 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('state');

  return (
    <>
      {/* Debug Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-neutral-800 text-white p-3 rounded-full shadow-lg hover:bg-neutral-700 transition-colors z-30"
        title="Open Debug Panel"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Debug Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-200 shadow-2xl z-40 h-96"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('state')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      activeTab === 'state' 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    App State
                  </button>
                  <button
                    onClick={() => setActiveTab('errors')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      activeTab === 'errors' 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Errors ({errors.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      activeTab === 'content' 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Loaded Content
                  </button>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'state' && (
                  <pre className="text-xs text-neutral-700 whitespace-pre-wrap">
                    {JSON.stringify(appState, null, 2)}
                  </pre>
                )}
                
                {activeTab === 'errors' && (
                  <div className="space-y-2">
                    {errors.length === 0 ? (
                      <p className="text-sm text-neutral-500">No errors detected</p>
                    ) : (
                      errors.map((error, index) => (
                        <div key={index} className="bg-red-50 border border-red-200 rounded p-3">
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
                
                {activeTab === 'content' && (
                  <pre className="text-xs text-neutral-700 whitespace-pre-wrap">
                    {JSON.stringify(loadedContent, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DebugPanel;