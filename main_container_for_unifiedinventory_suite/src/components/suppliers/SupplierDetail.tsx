"use client";

import React, { useEffect } from 'react';
import { useSupplier } from '@/contexts/SupplierContext';
import { useInventory } from '@/contexts/InventoryContext';
import Link from 'next/link';

interface SupplierDetailProps {
  supplierId: string;
}

// PUBLIC_INTERFACE
export default function SupplierDetail({ supplierId }: SupplierDetailProps) {
  const { state: supplierState, fetchSupplier, fetchSupplierItems } = useSupplier();
  const { state: inventoryState } = useInventory();
  
  const { currentSupplier, supplierItems, isLoading, error } = supplierState;
  
  useEffect(() => {
    fetchSupplier(supplierId);
    fetchSupplierItems(supplierId);
  }, [supplierId, fetchSupplier, fetchSupplierItems]);

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
  
  if (!currentSupplier) {
    return (
      <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-500 text-yellow-700 dark:text-yellow-400 px-4 py-3 rounded">
        <p className="font-bold">Supplier Not Found</p>
        <p>The supplier you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  // Find inventory items that are supplied by this supplier
  const supplierInventoryItems = supplierItems.map(si => {
    const item = inventoryState.items.find(item => item.id === si.itemId);
    return { ...si, item };
  });

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mr-3">{currentSupplier.name}</h1>
            <StatusBadge status={currentSupplier.status} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">ID: {currentSupplier.id}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Link 
            href={`/suppliers/${currentSupplier.id}/edit`}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Supplier
          </Link>
          
          <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Info
          </button>
          
          <button className="inline-flex items-center justify-center px-4 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
      
      {/* Supplier details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="md:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Supplier Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem label="Contact Name" value={currentSupplier.contactName} />
              <DetailItem 
                label="Email" 
                value={
                  <a href={`mailto:${currentSupplier.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {currentSupplier.email}
                  </a>
                } 
              />
              <DetailItem 
                label="Phone" 
                value={
                  <a href={`tel:${currentSupplier.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {currentSupplier.phone}
                  </a>
                } 
              />
              {currentSupplier.website && (
                <DetailItem 
                  label="Website" 
                  value={
                    <a href={currentSupplier.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      {currentSupplier.website}
                    </a>
                  } 
                />
              )}
              <DetailItem label="Address" value={currentSupplier.address || 'Not provided'} />
              <DetailItem label="Payment Terms" value={currentSupplier.paymentTerms || 'Not specified'} />
              {currentSupplier.taxId && (
                <DetailItem label="Tax ID" value={currentSupplier.taxId} />
              )}
              <DetailItem label="Lead Time" value={currentSupplier.leadTime ? `${currentSupplier.leadTime} days` : 'Not specified'} />
              <DetailItem label="Created On" value={formatDate(currentSupplier.createdAt)} />
              <DetailItem label="Last Updated" value={formatDate(currentSupplier.lastUpdated)} />
              {currentSupplier.rating !== undefined && (
                <DetailItem label="Rating" value={<SupplierRating rating={currentSupplier.rating} />} />
              )}
            </div>
            
            {currentSupplier.notes && (
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2 text-gray-800 dark:text-white">Notes</h3>
                <p className="text-gray-600 dark:text-gray-400">{currentSupplier.notes}</p>
              </div>
            )}
            
            {currentSupplier.tags && currentSupplier.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2 text-gray-800 dark:text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentSupplier.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {currentSupplier.categories && currentSupplier.categories.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2 text-gray-800 dark:text-white">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {currentSupplier.categories.map((category, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Supplied Items */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Supplied Items</h2>
                <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Item
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {supplierInventoryItems.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No items associated with this supplier
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Item Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        SKU
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Min Order
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Lead Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Last Purchase
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Primary
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {supplierInventoryItems.map((supplierItem) => (
                      <tr key={supplierItem.itemId} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link 
                            href={`/inventory/${supplierItem.itemId}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                          >
                            {supplierItem.item?.name || `Item #${supplierItem.itemId}`}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {supplierItem.item?.sku || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          ${supplierItem.unitPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {supplierItem.minOrderQuantity || 'None'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {supplierItem.leadTime ? `${supplierItem.leadTime} days` : 'Standard'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {supplierItem.lastPurchaseDate ? formatDate(supplierItem.lastPurchaseDate) : 'Never'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {supplierItem.isPrimarySupplier ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Primary
                            </span>
                          ) : 'No'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          
          {/* Order History - Placeholder for future implementation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Order History</h2>
            </div>
            
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              Order history feature coming soon
            </div>
          </div>
        </div>
        
        {/* Sidebar with additional info */}
        <div className="space-y-6">
          {/* Performance metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Performance Metrics</h2>
            
            <div className="space-y-4">
              <MetricItem 
                label="Reliability Score" 
                value={92} 
                barColor="bg-blue-500"
                description="Based on delivery performance"
              />
              <MetricItem 
                label="Quality Score" 
                value={88} 
                barColor="bg-green-500"
                description="Based on product quality and returns"
              />
              <MetricItem 
                label="Response Time" 
                value={95} 
                barColor="bg-purple-500"
                description="Based on communication efficiency"
              />
            </div>
          </div>
          
          {/* Financial Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Financial Summary</h2>
            
            <div className="space-y-3">
              <DetailItem label="Total Spend YTD" value="$125,750.00" />
              <DetailItem label="Open Orders" value="$12,450.00" />
              <DetailItem label="Average Order" value="$5,230.00" />
              
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Create Purchase Order
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
            
            <div className="space-y-3">
              <button className="w-full text-left inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Supplier
              </button>
              <button className="w-full text-left inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                View Contracts
              </button>
              <button className="w-full text-left inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Reports
              </button>
              <button className="w-full text-left inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Add Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: React.ReactNode;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-1 text-md text-gray-800 dark:text-gray-200">{value}</p>
    </div>
  );
}

interface MetricItemProps {
  label: string;
  value: number;
  barColor: string;
  description?: string;
}

function MetricItem({ label, value, barColor, description }: MetricItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div className={`${barColor} h-2 rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </div>
  );
}

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending';
}

function StatusBadge({ status }: StatusBadgeProps) {
  const badges = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
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

function formatDate(date: Date): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  });
}
