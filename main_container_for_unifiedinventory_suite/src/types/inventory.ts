/**
 * Type definitions for the UnifiedInventory Suite
 */

// Basic inventory item interface
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unitPrice: number;
  location: string;
  reorderPoint: number;
  supplierInfo: SupplierInfo;
  lastUpdated: Date;
  createdAt: Date;
  description?: string;
  tags?: string[];
  imageUrl?: string;
}

// Supplier information
export interface SupplierInfo {
  id: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  leadTime?: number; // Days it takes to receive an order
}

// Inventory transaction type
export interface InventoryTransaction {
  id: string;
  itemId: string;
  type: 'purchase' | 'sale' | 'adjustment' | 'transfer';
  quantity: number;
  date: Date;
  notes?: string;
  performedBy: string;
  documentReference?: string;
}

// Inventory statistics and analytics
export interface InventoryStats {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  inventoryTurnover: number;
  mostMovingItems: InventoryItem[];
  leastMovingItems: InventoryItem[];
}

// Filter options for inventory listing
export interface InventoryFilter {
  categories?: string[];
  minQuantity?: number;
  maxQuantity?: number;
  location?: string;
  search?: string;
  sortBy?: 'name' | 'quantity' | 'unitPrice' | 'lastUpdated';
  sortDirection?: 'asc' | 'desc';
}
