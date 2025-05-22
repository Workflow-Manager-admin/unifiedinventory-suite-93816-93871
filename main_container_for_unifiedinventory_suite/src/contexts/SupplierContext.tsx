"use client";

import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { Supplier, SupplierFilter, SupplierStats, SupplierItemAssociation } from '@/types/supplier';
import { supplierService } from '@/services/supplierService';

// Define the state shape
interface SupplierState {
  suppliers: Supplier[];
  filteredSuppliers: Supplier[];
  currentSupplier: Supplier | null;
  supplierItems: SupplierItemAssociation[];
  isLoading: boolean;
  error: string | null;
  filter: SupplierFilter;
  stats: SupplierStats | null;
}

// Define the action types
type SupplierAction =
  | { type: 'SET_SUPPLIERS'; payload: Supplier[] }
  | { type: 'SET_FILTERED_SUPPLIERS'; payload: Supplier[] }
  | { type: 'SET_CURRENT_SUPPLIER'; payload: Supplier | null }
  | { type: 'SET_SUPPLIER_ITEMS'; payload: SupplierItemAssociation[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTER'; payload: SupplierFilter }
  | { type: 'SET_STATS'; payload: SupplierStats }
  | { type: 'ADD_SUPPLIER'; payload: Supplier }
  | { type: 'UPDATE_SUPPLIER'; payload: Supplier }
  | { type: 'DELETE_SUPPLIER'; payload: string }
  | { type: 'ADD_SUPPLIER_ITEM'; payload: SupplierItemAssociation }
  | { type: 'UPDATE_SUPPLIER_ITEM'; payload: SupplierItemAssociation }
  | { type: 'REMOVE_SUPPLIER_ITEM'; payload: { supplierId: string, itemId: string } };

// Create the context
interface SupplierContextType {
  state: SupplierState;
  dispatch: React.Dispatch<SupplierAction>;
  applyFilter: (filter: SupplierFilter) => void;
  fetchSupplier: (id: string) => Promise<void>;
  saveSupplier: (supplier: Supplier) => Promise<void>;
  deleteSupplier: (id: string) => Promise<void>;
  fetchSupplierItems: (supplierId: string) => Promise<void>;
  associateItem: (association: SupplierItemAssociation) => Promise<void>;
  removeItemAssociation: (supplierId: string, itemId: string) => Promise<void>;
}

const SupplierContext = createContext<SupplierContextType | undefined>(undefined);

// Initial state
const initialState: SupplierState = {
  suppliers: [],
  filteredSuppliers: [],
  currentSupplier: null,
  supplierItems: [],
  isLoading: false,
  error: null,
  filter: {
    sortBy: 'name',
    sortDirection: 'asc',
    status: 'active'
  },
  stats: null
};

// Reducer function
function supplierReducer(state: SupplierState, action: SupplierAction): SupplierState {
  switch (action.type) {
    case 'SET_SUPPLIERS':
      return {
        ...state,
        suppliers: action.payload,
        filteredSuppliers: action.payload
      };
    case 'SET_FILTERED_SUPPLIERS':
      return {
        ...state,
        filteredSuppliers: action.payload
      };
    case 'SET_CURRENT_SUPPLIER':
      return {
        ...state,
        currentSupplier: action.payload
      };
    case 'SET_SUPPLIER_ITEMS':
      return {
        ...state,
        supplierItems: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'SET_STATS':
      return {
        ...state,
        stats: action.payload
      };
    case 'ADD_SUPPLIER':
      return {
        ...state,
        suppliers: [...state.suppliers, action.payload],
        filteredSuppliers: [...state.filteredSuppliers, action.payload]
      };
    case 'UPDATE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.map(supplier => 
          supplier.id === action.payload.id ? action.payload : supplier
        ),
        filteredSuppliers: state.filteredSuppliers.map(supplier => 
          supplier.id === action.payload.id ? action.payload : supplier
        ),
        currentSupplier: state.currentSupplier?.id === action.payload.id ? 
          action.payload : state.currentSupplier
      };
    case 'DELETE_SUPPLIER':
      return {
        ...state,
        suppliers: state.suppliers.filter(supplier => supplier.id !== action.payload),
        filteredSuppliers: state.filteredSuppliers.filter(supplier => supplier.id !== action.payload),
        currentSupplier: state.currentSupplier?.id === action.payload ? null : state.currentSupplier
      };
    case 'ADD_SUPPLIER_ITEM':
    case 'UPDATE_SUPPLIER_ITEM':
      // Find if item already exists
      const itemExists = state.supplierItems.some(
        item => item.supplierId === action.payload.supplierId && item.itemId === action.payload.itemId
      );
      
      if (itemExists) {
        // Update existing item
        return {
          ...state,
          supplierItems: state.supplierItems.map(item => 
            (item.supplierId === action.payload.supplierId && item.itemId === action.payload.itemId) 
              ? action.payload 
              : item
          )
        };
      } else {
        // Add new item
        return {
          ...state,
          supplierItems: [...state.supplierItems, action.payload]
        };
      }
    case 'REMOVE_SUPPLIER_ITEM':
      return {
        ...state,
        supplierItems: state.supplierItems.filter(
          item => !(item.supplierId === action.payload.supplierId && item.itemId === action.payload.itemId)
        )
      };
    default:
      return state;
  }
}

// Provider component
interface SupplierProviderProps {
  children: ReactNode;
}

// PUBLIC_INTERFACE
export function SupplierProvider({ children }: SupplierProviderProps) {
  const [state, dispatch] = useReducer(supplierReducer, initialState);

  // Load initial data
  React.useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const suppliers = await supplierService.getSuppliers();
        dispatch({ type: 'SET_SUPPLIERS', payload: suppliers });
        
        const statsData = await supplierService.getSupplierStats();
        dispatch({ type: 'SET_STATS', payload: statsData });
        
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load supplier data';
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadData();
  }, []);

  // Filter suppliers based on the current filter
  const applyFilter = useCallback((filter: SupplierFilter) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_FILTER', payload: filter });

    // Apply filters to suppliers
    const filterAndSortSuppliers = (suppliers: Supplier[], filter: SupplierFilter) => {
      let result = [...suppliers];

      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        result = result.filter(supplier => 
          supplier.name.toLowerCase().includes(searchLower) || 
          supplier.contactName.toLowerCase().includes(searchLower) ||
          supplier.email.toLowerCase().includes(searchLower) ||
          supplier.notes?.toLowerCase().includes(searchLower) ||
          false
        );
      }

      if (filter.categories && filter.categories.length > 0) {
        result = result.filter(supplier => 
          supplier.categories?.some(category => filter.categories?.includes(category))
        );
      }

      if (filter.status && filter.status !== 'all') {
        result = result.filter(supplier => supplier.status === filter.status);
      }

      // Sort suppliers
      if (filter.sortBy) {
        result.sort((a, b) => {
          const key = filter.sortBy as keyof Supplier;
          const direction = filter.sortDirection === 'desc' ? -1 : 1;
          
          // Handle different types of values
          if (typeof a[key] === 'string') {
            return direction * (a[key] as string).localeCompare(b[key] as string);
          }
          
          if (typeof a[key] === 'number') {
            return direction * ((a[key] as number) - (b[key] as number));
          }
          
          if (a[key] instanceof Date && b[key] instanceof Date) {
            return direction * ((a[key] as Date).getTime() - (b[key] as Date).getTime());
          }
          
          return 0;
        });
      }
      
      return result;
    };
    
    // Get filtered and sorted suppliers
    const filteredResult = filterAndSortSuppliers(state.suppliers, filter);
    dispatch({ type: 'SET_FILTERED_SUPPLIERS', payload: filteredResult });
    dispatch({ type: 'SET_LOADING', payload: false });
  }, [state.suppliers]);

  // Fetch a specific supplier
  const fetchSupplier = useCallback(async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const supplier = await supplierService.getSupplier(id);
      dispatch({ type: 'SET_CURRENT_SUPPLIER', payload: supplier });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch supplier details';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Save (create or update) a supplier
  const saveSupplier = useCallback(async (supplier: Supplier) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      if (state.suppliers.some(s => s.id === supplier.id)) {
        // Update existing supplier
        const updatedSupplier = await supplierService.updateSupplier(supplier);
        dispatch({ type: 'UPDATE_SUPPLIER', payload: updatedSupplier });
      } else {
        // Create new supplier
        const newSupplier = await supplierService.createSupplier(supplier);
        dispatch({ type: 'ADD_SUPPLIER', payload: newSupplier });
      }
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save supplier';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.suppliers]);

  // Delete a supplier
  const deleteSupplier = useCallback(async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await supplierService.deleteSupplier(id);
      dispatch({ type: 'DELETE_SUPPLIER', payload: id });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete supplier';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Fetch supplier items
  const fetchSupplierItems = useCallback(async (supplierId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const items = await supplierService.getSupplierItems(supplierId);
      dispatch({ type: 'SET_SUPPLIER_ITEMS', payload: items });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch supplier items';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Associate supplier with item
  const associateItem = useCallback(async (association: SupplierItemAssociation) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await supplierService.associateItem(association);
      dispatch({ type: 'ADD_SUPPLIER_ITEM', payload: result });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to associate item with supplier';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Remove supplier-item association
  const removeItemAssociation = useCallback(async (supplierId: string, itemId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await supplierService.removeItemAssociation(supplierId, itemId);
      dispatch({ 
        type: 'REMOVE_SUPPLIER_ITEM', 
        payload: { supplierId, itemId } 
      });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove item association';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  return (
    <SupplierContext.Provider value={{ 
      state, 
      dispatch,
      applyFilter,
      fetchSupplier,
      saveSupplier,
      deleteSupplier,
      fetchSupplierItems,
      associateItem,
      removeItemAssociation
    }}>
      {children}
    </SupplierContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useSupplier() {
  const context = useContext(SupplierContext);
  if (context === undefined) {
    throw new Error('useSupplier must be used within a SupplierProvider');
  }
  return context;
}
