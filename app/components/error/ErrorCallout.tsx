import React from 'react';
import { Callout } from '@radix-ui/themes';

export default function ErrorCallout({ message }: { message?: string }) {
  return (
    <Callout.Root color="ruby" className="mb-5">
      <Callout.Text>
        {message || 'An unexpected error has occurred'}
      </Callout.Text>
    </Callout.Root>
  );
}
