'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ResetPasswordDto } from '@/app/lib/dtos';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { FetchRequestFactory } from '@/app/lib/fetch';
import CustomForm from '@/app/components/form/CustomForm';
import { Box, Heading } from '@radix-ui/themes';
import PasswordField from '@/app/components/form/PasswordField';
import ErrorMessage from '@/app/components/error/ErrorMessage';
import { toast } from 'react-toastify';

export default function ResetPasswordForm({
  userId,
  resetToken,
}: {
  userId: number;
  resetToken: string;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: validationErr },
  } = useForm<ResetPasswordDto>({
    resolver: classValidatorResolver(ResetPasswordDto),
  });
  const onSubmit = handleSubmit(async (data: ResetPasswordDto) => {
    await new FetchRequestFactory()
      .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
      .path(`user/${userId}/reset-password/${resetToken}`)
      .create()
      .post({ body: JSON.stringify(data) });
    toast.info('Password reset! Please login again.');
    router.push('/users/login');
  });

  return (
    <CustomForm buttonLabel="Reset Password" onSubmit={onSubmit}>
      <Box>
        <Heading as="h3" size="4" className="mb-3 text-justify">
          Password
        </Heading>
        <PasswordField register={register('password')} />
        <ErrorMessage>
          {validationErr.password?.message?.toLowerCase().includes('strong')
            ? 'password must contain at least 8 characters including numbers, ' +
              'uppercase, and lowercase letters'
            : validationErr.password?.message}
        </ErrorMessage>
      </Box>
      <Box>
        <Heading as="h3" size="4" className="mb-3 text-justify">
          Confirm Password
        </Heading>
        <PasswordField register={register('confirmPassword')} />
        <ErrorMessage>{validationErr.confirmPassword?.message}</ErrorMessage>
      </Box>
    </CustomForm>
  );
}
