import { Supplier, SupplierStats, SupplierItemAssociation } from '@/types/supplier';

// Mock data for development
const mockSuppliers: Supplier[] = [
  {
    id: 'S001',
    name: 'Acme Supplies',
    contactName: 'John Doe',
    email: 'john@acmesupplies.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, ST 12345',
    website: 'https://acmesupplies.com',
    taxId: '12-3456789',
    paymentTerms: 'Net 30',
    notes: 'Reliable supplier for industrial parts',
    rating: 4,
    status: 'active',
    createdAt: new Date(2022, 5, 15),
    lastUpdated: new Date(2023, 8, 10),
    tags: ['industrial', 'reliable', 'bulk'],
    categories: ['Widgets', 'Components'],
    leadTime: 7
  },
  {
    id: 'S002',
    name: 'Tech Parts Inc.',
    contactName: 'Jane Smith',
    email: 'jane@techparts.com',
    phone: '555-987-6543',
    address: '456 Tech Blvd, Innovation City, ST 67890',
    website: 'https://techpartsinc.com',
    paymentTerms: 'Net 45',
    rating: 5,
    status: 'active',
    createdAt: new Date(2022, 3, 20),
    lastUpdated: new Date(2023, 9, 5),
    tags: ['electronics', 'premium', 'fast-delivery'],
    categories: ['Gadgets', 'Electronics'],
    leadTime: 3
  },
  {
    id: 'S003',
    name: 'Global Components',
    contactName: 'Mike Johnson',
    email: 'mike@globalcomp.com',
    phone: '555-456-7890',
    address: '789 Global Way, International City, ST 10112',
    website: 'https://globalcomponents.com',
    taxId: '98-7654321',
    paymentTerms: 'Net 15',
    rating: 3,
    status: 'active',
    createdAt: new Date(2022, 1, 10),
    lastUpdated: new Date(2023, 7, 12),
    tags: ['international', 'components'],
    categories: ['Components', 'Materials'],
    leadTime: 15
  },
  {
    id: 'S004',
    name: 'Pro Tools Manufacturing',
    contactName: 'Sarah Wilson',
    email: 'sarah@protools.com',
    phone: '555-789-0123',
    address: '101 Tool Ave, Craftville, ST 20023',
    website: 'https://protoolsmfg.com',
    taxId: '45-6780912',
    paymentTerms: 'Net 30',
    notes: 'Specializes in professional-grade tools',
    rating: 4,
    status: 'active',
    createdAt: new Date(2022, 7, 5),
    lastUpdated: new Date(2023, 8, 25),
    tags: ['tools', 'professional', 'quality'],
    categories: ['Tools'],
    leadTime: 10
  },
  {
    id: 'S005',
    name: 'Raw Materials Co.',
    contactName: 'David Brown',
    email: 'david@rawmaterials.com',
    phone: '555-321-6547',
    address: '222 Material Rd, Resource City, ST 30034',
    paymentTerms: 'Net 60',
    rating: 3,
    status: 'inactive',
    createdAt: new Date(2022, 2, 15),
    lastUpdated: new Date(2023, 6, 20),
    tags: ['raw', 'materials', 'bulk'],
    categories: ['Materials'],
    leadTime: 20
  }
];

// Mock supplier-item associations
const mockSupplierItems: SupplierItemAssociation[] = [
  {
    supplierId: 'S001',
    itemId: '1',
    isPrimarySupplier: true,
    unitPrice: 22.50,
    minOrderQuantity: 50,
    leadTime: 7,
    lastPurchaseDate: new Date(2023, 8, 10)
  },
  {
    supplierId: 'S002',
    itemId: '2',
    isPrimarySupplier: true,
    unitPrice: 40.00,
    minOrderQuantity: 20,
    leadTime: 3,
    lastPurchaseDate: new Date(2023, 9, 5)
  },
  {
    supplierId: 'S003',
    itemId: '3',
    isPrimarySupplier: true,
    unitPrice: 5.25,
    minOrderQuantity: 100,
    leadTime: 15,
    lastPurchaseDate: new Date(2023, 7, 20)
  },
  {
    supplierId: 'S003',
    itemId: '5',
    isPrimarySupplier: false,
    unitPrice: 3.25,
    minOrderQuantity: 200,
    leadTime: 12,
    lastPurchaseDate: new Date(2023, 7, 15)
  },
  {
    supplierId: 'S004',
    itemId: '4',
    isPrimarySupplier: true,
    unitPrice: 120.00,
    minOrderQuantity: 10,
    leadTime: 10,
    lastPurchaseDate: new Date(2023, 9, 10)
  },
  {
    supplierId: 'S005',
    itemId: '5',
    isPrimarySupplier: true,
    unitPrice: 3.00,
    minOrderQuantity: 500,
    leadTime: 20,
    lastPurchaseDate: new Date(2023, 8, 25)
  }
];

// Calculate mock statistics based on suppliers
const calculateStats = (suppliers: Supplier[]): SupplierStats => {
  const activeSuppliers = suppliers.filter(supplier => supplier.status === 'active').length;
  const inactiveSuppliers = suppliers.filter(supplier => supplier.status === 'inactive').length;
  
  // Calculate average lead time
  const totalLeadTime = suppliers.reduce((sum, supplier) => {
    return sum + (supplier.leadTime || 0);
  }, 0);
  const averageLeadTime = totalLeadTime / suppliers.length;
  
  // Sort by rating for top suppliers
  const topSuppliers = [...suppliers]
    .filter(supplier => supplier.status === 'active')
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);
  
  // In a real application, this would calculate total orders value from actual order data
  const totalOrdersValue = 258750.00; // Placeholder value
  
  return {
    totalSuppliers: suppliers.length,
    activeSuppliers,
    inactiveSuppliers,
    averageLeadTime,
    totalOrdersValue,
    topSuppliers
  };
};

/**
 * Service for supplier operations
 */
export const supplierService = {
  // Get all suppliers
  getSuppliers: async (): Promise<Supplier[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockSuppliers];
  },

  // Get a single supplier by ID
  getSupplier: async (id: string): Promise<Supplier | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const supplier = mockSuppliers.find(supplier => supplier.id === id);
    return supplier ? { ...supplier } : null;
  },

  // Create a new supplier
  createSupplier: async (supplier: Omit<Supplier, 'id' | 'createdAt' | 'lastUpdated'>): Promise<Supplier> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newSupplier: Supplier = {
      ...supplier,
      id: `S-${Date.now()}`,
      createdAt: new Date(),
      lastUpdated: new Date()
    };
    mockSuppliers.push(newSupplier);
    return { ...newSupplier };
  },

  // Update an existing supplier
  updateSupplier: async (supplier: Supplier): Promise<Supplier> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockSuppliers.findIndex(s => s.id === supplier.id);
    if (index === -1) {
      throw new Error('Supplier not found');
    }
    
    const updatedSupplier = {
      ...supplier,
      lastUpdated: new Date()
    };
    
    mockSuppliers[index] = updatedSupplier;
    return { ...updatedSupplier };
  },

  // Delete a supplier
  deleteSupplier: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockSuppliers.findIndex(supplier => supplier.id === id);
    if (index === -1) {
      return false;
    }
    
    mockSuppliers.splice(index, 1);
    return true;
  },

  // Get supplier statistics
  getSupplierStats: async (): Promise<SupplierStats> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return calculateStats(mockSuppliers);
  },

  // Get supplier items
  getSupplierItems: async (supplierId: string): Promise<SupplierItemAssociation[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSupplierItems.filter(item => item.supplierId === supplierId);
  },

  // Associate supplier with item
  associateItem: async (association: SupplierItemAssociation): Promise<SupplierItemAssociation> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if association already exists
    const existingIndex = mockSupplierItems.findIndex(
      item => item.supplierId === association.supplierId && item.itemId === association.itemId
    );
    
    if (existingIndex >= 0) {
      // Update existing association
      mockSupplierItems[existingIndex] = {
        ...association,
        lastPurchaseDate: association.lastPurchaseDate || mockSupplierItems[existingIndex].lastPurchaseDate
      };
      return { ...mockSupplierItems[existingIndex] };
    } else {
      // Create new association
      mockSupplierItems.push(association);
      return { ...association };
    }
  },

  // Remove supplier-item association
  removeItemAssociation: async (supplierId: string, itemId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockSupplierItems.findIndex(
      item => item.supplierId === supplierId && item.itemId === itemId
    );
    if (index === -1) {
      return false;
    }
    
    mockSupplierItems.splice(index, 1);
    return true;
  }
};
