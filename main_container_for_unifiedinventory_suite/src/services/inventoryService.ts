import { InventoryItem, InventoryStats } from '@/types/inventory';

// Mock data for development
const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Widget A',
    sku: 'WDG-A-001',
    category: 'Widgets',
    quantity: 150,
    unitPrice: 25.99,
    location: 'Warehouse A',
    reorderPoint: 30,
    supplierInfo: {
      id: 'S001',
      name: 'Acme Supplies',
      contactName: 'John Doe',
      email: 'john@acmesupplies.com',
      phone: '555-123-4567'
    },
    lastUpdated: new Date(2023, 8, 15),
    createdAt: new Date(2023, 1, 10),
    description: 'Standard widget for industrial applications',
    tags: ['durable', 'metal', 'industrial']
  },
  {
    id: '2',
    name: 'Gadget B',
    sku: 'GDG-B-002',
    category: 'Gadgets',
    quantity: 75,
    unitPrice: 42.50,
    location: 'Warehouse B',
    reorderPoint: 20,
    supplierInfo: {
      id: 'S002',
      name: 'Tech Parts Inc.',
      contactName: 'Jane Smith',
      email: 'jane@techparts.com',
      phone: '555-987-6543'
    },
    lastUpdated: new Date(2023, 9, 5),
    createdAt: new Date(2023, 2, 15),
    description: 'Electronic gadget with multiple functions',
    tags: ['electronic', 'rechargeable']
  },
  {
    id: '3',
    name: 'Component C',
    sku: 'CMP-C-003',
    category: 'Components',
    quantity: 300,
    unitPrice: 5.99,
    location: 'Warehouse A',
    reorderPoint: 50,
    supplierInfo: {
      id: 'S003',
      name: 'Global Components',
      contactName: 'Mike Johnson',
      email: 'mike@globalcomp.com',
      phone: '555-456-7890'
    },
    lastUpdated: new Date(2023, 7, 20),
    createdAt: new Date(2023, 3, 5),
    description: 'Small component for assembly',
    tags: ['plastic', 'assembly']
  },
  {
    id: '4',
    name: 'Tool D',
    sku: 'TL-D-004',
    category: 'Tools',
    quantity: 45,
    unitPrice: 129.99,
    location: 'Warehouse C',
    reorderPoint: 10,
    supplierInfo: {
      id: 'S004',
      name: 'Pro Tools Manufacturing',
      contactName: 'Sarah Wilson',
      email: 'sarah@protools.com',
      phone: '555-789-0123'
    },
    lastUpdated: new Date(2023, 9, 10),
    createdAt: new Date(2023, 4, 12),
    description: 'Professional-grade tool for construction',
    tags: ['heavy-duty', 'construction']
  },
  {
    id: '5',
    name: 'Material E',
    sku: 'MTL-E-005',
    category: 'Materials',
    quantity: 500,
    unitPrice: 3.50,
    location: 'Warehouse B',
    reorderPoint: 100,
    supplierInfo: {
      id: 'S005',
      name: 'Raw Materials Co.',
      contactName: 'David Brown',
      email: 'david@rawmaterials.com',
      phone: '555-321-6547'
    },
    lastUpdated: new Date(2023, 8, 25),
    createdAt: new Date(2023, 5, 20),
    description: 'Raw material for manufacturing',
    tags: ['raw', 'manufacturing']
  }
];

// Calculate mock statistics based on inventory items
const calculateStats = (items: InventoryItem[]): InventoryStats => {
  const totalValue = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const lowStockItems = items.filter(item => item.quantity <= item.reorderPoint).length;
  const outOfStockItems = items.filter(item => item.quantity === 0).length;
  
  // Simplified inventory turnover calculation (would be more complex in real system)
  const inventoryTurnover = 4.5; // Placeholder
  
  // Sort by quantity for most/least moving
  const sortedByQuantity = [...items].sort((a, b) => a.quantity - b.quantity);
  
  return {
    totalItems: items.length,
    totalValue,
    lowStockItems,
    outOfStockItems,
    inventoryTurnover,
    mostMovingItems: sortedByQuantity.slice(-3).reverse(),
    leastMovingItems: sortedByQuantity.slice(0, 3)
  };
};

/**
 * Service for inventory operations
 */
export const inventoryService = {
  // Get all inventory items
  getInventoryItems: async (): Promise<InventoryItem[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockInventoryItems];
  },

  // Get a single inventory item by ID
  getInventoryItem: async (id: string): Promise<InventoryItem | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const item = mockInventoryItems.find(item => item.id === id);
    return item ? { ...item } : null;
  },

  // Create a new inventory item
  createInventoryItem: async (item: Omit<InventoryItem, 'id' | 'createdAt' | 'lastUpdated'>): Promise<InventoryItem> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newItem: InventoryItem = {
      ...item,
      id: `item-${Date.now()}`,
      createdAt: new Date(),
      lastUpdated: new Date()
    };
    mockInventoryItems.push(newItem);
    return { ...newItem };
  },

  // Update an existing inventory item
  updateInventoryItem: async (item: InventoryItem): Promise<InventoryItem> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockInventoryItems.findIndex(i => i.id === item.id);
    if (index === -1) {
      throw new Error('Item not found');
    }
    
    const updatedItem = {
      ...item,
      lastUpdated: new Date()
    };
    
    mockInventoryItems[index] = updatedItem;
    return { ...updatedItem };
  },

  // Delete an inventory item
  deleteInventoryItem: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockInventoryItems.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }
    
    mockInventoryItems.splice(index, 1);
    return true;
  },

  // Get inventory statistics
  getInventoryStats: async (): Promise<InventoryStats> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return calculateStats(mockInventoryItems);
  }
};
