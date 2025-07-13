import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Try to clean up potentially corrupted localStorage
    try {
      const corruptedKeys = ['completedLessons'];
      corruptedKeys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            JSON.parse(value);
          } catch {
            console.warn(`Removing corrupted localStorage key: ${key}`);
            localStorage.removeItem(key);
          }
        }
      });
    } catch (cleanupError) {
      console.error('Error during localStorage cleanup:', cleanupError);
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-soft p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-neutral-900 mb-2">Something went wrong</h1>
            <p className="text-neutral-600 mb-6">
              The app encountered an unexpected error. Don't worry, your progress is saved.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  // Try to recover without full reload
                  this.setState({ hasError: false, error: undefined });
                  window.history.pushState({}, '', '/');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Try to Recover
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-4 py-2 bg-neutral-200 text-neutral-700 rounded-md hover:bg-neutral-300 transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  // Clear all localStorage before reload as last resort
                  localStorage.clear();
                  window.location.reload();
                }}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Reset Everything & Reload
              </button>
            </div>
            {this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-neutral-500 cursor-pointer">Error Details</summary>
                <pre className="mt-2 text-xs text-neutral-600 bg-neutral-50 p-2 rounded overflow-auto max-h-32">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;