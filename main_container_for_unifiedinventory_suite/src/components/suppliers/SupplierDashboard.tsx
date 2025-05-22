"use client";

import React, { useEffect } from 'react';
import { useSupplier } from '@/contexts/SupplierContext';
import Link from 'next/link';

// PUBLIC_INTERFACE
export default function SupplierDashboard() {
  const { state, dispatch } = useSupplier();
  const { stats, isLoading, error } = state;

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Data loading already handled in SupplierContext
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load supplier data';
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
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Suppliers Dashboard</h1>
      
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Suppliers" 
          value={stats?.totalSuppliers || 0} 
          icon={
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Active Suppliers" 
          value={stats?.activeSuppliers || 0}
          icon={
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          className="bg-green-50 dark:bg-green-900/20"
        />
        
        <StatCard 
          title="Avg. Lead Time" 
          value={`${Math.round(stats?.averageLeadTime || 0)} days`}
          icon={
            <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          className="bg-yellow-50 dark:bg-yellow-900/20"
        />
        
        <StatCard 
          title="Total Orders Value" 
          value={`$${(stats?.totalOrdersValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={
            <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          }
          className="bg-purple-50 dark:bg-purple-900/20"
        />
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ActionButton 
            label="Add New Supplier" 
            href="/suppliers/add"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          />
          <ActionButton 
            label="Create Purchase Order" 
            href="/suppliers/orders/new"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
          <ActionButton 
            label="Import Suppliers" 
            href="/suppliers/import"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            }
          />
          <ActionButton 
            label="Export Data" 
            href="/suppliers/export"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            }
          />
        </div>
      </div>
      
      {/* Top Suppliers and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Suppliers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Top Suppliers</h2>
          <div className="space-y-3">
            {stats?.topSuppliers?.map(supplier => (
              <TopSupplierItem 
                key={supplier.id}
                id={supplier.id}
                name={supplier.name}
                rating={supplier.rating || 0}
                leadTime={supplier.leadTime || 'N/A'}
                categories={supplier.categories || []}
              />
            ))}
            
            {(!stats?.topSuppliers || stats.topSuppliers.length === 0) && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No supplier data available
              </p>
            )}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem 
              action="New supplier added"
              subject="Tech Components Ltd."
              user="John Smith"
              time="10 minutes ago"
            />
            <ActivityItem 
              action="Purchase order sent"
              subject="Acme Supplies"
              user="Sarah Johnson"
              time="2 hours ago"
            />
            <ActivityItem 
              action="Price update"
              subject="Global Electronics"
              user="Mike Wilson"
              time="Yesterday at 4:30 PM"
            />
            <ActivityItem 
              action="Contract renewed"
              subject="Premium Materials Co."
              user="Lisa Brown"
              time="2 days ago"
            />
          </div>
        </div>
      </div>
      
      {/* Supplier Performance and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Supplier Performance</h2>
          
          <div className="space-y-4">
            <PerformanceMetric 
              label="Average On-Time Delivery" 
              value={94} 
              target={95}
              barColor="bg-blue-500"
            />
            <PerformanceMetric 
              label="Quality Rating" 
              value={88} 
              target={90}
              barColor="bg-green-500"
            />
            <PerformanceMetric 
              label="Price Competitiveness" 
              value={85} 
              target={80}
              barColor="bg-purple-500"
            />
            <PerformanceMetric 
              label="Response Time" 
              value={92} 
              target={85}
              barColor="bg-indigo-500"
            />
          </div>
        </div>
        
        {/* Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Alerts</h2>
          <div className="space-y-3">
            <Alert 
              type="warning"
              message="3 supplier contracts expiring in the next 30 days"
            />
            <Alert 
              type="info"
              message="Price changes detected from 2 suppliers"
            />
            <Alert 
              type="error"
              message="Late delivery from Acme Supplies - 5 days overdue"
            />
            <Alert 
              type="success"
              message="New supplier onboarding completed for Tech Components Ltd."
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
  icon: React.ReactNode;
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
  icon: React.ReactNode;
  href: string;
}

function ActionButton({ label, icon, href }: ActionButtonProps) {
  return (
    <Link 
      href={href} 
      className="flex items-center justify-center flex-col py-3 px-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300"
    >
      <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600 dark:text-blue-400 mb-2">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

interface TopSupplierItemProps {
  id: string;
  name: string;
  rating: number;
  leadTime: number | string;
  categories: string[];
}

function TopSupplierItem({ id, name, rating, leadTime, categories }: TopSupplierItemProps) {
  return (
    <Link 
      href={`/suppliers/${id}`}
      className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
          <div className="flex items-center mt-1">
            <SupplierRating rating={rating} />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {typeof leadTime === 'number' ? `${leadTime} days lead time` : leadTime}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {categories.map((category, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

interface ActivityItemProps {
  action: string;
  subject: string;
  user: string;
  time: string;
}

function ActivityItem({ action, subject, user, time }: ActivityItemProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-800 dark:text-white">
          {action}: <span className="font-semibold text-blue-600 dark:text-blue-400">{subject}</span>
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">by {user}</p>
    </div>
  );
}

interface PerformanceMetricProps {
  label: string;
  value: number;
  target: number;
  barColor: string;
}

function PerformanceMetric({ label, value, target, barColor }: PerformanceMetricProps) {
  const isOnTarget = value >= target;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <div className="flex items-center">
          <span className="text-sm font-semibold text-gray-900 dark:text-white mr-2">{value}%</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Target: {target}%</span>
          {isOnTarget ? (
            <svg className="w-4 h-4 text-green-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-yellow-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div className={`${barColor} h-2 rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
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

interface SupplierRatingProps {
  rating: number;
}

function SupplierRating({ rating }: SupplierRatingProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}
