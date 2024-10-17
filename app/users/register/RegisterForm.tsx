'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { SignUpDto } from '@/app/lib/dtos';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FetchRequestFactory } from '@/app/lib/fetch';
import {
  Box,
  Checkbox,
  Flex,
  TextField,
  Text,
  Heading,
} from '@radix-ui/themes';
import CustomForm from '@/app/components/form/CustomForm';
import ErrorMessage from '@/app/components/error/ErrorMessage';
import PasswordField from '@/app/components/form/PasswordField';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import AccentText from '@/app/components/AccentText';
import { toast } from 'react-toastify';
import SelectField from '@/app/components/form/SelectField';
import { Role } from '@/app/lib/enums';

export default function RegisterForm() {
  const router = useRouter();
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors: validationErr },
  } = useForm<SignUpDto>({
    resolver: classValidatorResolver(SignUpDto),
  });
  const onSubmit = handleSubmit(async (data) => {
    await new FetchRequestFactory()
      .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
      .path('user')
      .create()
      .post({ body: JSON.stringify(data) });
    toast.success('Register successful.');
    router.push('login');
  });

  return (
    <CustomForm
      buttonLabel="Create Account"
      onSubmit={onSubmit}
      disabled={!termsChecked}
    >
      <Box>
        <Heading as="h3" size="4" className="mb-3 text-justify">
          First Name
        </Heading>
        <TextField.Root placeholder="e.g. James" {...register('firstName')} />
        <ErrorMessage>{validationErr.firstName?.message}</ErrorMessage>
      </Box>
      <Box>
        <Heading as="h3" size="4" className="mb-3 text-justify">
          Last Name
        </Heading>
        <TextField.Root placeholder="e.g. Miller" {...register('lastName')} />
        <ErrorMessage>{validationErr.lastName?.message}</ErrorMessage>
      </Box>
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
          Phone Number{' '}
          <Text size="2" color="gray">
            (optional)
          </Text>
        </Heading>
        <TextField.Root placeholder="+44123456789" {...register('phone')} />
        <ErrorMessage>{validationErr.phone?.message}</ErrorMessage>
      </Box>
      <Box>
        <Heading as="h3" size="4" className="mb-3 text-justify">
          Activity
        </Heading>
        <SelectField
          placeholder="Select your type of activity"
          fieldName={'role'}
          control={control}
          items={[
            { value: Role.Buyer, label: 'Buyer' },
            { value: Role.Seller, label: 'Seller' },
          ]}
          style={{ width: '100%' }}
        />
        <ErrorMessage>{validationErr.role?.message}</ErrorMessage>
      </Box>
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
      <Flex justify="between" align="center">
        <Text as="label" size="2" ml="1">
          <Flex gap="2">
            <Checkbox
              onCheckedChange={(checked) => setTermsChecked(checked === true)}
            />
            <Link
              href="#"
              className="text-zinc-500 underline hover:text-red-800 transition-colors"
            >
              Agree to terms of use
            </Link>
          </Flex>
        </Text>
        <Text size="1" color="gray" mr="1">
          Already a user?{' '}
          <AccentText size="1">
            <Link href="/users/login" className="hover:underline">
              login
            </Link>
          </AccentText>
        </Text>
      </Flex>
    </CustomForm>
  );
}
