import React from 'react';
import { BeatLoader } from 'react-spinners';

export default function PageLoader({ loading }: { loading?: boolean }) {
  return (
    <BeatLoader
      color="#d66767"
      style={{
        height: '280px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      speedMultiplier={1.3}
      size={22}
      loading={loading}
    />
  );
}
