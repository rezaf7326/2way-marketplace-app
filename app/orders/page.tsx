import { Grid } from '@radix-ui/themes';

export default function Orders() {
  return (
    <Grid
      columns={{ initial: '1', md: '95%', lg: '65%' }}
      px={{ initial: '5', md: '0' }}
      justify="center"
      className="pt-3"
    >
      Orders...
    </Grid>
  );
}
