import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome to Equity Education
          </h1>
          <p className="text-lg text-neutral-600">
            Learn about investing, equity compensation, and building wealth through interactive lessons and minigames.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-700">0/12</div>
              <div className="text-sm text-primary-600">Lessons Completed</div>
            </div>
            <div className="text-center p-4 bg-secondary-50 rounded-lg">
              <div className="text-2xl font-bold text-secondary-700">0</div>
              <div className="text-sm text-secondary-600">Minigames Played</div>
            </div>
            <div className="text-center p-4 bg-neutral-100 rounded-lg">
              <div className="text-2xl font-bold text-neutral-700">0</div>
              <div className="text-sm text-neutral-600">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-soft p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                1
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Foundations</h3>
            </div>
            <p className="text-neutral-600 mb-4">
              Learn the basics of investing, assets, and risk/reward relationships.
            </p>
            <Link
              to="/lesson/stage1-section1"
              className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              Start Learning
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6 opacity-75">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-neutral-300 text-neutral-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                2
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Startup Equity</h3>
            </div>
            <p className="text-neutral-600 mb-4">
              Understand stock options, vesting, dilution, and startup exits.
            </p>
            <button 
              disabled
              className="inline-flex items-center px-4 py-2 bg-neutral-300 text-neutral-500 rounded-md cursor-not-allowed"
            >
              Complete Stage 1 First
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6 opacity-75">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-neutral-300 text-neutral-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                3
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Public Company</h3>
            </div>
            <p className="text-neutral-600 mb-4">
              Learn about RSUs, stock grants, and tax implications.
            </p>
            <button 
              disabled
              className="inline-flex items-center px-4 py-2 bg-neutral-300 text-neutral-500 rounded-md cursor-not-allowed"
            >
              Complete Stages 1-2 First
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-primary-50 rounded-lg p-6 border border-primary-200">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">💡 Pro Tip</h3>
          <p className="text-primary-700">
            Complete lessons in order to build your understanding progressively. Each stage builds on concepts from previous stages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;