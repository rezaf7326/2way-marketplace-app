import React, { useState } from 'react';
import { FetchRequestFactory } from '@/app/lib/fetch';
import { useAuth } from '@/app/AuthProvider';
import { UserStatus } from '@/app/lib/enums';
import { Button, Flex, Heading } from '@radix-ui/themes';
import { toast } from 'react-toastify';

export default function SendConfirmEmailButton() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const onSendEmail = () => {
    setLoading(true);
    new FetchRequestFactory()
      .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
      .path(`/user/${user?.id}/confirm`)
      .create()
      .post({
        body: JSON.stringify({ email: user?.email }),
      })
      .then(() => {
        toast.info('Sent confirmation email.', { autoClose: 4000 });
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Flex direction="column" gap="3" maxWidth="300px">
      <Heading as="h3" size="3" className="text-zinc-600">
        Activate your account
      </Heading>
      <Button
        disabled={user?.status !== UserStatus.Created || loading}
        loading={loading}
        onClick={onSendEmail}
      >
        Send Confirmation Email
      </Button>
    </Flex>
  );
}
