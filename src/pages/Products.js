import { Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import { ProductList } from '../components/_dashboard/products';
//
//import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  return (
    <Page title="Dashboard: Products | ATEMA">
      <Container>{/* <ProductList products={PRODUCTS} /> */}</Container>
    </Page>
  );
}
