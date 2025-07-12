import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const stages = [
    {
      id: 1,
      title: 'Foundations of Investing',
      sections: [
        { id: '1.1', title: 'What is Investing?', path: '/lesson/stage1-section1' },
        { id: '1.2', title: 'Equity Basics', path: '/lesson/stage1-section2-equity' },
        { id: '1.3', title: 'Public vs. Private', path: '/lesson/stage1-section2-public' },
      ]
    },
    {
      id: 2,
      title: 'Startup Investing',
      sections: [
        { id: '2.1', title: 'Startup Lifecycle', path: '/lesson/stage2-section1-lifecycle' },
        { id: '2.2', title: 'Shares & Dilution', path: '/lesson/stage2-section2' },
        { id: '2.3', title: 'Options & Vesting', path: '/lesson/stage2-section3' },
        { id: '2.4', title: 'Exits & Cashing Out', path: '/lesson/stage2-section4' },
      ]
    },
    {
      id: 3,
      title: 'Public Company Compensation',
      sections: [
        { id: '3.1', title: 'RSUs & Stock Grants', path: '/lesson/stage3-section1' },
        { id: '3.2', title: 'Capital Gains & Taxes', path: '/lesson/stage3-section2' },
        { id: '3.3', title: 'Advanced Concepts', path: '/lesson/stage3-section3' },
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
                  {stage.sections.map((section) => (
                    <Link
                      key={section.id}
                      to={section.path}
                      className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                        location.pathname === section.path
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`}
                    >
                      {section.id} {section.title}
                    </Link>
                  ))}
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