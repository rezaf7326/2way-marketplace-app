import React from 'react';
import { FetchError } from '../../lib/fetch';
import ErrorCallout from '@/app/components/error/ErrorCallout';
import RegisterForm from '@/app/users/register/RegisterForm';

export default async function RegisterPage() {
  try {
    return <RegisterForm />;
  } catch (error: unknown) {
    return (
      <ErrorCallout
        message={error instanceof FetchError ? error.message : undefined}
      />
    );
  }
}
