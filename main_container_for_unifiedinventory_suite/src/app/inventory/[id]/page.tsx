'use client';

import React from 'react';
import InventoryItemComponent from '@/components/inventory/InventoryItem';
import MainContainer from '@/components/layout/MainContainer';

interface PageParams {
  params: { id: string };
}

export default function InventoryItemPage({ params }: PageParams) {
  return (
    <MainContainer>
      <InventoryItemComponent itemId={params.id} />
    </MainContainer>
  );
}
