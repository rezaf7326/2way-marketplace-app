import Link from 'next/link';
import AccentText from '@/app/components/AccentText';
import { Flex, Grid, Text, Heading } from '@radix-ui/themes';
import { CookieIcon } from '@radix-ui/react-icons';

export default function Footer() {
  return (
    <Grid
      columns={{ initial: '1', md: '35% 60%', lg: '25% 40%' }}
      pl={{ initial: '5', md: '0' }}
      justify="center"
      className="py-5 mt-10 bg-zinc-200"
    >
      <Flex direction="column">
        <Heading as="h3" size="4" className="mb-3 text-justify">
          Site information
        </Heading>
      </Flex>
      <Flex direction="column" justify="between" mt={{ initial: '4', md: '0' }}>
        <Flex
          wrap="wrap"
          mt={{ initial: '4', md: '0' }}
          align="center"
          gapX="1"
        >
          <Text>We use cookies</Text>
          <CookieIcon />
          <Text>
            By continuing to use our site, you are agreeing to our{' '}
            <Link href="#">
              <AccentText className="hover:underline">cookie policy</AccentText>
            </Link>
            .
          </Text>
        </Flex>
      </Flex>
    </Grid>
  );
}
