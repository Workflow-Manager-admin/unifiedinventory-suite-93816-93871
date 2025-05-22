'use client';

import React from 'react';
import { PageProps } from 'next/types';
import InventoryItemComponent from '@/components/inventory/InventoryItem';
import MainContainer from '@/components/layout/MainContainer';

export default function InventoryItemPage({ params }: PageProps<{ id: string }>) {
  return (
    <MainContainer>
      <InventoryItemComponent itemId={params.id} />
    </MainContainer>
  );
}
