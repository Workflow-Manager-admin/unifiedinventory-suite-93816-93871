'use client';

import React from 'react';
import InventoryItemComponent from '@/components/inventory/InventoryItem';
import MainContainer from '@/components/layout/MainContainer';

export default function InventoryItemPage({ params }: { params: { id: string } }) {
  return (
    <MainContainer>
      <InventoryItemComponent itemId={params.id} />
    </MainContainer>
  );
}
