'use client';
import React from 'react';
import { Grid } from '@radix-ui/themes';
import PageLoader from '@/app/components/PageLoader';

export default function LoadingPage() {
  return (
    <Grid
      columns={{ initial: '1', md: '95%', lg: '65%' }}
      px={{ initial: '5', md: '0' }}
      justify="center"
    >
      <PageLoader />
    </Grid>
  );
}
