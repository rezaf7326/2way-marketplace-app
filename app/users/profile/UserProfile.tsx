'use client';
import {
  AlertDialog,
  Badge,
  Button,
  Code,
  DataList,
  Flex,
  Grid,
  IconButton,
  Strong,
  Text,
} from '@radix-ui/themes';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/AuthProvider';
import { CopyIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import AccentText from '@/app/components/AccentText';
import { FetchRequestFactory } from '@/app/lib/fetch';
import { UserStatus } from '@/app/lib/enums';
import SignInRequired from '@/app/components/error/SignInRequired';
import SendConfirmEmailButton from '@/app/users/profile/SendConfirmEmailButton';
import { fetchUserInfo } from '@/app/lib/helpers/fetch-user-info';
import PageLoader from '@/app/components/PageLoader';

export default function UserProfile() {
  const { user, setUser, authLoading } = useAuth();

  const status: {
    color: 'blue' | 'jade' | 'ruby' | 'gray';
    label: string;
  } = {
    color: 'gray',
    label: 'Unknown',
  };
  if (user?.status === UserStatus.Created) {
    status.color = 'blue';
    status.label = 'New';
  }
  if (user?.status === UserStatus.Active) {
    status.color = 'jade';
    status.label = 'Active';
  }
  if (user?.status === UserStatus.Suspended) {
    status.color = 'ruby';
    status.label = 'Suspended';
  }

  return user ? (
    <Grid
      columns={{ initial: '1', md: '65% 30%', lg: '45% 20%' }}
      px={{ initial: '5', md: '0' }}
      justify="center"
    >
      <Flex direction="column" align="start">
        <DataList.Root>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Status</DataList.Label>
            <DataList.Value>
              <Badge color={status.color} variant="soft" radius="full">
                {status.label}
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">ID</DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                <Code variant="ghost">{user.id}</Code>
                <IconButton
                  size="1"
                  aria-label="Copy value"
                  color="gray"
                  variant="ghost"
                >
                  <CopyIcon />
                </IconButton>
              </Flex>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Name</DataList.Label>
            <DataList.Value>
              {user.firstName} {user.lastName}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Email</DataList.Label>
            <DataList.Value>{user.email}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Phone</DataList.Label>
            <DataList.Value>{user.phone || '-'}</DataList.Value>
          </DataList.Item>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Accessibility</DataList.Label>
            <DataList.Value>
              <Flex gap="2" align="center">
                {user.roles.map((role) => (
                  <Badge variant="outline" radius="full" key={role}>
                    {role}
                  </Badge>
                ))}
              </Flex>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Last Login</DataList.Label>
            <DataList.Value>
              {new Date(user.lastLogin).toString()}
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Account Creation</DataList.Label>
            <DataList.Value>
              {new Date(user.createdAt).toString()}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Flex>
      <Flex
        direction="column"
        gapY="7"
        className="border-l"
        pl={{ initial: '4', md: '6', lg: '8' }}
        mt={{ initial: '8', md: '0' }}
      >
        <SendConfirmEmailButton />
      </Flex>
    </Grid>
  ) : (
    <Grid
      columns={{ initial: '1', md: '95%', lg: '65%' }}
      px={{ initial: '5', md: '0' }}
      justify="center"
    >
      {authLoading ? <PageLoader /> : <SignInRequired />}
    </Grid>
  );
}
