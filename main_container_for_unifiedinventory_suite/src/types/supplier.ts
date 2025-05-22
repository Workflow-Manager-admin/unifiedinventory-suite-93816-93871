/**
 * Type definitions for the Supplier Portal in UnifiedInventory Suite
 */

// Basic supplier entity interface
export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  taxId?: string;
  paymentTerms?: string;
  notes?: string;
  rating?: number; // 1-5 star rating
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  lastUpdated: Date;
  tags?: string[];
  categories?: string[]; // Product categories they supply
  leadTime?: number; // Average lead time in days
}

// Inventory item association
export interface SupplierItemAssociation {
  supplierId: string;
  itemId: string;
  isPrimarySupplier: boolean;
  unitPrice: number;
  minOrderQuantity?: number;
  leadTime?: number; // Specific lead time for this item
  lastPurchaseDate?: Date;
}

// Supplier transaction type
export interface SupplierTransaction {
  id: string;
  supplierId: string;
  type: 'order' | 'payment' | 'return' | 'credit';
  amount: number;
  date: Date;
  notes?: string;
  referenceNumber?: string;
  status: 'pending' | 'completed' | 'cancelled';
}

// Supplier contact person
export interface SupplierContact {
  id: string;
  supplierId: string;
  name: string;
  position?: string;
  email?: string;
  phone?: string;
  isPrimary: boolean;
}

// Supplier statistics and analytics
export interface SupplierStats {
  totalSuppliers: number;
  activeSuppliers: number;
  inactiveSuppliers: number;
  averageLeadTime: number;
  totalOrdersValue: number;
  topSuppliers: Supplier[];
}

// Filter options for supplier listing
export interface SupplierFilter {
  categories?: string[];
  status?: 'active' | 'inactive' | 'pending' | 'all';
  search?: string;
  sortBy?: 'name' | 'rating' | 'leadTime' | 'lastUpdated';
  sortDirection?: 'asc' | 'desc';
}
