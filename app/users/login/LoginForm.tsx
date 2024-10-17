'use client';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Heading,
  Box,
  Button,
  TextField,
  Text,
  Flex,
  Grid,
} from '@radix-ui/themes';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import PasswordField from '@/app/components/form/PasswordField';
import ErrorMessage from '@/app/components/error/ErrorMessage';
import CustomForm from '@/app/components/form/CustomForm';
import { FetchError, FetchRequestFactory } from '@/app/lib/fetch';
import { SignInDto } from '@/app/lib/dtos';
import { LoginResponse, User } from '@/app/lib/interfaces';
import { useAuth } from '@/app/AuthProvider';
import Countdown from 'react-countdown';
import { isEmail } from 'class-validator';
import AccentText from '@/app/components/AccentText';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [loadingForgotPass, setLoadingForgotPass] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors: validationErr },
    getValues,
    setError: setFormError,
  } = useForm<SignInDto>({
    resolver: classValidatorResolver(SignInDto),
  });
  const onSubmit = handleSubmit(async (data: SignInDto) => {
    const response = await new FetchRequestFactory()
      .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
      .path('auth/login')
      .create()
      .post<LoginResponse>({ body: JSON.stringify(data) });
    Cookies.set('token', response.body!.accessToken);
    const { body } = await new FetchRequestFactory()
      .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
      .path('user')
      .create()
      .get<User>({
        headers: { Authorization: response.body!.accessToken },
      });
    setUser(body);
    toast.success(`Welcome ${body!.firstName}!`);
    router.push('/');
  });

  const handleForgotPassword = () => {
    const validEmail = isEmail(getValues().email);
    setFormError('email', {
      message: validEmail ? undefined : 'invalid email address',
    });
    if (!validEmail) {
      return;
    }
    setLoadingForgotPass(true);
    new FetchRequestFactory()
      .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
      .path('user/forgot-password')
      .create()
      .post<LoginResponse>({
        body: JSON.stringify({ email: getValues().email }),
      })
      .then(() => {
        toast.info('Sent reset password link.');
        setCountDown(true);
      })
      .catch((err) =>
        toast.error(
          err instanceof FetchError ? err.message : 'Something went wrong!',
        ),
      )
      .finally(() => setLoadingForgotPass(false));
  };

  return (
    <CustomForm buttonLabel="Sign In" onSubmit={onSubmit}>
      <Box>
        <Heading as="h3" size="4" className="mb-3 text-justify">
          Email Address
        </Heading>
        <TextField.Root
          placeholder="email@example.com"
          {...register('email')}
        />
        <ErrorMessage>{validationErr.email?.message}</ErrorMessage>
      </Box>
      <Box>
        <Heading as="h3" size="4" className="mb-3 text-justify">
          Password
        </Heading>
        <PasswordField register={register('password')} />
        <ErrorMessage>{validationErr.password?.message}</ErrorMessage>
      </Box>
      <Grid
        columns={{ initial: '1', sm: '100%' }}
        px={{ initial: '3', md: '2' }}
      >
        <Flex justify="between" align="center">
          {countDown ? (
            <Countdown
              date={Date.now() + 90_000}
              onComplete={() => setCountDown(false)}
              renderer={({ minutes: m, seconds: s }) => (
                <Text size="1" color="gray">
                  {m < 10 ? `0${m}` : m}:{s < 10 ? `0${s}` : s}
                </Text>
              )}
            />
          ) : (
            <Text size="1" color="gray" mr="2">
              Forgot Password?
            </Text>
          )}
          <Button
            mr="5"
            size="1"
            type="button"
            variant="ghost"
            onClick={handleForgotPassword}
            loading={loadingForgotPass}
            disabled={loadingForgotPass || countDown}
          >
            Send Reset Password Link
          </Button>
          <Text size="1" color="gray">
            Don&apos;t have an account?{' '}
            <AccentText size="1">
              <Link href="/users/register" className="hover:underline">
                create one
              </Link>
            </AccentText>
          </Text>
        </Flex>
      </Grid>
    </CustomForm>
  );
}
