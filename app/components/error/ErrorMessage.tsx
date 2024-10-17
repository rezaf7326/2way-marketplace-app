import { PropsWithChildren } from 'react';
import { Text } from '@radix-ui/themes';

export default function ErrorMessage({ children }: PropsWithChildren) {
  if (children) {
    return (
      <Text color="ruby" as="p">
        {children}
      </Text>
    );
  }
}
