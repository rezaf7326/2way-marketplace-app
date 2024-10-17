'use client';
import { useEffect, useRef, useState } from 'react';
import { UserIdProps } from '@/app/users/[id]/props.interface';
import { FetchError, FetchRequestFactory } from '@/app/lib/fetch';
import ErrorCallout from '@/app/components/error/ErrorCallout';
import { Button, Callout, Flex, Grid } from '@radix-ui/themes';

export default function ActivatePage(props: UserIdProps) {
  const initialized = useRef(false);
  const [activated, setActivated] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
    new FetchRequestFactory()
      .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
      .path(`/user/${props.params.id}/activate/${props.params.token}`)
      .create()
      .get()
      .then(() => setActivated(true))
      .catch(setError);
  }, [props]);

  if (error) {
    return (
      <Grid
        columns={{ initial: '1', md: '95%', lg: '65%' }}
        px={{ initial: '5', md: '0' }}
        justify="center"
      >
        <ErrorCallout
          message={error instanceof FetchError ? error.message : undefined}
        />
      </Grid>
    );
  }

  return (
    <Grid
      columns={{ initial: '1', md: '95%', lg: '65%' }}
      px={{ initial: '5', md: '0' }}
      justify="center"
    >
      <Flex direction="column" gap="2">
        {!activated && (
          <Callout.Root color="blue">
            <Callout.Text>Activating your account...</Callout.Text>
          </Callout.Root>
        )}
        {activated && (
          <Callout.Root color="jade">
            <Callout.Text>Activation Successful!</Callout.Text>
          </Callout.Root>
        )}
        <Button
          variant="soft"
          disabled={!activated}
          loading={!activated}
          onClick={() => window.close()}
        >
          Close This Tab
        </Button>
      </Flex>
    </Grid>
  );
}
