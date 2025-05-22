"use client";

import React, { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { InventoryProvider } from '@/contexts/InventoryContext';
import { SupplierProvider } from '@/contexts/SupplierContext';

interface MainContainerProps {
  children: ReactNode;
}

// PUBLIC_INTERFACE
export default function MainContainer({ children }: MainContainerProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <InventoryProvider>
      <SupplierProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Main Content Area */}
        <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : ''}`}>
          {/* Header */}
          <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 shadow-md p-4 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} UnifiedInventory Suite. All rights reserved.</p>
          </footer>
        </div>
      </div>
      </SupplierProvider>
    </InventoryProvider>
  );
}
