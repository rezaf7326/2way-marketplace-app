import { Grid } from '@radix-ui/themes';

export default function Home() {
  return (
    <Grid
      columns={{ initial: '1', md: '95%', lg: '65%' }}
      px={{ initial: '5', md: '0' }}
      justify="center"
      className="pt-3"
    >
      <h1>Main content...</h1>
    </Grid>
  );
}
