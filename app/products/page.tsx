import { Grid } from '@radix-ui/themes';
import ProductsTable from './products-table';

export default function Products() {
  return (
    <Grid
      columns={{ initial: '1', md: '95%', lg: '65%' }}
      px={{ initial: '5', md: '0' }}
      justify="center"
      className="pt-3"
    >
      <ProductsTable />
    </Grid>
  );
}
