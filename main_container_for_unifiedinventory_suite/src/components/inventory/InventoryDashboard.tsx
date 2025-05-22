"use client";

import React, { JSX, useEffect } from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { inventoryService } from '@/services/inventoryService';

// PUBLIC_INTERFACE
export default function InventoryDashboard() {
  const { state, dispatch } = useInventory();
  const { stats, isLoading, error } = state;

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const items = await inventoryService.getInventoryItems();
        dispatch({ type: 'SET_ITEMS', payload: items });
        
        const statsData = await inventoryService.getInventoryStats();
        dispatch({ type: 'SET_STATS', payload: statsData });
        
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load inventory data';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Inventory Dashboard</h1>
      
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Items" 
          value={stats?.totalItems || 0} 
          icon={
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          }
        />
        
        <StatCard 
          title="Total Value" 
          value={`$${stats?.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`}
          icon={
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Low Stock Items" 
          value={stats?.lowStockItems || 0}
          icon={
            <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
          className="bg-yellow-50 dark:bg-yellow-900/20"
        />
        
        <StatCard 
          title="Out of Stock" 
          value={stats?.outOfStockItems || 0}
          icon={
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          className="bg-red-50 dark:bg-red-900/20"
        />
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionButton 
            label="Add New Item" 
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
            onClick={() => console.log('Add item')}
          />
          <ActionButton 
            label="Import Data" 
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            }
            onClick={() => console.log('Import data')}
          />
          <ActionButton 
            label="Export Report" 
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            }
            onClick={() => console.log('Export report')}
          />
          <ActionButton 
            label="Print Labels" 
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            }
            onClick={() => console.log('Print labels')}
          />
        </div>
      </div>
      
      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem 
              action="Added new item"
              item="Widget A"
              user="John Smith"
              time="10 minutes ago"
            />
            <ActivityItem 
              action="Updated quantity"
              item="Gadget B"
              user="Sarah Johnson"
              time="2 hours ago"
            />
            <ActivityItem 
              action="Placed order"
              item="Various items"
              user="Mike Wilson"
              time="Yesterday at 4:30 PM"
            />
            <ActivityItem 
              action="Removed item"
              item="Obsolete Part C"
              user="Lisa Brown"
              time="2 days ago"
            />
          </div>
        </div>
        
        {/* Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Alerts</h2>
          <div className="space-y-3">
            <Alert 
              type="error"
              message="5 items are out of stock"
            />
            <Alert 
              type="warning"
              message="Low stock for 10 items - reorder required"
            />
            <Alert 
              type="info"
              message="Monthly inventory report due in 3 days"
            />
            <Alert 
              type="success"
              message="Last order from Acme Supplies has been delivered"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  className?: string;
}

function StatCard({ title, value, icon, className = 'bg-blue-50 dark:bg-blue-900/20' }: StatCardProps) {
  return (
    <div className={`rounded-lg shadow p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
        </div>
        <div className="rounded-md bg-white dark:bg-gray-700 p-3 shadow-md">
          {icon}
        </div>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}

function ActionButton({ label, icon, onClick }: ActionButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className="flex items-center justify-center flex-col py-3 px-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
    >
      <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600 dark:text-blue-400 mb-2">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

interface ActivityItemProps {
  action: string;
  item: string;
  user: string;
  time: string;
}

function ActivityItem({ action, item, user, time }: ActivityItemProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-800 dark:text-white">
          {action}: <span className="font-semibold text-blue-600 dark:text-blue-400">{item}</span>
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">by {user}</p>
    </div>
  );
}

interface AlertProps {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

function Alert({ type, message }: AlertProps) {
  const typeStyles = {
    error: 'bg-red-100 border-red-400 text-red-700 dark:bg-red-900/30 dark:border-red-500 dark:text-red-400',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-500 dark:text-yellow-400',
    info: 'bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-400',
    success: 'bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-500 dark:text-green-400'
  };

  return (
    <div className={`border-l-4 rounded p-3 ${typeStyles[type]}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
}
