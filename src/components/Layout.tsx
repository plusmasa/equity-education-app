import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import JargonSidepanel from './JargonSidepanel';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:pl-64">
          <Outlet />
        </main>
        <JargonSidepanel />
      </div>
    </div>
  );
};

export default Layout;