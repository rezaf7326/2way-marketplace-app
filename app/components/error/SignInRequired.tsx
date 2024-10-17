import { Callout } from '@radix-ui/themes';
import AccentText from '@/app/components/AccentText';
import Link from 'next/link';
import React from 'react';

export default function SignInRequired() {
  return (
    <Callout.Root color="gray">
      <Callout.Text>
        You have to{' '}
        <AccentText>
          <Link href={'/users/login'} className="hover:underline">
            sign in
          </Link>
        </AccentText>{' '}
        to access this content.
      </Callout.Text>
    </Callout.Root>
  );
}
