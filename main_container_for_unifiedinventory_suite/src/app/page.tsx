import React from 'react';
import MainContainer from '@/components/layout/MainContainer';
import InventoryDashboard from '@/components/inventory/InventoryDashboard';

export default function Home() {
  return (
    <MainContainer>
      <InventoryDashboard />
    </MainContainer>
  );
}
