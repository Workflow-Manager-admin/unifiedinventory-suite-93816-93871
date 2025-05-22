'use client';

import React from 'react';
import InventoryItemComponent from '@/components/inventory/InventoryItem';
import MainContainer from '@/components/layout/MainContainer';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function InventoryItemPage({ params }: Props) {
  return (
    <MainContainer>
      <InventoryItemComponent itemId={params.id} />
    </MainContainer>
  );
}
