import React from 'react';
import Header from './Header';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-6 text-center text-gray-400 text-sm">
        &copy; 2026 WayPilgrim. All rights reserved.
      </footer>
    </div>
  );
}

export default MainLayout;
