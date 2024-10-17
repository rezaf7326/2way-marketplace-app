'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import {
  Box,
  Flex,
  Text,
  Button,
  AlertDialog,
  DropdownMenu,
  Separator,
  Grid,
  TextField,
  Strong,
} from '@radix-ui/themes';
import { usePathname, useRouter } from 'next/navigation';
import { FetchRequestFactory } from '@/app/lib/fetch';
import { useAuth } from '@/app/AuthProvider';
import AccentText from '@/app/components/AccentText';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { BarLoader } from 'react-spinners';

export default function NavBar() {
  const router = useRouter();
  const currentPath = usePathname();
  const { user, setUser, authLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const signOut = () => {
    new FetchRequestFactory()
      .baseUrl(process.env.NEXT_PUBLIC_BACKEND_SERVICE_URL as string)
      .path('auth/logout')
      .create()
      .post({
        headers: { Authorization: Cookies.get('token') as string },
      })
      .then(() => console.log('logout successful.'))
      .catch(() => console.error('Error signing out.'))
      .finally(() => {
        Cookies.remove('token');
        setMenuOpen(false);
        setUser(undefined);
        router.push('/');
      });
  };
  const linkLI = (link: { href: string; label: string; dark?: boolean }) => (
    <Link
      href={link.href}
      className={classNames({
        'text-zinc-900': link.href === currentPath && !link.dark,
        'text-zinc-500': link.href !== currentPath && !link.dark,
        'hover:text-zinc-800 transition-colors': !link.dark,
        'text-zinc-200': link.href === currentPath && link.dark,
        'text-zinc-400': link.href !== currentPath && link.dark,
        'hover:text-zinc-300 transition-colors': link.dark,
      })}
    >
      {link.label}
    </Link>
  );
  const linkList = (
    links: Array<{ href: string; label: string; dark?: boolean }>,
  ) => (
    <ul className="flex space-x-8">
      {links.map((link) => (
        <li key={link.href}>{linkLI(link)}</li>
      ))}
    </ul>
  );

  return (
    <div className="top-0 lg:rt-r-position-sticky z-50 mb-5">
      <nav className="border-b border-zinc-200 bg-zinc-800">
        <Grid
          columns={{ initial: '1', md: '60% 35%', lg: '40% 25%' }}
          justify="center"
          className={'h-24 lg:h-12'}
        >
          <Flex align="center" justify={{ initial: 'center', md: 'start' }}>
            {linkList([{ href: '/products', label: 'Products', dark: true }])}
          </Flex>
          <Flex align="center" justify={{ initial: 'center', md: 'end' }}>
            <BarLoader
              width={130}
              height={2}
              color="#d63636"
              className="pr-5"
              speedMultiplier={2}
              loading={authLoading}
            />
            {authLoading ? undefined : !user ? (
              linkList([
                { href: '/users/register', label: 'Sign Up', dark: true },
                { href: '/users/login', label: 'Sign In', dark: true },
              ])
            ) : (
              <DropdownMenu.Root
                open={menuOpen}
                onOpenChange={(open) => setMenuOpen(open)}
              >
                <DropdownMenu.Trigger>
                  <Button variant="ghost">
                    <Text className="text-zinc-400 hover:text-zinc-300 transition-colors">
                      Signed in as <Strong>{user.firstName}</Strong>
                    </Text>
                    <DropdownMenu.TriggerIcon />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                  <Flex
                    align="center"
                    direction="column"
                    gapY="3"
                    className="px-2"
                    minWidth="120px"
                  >
                    <Box onClick={() => setMenuOpen(false)}>
                      {linkLI({
                        href: `/users/profile`,
                        label: 'My Profile',
                      })}
                    </Box>
                    <Box onClick={() => setMenuOpen(false)}>
                      {linkLI({
                        href: '/detail-sets',
                        label: 'My Projects',
                      })}
                    </Box>
                    <Separator size="4" />
                    <Box>
                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          <Button variant="ghost" color="ruby">
                            Sign Out
                          </Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content maxWidth="480px">
                          <AlertDialog.Title>Sign Out</AlertDialog.Title>
                          <AlertDialog.Description size="2">
                            You are leaving?
                          </AlertDialog.Description>
                          <Flex gap="3" justify="end">
                            <AlertDialog.Cancel>
                              <Button variant="soft" color="gray">
                                Not yet!
                              </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                              <Button color="ruby" onClick={signOut}>
                                Yes, sign me out
                              </Button>
                            </AlertDialog.Action>
                          </Flex>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                    </Box>
                  </Flex>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </Flex>
        </Grid>
      </nav>
      <nav className="bg-zinc-100 shadow-md">
        <Grid
          columns={{ initial: '1', md: '60% 35%', lg: '40% 25%' }}
          justify="center"
          className={currentPath !== '/details' ? 'h-24 lg:h-12' : 'h-12'}
        >
          <Flex align="center" justify={{ initial: 'center', md: 'start' }}>
            <Link href="/">
              <AccentText
                weight="bold"
                size="6"
                className="hover:text-indigo-950 transition-colors"
              >
                2 Way Marketplace
              </AccentText>
            </Link>
          </Flex>
        </Grid>
      </nav>
    </div>
  );
}
