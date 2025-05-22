import React from 'react';
import InventoryList from '@/components/inventory/InventoryList';
import MainContainer from '@/components/layout/MainContainer';

export default function InventoryPage() {
  return (
    <MainContainer>
      <InventoryList />
    </MainContainer>
  );
}
