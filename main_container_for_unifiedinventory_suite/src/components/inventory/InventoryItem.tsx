"use client";

import React, { useEffect } from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import { inventoryService } from '@/services/inventoryService';
import { InventoryTransaction } from '@/types/inventory';

interface InventoryItemProps {
  itemId: string;
}

// PUBLIC_INTERFACE
export default function InventoryItem({ itemId }: InventoryItemProps) {
  const { state, dispatch, fetchItem } = useInventory();
  const { currentItem, isLoading, error } = state;
  
  useEffect(() => {
    fetchItem(itemId);
  }, [itemId, fetchItem]);
  
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
  
  if (!currentItem) {
    return (
      <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-500 text-yellow-700 dark:text-yellow-400 px-4 py-3 rounded">
        <p className="font-bold">Item Not Found</p>
        <p>The inventory item you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  // Mock transactions for the current item
  const mockTransactions: InventoryTransaction[] = [
    {
      id: 't1',
      itemId: currentItem.id,
      type: 'purchase',
      quantity: 50,
      date: new Date(2023, 8, 10),
      notes: 'Regular order from supplier',
      performedBy: 'John Smith'
    },
    {
      id: 't2',
      itemId: currentItem.id,
      type: 'sale',
      quantity: 15,
      date: new Date(2023, 8, 15),
      documentReference: 'SO-12345',
      performedBy: 'Sarah Johnson'
    },
    {
      id: 't3',
      itemId: currentItem.id,
      type: 'adjustment',
      quantity: -3,
      date: new Date(2023, 8, 20),
      notes: 'Damaged in warehouse',
      performedBy: 'Mike Wilson'
    },
    {
      id: 't4',
      itemId: currentItem.id,
      type: 'transfer',
      quantity: 10,
      date: new Date(2023, 8, 25),
      notes: 'Moved to Warehouse B',
      performedBy: 'Lisa Brown'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{currentItem.name}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">SKU: {currentItem.sku}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Item
          </button>
          
          <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Label
          </button>
          
          <button className="inline-flex items-center justify-center px-4 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
      
      {/* Item details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Item Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem label="Category" value={currentItem.category} />
              <DetailItem label="Location" value={currentItem.location} />
              <DetailItem label="Unit Price" value={`$${currentItem.unitPrice.toFixed(2)}`} />
              <DetailItem 
                label="Quantity" 
                value={
                  <QuantityStatus 
                    quantity={currentItem.quantity} 
                    reorderPoint={currentItem.reorderPoint} 
                  />
                } 
              />
              <DetailItem label="Reorder Point" value={currentItem.reorderPoint.toString()} />
              <DetailItem label="Total Value" value={`$${(currentItem.quantity * currentItem.unitPrice).toFixed(2)}`} />
              <DetailItem label="Created On" value={formatDate(currentItem.createdAt)} />
              <DetailItem label="Last Updated" value={formatDate(currentItem.lastUpdated)} />
            </div>
            
            {currentItem.description && (
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2 text-gray-800 dark:text-white">Description</h3>
                <p className="text-gray-600 dark:text-gray-400">{currentItem.description}</p>
              </div>
            )}
            
            {currentItem.tags && currentItem.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2 text-gray-800 dark:text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentItem.tags.map((tag, index) => (
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
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Transaction History</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Performed By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockTransactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <TransactionBadge type={transaction.type} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {transaction.quantity > 0 ? `+${transaction.quantity}` : transaction.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {transaction.performedBy}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {transaction.notes || 
                         (transaction.documentReference ? `Ref: ${transaction.documentReference}` : '-')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Sidebar with additional info */}
        <div className="space-y-6">
          {/* Supplier info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Supplier Info</h2>
            
            <div className="space-y-3">
              <DetailItem label="Supplier" value={currentItem.supplierInfo.name} />
              {currentItem.supplierInfo.contactName && (
                <DetailItem label="Contact" value={currentItem.supplierInfo.contactName} />
              )}
              {currentItem.supplierInfo.email && (
                <DetailItem 
                  label="Email" 
                  value={
                    <a href={`mailto:${currentItem.supplierInfo.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {currentItem.supplierInfo.email}
                    </a>
                  }
                />
              )}
              {currentItem.supplierInfo.phone && (
                <DetailItem 
                  label="Phone" 
                  value={
                    <a href={`tel:${currentItem.supplierInfo.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {currentItem.supplierInfo.phone}
                    </a>
                  }
                />
              )}
              {currentItem.supplierInfo.leadTime && (
                <DetailItem label="Lead Time" value={`${currentItem.supplierInfo.leadTime} days`} />
              )}
              
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Place Order
                </button>
              </div>
            </div>
          </div>
          
          {/* Stock level visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Stock Level</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Current Stock</span>
                  <span className="font-medium text-gray-800 dark:text-white">{currentItem.quantity} units</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <StockLevelBar quantity={currentItem.quantity} reorderPoint={currentItem.reorderPoint} />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>0</span>
                  <span>Reorder: {currentItem.reorderPoint}</span>
                  <span>Max: {currentItem.quantity * 2}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white">Stock Status</h3>
                <StockStatusMessage quantity={currentItem.quantity} reorderPoint={currentItem.reorderPoint} />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white">Recommended Action</h3>
                <RecommendedAction quantity={currentItem.quantity} reorderPoint={currentItem.reorderPoint} />
              </div>
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
            
            <div className="space-y-3">
              <button className="w-full text-left inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add Stock
              </button>
              <button className="w-full text-left inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Remove Stock
              </button>
              <button className="w-full text-left inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Transfer Stock
              </button>
              <button className="w-full text-left inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Reports
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

interface QuantityStatusProps {
  quantity: number;
  reorderPoint: number;
}

function QuantityStatus({ quantity, reorderPoint }: QuantityStatusProps) {
  if (quantity === 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
        Out of Stock
      </span>
    );
  }
  
  if (quantity <= reorderPoint) {
    return (
      <div className="flex items-center">
        <span className="mr-2">{quantity}</span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          Low Stock
        </span>
      </div>
    );
  }
  
  return <span>{quantity}</span>;
}

interface TransactionBadgeProps {
  type: 'purchase' | 'sale' | 'adjustment' | 'transfer';
}

function TransactionBadge({ type }: TransactionBadgeProps) {
  const badges = {
    purchase: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    sale: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    adjustment: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    transfer: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
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

interface StockLevelBarProps {
  quantity: number;
  reorderPoint: number;
}

function StockLevelBar({ quantity, reorderPoint }: StockLevelBarProps) {
  const maxStock = quantity * 2 || reorderPoint * 3;
  const percentage = Math.min(Math.round((quantity / maxStock) * 100), 100);
  
  let color;
  if (quantity === 0) {
    color = 'bg-red-600';
  } else if (quantity <= reorderPoint) {
    color = 'bg-yellow-500';
  } else {
    color = 'bg-green-600';
  }
  
  return (
    <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
  );
}

function StockStatusMessage({ quantity, reorderPoint }: QuantityStatusProps) {
  if (quantity === 0) {
    return <p className="text-sm text-red-600 dark:text-red-400">Item is out of stock.</p>;
  }
  
  if (quantity <= reorderPoint) {
    return <p className="text-sm text-yellow-600 dark:text-yellow-400">Stock is below reorder point.</p>;
  }
  
  const daysRemaining = Math.round((quantity - reorderPoint) * 5); // Assuming 5 days per unit over reorder point
  return <p className="text-sm text-green-600 dark:text-green-400">Stock levels are good. Estimated {daysRemaining} days remaining before reorder needed.</p>;
}

function RecommendedAction({ quantity, reorderPoint }: QuantityStatusProps) {
  if (quantity === 0) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400 font-medium">
        Place order immediately.
      </p>
    );
  }
  
  if (quantity <= reorderPoint) {
    return (
      <p className="text-sm text-yellow-600 dark:text-yellow-400">
        Place order with supplier. Recommended order: {reorderPoint * 2 - quantity} units.
      </p>
    );
  }
  
  return (
    <p className="text-sm text-green-600 dark:text-green-400">
      No action required at this time.
    </p>
  );
}
