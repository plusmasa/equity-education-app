import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const RouterErrorBoundary: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-soft p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-neutral-900 mb-2">Page Not Found</h1>
          <p className="text-neutral-600 mb-6">
            {error.status} {error.statusText || error.data}
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-soft p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-neutral-900 mb-2">Router Error</h1>
        <p className="text-neutral-600 mb-6">
          A navigation error occurred. This might happen during page reloads.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-300 transition-colors"
          >
            Reload Page
          </button>
        </div>
        <details className="mt-4 text-left">
          <summary className="text-sm text-neutral-500 cursor-pointer">Error Details</summary>
          <pre className="mt-2 text-xs text-neutral-600 bg-neutral-50 p-2 rounded overflow-auto max-h-32">
            {error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default RouterErrorBoundary;