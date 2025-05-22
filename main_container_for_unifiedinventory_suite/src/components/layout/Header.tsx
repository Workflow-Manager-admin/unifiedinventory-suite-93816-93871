"use client";

import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

// PUBLIC_INTERFACE
export default function Header({ toggleSidebar, sidebarOpen }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Left side - Menu button and search */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 lg:hidden"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Quick search..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-gray-300 text-sm"
            />
          </div>
        </div>
        
        {/* Right side - Actions and user menu */}
        <div className="flex items-center space-x-4">
          {/* Notification bell */}
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 relative">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          {/* Theme toggle */}
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          
          {/* User dropdown */}
          <div className="relative">
            <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
                <img
                  src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="ml-2 font-medium text-sm hidden md:block">Admin User</span>
              <svg className="ml-1 h-4 w-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Breadcrumbs - optional for deeper pages */}
      <div className="px-4 sm:px-6 py-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Inventory</span>
      </div>
    </header>
  );
}
