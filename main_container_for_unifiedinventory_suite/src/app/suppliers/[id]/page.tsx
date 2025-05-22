'use client';

import React from 'react';
import SupplierDetail from '@/components/suppliers/SupplierDetail';
import MainContainer from '@/components/layout/MainContainer';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function SupplierDetailPage({ params }: Props) {
  return (
    <MainContainer>
      <SupplierDetail supplierId={params.id} />
    </MainContainer>
  );
}
