"use client";

import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { InventoryItem, InventoryFilter, InventoryStats } from '@/types/inventory';

// Define the state shape
interface InventoryState {
  items: InventoryItem[];
  filteredItems: InventoryItem[];
  currentItem: InventoryItem | null;
  isLoading: boolean;
  error: string | null;
  filter: InventoryFilter;
  stats: InventoryStats | null;
}

// Define the action types
type InventoryAction =
  | { type: 'SET_ITEMS'; payload: InventoryItem[] }
  | { type: 'SET_FILTERED_ITEMS'; payload: InventoryItem[] }
  | { type: 'SET_CURRENT_ITEM'; payload: InventoryItem | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTER'; payload: InventoryFilter }
  | { type: 'SET_STATS'; payload: InventoryStats }
  | { type: 'ADD_ITEM'; payload: InventoryItem }
  | { type: 'UPDATE_ITEM'; payload: InventoryItem }
  | { type: 'DELETE_ITEM'; payload: string };

// Create the context
interface InventoryContextType {
  state: InventoryState;
  dispatch: React.Dispatch<InventoryAction>;
  applyFilter: (filter: InventoryFilter) => void;
  fetchItem: (id: string) => Promise<void>;
  saveItem: (item: InventoryItem) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Initial state
const initialState: InventoryState = {
  items: [],
  filteredItems: [],
  currentItem: null,
  isLoading: false,
  error: null,
  filter: {
    sortBy: 'name',
    sortDirection: 'asc'
  },
  stats: null
};

// Reducer function
function inventoryReducer(state: InventoryState, action: InventoryAction): InventoryState {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
        filteredItems: action.payload
      };
    case 'SET_FILTERED_ITEMS':
      return {
        ...state,
        filteredItems: action.payload
      };
    case 'SET_CURRENT_ITEM':
      return {
        ...state,
        currentItem: action.payload
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
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        filteredItems: [...state.filteredItems, action.payload]
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        ),
        filteredItems: state.filteredItems.map(item => 
          item.id === action.payload.id ? action.payload : item
        ),
        currentItem: state.currentItem?.id === action.payload.id ? 
          action.payload : state.currentItem
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        filteredItems: state.filteredItems.filter(item => item.id !== action.payload),
        currentItem: state.currentItem?.id === action.payload ? null : state.currentItem
      };
    default:
      return state;
  }
}

// Provider component
interface InventoryProviderProps {
  children: ReactNode;
}

// PUBLIC_INTERFACE
export function InventoryProvider({ children }: InventoryProviderProps) {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  // Filter items based on the current filter
  const applyFilter = useCallback((filter: InventoryFilter) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_FILTER', payload: filter });

    // Apply filters to items
    let result = [...state.items];

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchLower) || 
        item.sku.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower)
      );
    }

    if (filter.categories && filter.categories.length > 0) {
      result = result.filter(item => filter.categories?.includes(item.category));
    }

    if (filter.minQuantity !== undefined) {
      result = result.filter(item => item.quantity >= (filter.minQuantity || 0));
    }

    if (filter.maxQuantity !== undefined) {
      result = result.filter(item => item.quantity <= (filter.maxQuantity || Infinity));
    }

    if (filter.location) {
      result = result.filter(item => item.location === filter.location);
    }

    // Sort items
    if (filter.sortBy) {
      result.sort((a, b) => {
        const key = filter.sortBy as keyof InventoryItem;
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

    dispatch({ type: 'SET_FILTERED_ITEMS', payload: result });
    dispatch({ type: 'SET_LOADING', payload: false });
  }, [state.items]);

  // Fetch a specific item
  const fetchItem = useCallback(async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // In a real app, this would be an API call
      const item = state.items.find(item => item.id === id) || null;
      dispatch({ type: 'SET_CURRENT_ITEM', payload: item });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch item details';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.items]);

  // Save (create or update) an item
  const saveItem = useCallback(async (item: InventoryItem) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // In a real app, this would be an API call
      if (state.items.some(i => i.id === item.id)) {
        // Update existing item
        dispatch({ type: 'UPDATE_ITEM', payload: item });
      } else {
        // Create new item
        dispatch({ type: 'ADD_ITEM', payload: item });
      }
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save item' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.items]);

  // Delete an item
  const deleteItem = useCallback(async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // In a real app, this would be an API call
      dispatch({ type: 'DELETE_ITEM', payload: id });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete item' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  return (
    <InventoryContext.Provider value={{ 
      state, 
      dispatch,
      applyFilter,
      fetchItem,
      saveItem,
      deleteItem
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
